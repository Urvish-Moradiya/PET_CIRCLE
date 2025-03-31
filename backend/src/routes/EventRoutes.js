const express = require('express');
const router = express.Router();
const eventController = require('../controllers/EventsController');

router.get('/events', eventController.getAllEvents);
router.post('/events', eventController.createEvent);
router.post('/events/rsvp', eventController.rsvpEvent);
router.get('/events/:id', eventController.getEventById);
router.post('/register', eventController.registerUser);

module.exports = router;