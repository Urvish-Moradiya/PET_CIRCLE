const routes = require("express").Router()
const userController = require("../controllers/UserController")
routes.get("/users",userController.getAllUser)
routes.post("/user",userController.addUser)
routes.delete("/user/:id",userController.deleteUser)
routes.get("/user/:id",userController.getUserById)

module.exports = routes