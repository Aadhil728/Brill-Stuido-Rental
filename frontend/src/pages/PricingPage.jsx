import React from 'react';
import PricingCard from '../components/PricingCard.jsx';

const packages = [
  {
    title: 'Package 1',
    price: '170 QAR',
    duration: '1 hour',
    features: ['Photographer included', '10-20 professionally edited photos', 'RAW files included']
  },
  {
    title: 'Package 2',
    price: '300 QAR',
    duration: '1 hour',
    highlighted: true,
    features: ['Photographer included', '10-20 professionally edited photos', '2-3 short vertical videos', 'RAW files included']
  },
  {
    title: 'Package 3',
    price: '500 QAR',
    duration: '2 hours',
    features: ['Photographer included', '20-30 professionally edited photos', '2-3 short vertical videos', 'All RAW files included']
  }
];

const equipment = ['Lighting & Grip Kit', 'Photography Kit', 'Video Kit', 'Camera Kit', 'Pro Audio Gear'];

function PricingPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-clay">Services & Pricing</p>
        <h1 className="mt-3 text-4xl font-black sm:text-5xl">Clear options for studio rentals and content packages.</h1>
      </div>

      <section className="mt-10 rounded-lg border border-black/10 bg-white p-6 shadow-soft">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-2xl font-black">Studio Space Rental</h2>
            <p className="mt-2 text-neutral-600">Rent the Brill Studio space by the hour.</p>
          </div>
          <p className="text-4xl font-black">300 QAR/hour</p>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-black">Equipment Add-ons</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {equipment.map((item) => (
            <div key={item} className="rounded-lg border border-black/10 bg-white p-5 shadow-soft">
              <p className="font-black">{item}</p>
              <p className="mt-4 text-2xl font-black">450 QAR</p>
              <p className="mt-1 text-sm text-neutral-500">per day</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-black">Professional Service Packages</h2>
        <div className="mt-5 grid gap-5 lg:grid-cols-3">
          {packages.map((pack) => (
            <PricingCard key={pack.title} {...pack} />
          ))}
        </div>
      </section>

      <section className="mt-12 rounded-lg bg-ink p-7 text-white shadow-soft">
        <h2 className="text-2xl font-black">Custom Projects</h2>
        <p className="mt-3 max-w-3xl text-white/70">
          Podcasts, interviews, talking-head videos, special productions, and larger creative builds are quoted based on scope.
        </p>
      </section>
    </div>
  );
}

export default PricingPage;
