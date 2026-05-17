import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { nanoid } from 'nanoid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_PATH = path.join(__dirname, '..', 'data', 'bookings.json');

const VALID_STATUSES = ['Pending', 'Confirmed', 'Completed', 'Cancelled'];

async function ensureStore() {
  await fs.mkdir(path.dirname(DATA_PATH), { recursive: true });
  try {
    await fs.access(DATA_PATH);
  } catch {
    await fs.writeFile(DATA_PATH, '[]', 'utf8');
  }
}

export async function readBookings() {
  await ensureStore();
  const raw = await fs.readFile(DATA_PATH, 'utf8');
  return JSON.parse(raw || '[]');
}

export async function writeBookings(bookings) {
  await ensureStore();
  await fs.writeFile(DATA_PATH, JSON.stringify(bookings, null, 2), 'utf8');
}

export async function createBooking(payload) {
  const bookings = await readBookings();
  const booking = {
    id: nanoid(12),
    customerName: payload.customerName,
    email: payload.email,
    phone: payload.phone,
    bookingDate: payload.bookingDate,
    startTime: payload.startTime,
    hours: Number(payload.hours),
    serviceType: payload.serviceType,
    selectedEquipment: payload.selectedEquipment || [],
    notes: payload.notes || '',
    estimatedTotal: payload.estimatedTotal,
    status: 'Pending',
    createdAt: new Date().toISOString()
  };

  bookings.unshift(booking);
  await writeBookings(bookings);
  return booking;
}

export async function findBookingById(id) {
  const bookings = await readBookings();
  return bookings.find((booking) => booking.id === id);
}

export async function updateBookingStatus(id, status) {
  if (!VALID_STATUSES.includes(status)) {
    const error = new Error('Invalid booking status.');
    error.statusCode = 400;
    throw error;
  }

  const bookings = await readBookings();
  const index = bookings.findIndex((booking) => booking.id === id);

  if (index === -1) {
    return null;
  }

  bookings[index] = { ...bookings[index], status };
  await writeBookings(bookings);
  return bookings[index];
}

export async function deleteBookingById(id) {
  const bookings = await readBookings();
  const nextBookings = bookings.filter((booking) => booking.id !== id);

  if (nextBookings.length === bookings.length) {
    return false;
  }

  await writeBookings(nextBookings);
  return true;
}

export function filterBookings(bookings, query) {
  const name = query.name?.toLowerCase().trim();
  const date = query.date?.trim();
  const status = query.status?.trim();
  const serviceType = query.serviceType?.trim();

  return bookings.filter((booking) => {
    const matchesName = !name || booking.customerName.toLowerCase().includes(name);
    const matchesDate = !date || booking.bookingDate === date;
    const matchesStatus = !status || status === 'All' || booking.status === status;
    const matchesService = !serviceType || serviceType === 'All' || booking.serviceType === serviceType;

    return matchesName && matchesDate && matchesStatus && matchesService;
  });
}
