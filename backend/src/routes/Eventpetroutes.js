const express = require('express');
const router = express.Router();
const Eventpetregistercontroller = require('../controllers/Eventpetregistercontroller');

router.post('/eventpetregister', Eventpetregistercontroller.createRegistration);
router.get('/eventpetregister/:eventId', Eventpetregistercontroller.getRegistrationsByEvent);

module.exports = router;