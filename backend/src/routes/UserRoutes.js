const routes = require("express").Router();
const userController = require("../controllers/UserController");

routes.post("/api/signup", userController.signup);
routes.post("/api/login", userController.loginUser);
routes.post("/api/update-bio", userController.updateUserBio);
routes.get("/api/user/:id", userController.getUserById);

module.exports = routes;