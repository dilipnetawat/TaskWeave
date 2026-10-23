import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  Layers, 
  Clock, 
  Activity, 
  GitFork, 
  Calendar, 
  PlusCircle, 
  ChevronRight,
  TrendingUp,
  Cpu
} from 'lucide-react';
import { useWorkflow } from '../context/WorkflowContext';
import { RequestComposer } from '../components/dashboard/RequestComposer';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { workflows, activityEvents, setActiveWorkflow } = useWorkflow();

  // Dynamic time-based greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  // Derive counts from actual state
  const totalWorkflows = workflows.length;
  const completedWorkflows = workflows.filter(w => w.status === 'completed').length;
  const attentionWorkflows = workflows.filter(w => w.status === 'failed' || w.status === 'cancelled').length;
  const runningWorkflows = workflows.filter(w => w.status === 'running').length;

  const recentWorkflows = workflows.slice(0, 4);
  const recentEvents = activityEvents.slice(0, 5);

  const QUICK_STARTERS = [
    {
      title: 'Weekly Task Alignment',
      prompt: 'Help me organize my week and prepare a project checklist.',
      category: 'Productivity',
      icon: Calendar,
      steps: 4,
      desc: 'Decomposes weekly deliverables and sets focused calendar blocks.'
    },
    {
      title: 'Document Synthesis',
      prompt: 'Summarize a research paper on multimodal agent workflows.',
      category: 'Analysis',
      icon: Layers,
      steps: 3,
      desc: 'Extracts core insights, hypotheses, and architectural principles.'
    },
    {
      title: 'Launch Readiness Checklist',
      prompt: 'Prepare a launch checklist and risk assessment for v1.0 release.',
      category: 'Engineering',
      icon: Cpu,
      steps: 4,
      desc: 'Audits dependencies, configurations, and rollback procedures.'
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Dashboard Greeting Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
            Workspace Overview
          </span>
          <span className="text-zinc-300 dark:text-zinc-700">·</span>
          <span className="text-xs text-ink-muted dark:text-zinc-400">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink-primary dark:text-zinc-100">
          {getGreeting()}
        </h1>
        <p className="text-sm text-ink-muted dark:text-zinc-400 mt-1">
          What would you like to get done today? Describe a high-level goal and TaskWeave coordinates the tools.
        </p>
      </div>

      {/* Main Natural Language Request Composer */}
      <section aria-labelledby="request-composer-heading">
        <h2 id="request-composer-heading" className="sr-only">Request Composer</h2>
        <RequestComposer 
          onPlanCreated={(wfId) => navigate(`/app/new?id=${wfId}`)}
        />
      </section>

      {/* Metric Summary Cards derived from application state */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4" aria-label="Workflow Metrics">
        <div className="bg-white dark:bg-canvas-dark-subtle border border-zinc-200/80 dark:border-zinc-800 rounded-xl p-4 shadow-subtle">
          <div className="flex items-center justify-between text-ink-muted dark:text-zinc-400 mb-2">
            <span className="text-xs font-medium">Total Workflows</span>
            <GitFork className="w-4 h-4 text-ink-muted" />
          </div>
          <div className="text-2xl font-bold text-ink-primary dark:text-zinc-100 font-mono">
            {totalWorkflows}
          </div>
          <p className="text-[11px] text-ink-muted dark:text-zinc-400 mt-1">
            Persisted in workspace
          </p>
        </div>

        <div className="bg-white dark:bg-canvas-dark-subtle border border-zinc-200/80 dark:border-zinc-800 rounded-xl p-4 shadow-subtle">
          <div className="flex items-center justify-between text-teal-700 dark:text-teal-400 mb-2">
            <span className="text-xs font-medium">Completed</span>
            <CheckCircle2 className="w-4 h-4 text-teal-600 dark:text-teal-400" />
          </div>
          <div className="text-2xl font-bold text-teal-700 dark:text-teal-300 font-mono">
            {completedWorkflows}
          </div>
          <p className="text-[11px] text-ink-muted dark:text-zinc-400 mt-1">
            {totalWorkflows > 0 ? `${Math.round((completedWorkflows / totalWorkflows) * 100)}% completion rate` : '0%'}
          </p>
        </div>

        <div className="bg-white dark:bg-canvas-dark-subtle border border-zinc-200/80 dark:border-zinc-800 rounded-xl p-4 shadow-subtle">
          <div className="flex items-center justify-between text-amber-700 dark:text-amber-400 mb-2">
            <span className="text-xs font-medium">Requires Attention</span>
            <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-amber-700 dark:text-amber-300 font-mono">
            {attentionWorkflows}
          </div>
          <p className="text-[11px] text-ink-muted dark:text-zinc-400 mt-1">
            Failed or cancelled runs
          </p>
        </div>

        <div className="bg-white dark:bg-canvas-dark-subtle border border-zinc-200/80 dark:border-zinc-800 rounded-xl p-4 shadow-subtle">
          <div className="flex items-center justify-between text-brand-700 dark:text-brand-400 mb-2">
            <span className="text-xs font-medium">Active Execution</span>
            <TrendingUp className="w-4 h-4 text-brand-600 dark:text-brand-400" />
          </div>
          <div className="text-2xl font-bold text-brand-700 dark:text-brand-300 font-mono">
            {runningWorkflows}
          </div>
          <p className="text-[11px] text-ink-muted dark:text-zinc-400 mt-1">
            Running tasks
          </p>
        </div>
      </section>

      {/* Suggested Quick Starters */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-ink-primary dark:text-zinc-100 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-brand-500" />
            <span>Recommended Workflows</span>
          </h2>
          <span className="text-xs text-ink-muted dark:text-zinc-400">Click to load pre-configured execution plan</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {QUICK_STARTERS.map((item, idx) => (
            <div
              key={idx}
              onClick={() => {
                navigate(`/app/new?prompt=${encodeURIComponent(item.prompt)}`);
              }}
              className="group p-4 bg-white dark:bg-canvas-dark-subtle border border-zinc-200/80 dark:border-zinc-800 hover:border-brand-300 dark:hover:border-brand-700 rounded-xl cursor-pointer shadow-subtle transition-all duration-200 hover:-translate-y-0.5"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-8 h-8 rounded-lg bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 flex items-center justify-center border border-brand-200/50 dark:border-brand-800/40">
                  <item.icon className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-ink-muted dark:text-zinc-400">
                  {item.steps} steps
                </span>
              </div>
              <h3 className="text-xs font-semibold text-ink-primary dark:text-zinc-100 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                {item.title}
              </h3>
              <p className="text-[11px] text-ink-muted dark:text-zinc-400 mt-1 leading-relaxed">
                {item.desc}
              </p>
              <div className="mt-3 pt-2.5 border-t border-zinc-150 dark:border-zinc-850 flex items-center justify-between text-[11px] font-medium text-brand-600 dark:text-brand-400">
                <span>Start Workflow</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Split section: Recent Workflows & Telemetry Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 cols: Recent Workflows */}
        <section className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-ink-primary dark:text-zinc-100 flex items-center gap-1.5">
              <GitFork className="w-4 h-4 text-ink-muted" />
              <span>Recent Workflows</span>
            </h2>
            <button
              onClick={() => navigate('/app/workflows')}
              className="text-xs font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400 flex items-center gap-1"
            >
              <span>View all ({totalWorkflows})</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          {recentWorkflows.length === 0 ? (
            <div className="p-8 text-center bg-white dark:bg-canvas-dark-subtle border border-zinc-200/80 dark:border-zinc-800 rounded-xl">
              <Layers className="w-8 h-8 text-zinc-300 dark:text-zinc-700 mx-auto mb-2" />
              <p className="text-xs font-medium text-ink-primary dark:text-zinc-200">No workflows created yet</p>
              <p className="text-[11px] text-ink-muted dark:text-zinc-400 mt-0.5 mb-3">
                Describe a goal in the composer above to start your first workflow.
              </p>
              <button
                onClick={() => navigate('/app/new')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand-600 text-white rounded-lg text-xs font-medium"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Create Workflow</span>
              </button>
            </div>
          ) : (
            <div className="space-y-2.5">
              {recentWorkflows.map((wf) => (
                <div
                  key={wf.id}
                  onClick={() => {
                    setActiveWorkflow(wf);
                    navigate(`/app/new?id=${wf.id}`);
                  }}
                  className="p-3.5 bg-white dark:bg-canvas-dark-subtle border border-zinc-200/80 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 rounded-xl cursor-pointer shadow-subtle flex items-center justify-between gap-3 transition-colors"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-xs font-semibold text-ink-primary dark:text-zinc-100 truncate">
                        {wf.title}
                      </h3>
                      <span className={`text-[9px] font-semibold uppercase px-1.5 py-0.2 rounded-full ${
                        wf.status === 'completed'
                          ? 'bg-teal-50 text-teal-700 dark:bg-teal-950/60 dark:text-teal-300 border border-teal-200/50'
                          : wf.status === 'failed'
                          ? 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border border-rose-200/50'
                          : 'bg-zinc-100 text-ink-secondary dark:bg-zinc-800 dark:text-zinc-300'
                      }`}>
                        {wf.status}
                      </span>
                    </div>
                    <p className="text-[11px] text-ink-muted dark:text-zinc-400 truncate">
                      "{wf.request}"
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 text-[11px] text-ink-muted dark:text-zinc-400">
                    <span className="hidden sm:inline font-mono">
                      {wf.steps.length} steps
                    </span>
                    <ChevronRight className="w-4 h-4 text-zinc-400" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Right 5 cols: Telemetry Activity feed */}
        <section className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-ink-primary dark:text-zinc-100 flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-ink-muted" />
              <span>Simulated Event Stream</span>
            </h2>
            <button
              onClick={() => navigate('/app/activity')}
              className="text-xs font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400 flex items-center gap-1"
            >
              <span>Full logs</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          <div className="bg-white dark:bg-canvas-dark-subtle border border-zinc-200/80 dark:border-zinc-800 rounded-xl p-4 shadow-subtle space-y-3">
            {recentEvents.length === 0 ? (
              <p className="text-xs text-ink-muted dark:text-zinc-500 text-center py-6">
                No activity logged yet.
              </p>
            ) : (
              recentEvents.map((event) => (
                <div key={event.id} className="flex items-start gap-2.5 pb-2.5 border-b border-zinc-150 dark:border-zinc-850 last:border-0 last:pb-0">
                  <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                    event.status === 'success' ? 'bg-teal-500' :
                    event.status === 'error' ? 'bg-rose-500' :
                    event.status === 'warning' ? 'bg-amber-500' : 'bg-brand-500'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-ink-primary dark:text-zinc-200 leading-snug">
                      {event.message}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5 text-[10px] text-ink-muted dark:text-zinc-500">
                      <span className="font-mono">
                        {new Date(event.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                      </span>
                      {event.workflowTitle && (
                        <>
                          <span>·</span>
                          <span className="truncate">{event.workflowTitle}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
};
