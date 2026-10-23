import React from 'react';
import { Modal } from '../common/Modal';
import { Tool } from '../../types';
import { Layers, CheckSquare, FileText, Calendar, Terminal, Mic, GitPullRequest, MessageSquare, ShieldCheck, Cpu } from 'lucide-react';

interface ToolDetailsModalProps {
  tool: Tool | null;
  isOpen: boolean;
  onClose: () => void;
  onToggleEnabled?: (toolId: string) => void;
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

export const ToolDetailsModal: React.FC<ToolDetailsModalProps> = ({
  tool,
  isOpen,
  onClose,
  onToggleEnabled
}) => {
  if (!tool) return null;

  const IconComponent = ICON_MAP[tool.icon] || Cpu;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={tool.name}
      subtitle={`Category: ${tool.category.toUpperCase()} · Tool ID: ${tool.id}`}
      maxWidth="max-w-2xl"
    >
      <div className="space-y-6">
        {/* Status Header Strip */}
        <div className="flex items-center justify-between p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-850/80 border border-zinc-200/80 dark:border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 flex items-center justify-center border border-brand-200/50 dark:border-brand-800/40">
              <IconComponent className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-ink-primary dark:text-zinc-100">
                  {tool.status === 'simulated' ? 'Local Deterministic Simulation' : 'Planned MCP Integration Boundary'}
                </span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                  tool.status === 'simulated' 
                    ? 'bg-teal-50 text-teal-700 dark:bg-teal-950/60 dark:text-teal-300 border border-teal-200/50' 
                    : 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200/50'
                }`}>
                  {tool.status.toUpperCase()}
                </span>
              </div>
              <p className="text-[11px] text-ink-muted dark:text-zinc-400 mt-0.5">
                MCP Protocol Compatible: {tool.mcpCompatible ? 'Yes (Model Context Protocol Schema)' : 'Standard Adapter'}
              </p>
            </div>
          </div>

          {onToggleEnabled && (
            <button
              onClick={() => onToggleEnabled(tool.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                tool.isEnabled 
                  ? 'bg-teal-600 hover:bg-teal-700 text-white' 
                  : 'bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-300 text-ink-secondary dark:text-zinc-300'
              }`}
            >
              {tool.isEnabled ? 'Active in Planner' : 'Disabled'}
            </button>
          )}
        </div>

        {/* Description */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-ink-muted dark:text-zinc-400 mb-1.5">
            Operational Description
          </h4>
          <p className="text-xs text-ink-secondary dark:text-zinc-300 leading-relaxed">
            {tool.description}
          </p>
        </div>

        {/* Schema Parameters */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-ink-muted dark:text-zinc-400 mb-2">
            Tool Parameters Schema
          </h4>
          <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden text-xs">
            <table className="w-full text-left">
              <thead className="bg-zinc-50 dark:bg-zinc-850/60 border-b border-zinc-200 dark:border-zinc-800 text-[11px] text-ink-muted dark:text-zinc-400">
                <tr>
                  <th className="px-3 py-2 font-medium">Parameter</th>
                  <th className="px-3 py-2 font-medium">Type</th>
                  <th className="px-3 py-2 font-medium">Required</th>
                  <th className="px-3 py-2 font-medium">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200/60 dark:divide-zinc-800/60">
                {tool.parameters.map((param, idx) => (
                  <tr key={idx} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-850/40">
                    <td className="px-3 py-2 font-mono text-[11px] text-brand-600 dark:text-brand-400 font-medium">
                      {param.name}
                    </td>
                    <td className="px-3 py-2 text-ink-muted dark:text-zinc-400">
                      {param.type}
                    </td>
                    <td className="px-3 py-2">
                      <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                        param.required 
                          ? 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300' 
                          : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400'
                      }`}>
                        {param.required ? 'true' : 'false'}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-ink-secondary dark:text-zinc-300">
                      {param.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Example Input / Output JSON */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-ink-muted dark:text-zinc-400 mb-1.5">
              Example Invocation Payload
            </h4>
            <pre className="text-[11px] p-3 rounded-lg bg-zinc-900 text-zinc-200 dark:bg-zinc-950 font-mono overflow-x-auto max-h-48 border border-zinc-800">
              {tool.exampleInput}
            </pre>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-ink-muted dark:text-zinc-400 mb-1.5">
              Simulated Tool Return Payload
            </h4>
            <pre className="text-[11px] p-3 rounded-lg bg-zinc-900 text-zinc-200 dark:bg-zinc-950 font-mono overflow-x-auto max-h-48 border border-zinc-800">
              {tool.exampleOutput}
            </pre>
          </div>
        </div>

        {/* Integration Architecture Note */}
        <div className="p-3 rounded-lg bg-brand-50/50 dark:bg-brand-950/30 border border-brand-200/50 dark:border-brand-900/40 text-xs text-ink-secondary dark:text-zinc-300 flex items-start gap-2.5">
          <ShieldCheck className="w-4 h-4 text-brand-600 dark:text-brand-400 shrink-0 mt-0.5" />
          <p className="text-[11px] leading-relaxed">
            In production deployment, this tool binds to a verified external MCP server via stdio or Server-Sent Events (SSE). In this prototype sprint, calls are handled by the local deterministic mock engine.
          </p>
        </div>

        {/* Footer actions */}
        <div className="flex justify-end pt-2 border-t border-zinc-150 dark:border-zinc-800">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-ink-secondary dark:text-zinc-200 rounded-lg text-xs font-medium transition-colors"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </Modal>
  );
};
