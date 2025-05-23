const Adoption = require('../models/AdoptionModel'); // Adjust path to your model file

// AdoptionController.js
exports.addCenter = async (req, res) => {
  try {
    const { name, image, address, number, time, feature, url } = req.body;

    // Validate required fields
    if (!name || !address || !number || !time) {
      return res.status(400).json({
        success: false,
        message: 'All required fields must be provided'
      });
    }

    const newCenter = new Adoption({
      name,
      image,
      address,
      number,
      time: new Date(time),
      feature: feature || [],
      url // Add URL to new center
    });

    const savedCenter = await newCenter.save();

    res.status(201).json({
      success: true,
      message: 'Adoption center added successfully',
      data: savedCenter
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error adding adoption center',
      error: error.message
    });
  }
};

// Get all adoption centers
exports.getCenters = async (req, res) => {
  try {
    const centers = await Adoption.find()
      .sort({ createdAt: -1 }); // Sort by creation date, newest first

    res.status(200).json({
      success: true,
      count: centers.length,
      data: centers
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching adoption centers',
      error: error.message
    });
  }
};


exports.deleteCenter = async (req, res) => {
  try {
    const { id } = req.params;
    const center = await Adoption.findById(id);
    if (!center) {
      return res.status(404).json({ success: false, message: 'Center not found' });
    }
    await Adoption.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: 'Center deleted successfully' });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting center',
      error: error.message,
    });
  }
};