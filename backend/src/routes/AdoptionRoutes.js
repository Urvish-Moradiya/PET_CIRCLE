const routes = require("express").Router();

const adoptionController = require('../controllers/AdoptionController'); // Adjust path to your controller

// Routes
routes.post('/centers', adoptionController.addCenter);
routes.get('/centers', adoptionController.getCenters);
routes.delete('/centers/:id', adoptionController.deleteCenter);

module.exports = routes;