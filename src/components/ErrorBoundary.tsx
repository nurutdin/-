import React, { Component, ErrorInfo, ReactNode } from 'react';
import { RotateCcw, AlertTriangle } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleReset = () => {
    try {
      // Clear potentially corrupted local state if needed
      this.setState({ hasError: false, error: null });
      window.location.reload();
    } catch {
      window.location.reload();
    }
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-neutral-950 text-neutral-100 flex items-center justify-center p-6 font-sans">
          <div className="max-w-md w-full p-6 rounded-2xl bg-neutral-900 border border-neutral-800 text-center space-y-4 shadow-2xl">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-bold text-white">Произошло обновление данных</h2>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Страница была обновлена. Нажмите кнопку ниже, чтобы перезапустить сайт playgroundoffline в актуальном состоянии.
            </p>
            <button
              onClick={this.handleReset}
              className="w-full py-3 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Перезапустить playgroundoffline</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
