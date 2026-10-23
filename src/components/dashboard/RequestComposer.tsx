import React, { useState } from 'react';
import { ArrowRight, Sparkles, CornerDownLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useWorkflow } from '../../context/WorkflowContext';

interface RequestComposerProps {
  onPlanCreated?: (workflowId: string) => void;
  initialPrompt?: string;
}

export const RequestComposer: React.FC<RequestComposerProps> = ({ onPlanCreated, initialPrompt = '' }) => {
  const [requestText, setRequestText] = useState(initialPrompt);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const { createWorkflow } = useWorkflow();

  const SUGGESTIONS = [
    { label: 'Weekly Plan & Checklist', prompt: 'Help me organize my week and prepare a project checklist.' },
    { label: 'Document Synthesis', prompt: 'Summarize a research paper on multimodal agent workflows.' },
    { label: 'Launch Readiness', prompt: 'Prepare a launch checklist and risk assessment for v1.0 release.' },
    { label: 'Study Session', prompt: 'Organize a focused study session for machine learning systems.' },
  ];

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = requestText.trim();
    if (!trimmed) {
      setErrorMessage('Please describe a goal or task before generating a workflow.');
      return;
    }
    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      const newWf = createWorkflow(trimmed);
      if (onPlanCreated) {
        onPlanCreated(newWf.id);
      } else {
        navigate(`/app/new?id=${newWf.id}`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="bg-white dark:bg-canvas-dark-subtle border border-zinc-200/90 dark:border-zinc-800 rounded-2xl p-5 sm:p-6 shadow-subtle transition-all">
      <div className="flex items-center justify-between mb-3">
        <label htmlFor="task-request-input" className="text-xs font-semibold uppercase tracking-wider text-ink-muted dark:text-zinc-400 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
          <span>Natural Language Goal Dispatcher</span>
        </label>
        <span className="text-[11px] text-ink-muted dark:text-zinc-400">
          {requestText.length} / 500 chars
        </span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <textarea
            id="task-request-input"
            value={requestText}
            onChange={(e) => {
              setRequestText(e.target.value.slice(0, 500));
              if (errorMessage) setErrorMessage(null);
            }}
            onKeyDown={handleKeyDown}
            rows={3}
            placeholder="Describe what you want to accomplish... (e.g. Help me organize my week and prepare a project checklist)"
            className="w-full px-4 py-3 text-sm bg-zinc-50/70 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-600 dark:focus:border-brand-500 text-ink-primary dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 resize-none font-sans transition-colors"
          />
        </div>

        {errorMessage && (
          <p className="text-xs text-rose-600 dark:text-rose-400 font-medium">
            {errorMessage}
          </p>
        )}

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
          {/* Preset Suggestions Pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] text-ink-muted dark:text-zinc-400 mr-1 hidden md:inline">Try:</span>
            {SUGGESTIONS.map((s, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setRequestText(s.prompt);
                  if (errorMessage) setErrorMessage(null);
                }}
                className="text-[11px] px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-ink-secondary dark:text-zinc-300 transition-colors border border-zinc-200/50 dark:border-zinc-700/50"
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Action button */}
          <div className="flex items-center gap-3 self-end sm:self-auto">
            <span className="text-[11px] text-ink-muted dark:text-zinc-400 hidden sm:flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 font-mono text-[10px]">Ctrl</kbd>
              <span>+</span>
              <kbd className="px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 font-mono text-[10px]">
                <CornerDownLeft className="w-2.5 h-2.5 inline" />
              </kbd>
            </span>

            <button
              type="submit"
              disabled={isSubmitting || !requestText.trim()}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-600 hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl text-xs font-semibold shadow-subtle transition-all duration-150 active:scale-[0.98]"
            >
              <span>Generate Workflow Plan</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
