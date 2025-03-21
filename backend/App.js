const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
 
const userRoutes = require("./src/routes/UserRoutes");
app.use(userRoutes);

const PetRoutes = require("./src/routes/PetRoutes");
app.use(PetRoutes);

const AdoptionRoutes = require("./src/routes/AdoptionRoutes");
app.use(AdoptionRoutes);


const PetadoptRoutes = require("./src/routes/PetadoptRoutes");
app.use(PetadoptRoutes);



mongoose.connect("mongodb://127.0.0.1:27017/Pet_circle")
  .then(() => {
    console.log("Database connected....");
  })
  .catch((err) => {
    console.error("Database connection error:", err); // Log connection errors
  });

const PORT = 5000; // Ensure this matches the port your frontend expects
app.listen(PORT, () => {
    console.log("Server started on port number ", PORT);
});
