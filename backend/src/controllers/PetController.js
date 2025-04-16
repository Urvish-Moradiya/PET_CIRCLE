const PetModel = require("../models/PetModel");

const BASE_URL = "http://localhost:5000";

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
    } = req.body;

    if (!userId || !name || !type || !breed || !birthday || !weight) {
      console.log("Add pet - Missing required fields");
      return res.status(400).json({ message: "All required fields must be provided" });
    }

    if (userId !== req.user._id.toString()) {
      console.log("Add pet - Unauthorized userId:", userId);
      return res.status(403).json({ message: "Unauthorized to add pet for another user" });
    }

    let parsedActivities = [];
    if (activities) {
      try {
        parsedActivities = typeof activities === "string" ? JSON.parse(activities) : activities;
        if (!Array.isArray(parsedActivities)) {
          parsedActivities = activities.split(",").map((act) => act.trim());
        }
      } catch (error) {
        parsedActivities = activities.split(",").map((act) => act.trim());
      }
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
      activities: parsedActivities,
      profileImage: req.file ? `/uploads/${req.file.filename}` : null,
    };

    const createdPet = await PetModel.create(newPet);
    console.log("Add pet - Created pet:", createdPet._id);
    res.status(201).json({
      message: "Pet created successfully",
      data: {
        ...createdPet._doc,
        profileImage: createdPet.profileImage ? `${BASE_URL}${createdPet.profileImage}` : null,
      },
    });
  } catch (err) {
    console.error("Add pet error:", err.stack);
    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
};

const getPets = async (req, res) => {
  try {
    const userId = req.user._id.toString();
    console.log("Get pets - Fetching for userId:", userId);

    const pets = await PetModel.find({ userId });
    console.log("Get pets - Found pets:", pets.length);
    if (!pets || pets.length === 0) {
      return res.status(404).json({ message: "No pets found for this user" });
    }

    const formattedPets = pets.map((pet) => ({
      ...pet._doc,
      profileImage: pet.profileImage ? `${BASE_URL}${pet.profileImage}` : null,
    }));

    res.status(200).json({
      message: "Pets retrieved successfully",
      data: formattedPets,
    });
  } catch (err) {
    console.error("Get pets error:", err.stack);
    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
};

const getPetById = async (req, res) => {
  try {
    const petId = req.params.petId;
    console.log("Get pet by ID - Fetching petId:", petId);

    const pet = await PetModel.findById(petId);
    if (!pet) {
      console.log("Get pet by ID - Pet not found:", petId);
      return res.status(404).json({ message: "Pet not found" });
    }

    if (pet.userId !== req.user._id.toString()) {
      console.log("Get pet by ID - Unauthorized userId:", req.user._id);
      return res.status(403).json({ message: "Unauthorized to view this pet" });
    }

    const formattedPet = {
      ...pet._doc,
      profileImage: pet.profileImage ? `${BASE_URL}${pet.profileImage}` : null,
    };

    res.status(200).json({
      message: "Pet retrieved successfully",
      data: formattedPet,
    });
  } catch (err) {
    console.error("Get pet by ID error:", err.stack);
    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
};

const updatePet = async (req, res) => {
  try {
    const petId = req.params.id;
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
    } = req.body;

    if (!userId || !name || !type || !breed || !birthday || !weight) {
      console.log("Update pet - Missing required fields");
      return res.status(400).json({ message: "All required fields must be provided" });
    }

    if (userId !== req.user._id.toString()) {
      console.log("Update pet - Unauthorized userId:", userId);
      return res.status(403).json({ message: "Unauthorized to update pet for another user" });
    }

    const pet = await PetModel.findById(petId);
    if (!pet) {
      console.log("Update pet - Pet not found:", petId);
      return res.status(404).json({ message: "Pet not found" });
    }

    if (pet.userId !== userId) {
      console.log("Update pet - Pet does not belong to user:", { petId, userId });
      return res.status(403).json({ message: "Unauthorized to update this pet" });
    }

    let parsedActivities = [];
    if (activities) {
      try {
        parsedActivities = typeof activities === "string" ? JSON.parse(activities) : activities;
        if (!Array.isArray(parsedActivities)) {
          parsedActivities = activities.split(",").map((act) => act.trim());
        }
      } catch (error) {
        parsedActivities = activities.split(",").map((act) => act.trim());
      }
    }

    const updatedPet = {
      name,
      type,
      breed,
      birthday,
      weight,
      allergies: allergies || "None",
      favoriteFood: favoriteFood || "Not specified",
      activities: parsedActivities,
      profileImage: req.file ? `/uploads/${req.file.filename}` : pet.profileImage,
    };

    const result = await PetModel.findByIdAndUpdate(petId, updatedPet, { new: true });
    console.log("Update pet - Updated pet:", result._id);
    res.status(200).json({
      message: "Pet updated successfully",
      data: {
        ...result._doc,
        profileImage: result.profileImage ? `${BASE_URL}${result.profileImage}` : null,
      },
    });
  } catch (err) {
    console.error("Update pet error:", err.stack);
    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
};

const deletePet = async (req, res) => {
  try {
    const petId = req.params.id;
    const pet = await PetModel.findById(petId);
    if (!pet) {
      console.log("Delete pet - Pet not found:", petId);
      return res.status(404).json({ message: "Pet not found" });
    }

    if (pet.userId !== req.user._id.toString()) {
      console.log("Delete pet - Unauthorized userId:", req.user._id);
      return res.status(403).json({ message: "Unauthorized to delete this pet" });
    }

    await PetModel.findByIdAndDelete(petId);
    console.log("Delete pet - Deleted pet:", petId);
    res.status(200).json({
      message: "Pet deleted successfully",
    });
  } catch (err) {
    console.error("Delete pet error:", err.stack);
    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
};

module.exports = { addPet, getPets, getPetById, updatePet, deletePet };