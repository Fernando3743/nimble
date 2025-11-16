"use client";

import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: { componentStack: string }) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state to trigger fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: { componentStack: string }) {
    // Log error to console in development
    if (process.env.NODE_ENV === "development") {
      console.error("Error Boundary caught:", error, errorInfo);
    }

    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default fallback UI
      return (
        <div className="flex min-h-[400px] flex-col items-center justify-center p-8">
          <div className="text-center">
            <h2 className="mb-2 text-2xl font-bold text-dark">Something went wrong</h2>
            <p className="mb-4 text-dark-gray">
              We encountered an unexpected error. Please try refreshing the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="rounded-full bg-black px-6 py-2 font-semibold text-white transition hover:bg-dark"
            >
              Refresh Page
            </button>
          </div>
          {process.env.NODE_ENV === "development" && this.state.error && (
            <details className="mt-8 w-full max-w-2xl rounded-lg bg-red-50 p-4">
              <summary className="cursor-pointer font-semibold text-red-700">
                Error Details (Development Only)
              </summary>
              <pre className="mt-2 overflow-auto text-xs text-red-600">
                {this.state.error.stack}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}