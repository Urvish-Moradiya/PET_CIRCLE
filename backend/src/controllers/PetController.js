const PetModel = require("../models/PetModel");
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  }
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);
    if (extname && mimetype) cb(null, true);
    else cb(new Error('Only images are allowed (jpeg, jpg, png, gif)'));
  },
  limits: { fileSize: 5 * 1024 * 1024, files: 10 }
});

const addPet = async (req, res) => {
  try {
    const newPet = await PetModel.create(req.body);
    res.status(201).json({ message: 'Pet created successfully', data: newPet });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const getPets = async (req, res) => {
  try {
    const pets = await PetModel.find();
    res.status(200).json({ message: 'Pets retrieved successfully', data: pets });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const uploadPhotos = async (req, res) => {
  try {
    const petId = req.params.petId;
    const files = req.files;

    if (!files || files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded' });
    }

    const pet = await PetModel.findById(petId);
    if (!pet) return res.status(404).json({ message: 'Pet not found' });

    const photoUrls = files.map(file => `${req.protocol}://${req.get('host')}/uploads/${file.filename}`);
    pet.gallery.push(...photoUrls);
    await pet.save();

    res.status(200).json({ message: 'Photos uploaded successfully', data: photoUrls });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { addPet, getPets, uploadPhotos: [upload.array('photos', 10), uploadPhotos] };