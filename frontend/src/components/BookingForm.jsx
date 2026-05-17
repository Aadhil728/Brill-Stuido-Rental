import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PriceSummary from './PriceSummary.jsx';
import { api } from '../services/api.js';
import { calculatePrice, EQUIPMENT_ADDONS, SERVICE_TYPES } from '../utils/pricing.js';

const initialForm = {
  customerName: '',
  email: '',
  phone: '',
  bookingDate: '',
  startTime: '',
  hours: 1,
  serviceType: 'Studio Rental Only',
  selectedEquipment: [],
  notes: ''
};

function validate(form) {
  if (!form.customerName.trim()) return 'Customer name is required.';
  if (!/^\S+@\S+\.\S+$/.test(form.email)) return 'A valid email address is required.';
  if (!form.phone.trim()) return 'Phone number is required.';
  if (!form.bookingDate) return 'Booking date is required.';
  if (!form.startTime) return 'Start time is required.';
  if (Number(form.hours) < 1) return 'Number of hours must be at least 1.';
  return null;
}

function BookingForm() {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const estimatedTotal = useMemo(() => calculatePrice(form), [form]);

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function toggleEquipment(item) {
    setForm((current) => {
      const exists = current.selectedEquipment.includes(item);
      return {
        ...current,
        selectedEquipment: exists
          ? current.selectedEquipment.filter((selected) => selected !== item)
          : [...current.selectedEquipment, item]
      };
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');

    const validationError = validate(form);
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    try {
      const booking = await api.createBooking({
        ...form,
        hours: Number(form.hours),
        estimatedTotal
      });
      navigate('/booking-confirmation', { state: { booking } });
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-[1fr_360px]">
      <div className="rounded-lg border border-black/10 bg-white p-6 shadow-soft">
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="space-y-2">
            <span className="studio-label">Customer name</span>
            <input className="studio-input" value={form.customerName} onChange={(event) => updateField('customerName', event.target.value)} />
          </label>
          <label className="space-y-2">
            <span className="studio-label">Email</span>
            <input className="studio-input" type="email" value={form.email} onChange={(event) => updateField('email', event.target.value)} />
          </label>
          <label className="space-y-2">
            <span className="studio-label">Phone number</span>
            <input className="studio-input" value={form.phone} onChange={(event) => updateField('phone', event.target.value)} />
          </label>
          <label className="space-y-2">
            <span className="studio-label">Booking date</span>
            <input className="studio-input" type="date" value={form.bookingDate} onChange={(event) => updateField('bookingDate', event.target.value)} />
          </label>
          <label className="space-y-2">
            <span className="studio-label">Start time</span>
            <input className="studio-input" type="time" value={form.startTime} onChange={(event) => updateField('startTime', event.target.value)} />
          </label>
          <label className="space-y-2">
            <span className="studio-label">Number of hours</span>
            <input className="studio-input" type="number" min="1" value={form.hours} onChange={(event) => updateField('hours', event.target.value)} />
          </label>
          <label className="space-y-2 sm:col-span-2">
            <span className="studio-label">Service type</span>
            <select className="studio-input" value={form.serviceType} onChange={(event) => updateField('serviceType', event.target.value)}>
              {SERVICE_TYPES.map((service) => (
                <option key={service}>{service}</option>
              ))}
            </select>
          </label>
        </div>

        <div className="mt-7">
          <p className="studio-label">Equipment add-ons</p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {EQUIPMENT_ADDONS.map((item) => (
              <label key={item} className="flex items-center gap-3 rounded-lg border border-black/10 p-3 text-sm font-semibold">
                <input
                  type="checkbox"
                  checked={form.selectedEquipment.includes(item)}
                  onChange={() => toggleEquipment(item)}
                  className="h-4 w-4 accent-ink"
                />
                {item}
              </label>
            ))}
          </div>
        </div>

        <label className="mt-7 block space-y-2">
          <span className="studio-label">Extra instructions / notes</span>
          <textarea
            className="studio-input min-h-32 resize-y"
            value={form.notes}
            onChange={(event) => updateField('notes', event.target.value)}
          />
        </label>

        {error && <p className="mt-5 rounded-lg bg-red-50 p-3 text-sm font-semibold text-red-700">{error}</p>}

        <button type="submit" disabled={loading} className="studio-button mt-6 w-full bg-ink text-white hover:bg-charcoal sm:w-auto">
          {loading ? 'Submitting...' : 'Submit booking request'}
        </button>
      </div>

      <PriceSummary
        serviceType={form.serviceType}
        hours={form.hours}
        selectedEquipment={form.selectedEquipment}
        estimatedTotal={estimatedTotal}
      />
    </form>
  );
}

export default BookingForm;
