const routes = require("express").Router();
const PetController = require("../controllers/PetController");


routes.post("/pets",PetController.addPet);
routes.get('/pets', PetController.getPets);


module.exports = routes;