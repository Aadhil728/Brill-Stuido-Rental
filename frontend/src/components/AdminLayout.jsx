import React from 'react';
import { LogOut } from 'lucide-react';

function AdminLayout({ children, onLogout }) {
  return (
    <div className="min-h-screen bg-smoke">
      <header className="border-b border-black/10 bg-ink text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div>
            <p className="text-lg font-black">Brill Studio Admin</p>
            <p className="text-xs text-white/55">Local booking management</p>
          </div>
          <button type="button" onClick={onLogout} className="studio-button border border-white/20 text-white hover:bg-white/10">
            <LogOut size={17} />
            Logout
          </button>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">{children}</main>
    </div>
  );
}

export default AdminLayout;
