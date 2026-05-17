import React from 'react';

function ServiceCard({ title, description, icon: Icon }) {
  return (
    <div className="rounded-lg border border-black/10 bg-white p-6 shadow-soft">
      {Icon && (
        <div className="mb-5 grid h-11 w-11 place-items-center rounded-lg bg-ink text-white">
          <Icon size={22} />
        </div>
      )}
      <h3 className="text-lg font-black">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-neutral-600">{description}</p>
    </div>
  );
}

export default ServiceCard;
