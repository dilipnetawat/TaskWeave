import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Home, Compass } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-canvas-light dark:bg-canvas-dark text-ink-primary dark:text-zinc-100 flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center space-y-6">
        {/* Custom SVG Graphic */}
        <div className="w-20 h-20 rounded-2xl bg-brand-50 dark:bg-brand-950/60 border border-brand-200/60 dark:border-brand-800/60 text-brand-600 dark:text-brand-400 mx-auto flex items-center justify-center shadow-subtle">
          <Compass className="w-10 h-10 animate-spin-slow stroke-[1.5]" />
        </div>

        <div className="space-y-2">
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
            Error 404 · Unmapped Route
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink-primary dark:text-zinc-100">
            This path doesn't lead anywhere.
          </h1>
          <p className="text-xs sm:text-sm text-ink-muted dark:text-zinc-400 max-w-sm mx-auto leading-relaxed">
            The page you're looking for may have moved, been renamed, or does not exist in this TaskWeave prototype build.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => navigate('/app')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-semibold shadow-subtle transition-all duration-150 active:scale-[0.98]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Workspace</span>
          </button>
          
          <button
            onClick={() => navigate('/')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-ink-secondary dark:text-zinc-200 rounded-xl text-xs font-medium transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Return Home</span>
          </button>
        </div>
      </div>
    </div>
  );
};
