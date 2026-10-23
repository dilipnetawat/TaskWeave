import React from 'react';
import { Tool } from '../../types';
import { Layers, CheckSquare, FileText, Calendar, Terminal, Mic, GitPullRequest, MessageSquare, Cpu, ExternalLink } from 'lucide-react';

interface ToolCardProps {
  tool: Tool;
  onSelect: (tool: Tool) => void;
  onToggle: (toolId: string) => void;
}

const ICON_MAP: Record<string, React.ElementType> = {
  Layers,
  CheckSquare,
  FileText,
  Calendar,
  Terminal,
  Mic,
  GitPullRequest,
  MessageSquare
};

export const ToolCard: React.FC<ToolCardProps> = ({ tool, onSelect, onToggle }) => {
  const IconComponent = ICON_MAP[tool.icon] || Cpu;

  return (
    <div className={`p-5 rounded-xl border transition-all duration-200 flex flex-col justify-between ${
      tool.isEnabled 
        ? 'bg-white dark:bg-canvas-dark-subtle border-zinc-200/90 dark:border-zinc-800 shadow-subtle hover:border-brand-300 dark:hover:border-brand-800' 
        : 'bg-zinc-50/60 dark:bg-zinc-900/40 border-zinc-200/60 dark:border-zinc-850 opacity-75'
    }`}>
      <div>
        {/* Top Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center border transition-colors ${
              tool.isEnabled 
                ? 'bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 border-brand-200/50 dark:border-brand-800/40' 
                : 'bg-zinc-100 dark:bg-zinc-800 text-ink-muted border-zinc-200 dark:border-zinc-700'
            }`}>
              <IconComponent className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-ink-primary dark:text-zinc-100 flex items-center gap-2">
                {tool.name}
              </h4>
              <span className="text-[10px] font-mono uppercase text-ink-muted dark:text-zinc-400">
                {tool.category}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
              tool.status === 'simulated' 
                ? 'bg-teal-50 text-teal-700 dark:bg-teal-950/60 dark:text-teal-300 border border-teal-200/50' 
                : 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200/50'
            }`}>
              {tool.status === 'simulated' ? 'Simulated' : 'Planned MCP'}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs text-ink-secondary dark:text-zinc-400 leading-relaxed mb-4 line-clamp-2">
          {tool.description}
        </p>
      </div>

      {/* Card Actions Footer */}
      <div className="pt-3 border-t border-zinc-150 dark:border-zinc-800/80 flex items-center justify-between">
        <button
          onClick={() => onSelect(tool)}
          className="text-xs font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300 flex items-center gap-1 transition-colors"
        >
          <span>Inspect Spec</span>
          <ExternalLink className="w-3 h-3" />
        </button>

        <label className="flex items-center gap-2 cursor-pointer">
          <span className="text-[11px] text-ink-muted dark:text-zinc-400">
            {tool.isEnabled ? 'Enabled' : 'Disabled'}
          </span>
          <div className="relative inline-flex items-center">
            <input 
              type="checkbox" 
              checked={tool.isEnabled} 
              onChange={() => onToggle(tool.id)}
              className="sr-only peer"
            />
            <div className="w-8 h-4 bg-zinc-200 peer-focus:outline-none rounded-full peer dark:bg-zinc-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all dark:border-zinc-600 peer-checked:bg-teal-600"></div>
          </div>
        </label>
      </div>
    </div>
  );
};
