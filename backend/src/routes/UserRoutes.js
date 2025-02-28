const routes = require("express").Router();
const userController = require("../controllers/UserController");

// Changes: Added "/api" prefix to login and signup routes
routes.post("/api/signup", userController.signup); // Signup route
routes.post("/api/login", userController.loginUser); // Login route

routes.post("/user", userController.signup);
routes.get("/users", userController.getAllUsers);
routes.get("/user/:id", userController.getUserById);
routes.delete("/user/:id", userController.deleteUserById);

module.exports = routes;
