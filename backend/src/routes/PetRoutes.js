const routes = require("express").Router();
const PetController = require("../controllers/PetController");


routes.post("/pet",PetController.addPet);


module.exports = routes;