import React from 'react';

function DashboardCard({ label, value }) {
  return (
    <div className="rounded-lg border border-black/10 bg-white p-5 shadow-soft">
      <p className="text-sm font-semibold text-neutral-500">{label}</p>
      <p className="mt-2 text-3xl font-black text-ink">{value}</p>
    </div>
  );
}

export default DashboardCard;
