interface ProfileSidebarProps {
  onSignOut: () => void;
}

export default function ProfileSidebar({ onSignOut }: ProfileSidebarProps) {
  return (
    <aside className="lg:col-span-1">
      <nav className="space-y-1 rounded-lg bg-white p-4 shadow-sm">
        <a
          href="#"
          className="block rounded-lg bg-light-gray px-4 py-3 text-sm font-semibold text-dark"
        >
          Account Details
        </a>
        <a
          href="#"
          className="block rounded-lg px-4 py-3 text-sm font-semibold text-dark-gray transition hover:bg-light-gray hover:text-dark"
        >
          Orders
        </a>
        <a
          href="#"
          className="block rounded-lg px-4 py-3 text-sm font-semibold text-dark-gray transition hover:bg-light-gray hover:text-dark"
        >
          Wishlist
        </a>
        <button
          onClick={onSignOut}
          className="w-full rounded-lg px-4 py-3 text-left text-sm font-semibold text-dark-gray transition hover:bg-light-gray hover:text-dark"
          type="button"
        >
          Sign Out
        </button>
      </nav>
    </aside>
  );
}
