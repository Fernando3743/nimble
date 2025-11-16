import Link from "next/link";

export default function ProfileHeader() {
  return (
    <header className="border-b border-zinc-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-black text-dark">My Profile</h1>
          <Link
            href="/"
            className="text-sm font-semibold text-dark-gray hover:text-dark"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </header>
  );
}
