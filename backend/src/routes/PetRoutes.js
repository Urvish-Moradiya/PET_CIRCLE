const routes = require("express").Router();
const { addPet, getPets, getPetById, updatePet, deletePet } = require("../controllers/PetController");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/multerConfig");

routes.post("/pets", authMiddleware, upload.single("profileImage"), addPet);
routes.get("/pets", authMiddleware, getPets);
routes.get("/pets/:petId", authMiddleware, getPetById);
routes.put("/pets/:id", authMiddleware, upload.single("profileImage"), updatePet);
routes.delete("/pets/:id", authMiddleware, deletePet);


module.exports = routes;