import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Layers, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Clock, 
  Cpu, 
  CheckSquare, 
  FileText, 
  Calendar, 
  Terminal, 
  ShieldCheck, 
  RefreshCw, 
  Activity, 
  Menu, 
  X,
  Play,
  Copy,
  Check
} from 'lucide-react';
import { useWorkflow } from '../context/WorkflowContext';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { createWorkflow } = useWorkflow();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Interactive Demo State on Landing Page
  const DEMO_PRESETS = [
    {
      id: 'weekly',
      label: 'Plan my week',
      prompt: 'Help me organize my week and prepare a project checklist.',
      steps: [
        { title: 'Deconstruct weekly milestones', tool: 'Goal Decomposer', time: '1.2s' },
        { title: 'Synthesize deliverables & criteria', tool: 'Document Synthesizer', time: '1.5s' },
        { title: 'Generate prioritized action checklist', tool: 'Checklist Generator', time: '1.8s' },
        { title: 'Map milestones into calendar deep-work blocks', tool: 'Calendar Optimizer', time: '1.1s' },
      ],
      resultCount: '7 prioritized tasks'
    },
    {
      id: 'doc',
      label: 'Summarize a document',
      prompt: 'Summarize a research paper on multimodal agent workflows.',
      steps: [
        { title: 'Parse document structure & hierarchy', tool: 'Document Synthesizer', time: '1.4s' },
        { title: 'Extract critical findings & trade-offs', tool: 'Document Synthesizer', time: '1.6s' },
        { title: 'Formulate architectural implementation checklist', tool: 'Checklist Generator', time: '1.2s' },
      ],
      resultCount: '4 core architectural takeaways'
    },
    {
      id: 'checklist',
      label: 'Prepare a project checklist',
      prompt: 'Prepare a launch checklist and risk assessment for v1.0 release.',
      steps: [
        { title: 'Audit dependencies & build security', tool: 'Code Auditor', time: '1.8s' },
        { title: 'Identify deployment risks & rollback gates', tool: 'Goal Decomposer', time: '1.5s' },
        { title: 'Generate pre-flight verification checklist', tool: 'Checklist Generator', time: '1.3s' },
        { title: 'Schedule launch sequence window', tool: 'Calendar Optimizer', time: '1.0s' },
      ],
      resultCount: '5 gating checks verified'
    },
    {
      id: 'study',
      label: 'Organize a study session',
      prompt: 'Organize a focused study session for machine learning systems.',
      steps: [
        { title: 'Curate learning curriculum & focus blocks', tool: 'Goal Decomposer', time: '1.1s' },
        { title: 'Extract key mathematical definitions & formulas', tool: 'Document Synthesizer', time: '1.3s' },
        { title: 'Construct active recall practice checklist', tool: 'Checklist Generator', time: '1.4s' },
      ],
      resultCount: '4 active-recall checkpoints'
    }
  ];

  const [selectedDemoIndex, setSelectedDemoIndex] = useState(0);
  const activeDemo = DEMO_PRESETS[selectedDemoIndex];

  const handleLaunchWorkspace = (promptText?: string) => {
    const text = promptText || activeDemo.prompt;
    const wf = createWorkflow(text);
    navigate(`/app/new?id=${wf.id}`);
  };

  const scrollToDemo = () => {
    const el = document.getElementById('interactive-demo');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-canvas-light dark:bg-canvas-dark text-ink-primary dark:text-zinc-100 flex flex-col font-sans selection:bg-brand-100 selection:text-brand-900">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 bg-white/85 dark:bg-canvas-dark/85 backdrop-blur-md border-b border-zinc-200/80 dark:border-zinc-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-brand-600 text-white flex items-center justify-center font-bold shadow-subtle">
                <Layers className="w-4 h-4" />
              </div>
              <span className="font-bold text-base tracking-tight text-ink-primary dark:text-zinc-100">
                TaskWeave
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-ink-secondary dark:text-zinc-300">
              <a href="#how-it-works" className="hover:text-ink-primary dark:hover:text-zinc-100 transition-colors">How it works</a>
              <a href="#features" className="hover:text-ink-primary dark:hover:text-zinc-100 transition-colors">Features</a>
              <a href="#architecture" className="hover:text-ink-primary dark:hover:text-zinc-100 transition-colors">Architecture</a>
              <a href="#interactive-demo" className="hover:text-ink-primary dark:hover:text-zinc-100 transition-colors">Interactive Demo</a>
            </nav>
          </div>

          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={scrollToDemo}
              className="px-3.5 py-1.5 text-xs font-medium text-ink-secondary dark:text-zinc-300 hover:text-ink-primary dark:hover:text-zinc-100 transition-colors"
            >
              Explore Demo
            </button>
            <button
              onClick={() => navigate('/app')}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-lg text-xs font-semibold shadow-subtle transition-all duration-150 active:scale-[0.98]"
            >
              <span>Open Workspace</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(prev => !prev)}
            className="md:hidden p-1.5 rounded-lg text-ink-muted hover:text-ink-primary hover:bg-zinc-100 dark:hover:bg-zinc-800"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-canvas-dark px-4 py-4 space-y-3">
            <nav className="flex flex-col gap-2.5 text-sm font-medium text-ink-secondary dark:text-zinc-300">
              <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)}>How it works</a>
              <a href="#features" onClick={() => setMobileMenuOpen(false)}>Features</a>
              <a href="#architecture" onClick={() => setMobileMenuOpen(false)}>Architecture</a>
              <a href="#interactive-demo" onClick={() => setMobileMenuOpen(false)}>Interactive Demo</a>
            </nav>
            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate('/app');
                }}
                className="w-full py-2 bg-brand-600 text-white rounded-lg text-xs font-semibold"
              >
                Open Workspace
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="pt-16 pb-20 sm:pt-24 sm:pb-28 px-4 sm:px-6 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headline and CTAs */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/60 border border-brand-200/60 dark:border-brand-800/60 text-xs font-medium text-brand-700 dark:text-brand-300">
              <span className="w-2 h-2 rounded-full bg-brand-600 animate-pulse" />
              <span>Alexa+ Hackathon Track Prototype</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-ink-primary dark:text-zinc-100 leading-[1.1]">
              From intention <br />
              <span className="text-brand-600 dark:text-brand-400">to action.</span>
            </h1>

            <p className="text-base sm:text-lg text-ink-muted dark:text-zinc-400 leading-relaxed max-w-xl">
              Describe your goal. TaskWeave breaks it into clear steps, coordinates tools, and keeps you informed from start to finish.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                onClick={() => navigate('/app')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-sm font-semibold shadow-subtle transition-all duration-150 active:scale-[0.98]"
              >
                <span>Open Workspace</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={scrollToDemo}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-ink-primary dark:text-zinc-200 rounded-xl text-sm font-medium transition-colors"
              >
                <span>Try an Example</span>
              </button>
            </div>

            <div className="flex items-center gap-6 pt-4 text-xs text-ink-muted dark:text-zinc-500 font-mono">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                Deterministic Mock Engine
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                MCP Protocol Ready
              </span>
            </div>
          </div>

          {/* Right Column: Realistic Product Preview Component */}
          <div className="lg:col-span-6">
            <div className="bg-white dark:bg-canvas-dark-subtle border border-zinc-200/90 dark:border-zinc-800 rounded-2xl shadow-elevated p-5 sm:p-6 space-y-4">
              {/* Window Header Bar */}
              <div className="flex items-center justify-between pb-3 border-b border-zinc-150 dark:border-zinc-800">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                  <div className="w-3 h-3 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                  <div className="w-3 h-3 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                  <span className="text-[11px] font-mono text-ink-muted dark:text-zinc-400 ml-2">
                    taskweave.workspace · execution-monitor
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-teal-50 text-teal-700 dark:bg-teal-950 dark:text-teal-300 border border-teal-200/60">
                  COMPLETED · 5.6s
                </span>
              </div>

              {/* Sample User Request */}
              <div className="p-3 bg-zinc-50 dark:bg-zinc-900/60 rounded-xl border border-zinc-200/70 dark:border-zinc-800">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-ink-muted dark:text-zinc-400 block mb-0.5">
                  Natural Language Goal
                </span>
                <p className="text-xs font-medium text-ink-primary dark:text-zinc-200 italic">
                  "Help me organize my week and prepare a project checklist."
                </p>
              </div>

              {/* Steps Progress Preview */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px] text-ink-muted dark:text-zinc-400">
                  <span>Execution Sequence (4/4 steps)</span>
                  <span className="font-mono text-teal-600 dark:text-teal-400">100% complete</span>
                </div>
                <div className="w-full h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-teal-500 w-full" />
                </div>
              </div>

              {/* Mini Steps List */}
              <div className="space-y-2">
                {[
                  { num: 1, title: 'Deconstruct weekly milestones', tool: 'Goal Decomposer', done: true },
                  { num: 2, title: 'Synthesize deliverables & criteria', tool: 'Document Synthesizer', done: true },
                  { num: 3, title: 'Generate prioritized action checklist', tool: 'Checklist Generator', done: true },
                  { num: 4, title: 'Map milestones into calendar deep-work blocks', tool: 'Calendar Optimizer', done: true },
                ].map((s) => (
                  <div key={s.num} className="p-2.5 rounded-lg bg-zinc-50/60 dark:bg-zinc-850/40 border border-zinc-200/50 dark:border-zinc-800/60 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400 shrink-0" />
                      <span className="font-medium text-ink-primary dark:text-zinc-200 text-[11px] truncate">{s.title}</span>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-ink-muted dark:text-zinc-400 shrink-0">
                      {s.tool}
                    </span>
                  </div>
                ))}
              </div>

              {/* Output Preview Strip */}
              <div className="p-3 bg-teal-50/50 dark:bg-teal-950/20 rounded-xl border border-teal-200/50 dark:border-teal-900/40 text-[11px] text-ink-secondary dark:text-zinc-300 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                  <span>Output: 7 prioritized checklist items ready to copy</span>
                </div>
                <button
                  onClick={() => handleLaunchWorkspace('Help me organize my week and prepare a project checklist.')}
                  className="text-xs font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-400 flex items-center gap-1"
                >
                  <span>Open in App</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Demonstration Section */}
      <section id="interactive-demo" className="py-16 sm:py-24 bg-zinc-50 dark:bg-canvas-dark-subtle border-y border-zinc-200/80 dark:border-zinc-800/80 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
              Interactive Prototype Sandbox
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink-primary dark:text-zinc-100">
              Experience the workflow engine
            </h2>
            <p className="text-xs sm:text-sm text-ink-muted dark:text-zinc-400">
              Select any sample scenario below to inspect how TaskWeave decomposes natural intent into coordinated tools.
            </p>
          </div>

          {/* Preset Selector Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {DEMO_PRESETS.map((preset, idx) => (
              <button
                key={preset.id}
                onClick={() => setSelectedDemoIndex(idx)}
                className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                  selectedDemoIndex === idx
                    ? 'bg-brand-600 text-white shadow-subtle'
                    : 'bg-white dark:bg-zinc-850 text-ink-secondary dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200/80 dark:border-zinc-700/80'
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>

          {/* Active Preset Display Box */}
          <div className="bg-white dark:bg-canvas-dark border border-zinc-200/90 dark:border-zinc-800 rounded-2xl p-6 shadow-subtle space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-150 dark:border-zinc-800">
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-ink-muted dark:text-zinc-400 block mb-1">
                  Selected Goal Intent
                </span>
                <p className="text-sm font-semibold text-ink-primary dark:text-zinc-100 italic">
                  "{activeDemo.prompt}"
                </p>
              </div>

              <button
                onClick={() => handleLaunchWorkspace(activeDemo.prompt)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-lg text-xs font-semibold shadow-subtle transition-all duration-150 self-start sm:self-auto"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Run in Workspace</span>
              </button>
            </div>

            {/* Steps Sequence */}
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-ink-muted dark:text-zinc-400 block mb-3">
                Proposed Coordinated Steps ({activeDemo.steps.length})
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activeDemo.steps.map((st, i) => (
                  <div key={i} className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-850/60 border border-zinc-200/70 dark:border-zinc-800 flex items-start gap-3">
                    <span className="w-6 h-6 rounded-md bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300 text-xs font-bold flex items-center justify-center shrink-0">
                      {i + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-ink-primary dark:text-zinc-100">{st.title}</p>
                      <div className="flex items-center gap-2 mt-1 text-[10px] text-ink-muted dark:text-zinc-400 font-mono">
                        <span>Tool: {st.tool}</span>
                        <span>·</span>
                        <span>est. {st.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Expected Result Note */}
            <div className="p-3.5 rounded-xl bg-teal-50/50 dark:bg-teal-950/20 border border-teal-200/60 dark:border-teal-900/40 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-ink-secondary dark:text-zinc-300">
                <CheckCircle2 className="w-4 h-4 text-teal-600" />
                <span>Deterministic result target: <strong className="text-ink-primary dark:text-zinc-100">{activeDemo.resultCount}</strong></span>
              </div>
              <button
                onClick={() => handleLaunchWorkspace(activeDemo.prompt)}
                className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline"
              >
                Execute Full Simulation →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="py-16 sm:py-24 px-4 sm:px-6 max-w-7xl mx-auto w-full space-y-12">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
            Execution Mechanics
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink-primary dark:text-zinc-100">
            How TaskWeave works
          </h2>
          <p className="text-xs sm:text-sm text-ink-muted dark:text-zinc-400">
            Three disciplined phases that convert open-ended objectives into verifiable outcomes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-canvas-dark-subtle border border-zinc-200/80 dark:border-zinc-800 shadow-subtle space-y-3">
            <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-400 flex items-center justify-center font-bold text-sm">
              01
            </div>
            <h3 className="text-base font-semibold text-ink-primary dark:text-zinc-100">
              Describe your goal
            </h3>
            <p className="text-xs text-ink-muted dark:text-zinc-400 leading-relaxed">
              State what you need in plain natural language. Voice via Alexa+ or text through the workspace composer.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-canvas-dark-subtle border border-zinc-200/80 dark:border-zinc-800 shadow-subtle space-y-3">
            <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-400 flex items-center justify-center font-bold text-sm">
              02
            </div>
            <h3 className="text-base font-semibold text-ink-primary dark:text-zinc-100">
              Review proposed workflow
            </h3>
            <p className="text-xs text-ink-muted dark:text-zinc-400 leading-relaxed">
              TaskWeave decomposes the objective into discrete sequential steps, allocates tool bindings, and allows edits before execution.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-canvas-dark-subtle border border-zinc-200/80 dark:border-zinc-800 shadow-subtle space-y-3">
            <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-400 flex items-center justify-center font-bold text-sm">
              03
            </div>
            <h3 className="text-base font-semibold text-ink-primary dark:text-zinc-100">
              Follow execution & results
            </h3>
            <p className="text-xs text-ink-muted dark:text-zinc-400 leading-relaxed">
              Observe real-time telemetry logs, handle recoverable exceptions, and copy verified structured checklists and summaries.
            </p>
          </div>
        </div>
      </section>

      {/* Meaningful Features Section */}
      <section id="features" className="py-16 sm:py-24 bg-zinc-50 dark:bg-canvas-dark-subtle border-t border-zinc-200/80 dark:border-zinc-800/80 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
              Core Capabilities
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink-primary dark:text-zinc-100">
              Engineered for precision and clarity
            </h2>
            <p className="text-xs sm:text-sm text-ink-muted dark:text-zinc-400">
              Distinguishing current prototype features from planned external system bindings.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="p-5 bg-white dark:bg-canvas-dark border border-zinc-200/80 dark:border-zinc-800 rounded-xl shadow-subtle space-y-2">
              <div className="w-8 h-8 rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-400 flex items-center justify-center">
                <Layers className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-semibold text-ink-primary dark:text-zinc-100">Goal-to-Workflow Planning</h4>
              <p className="text-xs text-ink-muted dark:text-zinc-400 leading-relaxed">
                Deterministic decomposition maps requests into sequential steps with time estimates and parameter schemas.
              </p>
              <span className="inline-block text-[10px] font-mono text-teal-700 dark:text-teal-400 font-medium pt-1">
                ✓ Active Prototype Feature
              </span>
            </div>

            <div className="p-5 bg-white dark:bg-canvas-dark border border-zinc-200/80 dark:border-zinc-800 rounded-xl shadow-subtle space-y-2">
              <div className="w-8 h-8 rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-400 flex items-center justify-center">
                <Cpu className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-semibold text-ink-primary dark:text-zinc-100">Connected-Tool Architecture</h4>
              <p className="text-xs text-ink-muted dark:text-zinc-400 leading-relaxed">
                Standardized Model Context Protocol (MCP) tool abstractions decouple execution logic from external services.
              </p>
              <span className="inline-block text-[10px] font-mono text-amber-700 dark:text-amber-400 font-medium pt-1">
                Planned MCP Integration Boundary
              </span>
            </div>

            <div className="p-5 bg-white dark:bg-canvas-dark border border-zinc-200/80 dark:border-zinc-800 rounded-xl shadow-subtle space-y-2">
              <div className="w-8 h-8 rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-400 flex items-center justify-center">
                <Activity className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-semibold text-ink-primary dark:text-zinc-100">Transparent Execution Tracking</h4>
              <p className="text-xs text-ink-muted dark:text-zinc-400 leading-relaxed">
                Live terminal log stream captures step initialization, runtime parameters, and telemetry status codes.
              </p>
              <span className="inline-block text-[10px] font-mono text-teal-700 dark:text-teal-400 font-medium pt-1">
                ✓ Active Prototype Feature
              </span>
            </div>

            <div className="p-5 bg-white dark:bg-canvas-dark border border-zinc-200/80 dark:border-zinc-800 rounded-xl shadow-subtle space-y-2">
              <div className="w-8 h-8 rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-400 flex items-center justify-center">
                <RefreshCw className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-semibold text-ink-primary dark:text-zinc-100">Recoverable Error Handling</h4>
              <p className="text-xs text-ink-muted dark:text-zinc-400 leading-relaxed">
                Failures preserve completed work and allow step-level retry or clean workflow cancellation without lost data.
              </p>
              <span className="inline-block text-[10px] font-mono text-teal-700 dark:text-teal-400 font-medium pt-1">
                ✓ Active Prototype Feature
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Architecture Preview Diagram Section */}
      <section id="architecture" className="py-16 sm:py-24 px-4 sm:px-6 max-w-5xl mx-auto w-full space-y-8">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
            System Design
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink-primary dark:text-zinc-100">
            System Architecture Preview
          </h2>
          <p className="text-xs sm:text-sm text-ink-muted dark:text-zinc-400">
            How TaskWeave bridges conversational intent with modular MCP tool providers.
          </p>
        </div>

        <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-canvas-dark-subtle border border-zinc-200/90 dark:border-zinc-800 shadow-elevated space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center">
            <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-850 border border-zinc-200/80 dark:border-zinc-800">
              <span className="text-[10px] font-mono font-bold text-brand-600 dark:text-brand-400">STEP 1</span>
              <h4 className="text-xs font-semibold mt-1">User Request</h4>
              <p className="text-[11px] text-ink-muted dark:text-zinc-400 mt-0.5">Alexa+ or Workspace</p>
            </div>

            <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-850 border border-zinc-200/80 dark:border-zinc-800">
              <span className="text-[10px] font-mono font-bold text-brand-600 dark:text-brand-400">STEP 2</span>
              <h4 className="text-xs font-semibold mt-1">AI Orchestration</h4>
              <p className="text-[11px] text-ink-muted dark:text-zinc-400 mt-0.5">Planner & Sequence Engine</p>
            </div>

            <div className="p-4 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/60">
              <span className="text-[10px] font-mono font-bold text-amber-600 dark:text-amber-400">STEP 3 (PLANNED)</span>
              <h4 className="text-xs font-semibold mt-1 text-amber-900 dark:text-amber-200">MCP Protocol Layer</h4>
              <p className="text-[11px] text-amber-800 dark:text-amber-300 mt-0.5">Model Context Protocol</p>
            </div>

            <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-850 border border-zinc-200/80 dark:border-zinc-800">
              <span className="text-[10px] font-mono font-bold text-brand-600 dark:text-brand-400">STEP 4</span>
              <h4 className="text-xs font-semibold mt-1">Execution Results</h4>
              <p className="text-[11px] text-ink-muted dark:text-zinc-400 mt-0.5">Checklists & Reports</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900 text-xs text-ink-secondary dark:text-zinc-300 border border-zinc-200/60 dark:border-zinc-800 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
            <p className="text-[11px] leading-relaxed">
              TaskWeave is designed from inception around the open Model Context Protocol (MCP). Rather than hardcoding custom integrations for each tool, TaskWeave acts as an intelligent coordinator that queries tool schemas, validates payloads, and monitors execution over standard MCP interfaces.
            </p>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-16 sm:py-20 bg-brand-600 text-white px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Ready to test TaskWeave in action?
          </h2>
          <p className="text-brand-100 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Open the interactive workspace to run simulated plans, test controlled failure recovery, and inspect MCP tool schemas.
          </p>
          <div className="pt-2">
            <button
              onClick={() => navigate('/app')}
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-brand-700 hover:bg-brand-50 rounded-xl text-xs sm:text-sm font-bold shadow-modal transition-all duration-150 active:scale-[0.98]"
            >
              <span>Launch Workspace Experience</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-canvas-dark-subtle py-10 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-ink-muted dark:text-zinc-400">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-brand-600 text-white flex items-center justify-center font-bold">
              <Layers className="w-3.5 h-3.5" />
            </div>
            <span className="font-semibold text-ink-primary dark:text-zinc-200">TaskWeave</span>
            <span>·</span>
            <span>Alexa+ Hackathon Prototype</span>
          </div>

          <div className="flex items-center gap-5">
            <Link to="/app" className="hover:text-ink-primary dark:hover:text-zinc-200">Workspace</Link>
            <Link to="/app/workflows" className="hover:text-ink-primary dark:hover:text-zinc-200">Workflows</Link>
            <Link to="/app/tools" className="hover:text-ink-primary dark:hover:text-zinc-200">Tools & MCP</Link>
            <Link to="/app/settings" className="hover:text-ink-primary dark:hover:text-zinc-200">Preferences</Link>
          </div>

          <div className="text-[11px] text-ink-muted dark:text-zinc-500">
            Simulated local execution mode · No live external APIs
          </div>
        </div>
      </footer>
    </div>
  );
};
