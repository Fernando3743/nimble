"use client";

import { ErrorBoundary } from "@/components/ErrorBoundary";
import { ReactNode } from "react";
import { Link } from "@/lib/i18n/routing";

interface ProfileErrorBoundaryProps {
  children: ReactNode;
}

export function ProfileErrorBoundary({ children }: ProfileErrorBoundaryProps) {
  return (
    <ErrorBoundary
      fallback={
        <div className="flex min-h-screen items-center justify-center px-4 py-12">
          <div className="w-full max-w-md space-y-6 text-center">
            <div>
              <h1 className="text-3xl font-bold text-dark">Profile Error</h1>
              <p className="mt-2 text-lg text-dark-gray">
                We're having trouble loading your profile
              </p>
            </div>

            <div className="rounded-lg bg-yellow-50 border border-yellow-200 p-4">
              <p className="text-sm text-yellow-800">
                This could be due to a connection issue or a temporary problem with our servers.
                Please try again in a moment.
              </p>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => window.location.reload()}
                className="block w-full rounded-full bg-black px-6 py-3 text-center font-semibold text-white transition hover:bg-dark"
              >
                Try Again
              </button>

              <Link
                href="/"
                className="block w-full rounded-full border border-zinc-300 bg-white px-6 py-3 text-center font-semibold text-black transition hover:bg-light-gray"
              >
                Go to Home
              </Link>
            </div>
          </div>
        </div>
      }
      onError={(error, errorInfo) => {
        // In production, you would send this to an error tracking service
        console.error("Profile page error:", error, errorInfo);
      }}
    >
      {children}
    </ErrorBoundary>
  );
}