import React from 'react';

function Footer() {
  return (
    <footer className="border-t border-black/10 bg-ink text-white">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <p className="text-lg font-black">Brill Studio</p>
          <p className="mt-2 text-sm text-white/65">Creative rental space for photography, video, podcasts, and productions.</p>
        </div>
        <div>
          <p className="text-sm font-bold text-white">Studio Rate</p>
          <p className="mt-2 text-sm text-white/65">300 QAR/hour with professional amenities.</p>
        </div>
        <div>
          <p className="text-sm font-bold text-white">Admin</p>
          <a className="mt-2 inline-block text-sm text-white/65 hover:text-white" href="/admin">
            Local dashboard
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
