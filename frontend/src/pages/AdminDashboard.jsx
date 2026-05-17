import React, { useEffect, useMemo, useState } from 'react';
import AdminLayout from '../components/AdminLayout.jsx';
import BookingTable from '../components/BookingTable.jsx';
import DashboardCard from '../components/DashboardCard.jsx';
import { api, clearAdminToken, hasAdminToken, saveAdminToken } from '../services/api.js';
import { SERVICE_TYPES, STATUSES, formatQar } from '../utils/pricing.js';

function AdminLogin({ onLogin }) {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.loginAdmin(credentials);
      saveAdminToken(response.token);
      onLogin();
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid min-h-screen place-items-center bg-ink px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md rounded-lg bg-white p-7 shadow-soft">
        <h1 className="text-3xl font-black">Admin Login</h1>
        <p className="mt-2 text-sm text-neutral-500">Use the local admin account to manage bookings.</p>
        <label className="mt-6 block space-y-2">
          <span className="studio-label">Username</span>
          <input className="studio-input" value={credentials.username} onChange={(event) => setCredentials({ ...credentials, username: event.target.value })} />
        </label>
        <label className="mt-4 block space-y-2">
          <span className="studio-label">Password</span>
          <input className="studio-input" type="password" value={credentials.password} onChange={(event) => setCredentials({ ...credentials, password: event.target.value })} />
        </label>
        {error && <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm font-semibold text-red-700">{error}</p>}
        <button type="submit" disabled={loading} className="studio-button mt-6 w-full bg-ink text-white hover:bg-charcoal">
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}

function AdminDashboard() {
  const [authenticated, setAuthenticated] = useState(hasAdminToken());
  const [bookings, setBookings] = useState([]);
  const [filters, setFilters] = useState({ name: '', date: '', status: 'All', serviceType: 'All' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const summary = useMemo(() => {
    const totalBookings = bookings.length;
    const pendingBookings = bookings.filter((booking) => booking.status === 'Pending').length;
    const confirmedBookings = bookings.filter((booking) => booking.status === 'Confirmed').length;
    const estimatedRevenue = bookings.reduce((sum, booking) => sum + (Number(booking.estimatedTotal) || 0), 0);

    return { totalBookings, pendingBookings, confirmedBookings, estimatedRevenue };
  }, [bookings]);

  async function loadBookings(nextFilters = filters) {
    setLoading(true);
    setError('');

    try {
      const data = await api.getBookings(nextFilters);
      setBookings(data);
    } catch (requestError) {
      setError(requestError.message);
      if (requestError.message.toLowerCase().includes('token')) {
        clearAdminToken();
        setAuthenticated(false);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (authenticated) {
      loadBookings();
    }
  }, [authenticated]);

  function updateFilter(field, value) {
    const nextFilters = { ...filters, [field]: value };
    setFilters(nextFilters);
    loadBookings(nextFilters);
  }

  async function handleStatusChange(id, status) {
    try {
      await api.updateBookingStatus(id, status);
      await loadBookings();
    } catch (requestError) {
      setError(requestError.message);
    }
  }

  async function handleDelete(id) {
    const confirmed = window.confirm('Delete this booking request?');
    if (!confirmed) return;

    try {
      await api.deleteBooking(id);
      await loadBookings();
    } catch (requestError) {
      setError(requestError.message);
    }
  }

  if (!authenticated) {
    return <AdminLogin onLogin={() => setAuthenticated(true)} />;
  }

  return (
    <AdminLayout
      onLogout={() => {
        clearAdminToken();
        setAuthenticated(false);
      }}
    >
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-clay">Dashboard</p>
          <h1 className="mt-2 text-4xl font-black">Booking requests</h1>
        </div>
      </div>

      <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <DashboardCard label="Total bookings" value={summary.totalBookings} />
        <DashboardCard label="Pending bookings" value={summary.pendingBookings} />
        <DashboardCard label="Confirmed bookings" value={summary.confirmedBookings} />
        <DashboardCard label="Estimated revenue" value={formatQar(summary.estimatedRevenue)} />
      </div>

      <div className="mt-7 grid gap-3 rounded-lg border border-black/10 bg-white p-4 shadow-soft md:grid-cols-4">
        <input className="studio-input" placeholder="Search by name" value={filters.name} onChange={(event) => updateFilter('name', event.target.value)} />
        <input className="studio-input" type="date" value={filters.date} onChange={(event) => updateFilter('date', event.target.value)} />
        <select className="studio-input" value={filters.status} onChange={(event) => updateFilter('status', event.target.value)}>
          <option>All</option>
          {STATUSES.map((status) => (
            <option key={status}>{status}</option>
          ))}
        </select>
        <select className="studio-input" value={filters.serviceType} onChange={(event) => updateFilter('serviceType', event.target.value)}>
          <option>All</option>
          {SERVICE_TYPES.map((service) => (
            <option key={service}>{service}</option>
          ))}
        </select>
      </div>

      {error && <p className="mt-5 rounded-lg bg-red-50 p-3 text-sm font-semibold text-red-700">{error}</p>}

      <div className="mt-6">
        <BookingTable bookings={bookings} loading={loading} onStatusChange={handleStatusChange} onDelete={handleDelete} />
      </div>
    </AdminLayout>
  );
}

export default AdminDashboard;
