import { Router } from 'express';
import {
  deleteBooking,
  getBooking,
  getBookings,
  patchBookingStatus,
  postBooking
} from '../controllers/bookingController.js';
import { requireAdmin } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/', postBooking);
router.get('/', requireAdmin, getBookings);
router.get('/:id', requireAdmin, getBooking);
router.patch('/:id/status', requireAdmin, patchBookingStatus);
router.delete('/:id', requireAdmin, deleteBooking);

export default router;
