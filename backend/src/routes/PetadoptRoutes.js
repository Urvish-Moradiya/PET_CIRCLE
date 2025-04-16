const routes = require("express").Router();

const petadoptController = require('../controllers/PetadoptController');

routes.post('/adoptpet', petadoptController.addAdoptpet);
routes.get('/adoptpet', petadoptController.getAllPets);
routes.delete('/adoptpet/:id', petadoptController.deleteAdoptpet);


module.exports = routes;