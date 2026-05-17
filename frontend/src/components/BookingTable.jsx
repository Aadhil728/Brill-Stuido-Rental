import React from 'react';
import { Trash2 } from 'lucide-react';
import StatusBadge from './StatusBadge.jsx';
import { STATUSES, formatQar } from '../utils/pricing.js';

function BookingTable({ bookings, onStatusChange, onDelete, loading }) {
  if (loading) {
    return <div className="rounded-lg border border-black/10 bg-white p-8 text-center text-neutral-600">Loading bookings...</div>;
  }

  if (!bookings.length) {
    return <div className="rounded-lg border border-black/10 bg-white p-8 text-center text-neutral-600">No bookings match the current filters.</div>;
  }

  return (
    <div className="overflow-hidden rounded-lg border border-black/10 bg-white shadow-soft">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-neutral-200">
          <thead className="bg-neutral-50">
            <tr>
              {['Customer', 'Date', 'Service', 'Equipment', 'Total', 'Status', 'Actions'].map((header) => (
                <th key={header} className="px-4 py-3 text-left text-xs font-black uppercase tracking-wide text-neutral-500">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {bookings.map((booking) => (
              <tr key={booking.id} className="align-top">
                <td className="px-4 py-4">
                  <p className="font-bold text-ink">{booking.customerName}</p>
                  <p className="mt-1 text-xs text-neutral-500">{booking.email}</p>
                  <p className="text-xs text-neutral-500">{booking.phone}</p>
                </td>
                <td className="px-4 py-4 text-sm text-neutral-700">
                  <p className="font-semibold">{booking.bookingDate}</p>
                  <p>{booking.startTime} · {booking.hours}h</p>
                </td>
                <td className="px-4 py-4 text-sm font-semibold text-neutral-700">{booking.serviceType}</td>
                <td className="px-4 py-4 text-sm text-neutral-600">
                  {booking.selectedEquipment?.length ? booking.selectedEquipment.join(', ') : 'None'}
                </td>
                <td className="px-4 py-4 text-sm font-bold text-ink">{formatQar(booking.estimatedTotal)}</td>
                <td className="px-4 py-4">
                  <div className="space-y-2">
                    <StatusBadge status={booking.status} />
                    <select
                      className="studio-input min-w-36"
                      value={booking.status}
                      onChange={(event) => onStatusChange(booking.id, event.target.value)}
                    >
                      {STATUSES.map((status) => (
                        <option key={status}>{status}</option>
                      ))}
                    </select>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <button
                    type="button"
                    className="studio-button border border-red-200 text-red-700 hover:bg-red-50"
                    onClick={() => onDelete(booking.id)}
                    aria-label={`Delete booking for ${booking.customerName}`}
                  >
                    <Trash2 size={17} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BookingTable;
