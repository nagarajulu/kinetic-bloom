import { Component, type ErrorInfo, type ReactNode } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ClinicalErrorBoundary extends Component<Props, State> {
  public override state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('KineticBloom ClinicalErrorBoundary caught an error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: undefined });
    window.location.reload();
  };

  public override render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 text-slate-900 font-sans">
          <div className="max-w-md w-full bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto shadow-inner">
              <AlertCircle className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h2 className="text-xl font-extrabold text-slate-900">Application Safeguard Triggered</h2>
              <p className="text-xs text-slate-500 leading-relaxed">
                An unexpected interface issue occurred. Your child's profiles and practice logs remain safely stored in your local browser storage.
              </p>
            </div>
            {this.state.error && (
              <div className="p-3 bg-slate-50 rounded-xl text-left text-[11px] font-mono text-slate-600 border border-slate-200 overflow-x-auto max-h-24">
                {this.state.error.message}
              </div>
            )}
            <button
              type="button"
              onClick={this.handleReset}
              className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" /> Reload KineticBloom
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
