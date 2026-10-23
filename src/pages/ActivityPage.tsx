import React, { useState, useMemo } from 'react';
import { 
  Activity, 
  Search, 
  Trash2, 
  Filter, 
  CheckCircle2, 
  AlertCircle, 
  AlertTriangle, 
  Info, 
  Clock,
  Terminal
} from 'lucide-react';
import { useWorkflow } from '../context/WorkflowContext';
import { ActivityEvent, EventCategory } from '../types';
import { Modal } from '../components/common/Modal';

export const ActivityPage: React.FC = () => {
  const { activityEvents, clearAllActivity } = useWorkflow();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showClearModal, setShowClearModal] = useState(false);

  const filteredEvents = useMemo(() => {
    return activityEvents.filter(ev => {
      const matchesSearch = 
        ev.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (ev.workflowTitle && ev.workflowTitle.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (ev.details && ev.details.toLowerCase().includes(searchQuery.toLowerCase()));

      if (!matchesSearch) return false;

      if (statusFilter === 'all') return true;
      return ev.status === statusFilter;
    });
  }, [activityEvents, searchQuery, statusFilter]);

  const handleClearConfirm = () => {
    clearAllActivity();
    setShowClearModal(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200/80 dark:border-zinc-800/80">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
              Observability
            </span>
            <span className="text-zinc-300 dark:text-zinc-700">·</span>
            <span className="text-xs text-ink-muted dark:text-zinc-400">
              Live Mock Stream
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-ink-primary dark:text-zinc-100">
            Execution Activity & Telemetry
          </h1>
          <p className="text-xs sm:text-sm text-ink-muted dark:text-zinc-400 mt-1">
            Real-time event stream capturing task creation, step transitions, and tool invocations.
          </p>
        </div>

        {activityEvents.length > 0 && (
          <button
            onClick={() => setShowClearModal(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-zinc-100 hover:bg-rose-50 text-ink-secondary hover:text-rose-600 dark:bg-zinc-800 dark:hover:bg-rose-950/40 dark:text-zinc-300 dark:hover:text-rose-300 rounded-lg text-xs font-medium transition-colors self-start sm:self-auto border border-zinc-200/60 dark:border-zinc-700/60"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Event Log</span>
          </button>
        )}
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-ink-muted dark:text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search activity events..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-white dark:bg-canvas-dark-subtle border border-zinc-200 dark:border-zinc-800 rounded-lg text-ink-primary dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
          />
        </div>

        <div className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-850 p-1 rounded-lg self-start sm:self-auto border border-zinc-200/60 dark:border-zinc-800">
          {(['all', 'info', 'success', 'warning', 'error'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setStatusFilter(filter)}
              className={`px-3 py-1 rounded-md text-xs font-medium capitalize transition-colors ${
                statusFilter === filter
                  ? 'bg-white dark:bg-zinc-800 text-ink-primary dark:text-zinc-100 shadow-xs'
                  : 'text-ink-muted hover:text-ink-primary dark:hover:text-zinc-200'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Activity Timeline List */}
      {filteredEvents.length === 0 ? (
        <div className="p-12 text-center bg-white dark:bg-canvas-dark-subtle border border-zinc-200/80 dark:border-zinc-800 rounded-xl space-y-3">
          <Activity className="w-10 h-10 text-zinc-300 dark:text-zinc-700 mx-auto" />
          <h3 className="text-sm font-semibold text-ink-primary dark:text-zinc-200">
            No activity events found
          </h3>
          <p className="text-xs text-ink-muted dark:text-zinc-400 max-w-sm mx-auto leading-relaxed">
            {searchQuery 
              ? `No events matched your search "${searchQuery}".` 
              : 'Execute a workflow from the workspace to view real-time runtime events.'}
          </p>
        </div>
      ) : (
        <div className="bg-white dark:bg-canvas-dark-subtle border border-zinc-200/80 dark:border-zinc-800 rounded-xl overflow-hidden shadow-subtle divide-y divide-zinc-150 dark:divide-zinc-800/80">
          {filteredEvents.map((event) => (
            <div key={event.id} className="p-4 hover:bg-zinc-50/60 dark:hover:bg-zinc-850/40 transition-colors flex items-start gap-3.5">
              {/* Status Indicator Icon */}
              <div className="mt-0.5 shrink-0">
                {event.status === 'success' && <CheckCircle2 className="w-4 h-4 text-teal-600 dark:text-teal-400" />}
                {event.status === 'error' && <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400" />}
                {event.status === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />}
                {event.status === 'info' && <Info className="w-4 h-4 text-brand-600 dark:text-brand-400" />}
              </div>

              {/* Event Content */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                  <p className="text-xs font-semibold text-ink-primary dark:text-zinc-100">
                    {event.message}
                  </p>
                  <span className="font-mono text-[11px] text-ink-muted dark:text-zinc-500 shrink-0">
                    {new Date(event.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                  </span>
                </div>

                {event.details && (
                  <p className="text-[11px] font-mono text-ink-muted dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-900/60 p-2 rounded border border-zinc-200/60 dark:border-zinc-800/80 mb-1.5 mt-1 leading-relaxed">
                    {event.details}
                  </p>
                )}

                <div className="flex items-center gap-2 text-[10px] text-ink-muted dark:text-zinc-500">
                  <span className="font-mono uppercase px-1.5 py-0.2 rounded bg-zinc-100 dark:bg-zinc-800">
                    {event.category.replace('_', ' ')}
                  </span>
                  {event.workflowTitle && (
                    <>
                      <span>·</span>
                      <span className="truncate max-w-xs">{event.workflowTitle}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Clear Confirmation Modal */}
      <Modal
        isOpen={showClearModal}
        onClose={() => setShowClearModal(false)}
        title="Clear Activity History"
        maxWidth="max-w-md"
      >
        <div className="space-y-4">
          <p className="text-xs text-ink-secondary dark:text-zinc-300 leading-relaxed">
            Are you sure you want to clear all telemetry logs from local storage? This action cannot be undone.
          </p>

          <div className="flex justify-end gap-2 pt-2 border-t border-zinc-150 dark:border-zinc-800">
            <button
              onClick={() => setShowClearModal(false)}
              className="px-3 py-1.5 text-xs text-ink-secondary dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 rounded-lg font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleClearConfirm}
              className="px-3 py-1.5 text-xs text-white bg-rose-600 hover:bg-rose-700 rounded-lg font-medium"
            >
              Clear Logs
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
