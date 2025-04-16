const routes = require("express").Router();
const userController = require("../controllers/UserController");

routes.post("/api/signup", userController.signup);
routes.post("/api/login", userController.login);
routes.post("/api/update-bio", userController.updateUserBio);
routes.get("/api/user/:id", userController.getUserById);
routes.get('/api/users', userController.getAllUsers);

module.exports = routes;