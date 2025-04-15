const express = require('express');
const router = express.Router();
const Eventpetregistercontroller = require('../controllers/Eventpetregistercontroller');

router.post('/eventpetregister', Eventpetregistercontroller.createRegistration);

module.exports = router;