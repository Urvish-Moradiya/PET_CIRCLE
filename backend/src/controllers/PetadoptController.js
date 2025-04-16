const Petadopt = require('../models/PetadoptModel');

// Add a new pet
exports.addAdoptpet = async (req, res) => {
    try {
        const { name, image, address, age, petType, breed, description, ownerContact } = req.body;
        
        const newPet = new Petadopt({
            name,
            image,
            address,
            age,
            petType,
            breed,
            description,
            ownerContact // Include the new field
        });

        const savedPet = await newPet.save();
        res.status(201).json({
            success: true,
            data: savedPet,
            message: 'Pet added successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error adding pet',
            error: error.message
        });
    }
};

// Get all pets
exports.getAllPets = async (req, res) => {
    try {
        const pets = await Petadopt.find();
        res.status(200).json({
            success: true,
            count: pets.length,
            data: pets
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching pets',
            error: error.message
        });
    }
};

exports.deleteAdoptpet = async (req, res) => {
    try {
      const { id } = req.params;
      const pet = await Petadopt.findById(id);
      if (!pet) {
        return res.status(404).json({ success: false, message: 'Pet not found' });
      }
      await Petadopt.findByIdAndDelete(id);
      res.status(200).json({ success: true, message: 'Pet deleted successfully' });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error deleting pet',
        error: error.message,
      });
    }
  };