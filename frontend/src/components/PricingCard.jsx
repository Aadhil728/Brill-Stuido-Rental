import React from 'react';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';

function PricingCard({ title, price, duration, features, highlighted }) {
  return (
    <article
      className={`rounded-lg border p-6 shadow-soft ${
        highlighted ? 'border-ink bg-ink text-white' : 'border-black/10 bg-white text-ink'
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-black">{title}</h3>
          {duration && (
            <p className={`mt-1 text-sm ${highlighted ? 'text-white/60' : 'text-neutral-500'}`}>
              {duration}
            </p>
          )}
        </div>
        <p className="text-2xl font-black">{price}</p>
      </div>
      <ul className="mt-6 space-y-3">
        {features.map((feature) => (
          <li key={feature} className="flex gap-3 text-sm leading-6">
            <Check size={18} className={highlighted ? 'mt-0.5 text-clay' : 'mt-0.5 text-ink'} />
            <span className={highlighted ? 'text-white/80' : 'text-neutral-600'}>{feature}</span>
          </li>
        ))}
      </ul>
      <Link
        to="/book"
        className={`studio-button mt-7 w-full ${
          highlighted ? 'bg-white text-ink hover:bg-neutral-200' : 'bg-ink text-white hover:bg-charcoal'
        }`}
      >
        Select
      </Link>
    </article>
  );
}

export default PricingCard;
