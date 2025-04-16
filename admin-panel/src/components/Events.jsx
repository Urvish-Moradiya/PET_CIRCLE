import React, { useState, useEffect } from 'react';

const Events = () => {
  const [showLoginPanel, setShowLoginPanel] = useState(false);
  const [events, setEvents] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showRegistrationsModal, setShowRegistrationsModal] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    type: '',
    description: '',
    date: '',
    location: '',
    image: '',
  });

  // Mock token; replace with actual auth logic
  const token = localStorage.getItem('authToken') || 'your-token-here';

  // Stats data (dynamic except Completion Rate)
  const [statsData, setStatsData] = useState([
    { icon: 'fa-calendar', title: 'Total Events', value: '0', change: '+10.2%' },
    { icon: 'fa-users', title: 'Total Attendees', value: '0', change: '+15.7%' },
    { icon: 'fa-clock', title: 'Upcoming Events', value: '0', change: '+4.3%' },
    { icon: 'fa-check-circle', title: 'Completion Rate', value: '95%', change: '+2.1%' },
  ]);

  // Fetch events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/events', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        const result = await response.json();
        // Mock data if endpoint not available
        const mockEvents = result.data || [
          {
            id: 1,
            title: 'Pet Adoption Drive',
            type: 'Adoption Event',
            description: 'Join us to find a furry friend!',
            date: '2025-04-20',
            location: 'Central Park, NY',
            image: 'https://via.placeholder.com/300',
            attendees: 124,
          },
        ];
        setEvents(mockEvents);
        // Update stats
        const totalAttendees = mockEvents.reduce((sum, e) => sum + e.attendees, 0);
        const upcomingCount = mockEvents.filter(e => new Date(e.date) > new Date()).length;
        setStatsData(prev => [
          { ...prev[0], value: mockEvents.length.toString() },
          { ...prev[1], value: totalAttendees.toString() },
          { ...prev[2], value: upcomingCount.toString() },
          prev[3],
        ]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  // Fetch registrations for an event
  const fetchRegistrations = async (eventId) => {
    try {
      const response = await fetch(`http://localhost:5000/eventpetregister/${eventId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch registrations');
      }
      const result = await response.json();
      // Mock data if endpoint not available
      const mockRegistrations = result.data || [
        {
          eventId,
          name: 'John Doe',
          email: 'john@example.com',
          petCount: 2,
          pets: [
            { name: 'Max', breed: 'Golden Retriever', age: 3 },
            { name: 'Bella', breed: 'Tabby Cat', age: 2 },
          ],
          createdAt: '2025-04-10T00:00:00Z',
        },
      ];
      setRegistrations(mockRegistrations);
      setShowRegistrationsModal(true);
    } catch (err) {
      alert('Error fetching registrations: ' + err.message);
    }
  };

  // Add new event
  const addEvent = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newEvent),
      });
      if (!response.ok) {
        throw new Error('Failed to add event');
      }
      const result = await response.json();
      setEvents([...events, result.data]);
      setStatsData(prev => [
        { ...prev[0], value: (parseInt(prev[0].value) + 1).toString() },
        prev[1],
        { ...prev[2], value: new Date(result.data.date) > new Date() ? (parseInt(prev[2].value) + 1).toString() : prev[2].value },
        prev[3],
      ]);
      setShowAddModal(false);
      setNewEvent({ title: '', type: '', description: '', date: '', location: '', image: '' });
    } catch (err) {
      alert('Error adding event: ' + err.message);
    }
  };

  // Delete event
  const deleteEvent = async (eventId) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;
    try {
      const response = await fetch(`http://localhost:5000/events/${eventId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to delete event');
      }
      const deletedEvent = events.find(e => e.id === eventId);
      setEvents(events.filter(e => e.id !== eventId));
      setStatsData(prev => [
        { ...prev[0], value: (parseInt(prev[0].value) - 1).toString() },
        { ...prev[1], value: (parseInt(prev[1].value) - deletedEvent.attendees).toString() },
        { ...prev[2], value: new Date(deletedEvent.date) > new Date() ? (parseInt(prev[2].value) - 1).toString() : prev[2].value },
        prev[3],
      ]);
    } catch (err) {
      alert('Error deleting event: ' + err.message);
    }
  };

  if (loading) return <div className="flex-1 flex items-center justify-center">Loading...</div>;
  if (error) return <div className="flex-1 flex items-center justify-center text-red-600">Error: {error}</div>;

  return (
    <div className="flex-1 overflow-auto">
      {/* Header */}
      <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <h2 className="text-xl font-semibold text-gray-800">Events Management</h2>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search events..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <i className="fas fa-search absolute left-3 top-2.5 text-gray-400"></i>
          </div>
          <button className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 cursor-pointer">
            <i className="fas fa-bell"></i>
          </button>
          <div className="relative">
            <button
              onClick={() => setShowLoginPanel(!showLoginPanel)}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white">
                <span className="text-sm font-medium">AD</span>
              </div>
              <span className="text-sm font-medium text-gray-700">Admin</span>
            </button>
            {showLoginPanel && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg z-50 border border-gray-200">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">Login</h3>
                    <button
                      onClick={() => setShowLoginPanel(false)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                      <input
                        type="password"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Enter your password"
                        required
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="remember"
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                          Remember me
                        </label>
                      </div>
                      <button type="button" className="text-sm text-indigo-600 hover:text-indigo-800">
                        Forgot password?
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowLoginPanel(false)}
                      className="w-full py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Sign in
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
      {/* Main Content */}
      <div className="p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {statsData.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-indigo-100 text-indigo-600">
                  <i className={`fas ${stat.icon} fa-lg`}></i>
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-500">{stat.title}</h3>
                  <p className="text-2xl font-semibold text-gray-800">{stat.value}</p>
                </div>
              </div>
              <div className="mt-2">
                <span className="text-sm text-green-600">
                  <i className="fas fa-arrow-up mr-1"></i>{stat.change} from last month
                </span>
              </div>
            </div>
          ))}
        </div>
        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search events..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                <i className="fas fa-search absolute left-3 top-2.5 text-gray-400"></i>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white">
                <option value="">All Types</option>
                <option value="Adoption Event">Adoption Event</option>
                <option value="Workshop">Workshop</option>
                <option value="Webinar">Webinar</option>
                <option value="Seminar">Seminar</option>
              </select>
              <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white">
                <option value="">All Status</option>
                <option value="Upcoming">Upcoming</option>
                <option value="Completed">Completed</option>
              </select>
              <button
                onClick={() => setShowAddModal(true)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 cursor-pointer"
              >
                <i className="fas fa-plus mr-2"></i>Add Event
              </button>
            </div>
          </div>
        </div>
        {/* Events Table */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Attendees
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {events.map(event => (
                  <tr key={event.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {event.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {event.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {event.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button
                        onClick={() => fetchRegistrations(event.id)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        {event.attendees}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        new Date(event.date) > new Date() ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {new Date(event.date) > new Date() ? 'Upcoming' : 'Completed'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => fetchRegistrations(event.id)}
                          className="text-indigo-600 hover:text-indigo-900 cursor-pointer"
                          title="View Registrations"
                        >
                          <i className="fas fa-users"></i>
                        </button>
                        <button
                          onClick={() => deleteEvent(event.id)}
                          className="text-red-600 hover:text-red-900 cursor-pointer"
                          title="Delete Event"
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to <span className="font-medium">{events.length}</span> of <span className="font-medium">{events.length}</span> events
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer">
                Previous
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 cursor-pointer">
                1
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Add Event Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Add Event</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <form onSubmit={addEvent} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={newEvent.title}
                  onChange={e => setNewEvent({ ...newEvent, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter event title"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select
                  value={newEvent.type}
                  onChange={e => setNewEvent({ ...newEvent, type: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                >
                  <option value="">Select type</option>
                  <option value="Adoption Event">Adoption Event</option>
                  <option value="Workshop">Workshop</option>
                  <option value="Webinar">Webinar</option>
                  <option value="Seminar">Seminar</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={newEvent.description}
                  onChange={e => setNewEvent({ ...newEvent, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter description"
                  rows="4"
                  required
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="date"
                  value={newEvent.date}
                  onChange={e => setNewEvent({ ...newEvent, date: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  value={newEvent.location}
                  onChange={e => setNewEvent({ ...newEvent, location: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter location"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                <input
                  type="url"
                  value={newEvent.image}
                  onChange={e => setNewEvent({ ...newEvent, image: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter image URL"
                  required
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 cursor-pointer"
                >
                  Add Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Registrations Modal */}
      {showRegistrationsModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-4xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Registered Users</h3>
              <button
                onClick={() => setShowRegistrationsModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Pet Count
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Pets
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Registered On
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {registrations.map(reg => (
                    <tr key={reg._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {reg.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <a href={`mailto:${reg.email}`} className="text-indigo-600 hover:text-indigo-900">{reg.email}</a>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {reg.petCount}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        <ul className="list-disc pl-4">
                          {reg.pets.map((pet, index) => (
                            <li key={index}>
                              {pet.name} ({pet.breed}, {pet.age} year{pet.age !== 1 ? 's' : ''})
                            </li>
                          ))}
                        </ul>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(reg.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setShowRegistrationsModal(false)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;