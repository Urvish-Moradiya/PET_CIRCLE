const Registration = require('../models/Eventpetregister');
const Event = require('../models/EventsModel');

exports.createRegistration = async (req, res) => {
  try {
    const { eventId, name, email, petCount, pets } = req.body;

    // Validate input
    if (!eventId || !name || !email || !petCount || !pets) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Debug: Check if Event is a valid model
    console.log('Event model:', Event);
    const event = await Event.findOne({ id: eventId });
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if user already registered
    const existingRegistration = await Registration.findOne({ eventId, email });
    if (existingRegistration) {
      return res.status(400).json({ message: 'You have already registered for this event' });
    }

    // Create registration
    const registration = new Registration({
      eventId,
      name,
      email,
      petCount,
      pets,
    });

    await registration.save();

    // Update event attendees count and get updated event
    const updatedEvent = await Event.findOneAndUpdate(
      { id: eventId },
      { $inc: { attendees: 1 } },
      { new: true }
    );

    res.status(201).json({
      message: 'Registration successful',
      data: { attendees: updatedEvent.attendees },
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getRegistrationsByEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const registrations = await Registration.find({ eventId: parseInt(eventId) });
    res.status(200).json({
      status: 'success',
      data: registrations,
    });
  } catch (error) {
    console.error('Error fetching registrations:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch registrations',
    });
  }
};
