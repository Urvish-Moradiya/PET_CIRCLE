import React, { useState, useEffect } from 'react';

const Adoption = () => {
  const [showLoginPanel, setShowLoginPanel] = useState(false);
  const [centers, setCenters] = useState([]);
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddCenterModal, setShowAddCenterModal] = useState(false);
  const [showViewPetModal, setShowViewPetModal] = useState(null);
  const [newCenter, setNewCenter] = useState({
    name: '',
    address: '',
    number: '',
    time: '',
    feature: '',
    url: '',
    image: null,
  });

  // Mock token; replace with actual auth logic
  const token = localStorage.getItem('authToken') || 'your-token-here';

  // Stats data (Total Adoptions dynamic, others static)
  const [statsData, setStatsData] = useState([
    { icon: 'fa-home', title: 'Total Adoptions', value: '0', change: '+15.3%', changeType: 'positive' },
    { icon: 'fa-file-alt', title: 'Pending Applications', value: '0', change: '+8.2%', changeType: 'positive' },
    { icon: 'fa-check-circle', title: 'Successful Matches', value: '89%', change: '+4.5%', changeType: 'positive' },
    { icon: 'fa-clock', title: 'Avg. Process Time', value: '12 days', change: '-2.3%', changeType: 'positive' },
  ]);

  // Fetch centers and pets
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch centers
        const centersResponse = await fetch('http://localhost:5000/centers', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!centersResponse.ok) {
          throw new Error('Failed to fetch centers');
        }
        const centersResult = await centersResponse.json();
        // Mock centers if endpoint not available
        const mockCenters = centersResult.data 
        setCenters(mockCenters);

        // Fetch pets
        const petsResponse = await fetch('http://localhost:5000/adoptpet', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!petsResponse.ok) {
          throw new Error('Failed to fetch pets');
        }
        const petsResult = await petsResponse.json();
        // Mock pets if endpoint not available
        const mockPets = petsResult.data 
        setPets(mockPets);

        // Update stats
        setStatsData(prev => [
          { ...prev[0], value: mockPets.length.toString() },
          { ...prev[1], value: '0' }, // Placeholder for pending
          ...prev.slice(2),
        ]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Add new center
  const addCenter = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.entries(newCenter).forEach(([key, value]) => {
        if (key === 'feature') {
          formData.append(key, value.split(',').map(f => f.trim()));
        } else {
          formData.append(key, value);
        }
      });
      const response = await fetch('http://localhost:5000/centers', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      if (!response.ok) {
        throw new Error('Failed to add center');
      }
      const result = await response.json();
      setCenters([result.data, ...centers]);
      setShowAddCenterModal(false);
      setNewCenter({
        name: '',
        address: '',
        number: '',
        time: '',
        feature: '',
        url: '',
      });
    } catch (err) {
      alert('Error adding center: ' + err.message);
    }
  };

  // Delete center
  const deleteCenter = async (centerId) => {
    if (!window.confirm('Are you sure you want to delete this adoption center?')) return;
    try {
      const response = await fetch(`http://localhost:5000/centers/${centerId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to delete center');
      }
      setCenters(centers.filter(center => center._id !== centerId));
    } catch (err) {
      alert('Error deleting center: ' + err.message);
    }
  };

  // Delete pet
  const deletePet = async (petId) => {
    if (!window.confirm('Are you sure you want to delete this pet?')) return;
    try {
      const response = await fetch(`http://localhost:5000/adoptpet/${petId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to delete pet');
      }
      setPets(pets.filter(pet => pet._id !== petId));
      setStatsData(prev => [
        { ...prev[0], value: (parseInt(prev[0].value) - 1).toString() },
        ...prev.slice(1),
      ]);
    } catch (err) {
      alert('Error deleting pet: ' + err.message);
    }
  };

  if (loading) return <div className="flex-1 flex items-center justify-center">Loading...</div>;
  if (error) return <div className="flex-1 flex items-center justify-center text-red-600">Error: {error}</div>;

  return (
    <div className="flex-1 overflow-auto">
      {/* Header */}
      <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <h2 className="text-xl font-semibold text-gray-800">Adoption Management</h2>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
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
                <span className={`text-sm ${stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.changeType === 'positive' ? <i className="fas fa-arrow-up mr-1"></i> : <i className="fas fa-arrow-down mr-1"></i>}
                  {stat.change} from last month
                </span>
              </div>
            </div>
          ))}
        </div>
        {/* Adoption Centers Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Adoption Centers</h3>
            <button
              onClick={() => setShowAddCenterModal(true)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 cursor-pointer"
            >
              <i className="fas fa-plus mr-2"></i>Add Center
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
                    Address
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hours
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Features
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {centers.map(center => (
                  <tr key={center._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{center.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{center.address}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <a href={`tel:${center.number}`} className="text-indigo-600 hover:text-indigo-900">
                        {center.number}
                      </a>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(center.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {center.feature.join(', ') || 'None'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => window.open(center.url, '_blank')}
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                        disabled={!center.url}
                      >
                        <i className="fas fa-link"></i>
                      </button>
                      <button
                        onClick={() => deleteCenter(center._id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* Adoptable Pets Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Adoptable Pets</h3>
            <button
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 cursor-pointer"
              // Add pet modal can be implemented if needed
            >
              <i className="fas fa-plus mr-2"></i>Add Pet
            </button>
          </div>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by name, breed, or location..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                <i className="fas fa-search absolute left-3 top-2.5 text-gray-400"></i>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white">
                <option value="">Pet Type</option>
                <option value="Dog">Dog</option>
                <option value="Cat">Cat</option>
                <option value="Bird">Bird</option>
                <option value="Other">Other</option>
              </select>
              <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white">
                <option value="">Age</option>
                <option value="0-1">0-1 year</option>
                <option value="1-3">1-3 years</option>
                <option value="3-8">3-8 years</option>
                <option value="8+">8+ years</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pets.map(pet => (
              <div key={pet._id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  <img src={pet.image || 'https://via.placeholder.com/300'} alt={pet.name} className="w-full h-full object-cover" />
                  <div className="absolute top-4 right-4">
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      Available
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{pet.name}</h3>
                  <p className="text-gray-600 mb-4">{pet.description}</p>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Type</p>
                      <p className="text-sm font-semibold text-gray-800">{pet.petType}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Breed</p>
                      <p className="text-sm font-semibold text-gray-800">{pet.breed}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Age</p>
                      <p className="text-sm font-semibold text-gray-800">{pet.age} year{pet.age !== 1 ? 's' : ''}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="text-sm font-semibold text-gray-800">{pet.address}</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <a
                      href={`tel:${pet.ownerContact}`}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 cursor-pointer"
                    >
                      Contact Owner
                    </a>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setShowViewPetModal(pet)}
                        className="p-2 text-indigo-600 hover:text-indigo-900 cursor-pointer"
                      >
                        <i className="fas fa-eye"></i>
                      </button>
                      <button
                        onClick={() => deletePet(pet._id)}
                        className="p-2 text-red-600 hover:text-red-900 cursor-pointer"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Pagination */}
        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">1</span> to <span className="font-medium">{pets.length}</span> of <span className="font-medium">{pets.length}</span> pets
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
      {/* Add Center Modal */}
      {showAddCenterModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Add Adoption Center</h3>
              <button
                onClick={() => setShowAddCenterModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <form onSubmit={addCenter} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={newCenter.name}
                  onChange={e => setNewCenter({ ...newCenter, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter center name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <input
                  type="text"
                  value={newCenter.address}
                  onChange={e => setNewCenter({ ...newCenter, address: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter address"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
                <input
                  type="tel"
                  value={newCenter.number}
                  onChange={e => setNewCenter({ ...newCenter, number: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter contact number"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Operating Hours</label>
                <input
                  type="time"
                  value={newCenter.time}
                  onChange={e => setNewCenter({ ...newCenter, time: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Features (comma-separated)</label>
                <input
                  type="text"
                  value={newCenter.feature}
                  onChange={e => setNewCenter({ ...newCenter, feature: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="e.g., Free Vaccinations, Training"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Website URL</label>
                <input
                  type="url"
                  value={newCenter.url}
                  onChange={e => setNewCenter({ ...newCenter, url: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter website URL"
                />
              </div>
             
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAddCenterModal(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 cursor-pointer"
                >
                  Add Center
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* View Pet Modal */}
      {showViewPetModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">{showViewPetModal.name}'s Profile</h3>
              <button
                onClick={() => setShowViewPetModal(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="space-y-3">
              <img src={showViewPetModal.image || 'https://via.placeholder.com/300'} alt={showViewPetModal.name} className="w-full h-48 object-cover rounded-lg mb-3" />
              <p><strong>Type:</strong> {showViewPetModal.petType}</p>
              <p><strong>Breed:</strong> {showViewPetModal.breed}</p>
              <p><strong>Age:</strong> {showViewPetModal.age} year{showViewPetModal.age !== 1 ? 's' : ''}</p>
              <p><strong>Location:</strong> {showViewPetModal.address}</p>
              <p><strong>Contact:</strong> <a href={`tel:${showViewPetModal.ownerContact}`} className="text-indigo-600 hover:text-indigo-900">{showViewPetModal.ownerContact}</a></p>
              <p><strong>Description:</strong> {showViewPetModal.description}</p>
              <p><strong>Posted:</strong> {new Date(showViewPetModal.createdAt).toLocaleDateString()}</p>
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setShowViewPetModal(null)}
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

export default Adoption;