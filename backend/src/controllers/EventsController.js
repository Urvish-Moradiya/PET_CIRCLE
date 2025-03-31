const Event = require('../models/EventsModel');
const User = require('../models/UserModel');
const Pet = require('../models/PetModel');
const bcrypt = require('bcrypt');

// Get all events
exports.getAllEvents = async (req, res) => {
    try {
      const events = await Event.find().populate('rsvps', 'fullName email');
      res.json(events);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };

// Create a new event
exports.createEvent = async (req, res) => {
    try {
      const event = new Event(req.body);
      await event.save();
      res.status(201).json(event);
    } catch (error) {
      res.status(400).json({ message: 'Error creating event', error });
    }
  };

  exports.registerUser = async (req, res) => {
    const { fullName, email, password, role } = req.body;
    try {
      let user = await User.findOne({ email });
      if (user) return res.status(400).json({ message: 'User already exists' });
  
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      user = new User({
        fullName,
        email,
        password: hashedPassword,
        role: role || 'user',
      });
      await user.save();
      res.status(201).json({ message: 'User registered successfully', userId: user._id });
    } catch (error) {
      res.status(500).json({ message: 'Error registering user', error });
    }
  };
  
  // RSVP to an event and register pet if provided
  exports.rsvpEvent = async (req, res) => {
    const { eventId, userId, petDetails } = req.body; // Assume userId comes from authenticated session
    try {
      const event = await Event.findById(eventId);
      if (!event) return res.status(404).json({ message: 'Event not found' });
  
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      // Register pet if details provided
      if (petDetails) {
        const pet = new Pet(petDetails);
        await pet.save();
        if (!user.pets.includes(pet._id)) {
          user.pets.push(pet._id);
          await user.save();
        }
      }
  
      // Handle RSVP
      const userIdStr = user._id.toString();
      if (event.rsvps.includes(userIdStr)) {
        event.rsvps = event.rsvps.filter((id) => id.toString() !== userIdStr);
        event.attendees -= 1;
      } else {
        event.rsvps.push(userIdStr);
        event.attendees += 1;
      }
  
      await event.save();
      const updatedEvent = await Event.findById(eventId).populate('rsvps', 'fullName email');
      res.json(updatedEvent);
    } catch (error) {
      res.status(500).json({ message: 'Error updating RSVP', error });
    }
  };
  
  // Get event by ID
  exports.getEventById = async (req, res) => {
    try {
      const event = await Event.findById(req.params.id).populate('rsvps', 'fullName email');
      if (!event) return res.status(404).json({ message: 'Event not found' });
      res.json(event);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };