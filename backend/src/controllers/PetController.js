const PetModel = require("../models/PetModel");

const addPet = async (req, res) => {
  try {
    const {
      userId,
      name,
      type,
      breed,
      birthday,
      weight,
      allergies,
      favoriteFood,
      activities,
      profileImage,
    } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const newPet = {
      userId,
      name,
      type,
      breed,
      birthday,
      weight,
      allergies: allergies || "None",
      favoriteFood: favoriteFood || "Not specified",
      activities: activities || [],
      profileImage: profileImage || "https://via.placeholder.com/300",
    };

    const createdPet = await PetModel.create(newPet);
    res.status(201).json({
      message: "Pet created successfully",
      data: createdPet,
    });
  } catch (err) {
    console.error("Add pet error:", err);
    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
};

const getPets = async (req, res) => {
  try {
    const { userId } = req.query;
    console.log("Received userId from query:", userId);
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const pets = await PetModel.find({ userId });
    console.log("Query result for userId:", userId, "Pets:", pets);
    if (!pets || pets.length === 0) {
      return res.status(404).json({ message: "No pets found for this user" });
    }

    res.status(200).json({
      message: "Pets retrieved successfully",
      data: pets,
    });
  } catch (err) {
    console.error("Get pets error:", err);
    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
};

module.exports = { addPet, getPets };