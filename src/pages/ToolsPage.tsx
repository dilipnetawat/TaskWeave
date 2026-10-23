import React, { useState } from 'react';
import { 
  Wrench, 
  Layers, 
  ArrowRight, 
  ShieldCheck, 
  Info, 
  Cpu, 
  CheckCircle2, 
  Clock, 
  AlertTriangle 
} from 'lucide-react';
import { useWorkflow } from '../context/WorkflowContext';
import { Tool } from '../types';
import { ToolCard } from '../components/tools/ToolCard';
import { ToolDetailsModal } from '../components/tools/ToolDetailsModal';

export const ToolsPage: React.FC = () => {
  const { tools, toggleTool } = useWorkflow();
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = ['all', 'planning', 'productivity', 'analysis', 'integration', 'data'];

  const filteredTools = activeCategory === 'all' 
    ? tools 
    : tools.filter(t => t.category === activeCategory);

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Page Header */}
      <div className="pb-4 border-b border-zinc-200/80 dark:border-zinc-800/80">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
            Tool Integrations
          </span>
          <span className="text-zinc-300 dark:text-zinc-700">·</span>
          <span className="text-xs text-ink-muted dark:text-zinc-400">
            MCP Protocol Abstraction
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-ink-primary dark:text-zinc-100">
          Tools & Model Context Protocol Layer
        </h1>
        <p className="text-xs sm:text-sm text-ink-muted dark:text-zinc-400 mt-1 max-w-3xl leading-relaxed">
          TaskWeave coordinates specialized tools to accomplish multi-step objectives. In this prototype, core tools run via deterministic local simulation, while external bridges define the future Model Context Protocol (MCP) integration boundary.
        </p>
      </div>

      {/* Honest Architecture Pipeline Panel */}
      <section className="bg-white dark:bg-canvas-dark-subtle border border-zinc-200/90 dark:border-zinc-800 rounded-2xl p-5 sm:p-6 shadow-subtle space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-brand-600 dark:text-brand-400" />
            <h2 className="text-sm font-semibold text-ink-primary dark:text-zinc-100">
              System Architecture & MCP Boundary
            </h2>
          </div>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200/50 self-start sm:self-auto">
            Prototype Status: Simulated Boundary
          </span>
        </div>

        {/* Visual Architecture Diagram */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-2">
          {/* Stage 1: UI */}
          <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-850 border border-zinc-200/80 dark:border-zinc-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-mono font-semibold uppercase text-brand-600 dark:text-brand-400">Stage 01</span>
                <span className="w-2 h-2 rounded-full bg-teal-500" />
              </div>
              <h3 className="text-xs font-semibold text-ink-primary dark:text-zinc-100">TaskWeave Frontend</h3>
              <p className="text-[11px] text-ink-muted dark:text-zinc-400 mt-1">
                React client, Request Composer, and interactive execution monitor.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-zinc-200/60 dark:border-zinc-800 text-[10px] text-teal-700 dark:text-teal-400 font-medium">
              ✓ Active in prototype
            </div>
          </div>

          {/* Stage 2: Orchestration */}
          <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-850 border border-zinc-200/80 dark:border-zinc-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-mono font-semibold uppercase text-brand-600 dark:text-brand-400">Stage 02</span>
                <span className="w-2 h-2 rounded-full bg-teal-500" />
              </div>
              <h3 className="text-xs font-semibold text-ink-primary dark:text-zinc-100">Planner & Mock Engine</h3>
              <p className="text-[11px] text-ink-muted dark:text-zinc-400 mt-1">
                Intent decomposition, deterministic step sequencing, and error handlers.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-zinc-200/60 dark:border-zinc-800 text-[10px] text-teal-700 dark:text-teal-400 font-medium">
              ✓ Local simulation
            </div>
          </div>

          {/* Stage 3: MCP Server */}
          <div className="p-3.5 rounded-xl bg-amber-50/40 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/60 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-mono font-semibold uppercase text-amber-600 dark:text-amber-400">Stage 03</span>
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              </div>
              <h3 className="text-xs font-semibold text-amber-900 dark:text-amber-200">MCP Protocol Server</h3>
              <p className="text-[11px] text-amber-800 dark:text-amber-300 mt-1">
                Standardized Model Context Protocol transport over stdio / SSE sockets.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-amber-200/60 dark:border-amber-900/40 text-[10px] text-amber-700 dark:text-amber-400 font-medium">
              Planned architecture
            </div>
          </div>

          {/* Stage 4: External Tools & Alexa */}
          <div className="p-3.5 rounded-xl bg-amber-50/40 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/60 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-mono font-semibold uppercase text-amber-600 dark:text-amber-400">Stage 04</span>
                <span className="w-2 h-2 rounded-full bg-amber-500" />
              </div>
              <h3 className="text-xs font-semibold text-amber-900 dark:text-amber-200">Alexa+ & Tool Ecosystem</h3>
              <p className="text-[11px] text-amber-800 dark:text-amber-300 mt-1">
                Ambient Alexa+ voice intents, GitHub API, Slack alerts, and calendar.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-amber-200/60 dark:border-amber-900/40 text-[10px] text-amber-700 dark:text-amber-400 font-medium">
              Planned external bridge
            </div>
          </div>
        </div>

        {/* Informative Callout */}
        <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-850/60 border border-zinc-200/60 dark:border-zinc-800 text-xs text-ink-secondary dark:text-zinc-300 flex items-start gap-2.5">
          <Info className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
          <p className="text-[11px] leading-relaxed">
            <span className="font-semibold text-ink-primary dark:text-zinc-200">Honest prototype notice: </span>
            This sprint focuses exclusively on the frontend user experience and interaction patterns. No external MCP server or production Alexa+ skill is currently executing live network calls. All tool schemas adhere to official MCP tool definition conventions.
          </p>
        </div>
      </section>

      {/* Category Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <span className="text-xs font-medium text-ink-muted dark:text-zinc-400 mr-1">Filter:</span>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1 rounded-lg text-xs font-medium capitalize transition-colors whitespace-nowrap ${
              activeCategory === cat
                ? 'bg-brand-600 text-white shadow-xs'
                : 'bg-white dark:bg-canvas-dark-subtle text-ink-secondary dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200/70 dark:border-zinc-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTools.map((tool) => (
          <ToolCard
            key={tool.id}
            tool={tool}
            onSelect={(t) => setSelectedTool(t)}
            onToggle={(id) => toggleTool(id)}
          />
        ))}
      </div>

      {/* Details Modal */}
      <ToolDetailsModal
        tool={selectedTool}
        isOpen={!!selectedTool}
        onClose={() => setSelectedTool(null)}
        onToggleEnabled={(id) => toggleTool(id)}
      />
    </div>
  );
};
