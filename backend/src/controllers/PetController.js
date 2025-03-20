const PetModel = require("../models/PetModel");

const addPet = async (req, res) => {
  console.log("Pet Added Successfully");
  try {
    const {
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

    console.log('Received data:', req.body);

    const newPet = {
      name,
      type,
      breed,
      birthday,
      weight,
      allergies: allergies || 'None',
      favoriteFood: favoriteFood || 'Not specified',
      activities: activities || [],
      profileImage: profileImage || 'https://via.placeholder.com/300',
    };

    const createPet = await PetModel.create(newPet);
    res.status(201).json({
      message: "Pet created successfully",
      data: createPet,
    });
  } catch (err) {
    console.error('Backend error:', err);
    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
};

const getPets = async (req, res) => {
  try {
    const pets = await PetModel.find();
    res.status(200).json({
      message: "Pets retrieved successfully",
      data: pets,
    });
  } catch (err) {
    console.error('Backend error:', err);
    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
};

module.exports = { addPet, getPets };