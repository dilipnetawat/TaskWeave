import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  GitFork, 
  PlusCircle, 
  Trash2, 
  RotateCcw, 
  ExternalLink, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Filter,
  Check
} from 'lucide-react';
import { useWorkflow } from '../context/WorkflowContext';
import { Workflow, WorkflowStatus } from '../types';
import { Modal } from '../components/common/Modal';

export const WorkflowsPage: React.FC = () => {
  const navigate = useNavigate();
  const { workflows, setActiveWorkflow, deleteWorkflow, retryWorkflow } = useWorkflow();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'completed' | 'running' | 'failed'>('all');
  const [workflowToDelete, setWorkflowToDelete] = useState<Workflow | null>(null);

  // Filter workflows based on search and status
  const filteredWorkflows = useMemo(() => {
    return workflows.filter(wf => {
      const matchesSearch = 
        wf.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        wf.request.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      if (statusFilter === 'all') return true;
      if (statusFilter === 'completed') return wf.status === 'completed';
      if (statusFilter === 'running') return wf.status === 'running';
      if (statusFilter === 'failed') return wf.status === 'failed' || wf.status === 'cancelled';
      return true;
    });
  }, [workflows, searchQuery, statusFilter]);

  const handleDeleteConfirm = () => {
    if (workflowToDelete) {
      deleteWorkflow(workflowToDelete.id);
      setWorkflowToDelete(null);
    }
  };

  const handleOpenWorkflow = (wf: Workflow) => {
    setActiveWorkflow(wf);
    navigate(`/app/new?id=${wf.id}`);
  };

  const handleRerunWorkflow = (e: React.MouseEvent, wf: Workflow) => {
    e.stopPropagation();
    setActiveWorkflow(wf);
    navigate(`/app/new?id=${wf.id}`);
    retryWorkflow(wf.id);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200/80 dark:border-zinc-800/80">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-ink-primary dark:text-zinc-100">
            Workflow Library
          </h1>
          <p className="text-xs sm:text-sm text-ink-muted dark:text-zinc-400 mt-1">
            Search, inspect, and rerun previously generated execution workflows.
          </p>
        </div>

        <button
          onClick={() => navigate('/app/new')}
          className="inline-flex items-center gap-2 px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-lg text-xs font-semibold shadow-subtle transition-all duration-150 self-start sm:self-auto"
        >
          <PlusCircle className="w-3.5 h-3.5" />
          <span>New Workflow</span>
        </button>
      </div>

      {/* Search and Filters Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-ink-muted dark:text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search workflows by title or prompt..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-white dark:bg-canvas-dark-subtle border border-zinc-200 dark:border-zinc-800 rounded-lg text-ink-primary dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
          />
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-850 p-1 rounded-lg self-start sm:self-auto border border-zinc-200/60 dark:border-zinc-800">
          {(['all', 'completed', 'running', 'failed'] as const).map((filter) => (
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

      {/* Workflows List or Empty State */}
      {filteredWorkflows.length === 0 ? (
        <div className="p-12 text-center bg-white dark:bg-canvas-dark-subtle border border-zinc-200/80 dark:border-zinc-800 rounded-xl space-y-3">
          <GitFork className="w-10 h-10 text-zinc-300 dark:text-zinc-700 mx-auto" />
          <h3 className="text-sm font-semibold text-ink-primary dark:text-zinc-200">
            No workflows found
          </h3>
          <p className="text-xs text-ink-muted dark:text-zinc-400 max-w-sm mx-auto leading-relaxed">
            {searchQuery 
              ? `No workflows matched your search "${searchQuery}". Try a different keyword.` 
              : `There are currently no workflows with status "${statusFilter}".`}
          </p>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800 text-ink-secondary dark:text-zinc-300 rounded-lg text-xs font-medium hover:bg-zinc-200"
            >
              Clear Search Query
            </button>
          )}
        </div>
      ) : (
        <div className="bg-white dark:bg-canvas-dark-subtle border border-zinc-200/80 dark:border-zinc-800 rounded-xl overflow-hidden shadow-subtle">
          <div className="divide-y divide-zinc-150 dark:divide-zinc-800/80">
            {filteredWorkflows.map((wf) => (
              <div
                key={wf.id}
                onClick={() => handleOpenWorkflow(wf)}
                className="p-4 sm:p-5 hover:bg-zinc-50/70 dark:hover:bg-zinc-850/50 cursor-pointer transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-sm font-semibold text-ink-primary dark:text-zinc-100 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors truncate">
                      {wf.title}
                    </h3>
                    <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full ${
                      wf.status === 'completed'
                        ? 'bg-teal-50 text-teal-700 dark:bg-teal-950/60 dark:text-teal-300 border border-teal-200/50'
                        : wf.status === 'running'
                        ? 'bg-brand-50 text-brand-700 dark:bg-brand-950/60 dark:text-brand-300 border border-brand-200/50 animate-pulse'
                        : wf.status === 'failed'
                        ? 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border border-rose-200/50'
                        : 'bg-zinc-100 text-ink-secondary dark:bg-zinc-800 dark:text-zinc-300'
                    }`}>
                      {wf.status}
                    </span>
                  </div>

                  <p className="text-xs text-ink-muted dark:text-zinc-400 line-clamp-1 mb-2">
                    "{wf.request}"
                  </p>

                  <div className="flex flex-wrap items-center gap-3 text-[11px] text-ink-muted dark:text-zinc-500 font-mono">
                    <span>{wf.steps.length} sequential steps</span>
                    <span>·</span>
                    <span>Tools: {wf.toolsUsed.join(', ') || 'Custom'}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{new Date(wf.updatedAt || wf.createdAt).toLocaleDateString()}</span>
                    </span>
                  </div>
                </div>

                {/* Row Action Buttons */}
                <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={(e) => handleRerunWorkflow(e, wf)}
                    className="p-1.5 rounded-lg text-ink-muted hover:text-ink-primary dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                    title="Rerun workflow simulation"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleOpenWorkflow(wf)}
                    className="p-1.5 rounded-lg text-ink-muted hover:text-brand-600 dark:hover:text-brand-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                    title="Open details"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => setWorkflowToDelete(wf)}
                    className="p-1.5 rounded-lg text-ink-muted hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                    title="Delete workflow"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={!!workflowToDelete}
        onClose={() => setWorkflowToDelete(null)}
        title="Confirm Workflow Deletion"
        maxWidth="max-w-md"
      >
        <div className="space-y-4">
          <p className="text-xs text-ink-secondary dark:text-zinc-300 leading-relaxed">
            Are you sure you want to delete <span className="font-semibold text-ink-primary dark:text-zinc-100">"{workflowToDelete?.title}"</span>? This will permanently remove its execution logs and result data from your local browser storage.
          </p>

          <div className="flex justify-end gap-2 pt-2 border-t border-zinc-150 dark:border-zinc-800">
            <button
              onClick={() => setWorkflowToDelete(null)}
              className="px-3 py-1.5 text-xs text-ink-secondary dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 rounded-lg font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteConfirm}
              className="px-3 py-1.5 text-xs text-white bg-rose-600 hover:bg-rose-700 rounded-lg font-medium"
            >
              Delete Workflow
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
