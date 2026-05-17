import React from 'react';
import { ArrowRight, Camera, Wifi, Wand2 } from 'lucide-react';
import { Link } from 'react-router-dom';

function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-ink text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(176,138,95,0.25),transparent_32%),linear-gradient(135deg,rgba(255,255,255,0.08),transparent_45%)]" />
      <div className="relative mx-auto grid min-h-[720px] max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-clay">Brill Studio Rental Service</p>
          <h1 className="mt-5 max-w-3xl text-5xl font-black leading-tight sm:text-6xl lg:text-7xl">
            Book a production-ready creative studio.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/72">
            Rent a fully equipped space with lighting, makeup room, kitchen access, WiFi, and basic assistant support for smooth shoots.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/book" className="studio-button bg-white text-ink hover:bg-neutral-200">
              Book Studio
              <ArrowRight size={18} />
            </Link>
            <Link to="/pricing" className="studio-button border border-white/25 text-white hover:bg-white/10">
              View Packages
            </Link>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="rounded-lg border border-white/15 bg-white/10 p-6 shadow-soft backdrop-blur">
            <p className="text-sm font-semibold text-white/60">Studio Rental</p>
            <p className="mt-3 text-5xl font-black">300 QAR</p>
            <p className="mt-2 text-sm text-white/60">per hour</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { icon: Camera, label: 'Pro lighting setup' },
              { icon: Wand2, label: 'Makeup room' },
              { icon: Wifi, label: 'High-speed WiFi' }
            ].map((item) => (
              <div key={item.label} className="rounded-lg border border-white/15 bg-white/10 p-5 backdrop-blur">
                <item.icon size={24} className="text-clay" />
                <p className="mt-4 text-sm font-bold leading-5">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
