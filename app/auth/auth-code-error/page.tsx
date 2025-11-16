import Link from "next/link";

export default function AuthCodeErrorPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-8 text-center">
        <div>
          <h1 className="text-4xl font-bold text-dark">Authentication Error</h1>
          <p className="mt-2 text-lg text-dark-gray">
            There was a problem signing you in
          </p>
        </div>

        <div className="rounded-lg bg-red-50 border border-red-200 p-6">
          <p className="text-sm text-red-800">
            The authentication code provided was invalid or has expired. This can happen if:
          </p>
          <ul className="mt-3 list-disc list-inside text-sm text-red-700 text-left space-y-1">
            <li>The sign-in link has already been used</li>
            <li>The link has expired (links are valid for 24 hours)</li>
            <li>You clicked an old email verification link</li>
            <li>There was an issue with the OAuth provider</li>
          </ul>
        </div>

        <div className="space-y-3">
          <Link
            href="/auth/signin"
            className="block w-full rounded-full bg-black px-6 py-3 text-center font-semibold text-white transition hover:bg-dark disabled:opacity-50"
          >
            Try Signing In Again
          </Link>

          <Link
            href="/"
            className="block w-full rounded-full border border-zinc-300 bg-white px-6 py-3 text-center font-semibold text-black transition hover:bg-light-gray"
          >
            Return to Home
          </Link>
        </div>

        <p className="text-sm text-dark-gray">
          Need help?{" "}
          <Link href="/help" className="font-medium text-black underline">
            Contact support
          </Link>
        </p>
      </div>
    </div>
  );
}