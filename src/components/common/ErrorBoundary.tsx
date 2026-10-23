import { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('TaskWeave ErrorBoundary caught an exception:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-canvas-light dark:bg-canvas-dark flex items-center justify-center p-6 text-ink-primary dark:text-zinc-100">
          <div className="max-w-md w-full bg-white dark:bg-canvas-dark-subtle border border-zinc-200 dark:border-zinc-800 rounded-xl p-8 shadow-elevated text-center">
            <div className="w-12 h-12 rounded-full bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 mx-auto flex items-center justify-center mb-4">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Something unexpected occurred</h2>
            <p className="text-sm text-ink-muted dark:text-zinc-400 mb-6">
              The application encountered a recoverable interface exception. Your saved workflows and settings are safe.
            </p>
            {this.state.error && (
              <pre className="text-xs text-left bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded p-3 mb-6 overflow-x-auto text-rose-700 dark:text-rose-300 font-mono">
                {this.state.error.message}
              </pre>
            )}
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="inline-flex items-center gap-2 px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-lg text-sm font-medium transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Reload Application
              </button>
              <a
                href="/"
                className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-ink-secondary dark:text-zinc-200 rounded-lg text-sm font-medium transition-colors"
              >
                <Home className="w-4 h-4" />
                Go to Landing
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
