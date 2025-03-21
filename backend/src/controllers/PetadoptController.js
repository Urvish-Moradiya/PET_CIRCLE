const Petadopt = require('../models/PetadoptModel');

// Add a new pet
exports.addAdoptpet = async (req, res) => {
    try {
        const { name, image, address, age, breed, description } = req.body;
        
        const newPet = new Petadopt({
            name,
            image,
            address,
            age,
            breed,
            description
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
