const express = require('express');
const router = express.Router();
const sessionController = require('../controllers/SessionController');

router.post('/petsessions', sessionController.createSession);
router.get('/petsessions', sessionController.getSessions);
router.delete('/petsessions/:id', sessionController.deleteSession);

module.exports = router;