const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
 
// Serve static files from the uploads directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Create uploads directory if it doesn't exist
const uploadDir = path.join(__dirname, "Uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const userRoutes = require("./src/routes/UserRoutes");
app.use(userRoutes);

const PetRoutes = require("./src/routes/PetRoutes");
app.use(PetRoutes);

const AdoptionRoutes = require("./src/routes/AdoptionRoutes");
app.use(AdoptionRoutes);

const PetadoptRoutes = require("./src/routes/PetadoptRoutes");
app.use(PetadoptRoutes);

const CommunityRoutes = require("./src/routes/CommunityRoutes");
app.use("/api",CommunityRoutes);

const authroutes = require("./src/routes/authroutes");
app.use("/api", authroutes);

const ArticleRoutes = require("./src/routes/ArticleRoutes");
app.use(ArticleRoutes);

const SessionRoutes = require("./src/routes/PetSessionRoutes");
app.use(SessionRoutes);

const EventRoutes = require("./src/routes/EventRoutes");
app.use(EventRoutes);

const Eventpetroutes = require('./src/routes/Eventpetroutes');
app.use(Eventpetroutes);

const AdminRoutes = require("./src/routes/admin");
app.use("/admin", AdminRoutes);

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
