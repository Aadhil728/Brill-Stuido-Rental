import React from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import { formatQar } from '../utils/pricing.js';

function BookingConfirmation() {
  const { state } = useLocation();
  const booking = state?.booking;

  if (!booking) {
    return <Navigate to="/book" replace />;
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-lg border border-black/10 bg-white p-8 shadow-soft">
        <CheckCircle2 size={48} className="text-emerald-600" />
        <h1 className="mt-5 text-4xl font-black">Booking request received</h1>
        <p className="mt-3 text-neutral-600">
          Our team will contact you to confirm availability and finalize your booking.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {[
            ['Customer', booking.customerName],
            ['Email', booking.email],
            ['Phone', booking.phone],
            ['Date', booking.bookingDate],
            ['Start time', booking.startTime],
            ['Service', booking.serviceType],
            ['Equipment', booking.selectedEquipment?.length ? booking.selectedEquipment.join(', ') : 'None'],
            ['Estimated total', formatQar(booking.estimatedTotal)]
          ].map(([label, value]) => (
            <div key={label} className="rounded-lg bg-smoke p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-neutral-500">{label}</p>
              <p className="mt-1 font-semibold">{value}</p>
            </div>
          ))}
        </div>

        <Link to="/" className="studio-button mt-8 bg-ink text-white hover:bg-charcoal">
          Back to home
        </Link>
      </div>
    </div>
  );
}

export default BookingConfirmation;
