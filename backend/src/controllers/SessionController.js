const Session = require('../models/petSession');

exports.createSession = async (req, res) => {
  try {
    const session = new Session(req.body);
    await session.save();
    res.status(201).json({ message: 'Session created successfully', session });
  } catch (error) {
    res.status(400).json({ message: 'Error creating session', error: error.message });
  }
};

exports.getSessions = async (req, res) => {
  try {
    const sessions = await Session.find();
    res.status(200).json(sessions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching sessions', error: error.message });
  }
};

exports.deleteSession = async (req, res) => {
  try {
    const { id } = req.params;
    const session = await Session.findById(id);
    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }
    await Session.deleteOne({ _id: id });
    res.status(200).json({ message: 'Session deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting session', error: error.message });
  }
};


