import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { 
  Play, 
  RotateCcw, 
  XSquare, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Copy, 
  Check, 
  Plus, 
  Trash2, 
  Edit3, 
  Layers, 
  CheckSquare, 
  FileText, 
  Calendar, 
  Sparkles, 
  Terminal, 
  ArrowLeft,
  Flame,
  ShieldAlert
} from 'lucide-react';
import { useWorkflow } from '../context/WorkflowContext';
import { WorkflowStep, ChecklistItem } from '../types';

const TOOL_ICONS: Record<string, React.ElementType> = {
  'tool-planner': Layers,
  'tool-checklist': CheckSquare,
  'tool-summarizer': FileText,
  'tool-calendar': Calendar,
  'tool-code-auditor': Terminal,
};

export const NewWorkflowPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { 
    workflows, 
    activeWorkflow, 
    setActiveWorkflow, 
    createWorkflow, 
    updateWorkflow, 
    executeWorkflow, 
    cancelExecution, 
    retryWorkflow,
    isExecuting,
    activeStepIndex,
    tools
  } = useWorkflow();

  const [requestText, setRequestText] = useState('Help me organize my week and prepare a project checklist.');
  const [isEditingRequest, setIsEditingRequest] = useState(false);
  const [copied, setCopied] = useState(false);
  const [simulateFailure, setSimulateFailure] = useState(false);
  const [newStepTitle, setNewStepTitle] = useState('');
  const [showAddStep, setShowAddStep] = useState(false);
  const [activeTab, setActiveTab] = useState<'plan' | 'logs' | 'tools'>('plan');

  // Load workflow from search params or create default
  useEffect(() => {
    const idParam = searchParams.get('id');
    if (idParam) {
      const found = workflows.find(w => w.id === idParam);
      if (found) {
        setActiveWorkflow(found);
        setRequestText(found.request);
        return;
      }
    }

    // If no active workflow exists, initialize with primary demo prompt
    if (!activeWorkflow) {
      const initWf = createWorkflow(requestText);
      setActiveWorkflow(initWf);
    } else {
      setRequestText(activeWorkflow.request);
    }
  }, [searchParams]);

  const currentWorkflow = activeWorkflow || workflows[0];

  if (!currentWorkflow) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center">
        <Sparkles className="w-8 h-8 text-brand-500 animate-spin mb-4" />
        <p className="text-sm text-ink-muted">Initializing workflow planner...</p>
      </div>
    );
  }

  // Handle regenerating the plan
  const handleRegenerate = () => {
    if (!requestText.trim()) return;
    const newWf = createWorkflow(requestText.trim());
    setActiveWorkflow(newWf);
    setIsEditingRequest(false);
  };

  // Step editing interactions
  const handleUpdateStepTitle = (stepIndex: number, newTitle: string) => {
    const updatedSteps = [...currentWorkflow.steps];
    updatedSteps[stepIndex] = { ...updatedSteps[stepIndex], title: newTitle };
    const updated = { ...currentWorkflow, steps: updatedSteps };
    updateWorkflow(updated);
  };

  const handleRemoveStep = (stepIndex: number) => {
    if (currentWorkflow.steps.length <= 1) return;
    const updatedSteps = currentWorkflow.steps
      .filter((_, idx) => idx !== stepIndex)
      .map((s, idx) => ({ ...s, stepNumber: idx + 1 }));
    updateWorkflow({ ...currentWorkflow, steps: updatedSteps });
  };

  const handleAddStep = () => {
    if (!newStepTitle.trim()) return;
    const newStep: WorkflowStep = {
      id: `step-custom-${Date.now()}`,
      stepNumber: currentWorkflow.steps.length + 1,
      title: newStepTitle.trim(),
      description: 'Custom operator step added to plan.',
      toolId: 'tool-checklist',
      toolName: 'Structured Checklist Generator',
      status: 'pending',
      estimatedDuration: '1.2s',
      executionLogs: []
    };
    const updated = {
      ...currentWorkflow,
      steps: [...currentWorkflow.steps, newStep]
    };
    updateWorkflow(updated);
    setNewStepTitle('');
    setShowAddStep(false);
  };

  // Execution triggers
  const handleRun = () => {
    executeWorkflow(currentWorkflow.id, {
      simulateFailureAtStep: simulateFailure ? 2 : undefined
    });
  };

  const handleRetry = () => {
    retryWorkflow(currentWorkflow.id);
  };

  const handleCancel = () => {
    cancelExecution();
  };

  // Toggle checklist item in results
  const handleToggleChecklist = (itemId: string) => {
    if (!currentWorkflow.result?.checklist) return;
    const updatedChecklist = currentWorkflow.result.checklist.map(item => 
      item.id === itemId ? { ...item, done: !item.done } : item
    );
    const updated = {
      ...currentWorkflow,
      result: {
        ...currentWorkflow.result,
        checklist: updatedChecklist
      }
    };
    updateWorkflow(updated);
  };

  // Copy result to clipboard
  const handleCopyResult = () => {
    if (!currentWorkflow.result) return;
    const checklistText = currentWorkflow.result.checklist 
      ? currentWorkflow.result.checklist.map(c => `[${c.done ? 'x' : ' '}] ${c.text} (${c.category || 'General'})`).join('\n')
      : '';
    const fullText = `${currentWorkflow.result.summary}\n\nTasks:\n${checklistText}\n\n${currentWorkflow.result.markdownReport}`;

    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(fullText).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }).catch(() => {
        fallbackCopyTextToClipboard(fullText);
      });
    } else {
      fallbackCopyTextToClipboard(fullText);
    }
  };

  const fallbackCopyTextToClipboard = (text: string) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Fallback copy failed', err);
    }
    document.body.removeChild(textArea);
  };

  // Calculations for progress
  const completedStepsCount = currentWorkflow.steps.filter(s => s.status === 'completed').length;
  const progressPercent = Math.round((completedStepsCount / currentWorkflow.steps.length) * 100);

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Top Navigation & Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200/80 dark:border-zinc-800/80">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/app')}
            className="p-1.5 rounded-lg text-ink-muted hover:text-ink-primary hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            title="Return to Workspace"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-ink-primary dark:text-zinc-100 tracking-tight">
                {currentWorkflow.title}
              </h1>
              <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full ${
                currentWorkflow.status === 'completed'
                  ? 'bg-teal-50 text-teal-700 dark:bg-teal-950/60 dark:text-teal-300 border border-teal-200/60'
                  : currentWorkflow.status === 'running'
                  ? 'bg-brand-50 text-brand-700 dark:bg-brand-950/60 dark:text-brand-300 border border-brand-200/60 animate-pulse'
                  : currentWorkflow.status === 'failed'
                  ? 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border border-rose-200/60'
                  : 'bg-zinc-100 text-ink-secondary dark:bg-zinc-800 dark:text-zinc-300'
              }`}>
                {currentWorkflow.status}
              </span>
            </div>
            <p className="text-xs text-ink-muted dark:text-zinc-400 mt-0.5">
              Simulated deterministic execution graph · ID: {currentWorkflow.id}
            </p>
          </div>
        </div>

        {/* Action Buttons Toolbar */}
        <div className="flex items-center gap-2.5">
          {/* Hackathon Judge Testing Toggle: Simulated Failure */}
          <label className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-zinc-100/80 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700/80 cursor-pointer text-xs text-ink-secondary dark:text-zinc-300" title="Simulates a tool failure on step 2 to demonstrate error recovery & retry">
            <input
              type="checkbox"
              checked={simulateFailure}
              onChange={(e) => setSimulateFailure(e.target.checked)}
              className="rounded text-rose-600 focus:ring-rose-500 w-3.5 h-3.5"
            />
            <span className="flex items-center gap-1 text-[11px] font-medium">
              <Flame className="w-3 h-3 text-rose-500" />
              Simulate Failure Test
            </span>
          </label>

          {isExecuting ? (
            <button
              onClick={handleCancel}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-semibold shadow-subtle transition-colors"
            >
              <XSquare className="w-3.5 h-3.5" />
              <span>Cancel Run</span>
            </button>
          ) : currentWorkflow.status === 'failed' ? (
            <button
              onClick={handleRetry}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-semibold shadow-subtle transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retry Workflow</span>
            </button>
          ) : currentWorkflow.status === 'completed' ? (
            <button
              onClick={handleRun}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-zinc-800 hover:bg-zinc-900 text-white dark:bg-zinc-700 dark:hover:bg-zinc-600 rounded-lg text-xs font-semibold shadow-subtle transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Run Again</span>
            </button>
          ) : (
            <button
              onClick={handleRun}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-semibold shadow-subtle transition-all duration-150 active:scale-[0.98]"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Run Workflow</span>
            </button>
          )}
        </div>
      </div>

      {/* Step A: Natural Language Request Banner */}
      <div className="bg-white dark:bg-canvas-dark-subtle border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 shadow-subtle">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-ink-muted dark:text-zinc-400 block mb-1">
              Step A: User Intent Request
            </span>
            {isEditingRequest ? (
              <div className="space-y-2 mt-1">
                <textarea
                  value={requestText}
                  onChange={(e) => setRequestText(e.target.value)}
                  className="w-full p-2.5 text-xs bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-lg text-ink-primary dark:text-zinc-100 font-sans focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                  rows={2}
                />
                <div className="flex gap-2 justify-end">
                  <button
                    onClick={() => setIsEditingRequest(false)}
                    className="px-2.5 py-1 text-xs text-ink-muted hover:text-ink-primary"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleRegenerate}
                    className="px-3 py-1 bg-brand-600 text-white text-xs font-medium rounded-lg hover:bg-brand-700"
                  >
                    Regenerate Plan
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-sm font-medium text-ink-primary dark:text-zinc-200 italic">
                "{currentWorkflow.request}"
              </p>
            )}
          </div>
          {!isEditingRequest && !isExecuting && (
            <button
              onClick={() => setIsEditingRequest(true)}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/50 rounded-lg border border-brand-200/50"
            >
              <Edit3 className="w-3 h-3" />
              <span>Modify</span>
            </button>
          )}
        </div>
      </div>

      {/* Execution Progress Bar (When running or completed) */}
      {(isExecuting || currentWorkflow.status === 'completed' || currentWorkflow.status === 'failed') && (
        <div className="bg-white dark:bg-canvas-dark-subtle border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 shadow-subtle space-y-2">
          <div className="flex items-center justify-between text-xs font-medium">
            <span className="text-ink-secondary dark:text-zinc-300 flex items-center gap-2">
              {isExecuting && <Sparkles className="w-3.5 h-3.5 text-brand-500 animate-spin" />}
              {isExecuting 
                ? `Executing step ${activeStepIndex + 1} of ${currentWorkflow.steps.length}...` 
                : currentWorkflow.status === 'completed' 
                ? 'Execution finished successfully' 
                : 'Execution halted with error'}
            </span>
            <span className="font-mono text-ink-muted dark:text-zinc-400">
              {progressPercent}%
            </span>
          </div>
          <div className="w-full h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-300 ${
                currentWorkflow.status === 'failed' 
                  ? 'bg-rose-500' 
                  : currentWorkflow.status === 'completed' 
                  ? 'bg-teal-500' 
                  : 'bg-brand-600'
              }`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      )}

      {/* Main Grid: Steps & Results */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 Columns: Step B Plan & Steps */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('plan')}
                className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors ${
                  activeTab === 'plan'
                    ? 'bg-brand-50 text-brand-700 dark:bg-brand-950/60 dark:text-brand-300 border border-brand-200/60'
                    : 'text-ink-muted hover:text-ink-primary'
                }`}
              >
                Proposed Execution Steps ({currentWorkflow.steps.length})
              </button>
              <button
                onClick={() => setActiveTab('logs')}
                className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors ${
                  activeTab === 'logs'
                    ? 'bg-brand-50 text-brand-700 dark:bg-brand-950/60 dark:text-brand-300 border border-brand-200/60'
                    : 'text-ink-muted hover:text-ink-primary'
                }`}
              >
                Runtime Telemetry Logs
              </button>
            </div>

            {!isExecuting && activeTab === 'plan' && (
              <button
                onClick={() => setShowAddStep(prev => !prev)}
                className="inline-flex items-center gap-1 text-xs text-brand-600 hover:text-brand-700 dark:text-brand-400 font-medium"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Step</span>
              </button>
            )}
          </div>

          {showAddStep && (
            <div className="p-3.5 bg-zinc-50 dark:bg-zinc-850 border border-zinc-200 dark:border-zinc-800 rounded-xl space-y-2">
              <span className="text-xs font-medium text-ink-primary dark:text-zinc-200">New Step Title</span>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newStepTitle}
                  onChange={(e) => setNewStepTitle(e.target.value)}
                  placeholder="e.g. Validate security permissions with audit tool..."
                  className="flex-1 px-3 py-1.5 text-xs bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-lg text-ink-primary dark:text-zinc-100"
                />
                <button
                  onClick={handleAddStep}
                  className="px-3 py-1.5 bg-brand-600 hover:bg-brand-700 text-white rounded-lg text-xs font-medium"
                >
                  Insert
                </button>
                <button
                  onClick={() => setShowAddStep(false)}
                  className="px-2 py-1.5 text-xs text-ink-muted hover:text-ink-primary"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {activeTab === 'plan' ? (
            <div className="space-y-3">
              {currentWorkflow.steps.map((step, idx) => {
                const IconComp = TOOL_ICONS[step.toolId] || Layers;
                const isCurrent = isExecuting && activeStepIndex === idx;

                return (
                  <div
                    key={step.id}
                    className={`p-4 rounded-xl border transition-all duration-200 ${
                      isCurrent
                        ? 'bg-brand-50/40 dark:bg-brand-950/20 border-brand-300 dark:border-brand-700 shadow-subtle ring-1 ring-brand-500/20'
                        : step.status === 'completed'
                        ? 'bg-white dark:bg-canvas-dark-subtle border-teal-200/60 dark:border-teal-900/40'
                        : step.status === 'failed'
                        ? 'bg-rose-50/50 dark:bg-rose-950/20 border-rose-300 dark:border-rose-900/60'
                        : 'bg-white dark:bg-canvas-dark-subtle border-zinc-200/80 dark:border-zinc-800'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        {/* Step indicator */}
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs font-semibold ${
                          step.status === 'completed'
                            ? 'bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300'
                            : step.status === 'failed'
                            ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                            : isCurrent
                            ? 'bg-brand-600 text-white animate-pulse'
                            : 'bg-zinc-100 text-ink-muted dark:bg-zinc-800 dark:text-zinc-400'
                        }`}>
                          {step.status === 'completed' ? (
                            <CheckCircle2 className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                          ) : step.status === 'failed' ? (
                            <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                          ) : (
                            step.stepNumber
                          )}
                        </div>

                        {/* Title & Description */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className="text-xs font-semibold text-ink-primary dark:text-zinc-100">
                              {step.title}
                            </h4>
                          </div>
                          <p className="text-[11px] text-ink-secondary dark:text-zinc-400 mt-0.5 leading-relaxed">
                            {step.description}
                          </p>

                          {/* Tool badge and estimated duration */}
                          <div className="flex flex-wrap items-center gap-2 mt-2">
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium bg-zinc-100 dark:bg-zinc-800 text-ink-secondary dark:text-zinc-300 border border-zinc-200/60 dark:border-zinc-700/60">
                              <IconComp className="w-3 h-3 text-brand-600 dark:text-brand-400" />
                              <span>{step.toolName}</span>
                            </span>
                            <span className="inline-flex items-center gap-1 text-[10px] text-ink-muted dark:text-zinc-400">
                              <Clock className="w-2.5 h-2.5" />
                              <span>est. {step.estimatedDuration}</span>
                            </span>
                          </div>

                          {/* Failure reason if failed */}
                          {step.failedReason && (
                            <div className="mt-2.5 p-2 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-[11px] text-rose-700 dark:text-rose-300 flex items-start gap-1.5">
                              <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                              <div className="flex-1">
                                <span className="font-semibold">Execution Failure: </span>
                                <span>{step.failedReason}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Controls (only when not executing) */}
                      {!isExecuting && (
                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            onClick={() => {
                              const newTitle = prompt('Edit step title:', step.title);
                              if (newTitle && newTitle.trim()) {
                                handleUpdateStepTitle(idx, newTitle.trim());
                              }
                            }}
                            className="p-1 rounded text-ink-muted hover:text-ink-primary hover:bg-zinc-100 dark:hover:bg-zinc-800"
                            title="Edit step title"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          {currentWorkflow.steps.length > 1 && (
                            <button
                              onClick={() => handleRemoveStep(idx)}
                              className="p-1 rounded text-ink-muted hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30"
                              title="Remove step"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Active streaming log teaser */}
                    {isCurrent && (
                      <div className="mt-3 pt-2.5 border-t border-brand-200/60 dark:border-brand-900/40">
                        <div className="flex items-center gap-2 text-[11px] font-mono text-brand-700 dark:text-brand-300">
                          <span className="w-2 h-2 rounded-full bg-brand-500 animate-ping" />
                          <span>Streaming simulated container output...</span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            /* Live Terminal Logs Tab */
            <div className="bg-zinc-950 text-zinc-300 p-4 rounded-xl border border-zinc-800 font-mono text-xs max-h-96 overflow-y-auto space-y-2">
              <div className="text-[11px] text-zinc-500 pb-2 border-b border-zinc-800 flex items-center justify-between">
                <span>TaskWeave Local Execution Terminal · stdio stream</span>
                <span>status: {currentWorkflow.status}</span>
              </div>
              {currentWorkflow.steps.flatMap(s => s.executionLogs || []).length === 0 ? (
                <p className="text-zinc-600 italic">No output generated yet. Click "Run Workflow" to stream execution logs.</p>
              ) : (
                currentWorkflow.steps.map((s) => (
                  <div key={s.id} className="space-y-1">
                    <div className="text-brand-400 font-semibold text-[11px]">
                      &gt; Step {s.stepNumber}: {s.title} [{s.status}]
                    </div>
                    {(s.executionLogs || []).map((log, lidx) => (
                      <div key={lidx} className="pl-4 text-zinc-400 text-[11px]">
                        {log}
                      </div>
                    ))}
                  </div>
                ))
              )}
            </div>
          )}

          {/* Step C: Tool Selection Bar */}
          <div className="bg-zinc-50 dark:bg-canvas-dark-subtle border border-zinc-200/80 dark:border-zinc-800 rounded-xl p-4">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-ink-muted dark:text-zinc-400 block mb-2">
              Step C: Coordinated Tools in this Plan
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {currentWorkflow.toolsUsed.map((tName, i) => (
                <div key={i} className="p-2.5 rounded-lg bg-white dark:bg-zinc-850 border border-zinc-200/70 dark:border-zinc-800 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-teal-500" />
                  <span className="text-[11px] font-medium text-ink-primary dark:text-zinc-200 truncate">{tName}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 5 Columns: Step E Execution Results */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white dark:bg-canvas-dark-subtle border border-zinc-200/90 dark:border-zinc-800 rounded-xl p-5 shadow-subtle min-h-[480px] flex flex-col justify-between">
            <div>
              {/* Results Header */}
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-zinc-150 dark:border-zinc-800">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                  <h3 className="text-sm font-bold text-ink-primary dark:text-zinc-100">
                    Execution Outcome
                  </h3>
                </div>

                {currentWorkflow.result && (
                  <button
                    onClick={handleCopyResult}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-ink-secondary dark:text-zinc-300 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 rounded-lg transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-teal-600" />
                        <span className="text-teal-600 font-semibold">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Result</span>
                      </>
                    )}
                  </button>
                )}
              </div>

              {/* Result Body */}
              {currentWorkflow.result ? (
                <div className="space-y-4">
                  {/* Summary */}
                  <div className="p-3.5 rounded-lg bg-teal-50/60 dark:bg-teal-950/30 border border-teal-200/60 dark:border-teal-900/40 text-xs text-ink-secondary dark:text-zinc-300 leading-relaxed">
                    <p className="font-semibold text-teal-900 dark:text-teal-300 mb-1">
                      Summary
                    </p>
                    {currentWorkflow.result.summary}
                  </div>

                  {/* Generated Checklist */}
                  {currentWorkflow.result.checklist && currentWorkflow.result.checklist.length > 0 && (
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-ink-muted dark:text-zinc-400">
                          Structured Action Checklist
                        </h4>
                        <span className="text-[10px] text-ink-muted dark:text-zinc-400">
                          {currentWorkflow.result.checklist.filter(c => c.done).length} / {currentWorkflow.result.checklist.length} done
                        </span>
                      </div>
                      <div className="space-y-1.5">
                        {currentWorkflow.result.checklist.map((item) => (
                          <div
                            key={item.id}
                            onClick={() => handleToggleChecklist(item.id)}
                            className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-850/60 cursor-pointer border border-transparent hover:border-zinc-200/60 transition-colors"
                          >
                            <input
                              type="checkbox"
                              checked={item.done}
                              onChange={() => {}}
                              className="mt-0.5 rounded text-brand-600 focus:ring-brand-500 w-3.5 h-3.5 cursor-pointer"
                            />
                            <div className="flex-1 min-w-0">
                              <p className={`text-xs ${item.done ? 'line-through text-ink-muted dark:text-zinc-500' : 'text-ink-primary dark:text-zinc-200'}`}>
                                {item.text}
                              </p>
                              {item.category && (
                                <span className="text-[10px] text-ink-muted dark:text-zinc-400 block mt-0.5">
                                  {item.category}
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Markdown Report Excerpt */}
                  {currentWorkflow.result.markdownReport && (
                    <div className="pt-2 border-t border-zinc-150 dark:border-zinc-800">
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-ink-muted dark:text-zinc-400 mb-2">
                        Generated Synthesis Notes
                      </h4>
                      <div className="p-3 bg-zinc-50 dark:bg-zinc-900 rounded-lg text-xs text-ink-secondary dark:text-zinc-300 font-mono whitespace-pre-wrap leading-relaxed max-h-40 overflow-y-auto border border-zinc-200/50 dark:border-zinc-800">
                        {currentWorkflow.result.markdownReport}
                      </div>
                    </div>
                  )}

                  {/* Duration stats */}
                  <div className="flex items-center justify-between text-[11px] text-ink-muted dark:text-zinc-400 pt-2 border-t border-zinc-150 dark:border-zinc-800">
                    <span>Execution duration: {currentWorkflow.result.executionTimeSeconds}s</span>
                    <span>Tools invoked: {currentWorkflow.result.toolsUsed.length}</span>
                  </div>
                </div>
              ) : currentWorkflow.status === 'failed' ? (
                /* Failed State View */
                <div className="p-6 rounded-xl bg-rose-50/60 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/60 text-center space-y-3">
                  <div className="w-10 h-10 rounded-full bg-rose-100 dark:bg-rose-900/60 text-rose-600 mx-auto flex items-center justify-center">
                    <ShieldAlert className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-semibold text-rose-900 dark:text-rose-200">
                    Workflow Halted Due to Error
                  </h4>
                  <p className="text-xs text-rose-700 dark:text-rose-300 max-w-sm mx-auto leading-relaxed">
                    Step {currentWorkflow.currentStepIndex !== undefined ? currentWorkflow.currentStepIndex + 1 : 2} encountered a simulated error condition. Completed steps remain saved.
                  </p>
                  <div className="flex gap-2 justify-center pt-2">
                    <button
                      onClick={handleRetry}
                      className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-semibold transition-colors"
                    >
                      Retry Workflow
                    </button>
                    <button
                      onClick={() => navigate('/app')}
                      className="px-3 py-2 bg-zinc-200 dark:bg-zinc-800 text-ink-secondary dark:text-zinc-300 rounded-lg text-xs font-medium"
                    >
                      Return to Dashboard
                    </button>
                  </div>
                </div>
              ) : (
                /* Pending / Ready State View */
                <div className="h-64 flex flex-col items-center justify-center text-center p-6 text-ink-muted dark:text-zinc-500">
                  <Layers className="w-10 h-10 stroke-1 mb-3 text-zinc-300 dark:text-zinc-700" />
                  <p className="text-xs font-medium text-ink-secondary dark:text-zinc-400 mb-1">
                    Ready to execute plan
                  </p>
                  <p className="text-[11px] max-w-xs leading-relaxed">
                    Click "Run Workflow" above to trigger simulated execution, stream step progress, and generate the final checklist and markdown report.
                  </p>
                </div>
              )}
            </div>

            {/* Bottom Back Button */}
            <div className="pt-4 mt-4 border-t border-zinc-150 dark:border-zinc-800 flex justify-between items-center">
              <button
                onClick={() => navigate('/app')}
                className="text-xs text-ink-muted hover:text-ink-primary dark:hover:text-zinc-200 flex items-center gap-1 font-medium transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Workspace</span>
              </button>

              <span className="text-[11px] text-ink-muted dark:text-zinc-500 font-mono">
                TaskWeave v0.9-alpha
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
