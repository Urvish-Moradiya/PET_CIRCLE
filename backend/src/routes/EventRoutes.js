const express = require('express');
const router = express.Router();
const EventsController = require('../controllers/EventsController');

router.get('/events', EventsController.getEvents);
router.post('/events', EventsController.createEvent);

module.exports = router;