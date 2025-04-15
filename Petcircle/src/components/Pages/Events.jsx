import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Events = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [rsvpEvents, setRsvpEvents] = useState([]);
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEventId, setCurrentEventId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    petCount: 1,
    pets: [{ name: '', breed: '', age: '' }],
  });

  const locations = ['All Locations', 'New York', 'Los Angeles', 'Chicago', 'Miami', 'Seattle'];
  const eventTypes = ['All Events', 'Pet Playdates', 'Adoption Events', 'Training Workshops', 'Pet Health Clinics'];
  const sortOptions = [
    { label: 'Date', value: 'date' },
    { label: 'Attendees', value: 'attendees' },
    { label: 'Title', value: 'title' },
  ];

  // Fetch events from backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/events');
        setEvents(response.data.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    fetchEvents();
  }, []);

  const handleRSVP = (eventId) => {
    setCurrentEventId(eventId);
    setIsModalOpen(true);
  };

  const handleFormChange = (e, index) => {
    const { name, value } = e.target;
    if (name.startsWith('pet_')) {
      const field = name.split('_')[1];
      const updatedPets = [...formData.pets];
      updatedPets[index] = { ...updatedPets[index], [field]: value };
      setFormData({ ...formData, pets: updatedPets });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handlePetCountChange = (e) => {
    const count = parseInt(e.target.value) || 1;
    const pets = Array.from({ length: count }, (_, i) => formData.pets[i] || { name: '', breed: '', age: '' });
    setFormData({ ...formData, petCount: count, pets });
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/eventpetregister', {
        eventId: currentEventId,
        ...formData,
      });
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === currentEventId
            ? { ...event, attendees: response.data.data.attendees }
            : event
        )
      );
      setRsvpEvents((prev) => [...prev, currentEventId.toString()]);
      setIsModalOpen(false);
      setFormData({
        name: '',
        email: '',
        petCount: 1,
        pets: [{ name: '', breed: '', age: '' }],
      });
    } catch (error) {
      console.error('Error registering:', error.response?.data?.message || error.message);
      alert(error.response?.data?.message || 'Registration failed');
    }
  };

  // Filter and sort events
  const filteredEvents = events
    .filter((event) => {
      const matchesType = selectedFilter === 'all' || event.type === selectedFilter;
      const matchesLocation = selectedLocation === 'all' || event.location.includes(selectedLocation);
      return matchesType && matchesLocation;
    })
    .sort((a, b) => {
      if (sortBy === 'date') return new Date(a.date) - new Date(b.date);
      if (sortBy === 'attendees') return b.attendees - a.attendees;
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      return 0;
    });

  const Dropdown = ({ label, items, selected, onSelect, icon }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-lg bg-white px-4 py-2 text-gray-700 border border-gray-300 flex items-center space-x-2 hover:bg-gray-50"
        >
          <i className={`fas ${icon}`} />
          <span>{selected === 'all' ? label : selected}</span>
          <i className="fas fa-chevron-down" />
        </button>
        {isOpen && (
          <div className="absolute top-full mt-2 w-48 bg-white rounded-lg shadow-lg z-10">
            {items.map((item) => (
              <button
                key={typeof item === 'string' ? item : item.value}
                onClick={() => {
                  onSelect(typeof item === 'string' ? (item === `All ${label}s` ? 'all' : item) : item.value);
                  setIsOpen(false);
                }}
                className="block w-full text-left px-4 py-2 hover:bg-purple-50"
              >
                {typeof item === 'string' ? item : item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  const EventCard = ({ event, onRSVP, isAttending }) => (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="h-48 overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
          onError={(e) => (e.currentTarget.src = '/fallback-image.jpg')}
        />
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">{event.type}</span>
          <span className="text-gray-500 text-sm">
            <i className="fas fa-users mr-2" />
            {event.attendees} attending
          </span>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-1">{event.title}</h3>
        <p className="text-gray-600 mb-4">{event.description}</p>
        <div className="space-y-2 text-gray-500">
          <div className="flex items-center">
            <i className="fas fa-calendar-alt w-6" />
            <span>{new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
          <div className="flex items-center">
            <i className="fas fa-map-marker-alt w-6" />
            <span>{event.location}</span>
          </div>
        </div>
        <button
          onClick={() => onRSVP(event.id)}
          className={`mt-6 w-full rounded-lg py-2 px-4 font-medium text-white transition-colors ${
            isAttending ? 'bg-green-600 hover:bg-green-700' : 'bg-purple-600 hover:bg-purple-700'
          }`}
        >
          <span className="flex items-center justify-center">
            <i className={`fas ${isAttending ? 'fa-check' : 'fa-calendar-plus'} mr-2`} />
            {isAttending ? 'Attending' : 'Register Now'}
          </span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[500px] overflow-hidden">
        <img
          src="https://public.readdy.ai/ai/img_res/5e3c92b70f0936ad8c184c4416f5ec91.jpg"
          alt="Pet Events Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 to-transparent">
          <div className="max-w-7xl mx-auto px-4 h-full flex items-center">
            <div className="max-w-2xl">
              <h1 className="text-5xl font-bold text-white mb-6">Join Fun Pet Events & Meetups!</h1>
              <p className="text-xl text-white/90 mb-8">
                Connect with fellow pet lovers, learn from experts, and create unforgettable memories.
              </p>
              <button className="rounded-lg bg-white text-purple-900 px-8 py-3 text-lg font-semibold hover:bg-purple-50 transition-colors">
                Discover Events
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Registration Modal */}
      {isModalOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-xl p-6 sm:p-8 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">Register for Event</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleFormChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleFormChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
              required
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-gray-700 text-sm font-medium mb-1">Number of Pets</label>
            <input
              type="number"
              name="petCount"
              value={formData.petCount}
              onChange={handlePetCountChange}
              min="1"
              className="w-full sm:w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
              required
            />
          </div>
        </div>

        {formData.pets.map((pet, index) => (
          <div key={index} className="mb-6 border border-gray-200 p-4 sm:p-6 rounded-xl bg-gray-50">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Pet {index + 1}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">Pet Name</label>
                <input
                  type="text"
                  name={`pet_name_${index}`}
                  value={pet.name}
                  onChange={(e) => handleFormChange(e, index)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">Breed</label>
                <input
                  type="text"
                  name={`pet_breed_${index}`}
                  value={pet.breed}
                  onChange={(e) => handleFormChange(e, index)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1">Age</label>
                <input
                  type="number"
                  name={`pet_age_${index}`}
                  value={pet.age}
                  onChange={(e) => handleFormChange(e, index)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                  required
                />
              </div>
            </div>
          </div>
        ))}

        <div className="flex justify-end space-x-4 mt-6">
          <button
            type="button"
            onClick={() => setIsModalOpen(false)}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>
)}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Filters and Sort */}
        <div className="flex flex-wrap gap-4 mb-8 items-center">
          <Dropdown
            label="Event Type"
            items={eventTypes}
            selected={selectedFilter}
            onSelect={setSelectedFilter}
            icon="fa-filter"
          />
          <Dropdown
            label="Location"
            items={locations}
            selected={selectedLocation}
            onSelect={setSelectedLocation}
            icon="fa-map-marker-alt"
          />
          <Dropdown
            label="Sort By"
            items={sortOptions}
            selected={sortBy}
            onSelect={setSortBy}
            icon="fa-sort"
          />
        </div>

        {/* All Events Section */}
        <h2 className="text-3xl font-bold text-gray-900 mb-10">All Events</h2>
        {filteredEvents.length === 0 ? (
          <p className="text-gray-600 text-center">No events match your filters.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onRSVP={handleRSVP}
                isAttending={rsvpEvents.includes(event.id.toString())}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Events;