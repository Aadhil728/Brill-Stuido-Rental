import React from 'react';
import { formatQar } from '../utils/pricing.js';

function PriceSummary({ serviceType, hours, selectedEquipment, estimatedTotal }) {
  return (
    <aside className="rounded-lg border border-black/10 bg-white p-6 shadow-soft">
      <p className="text-sm font-bold uppercase tracking-[0.16em] text-neutral-500">Estimate</p>
      <p className="mt-4 text-4xl font-black">{formatQar(estimatedTotal)}</p>
      <div className="mt-6 space-y-3 text-sm text-neutral-600">
        <div className="flex justify-between gap-4">
          <span>Service</span>
          <span className="text-right font-semibold text-ink">{serviceType}</span>
        </div>
        <div className="flex justify-between gap-4">
          <span>Hours</span>
          <span className="font-semibold text-ink">{hours || 1}</span>
        </div>
        <div className="flex justify-between gap-4">
          <span>Equipment</span>
          <span className="text-right font-semibold text-ink">
            {selectedEquipment.length ? `${selectedEquipment.length} selected` : 'None'}
          </span>
        </div>
      </div>
      <p className="mt-6 rounded-lg bg-smoke p-4 text-sm leading-6 text-neutral-600">
        Final availability and production details are confirmed by the Brill Studio team.
      </p>
    </aside>
  );
}

export default PriceSummary;
