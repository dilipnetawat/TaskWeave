import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  PlusCircle, 
  GitFork, 
  Wrench, 
  Activity, 
  Settings, 
  ChevronDown, 
  Moon, 
  Sun,
  Layers,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { useWorkflow } from '../../context/WorkflowContext';

interface SidebarProps {
  isOpen: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onCloseMobile }) => {
  const navigate = useNavigate();
  const { preferences, updatePreferences, workflows } = useWorkflow();

  const navItems = [
    { name: 'Dashboard', path: '/app', icon: LayoutDashboard, exact: true },
    { name: 'New Workflow', path: '/app/new', icon: PlusCircle, badge: 'Composer' },
    { name: 'Workflows', path: '/app/workflows', icon: GitFork, count: workflows.length },
    { name: 'Tools & MCP', path: '/app/tools', icon: Wrench },
    { name: 'Activity Log', path: '/app/activity', icon: Activity },
    { name: 'Settings', path: '/app/settings', icon: Settings },
  ];

  const toggleTheme = () => {
    const next = preferences.theme === 'dark' ? 'light' : 'dark';
    updatePreferences({ theme: next });
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/40 z-40 lg:hidden backdrop-blur-xs"
          onClick={onCloseMobile}
        />
      )}

      <aside className={`
        fixed top-0 bottom-0 left-0 z-40 w-64 bg-white dark:bg-canvas-dark-subtle border-r border-zinc-200/80 dark:border-zinc-800/80
        flex flex-col transition-transform duration-200 ease-in-out lg:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Brand & Workspace Header */}
        <div className="p-4 border-b border-zinc-150 dark:border-zinc-800/80">
          <div className="flex items-center justify-between mb-3">
            <NavLink to="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-brand-600 text-white flex items-center justify-center font-bold shadow-subtle group-hover:bg-brand-700 transition-colors">
                <Layers className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-sm tracking-tight text-ink-primary dark:text-zinc-100 flex items-center gap-1.5">
                  TaskWeave
                  <span className="text-[10px] font-medium bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300 px-1.5 py-0.2 rounded border border-brand-200 dark:border-brand-800/50">
                    MVP
                  </span>
                </span>
                <span className="text-[11px] text-ink-muted dark:text-zinc-400">Alexa+ Track</span>
              </div>
            </NavLink>
          </div>

          {/* Workspace selector dropdown simulation */}
          <div className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-zinc-50 dark:bg-zinc-850 border border-zinc-200/70 dark:border-zinc-800 text-xs text-ink-secondary dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer">
            <div className="flex items-center gap-2 truncate">
              <span className="w-2 h-2 rounded-full bg-teal-500 shrink-0"></span>
              <span className="font-medium truncate">Hackathon Team Space</span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-ink-muted shrink-0" />
          </div>
        </div>

        {/* Quick New Workflow CTA Button */}
        <div className="px-3 pt-3">
          <button
            onClick={() => {
              navigate('/app/new');
              if (onCloseMobile) onCloseMobile();
            }}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-lg text-xs font-medium shadow-subtle transition-all duration-150 active:scale-[0.98]"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Create New Workflow</span>
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.exact}
              onClick={onCloseMobile}
              className={({ isActive }) => `
                flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors
                ${isActive 
                  ? 'bg-brand-50 text-brand-700 dark:bg-brand-950/60 dark:text-brand-300 font-semibold' 
                  : 'text-ink-secondary dark:text-zinc-400 hover:bg-zinc-100/70 dark:hover:bg-zinc-850 hover:text-ink-primary dark:hover:text-zinc-200'
                }
              `}
            >
              <div className="flex items-center gap-2.5">
                <item.icon className="w-4 h-4" />
                <span>{item.name}</span>
              </div>
              {item.count !== undefined && (
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-ink-muted dark:text-zinc-400">
                  {item.count}
                </span>
              )}
              {item.badge && (
                <span className="text-[9px] font-medium px-1.5 py-0.2 rounded bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200/50 dark:border-amber-900/50">
                  {item.badge}
                </span>
              )}
            </NavLink>
          ))}

          <div className="pt-4 mt-4 border-t border-zinc-150 dark:border-zinc-800/80">
            <span className="px-3 text-[10px] font-semibold uppercase tracking-wider text-ink-muted dark:text-zinc-500">
              Architecture & Concept
            </span>
            <div className="mt-2 space-y-1">
              <NavLink
                to="/"
                className="flex items-center justify-between px-3 py-2 rounded-lg text-xs text-ink-secondary dark:text-zinc-400 hover:bg-zinc-100/70 dark:hover:bg-zinc-850"
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-brand-500" />
                  <span>Public Landing Page</span>
                </div>
                <ExternalLink className="w-3 h-3 text-ink-muted" />
              </NavLink>
            </div>
          </div>
        </nav>

        {/* Prototype Honest Indicator Banner */}
        <div className="mx-3 mb-3 p-2.5 rounded-lg bg-canvas-subtle dark:bg-zinc-850 border border-zinc-200/60 dark:border-zinc-800 text-[11px] text-ink-muted dark:text-zinc-400">
          <div className="flex items-center gap-1.5 font-medium text-ink-secondary dark:text-zinc-300 mb-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            <span>Simulated Execution Mode</span>
          </div>
          <p className="text-[10px] leading-tight text-ink-muted dark:text-zinc-400">
            Frontend-only interactive demo for Alexa+ hackathon. Tool executions use local mock engine.
          </p>
        </div>

        {/* Bottom Profile & Theme Bar */}
        <div className="p-3 border-t border-zinc-150 dark:border-zinc-800/80 flex items-center justify-between bg-zinc-50/50 dark:bg-zinc-900/30">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-brand-600 to-teal-500 text-white text-[11px] font-semibold flex items-center justify-center shrink-0">
              TW
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-ink-primary dark:text-zinc-200 truncate">Alexa+ Evaluator</p>
              <p className="text-[10px] text-ink-muted dark:text-zinc-400 truncate">demo@taskweave.dev</p>
            </div>
          </div>

          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-lg text-ink-muted hover:text-ink-primary dark:hover:text-zinc-100 hover:bg-zinc-200/60 dark:hover:bg-zinc-800 transition-colors"
            title={`Switch to ${preferences.theme === 'dark' ? 'light' : 'dark'} mode`}
            aria-label="Toggle theme"
          >
            {preferences.theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </button>
        </div>
      </aside>
    </>
  );
};
