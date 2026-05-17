import {
  createBooking,
  deleteBookingById,
  filterBookings,
  findBookingById,
  readBookings,
  updateBookingStatus
} from '../models/bookingStore.js';

const REQUIRED_FIELDS = [
  'customerName',
  'email',
  'phone',
  'bookingDate',
  'startTime',
  'hours',
  'serviceType'
];

function validateBooking(payload) {
  const missing = REQUIRED_FIELDS.filter((field) => !payload[field]);

  if (missing.length) {
    return `Missing required fields: ${missing.join(', ')}`;
  }

  if (Number.isNaN(Number(payload.hours)) || Number(payload.hours) < 1) {
    return 'Hours must be at least 1.';
  }

  if (!/^\S+@\S+\.\S+$/.test(payload.email)) {
    return 'Please provide a valid email address.';
  }

  return null;
}

export async function postBooking(req, res, next) {
  try {
    const validationError = validateBooking(req.body);

    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    const booking = await createBooking(req.body);
    return res.status(201).json(booking);
  } catch (error) {
    return next(error);
  }
}

export async function getBookings(req, res, next) {
  try {
    const bookings = await readBookings();
    return res.json(filterBookings(bookings, req.query));
  } catch (error) {
    return next(error);
  }
}

export async function getBooking(req, res, next) {
  try {
    const booking = await findBookingById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found.' });
    }

    return res.json(booking);
  } catch (error) {
    return next(error);
  }
}

export async function patchBookingStatus(req, res, next) {
  try {
    const booking = await updateBookingStatus(req.params.id, req.body.status);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found.' });
    }

    return res.json(booking);
  } catch (error) {
    return next(error);
  }
}

export async function deleteBooking(req, res, next) {
  try {
    const deleted = await deleteBookingById(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: 'Booking not found.' });
    }

    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
}
