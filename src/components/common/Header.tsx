import React from 'react';
import { Menu, PlusCircle, Activity } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

interface HeaderProps {
  onToggleMobileSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onToggleMobileSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const getBreadcrumb = () => {
    switch (location.pathname) {
      case '/app':
        return 'Workspace / Dashboard';
      case '/app/new':
        return 'Workspace / New Workflow';
      case '/app/workflows':
        return 'Workspace / Workflow Library';
      case '/app/tools':
        return 'Workspace / Connected Tools & MCP';
      case '/app/activity':
        return 'Workspace / Activity & Telemetry';
      case '/app/settings':
        return 'Workspace / Settings';
      default:
        return 'Workspace';
    }
  };

  return (
    <header className="sticky top-0 z-30 h-14 bg-white/80 dark:bg-canvas-dark-subtle/80 backdrop-blur-md border-b border-zinc-200/80 dark:border-zinc-800/80 px-4 sm:px-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobileSidebar}
          className="lg:hidden p-1.5 rounded-lg text-ink-muted hover:text-ink-primary hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          aria-label="Toggle navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-ink-muted dark:text-zinc-400">
            {getBreadcrumb()}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-full bg-teal-50 dark:bg-teal-950/40 border border-teal-200/60 dark:border-teal-900/60 text-[11px] font-medium text-teal-800 dark:text-teal-300">
          <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
          <span>Local Mock Engine Active</span>
        </div>

        <button
          onClick={() => navigate('/app/activity')}
          className="p-1.5 rounded-lg text-ink-muted hover:text-ink-primary dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors relative"
          title="View recent telemetry events"
        >
          <Activity className="w-4 h-4" />
        </button>

        {location.pathname !== '/app/new' && (
          <button
            onClick={() => navigate('/app/new')}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-brand-600 hover:bg-brand-700 text-white rounded-lg text-xs font-medium shadow-subtle transition-all duration-150 active:scale-[0.98]"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">New Workflow</span>
          </button>
        )}
      </div>
    </header>
  );
};
