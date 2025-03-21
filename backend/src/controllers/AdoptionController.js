const Adoption = require('../models/AdoptionModel'); // Adjust path to your model file

// Add new adoption center
exports.addCenter = async (req, res) => {
  try {
    const { name, image, address, number, time, feature } = req.body;

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
      feature: feature || []
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