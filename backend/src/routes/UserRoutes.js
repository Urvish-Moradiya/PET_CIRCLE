const routes = require("express").Router();
const userController = require("../controllers/UserController");

routes.post("/api/signup", userController.signup);
routes.post("/api/login", userController.login);
routes.post("/api/update-bio", userController.updateUserBio);
routes.get("/api/user/:id", userController.getUserById);
routes.get('/api/users', userController.getAllUsers);
routes.put('/api/user/:id', userController.updateUser);
routes.delete('/api/user/:id', userController.deleteUser);

module.exports = routes;