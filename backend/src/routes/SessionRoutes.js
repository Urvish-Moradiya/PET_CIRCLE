const express = require('express');
const router = express.Router();
const sessionController = require('../controllers/SessionController');

router.post('/sessions', sessionController.createSession);
router.get('/sessions', sessionController.getSessions);

module.exports = router;