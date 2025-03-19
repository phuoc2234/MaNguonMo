const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

router.get('/', bookingController.getAllBookings);
router.get('/new', bookingController.getNewBookingForm);
router.post('/new', bookingController.createBooking);
router.get('/edit/:id', bookingController.getEditBookingForm);
router.post('/edit/:id', bookingController.updateBooking);
router.post('/cancel/:id', bookingController.cancelBooking);

module.exports = router;
