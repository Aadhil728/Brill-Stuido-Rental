const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';
const TOKEN_KEY = 'brill_admin_token';

async function request(path, options = {}) {
  const token = localStorage.getItem(TOKEN_KEY);
  let response;

  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers
      }
    });
  } catch {
    throw new Error('Backend is not reachable. Start the backend and confirm the /api/health endpoint works.');
  }

  if (!response.ok) {
    let message = 'Request failed.';

    try {
      const error = await response.json();
      message = error.message || message;
    } catch {
      message = response.statusText || message;
    }

    throw new Error(message);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

export function saveAdminToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearAdminToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export function hasAdminToken() {
  return Boolean(localStorage.getItem(TOKEN_KEY));
}

export const api = {
  createBooking: (payload) =>
    request('/bookings', {
      method: 'POST',
      body: JSON.stringify(payload)
    }),
  loginAdmin: (payload) =>
    request('/admin/login', {
      method: 'POST',
      body: JSON.stringify(payload)
    }),
  getBookings: (filters = {}) => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== 'All') {
        params.set(key, value);
      }
    });
    const query = params.toString();
    return request(`/bookings${query ? `?${query}` : ''}`);
  },
  updateBookingStatus: (id, status) =>
    request(`/bookings/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status })
    }),
  deleteBooking: (id) =>
    request(`/bookings/${id}`, {
      method: 'DELETE'
    })
};
