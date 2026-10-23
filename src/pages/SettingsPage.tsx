import React, { useState } from 'react';
import { 
  Settings, 
  Moon, 
  Sun, 
  Monitor, 
  RotateCcw, 
  Zap, 
  ShieldCheck, 
  Check, 
  Sparkles,
  Info
} from 'lucide-react';
import { useWorkflow } from '../context/WorkflowContext';
import { Modal } from '../components/common/Modal';

export const SettingsPage: React.FC = () => {
  const { preferences, updatePreferences, resetToDefaults } = useWorkflow();
  const [showResetModal, setShowResetModal] = useState(false);
  const [savedNotice, setSavedNotice] = useState(false);

  const handleUpdate = (updates: Parameters<typeof updatePreferences>[0]) => {
    updatePreferences(updates);
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 1500);
  };

  const handleResetConfirm = () => {
    resetToDefaults();
    setShowResetModal(false);
  };

  return (
    <div className="space-y-8 max-w-3xl animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-zinc-200/80 dark:border-zinc-800/80">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-ink-primary dark:text-zinc-100">
            Workspace Preferences
          </h1>
          <p className="text-xs sm:text-sm text-ink-muted dark:text-zinc-400 mt-1">
            Configure visual presentation, mock execution latency, and local storage retention.
          </p>
        </div>

        {savedNotice && (
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-300 border border-teal-200/60 text-xs font-medium animate-in fade-in">
            <Check className="w-3.5 h-3.5" />
            <span>Preferences saved</span>
          </div>
        )}
      </div>

      {/* Appearance Section */}
      <section className="bg-white dark:bg-canvas-dark-subtle border border-zinc-200/80 dark:border-zinc-800 rounded-xl p-5 shadow-subtle space-y-4">
        <div>
          <h2 className="text-sm font-semibold text-ink-primary dark:text-zinc-100">
            Interface Theme & Appearance
          </h2>
          <p className="text-xs text-ink-muted dark:text-zinc-400 mt-0.5">
            Select your preferred display theme for the TaskWeave workspace.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {[
            { id: 'light', label: 'Light Mode', icon: Sun },
            { id: 'dark', label: 'Dark Mode', icon: Moon },
            { id: 'system', label: 'System Theme', icon: Monitor },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => handleUpdate({ theme: item.id as any })}
              className={`p-3 rounded-lg border text-xs font-medium flex flex-col items-center gap-2 transition-all ${
                preferences.theme === item.id
                  ? 'border-brand-600 bg-brand-50/50 text-brand-700 dark:border-brand-500 dark:bg-brand-950/40 dark:text-brand-300 ring-1 ring-brand-500/20'
                  : 'border-zinc-200 dark:border-zinc-800 text-ink-secondary dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-850'
              }`}
            >
              <item.icon className="w-4 h-4" />
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Execution Latency & Motion Section */}
      <section className="bg-white dark:bg-canvas-dark-subtle border border-zinc-200/80 dark:border-zinc-800 rounded-xl p-5 shadow-subtle space-y-5">
        <div>
          <h2 className="text-sm font-semibold text-ink-primary dark:text-zinc-100">
            Simulation Engine Parameters
          </h2>
          <p className="text-xs text-ink-muted dark:text-zinc-400 mt-0.5">
            Control the timing delays between steps during mock execution for presentation purposes.
          </p>
        </div>

        {/* Speed setting */}
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-ink-muted dark:text-zinc-400 block mb-2">
            Execution Step Latency
          </label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: 'fast', label: 'Fast (0.6s / step)', desc: 'Optimized for quick judge demos' },
              { id: 'normal', label: 'Balanced (1.1s / step)', desc: 'Realistic interactive feel' },
              { id: 'thorough', label: 'Deliberate (1.8s / step)', desc: 'Extended log examination' },
            ].map((s) => (
              <button
                key={s.id}
                onClick={() => handleUpdate({ stepSpeed: s.id as any })}
                className={`p-3 rounded-lg border text-left text-xs transition-all ${
                  preferences.stepSpeed === s.id
                    ? 'border-brand-600 bg-brand-50/50 text-brand-700 dark:border-brand-500 dark:bg-brand-950/40 dark:text-brand-300'
                    : 'border-zinc-200 dark:border-zinc-800 text-ink-secondary dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-850'
                }`}
              >
                <div className="font-semibold">{s.label}</div>
                <div className="text-[10px] text-ink-muted dark:text-zinc-400 mt-0.5">{s.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Reduced motion toggle */}
        <div className="pt-4 border-t border-zinc-150 dark:border-zinc-850 flex items-center justify-between">
          <div>
            <h3 className="text-xs font-medium text-ink-primary dark:text-zinc-200">
              Respect Reduced Motion
            </h3>
            <p className="text-[11px] text-ink-muted dark:text-zinc-400">
              Minimizes UI transitions and progress animations.
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={preferences.reducedMotion}
              onChange={(e) => handleUpdate({ reducedMotion: e.target.checked })}
              className="sr-only peer"
            />
            <div className="w-9 h-5 bg-zinc-200 peer-focus:outline-none rounded-full peer dark:bg-zinc-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-zinc-600 peer-checked:bg-brand-600"></div>
          </label>
        </div>
      </section>

      {/* Local Storage & Reset Section */}
      <section className="bg-white dark:bg-canvas-dark-subtle border border-zinc-200/80 dark:border-zinc-800 rounded-xl p-5 shadow-subtle space-y-4">
        <div>
          <h2 className="text-sm font-semibold text-ink-primary dark:text-zinc-100">
            Demo Data & Storage Management
          </h2>
          <p className="text-xs text-ink-muted dark:text-zinc-400 mt-0.5">
            Reset all local browser storage keys to reseed the application with fresh demo states.
          </p>
        </div>

        <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-850/60 border border-zinc-200/60 dark:border-zinc-800 text-xs text-ink-secondary dark:text-zinc-300 flex items-start gap-2.5">
          <Info className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
          <p className="text-[11px] leading-relaxed">
            All workflows, custom edits, and activity logs are stored locally in your browser's localStorage. No external database or backend server holds private data.
          </p>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={() => setShowResetModal(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:hover:bg-rose-900/60 dark:text-rose-300 border border-rose-200/80 dark:border-rose-900/60 rounded-lg text-xs font-medium transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo Data to Defaults</span>
          </button>
        </div>
      </section>

      {/* Reset Confirmation Modal */}
      <Modal
        isOpen={showResetModal}
        onClose={() => setShowResetModal(false)}
        title="Reset All Demo Data"
        maxWidth="max-w-md"
      >
        <div className="space-y-4">
          <p className="text-xs text-ink-secondary dark:text-zinc-300 leading-relaxed">
            This will clear your local storage and restore TaskWeave to its initial clean state with the default seed workflows and activity logs. Are you sure you wish to continue?
          </p>

          <div className="flex justify-end gap-2 pt-2 border-t border-zinc-150 dark:border-zinc-800">
            <button
              onClick={() => setShowResetModal(false)}
              className="px-3 py-1.5 text-xs text-ink-secondary dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 rounded-lg font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleResetConfirm}
              className="px-3 py-1.5 text-xs text-white bg-rose-600 hover:bg-rose-700 rounded-lg font-medium"
            >
              Yes, Reset Everything
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
