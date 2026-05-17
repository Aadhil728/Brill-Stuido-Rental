import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { CalendarDays } from 'lucide-react';

const links = [
  { to: '/', label: 'Home' },
  { to: '/pricing', label: 'Services & Pricing' },
  { to: '/book', label: 'Book Studio' }
];

function Navbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-black/10 bg-smoke/90 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-ink text-sm font-black text-white">
            BS
          </span>
          <span className="text-base font-black tracking-wide">Brill Studio</span>
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-sm font-semibold ${isActive ? 'text-ink' : 'text-neutral-600 hover:text-ink'}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <Link to="/book" className="studio-button bg-ink text-white hover:bg-charcoal">
          <CalendarDays size={18} />
          Book
        </Link>
      </nav>
    </header>
  );
}

export default Navbar;
