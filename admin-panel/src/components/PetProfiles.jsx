import React, { useState, useEffect } from 'react';

const PetProfiles = () => {
  const [showLoginPanel, setShowLoginPanel] = useState(false);
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(null);
  const [newPet, setNewPet] = useState({
    userId: '',
    name: '',
    type: '',
    breed: '',
    birthday: '',
    weight: '',
    allergies: '',
    favoriteFood: '',
    activities: '',
    profileImage: null,
  });

  // Mock token; replace with actual auth logic
  const token = localStorage.getItem('authToken') || 'your-token-here';

  // Stats data (Total Pets dynamic, others static)
  const [statsData, setStatsData] = useState([
    { icon: 'fa-paw', title: 'Total Pets', value: '0', change: '+8.2%', changeType: 'positive' },
    { icon: 'fa-plus-circle', title: 'New Pets This Week', value: '156', change: '+12.3%', changeType: 'positive' },
    { icon: 'fa-heart', title: 'Adoption Rate', value: '68%', change: '+5.7%', changeType: 'positive' },
    { icon: 'fa-clipboard-check', title: 'Vaccinated', value: '92%', change: '+2.1%', changeType: 'positive' },
  ]);

  // Fetch all pets
  useEffect(() => {
    const fetchPets = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/pets', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch pets');
        }
        const result = await response.json();
        // Mock data if endpoint not available
        const mockPets = result.data 
        setPets(mockPets);
        setStatsData(prev => [
          { ...prev[0], value: mockPets.length.toString() },
          ...prev.slice(1),
        ]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPets();
  }, []);

  // Calculate age from birthday
  const calculateAge = (birthday) => {
    const birthDate = new Date(birthday);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age < 1 ? '<1 year' : `${age} year${age > 1 ? 's' : ''}`;
  };

  // Add new pet
  const addPet = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.entries(newPet).forEach(([key, value]) => {
        if (key === 'activities') {
          formData.append(key, value.split(',').map(a => a.trim()));
        } else if (key === 'profileImage' && value) {
          formData.append(key, value);
        } else {
          formData.append(key, value);
        }
      });
      const response = await fetch('http://localhost:5000/pets', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      if (!response.ok) {
        throw new Error('Failed to add pet');
      }
      const result = await response.json();
      setPets([...pets, result.data]);
      setStatsData(prev => [
        { ...prev[0], value: (parseInt(prev[0].value) + 1).toString() },
        ...prev.slice(1),
      ]);
      setShowAddModal(false);
      setNewPet({
        userId: '',
        name: '',
        type: '',
        breed: '',
        birthday: '',
        weight: '',
        allergies: '',
        favoriteFood: '',
        activities: '',
        profileImage: null,
      });
    } catch (err) {
      alert('Error adding pet: ' + err.message);
    }
  };

  // Delete pet
  const deletePet = async (petId) => {
    if (!window.confirm('Are you sure you want to delete this pet?')) return;
    try {
      const response = await fetch(`http://localhost:5000/pets/${petId}`, {
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
          <h2 className="text-xl font-semibold text-gray-800">Pet Profiles</h2>
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
        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search pets by name, breed..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                <i className="fas fa-search absolute left-3 top-2.5 text-gray-400"></i>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white">
                <option value="">All Types</option>
                <option value="Dog">Dog</option>
                <option value="Cat">Cat</option>
                <option value="Bird">Bird</option>
                <option value="Fish">Fish</option>
              </select>
              <button
                onClick={() => setShowAddModal(true)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 cursor-pointer"
              >
                <i className="fas fa-plus mr-2"></i>Add New Pet
              </button>
            </div>
          </div>
        </div>
        {/* Pet Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {pets.map(pet => (
            <div key={pet._id} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="h-48 overflow-hidden">
                <img src={pet.profileImage} alt={pet.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-800">{pet.name}</h3>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    pet.type !== 'None' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {pet.type}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{pet.breed}</p>
                <div className="text-sm text-gray-500 mb-3">
                  <span>
                    <i className="fas fa-birthday-cake mr-1"></i> {calculateAge(pet.birthday)}
                  </span>
                </div>
                <div className="text-sm text-gray-500 mb-3">
                  <i className="fas fa-weight mr-1"></i> {pet.weight} kg
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => setShowViewModal(pet)}
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
          ))}
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
      {/* Add Pet Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Add New Pet</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <form onSubmit={addPet} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">User ID</label>
                <input
                  type="text"
                  value={newPet.userId}
                  onChange={e => setNewPet({ ...newPet, userId: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter user ID"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={newPet.name}
                  onChange={e => setNewPet({ ...newPet, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter pet name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select
                  value={newPet.type}
                  onChange={e => setNewPet({ ...newPet, type: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                >
                  <option value="">Select type</option>
                  <option value="Dog">Dog</option>
                  <option value="Cat">Cat</option>
                  <option value="Bird">Bird</option>
                  <option value="Fish">Fish</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Breed</label>
                <input
                  type="text"
                  value={newPet.breed}
                  onChange={e => setNewPet({ ...newPet, breed: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter breed"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Birthday</label>
                <input
                  type="date"
                  value={newPet.birthday}
                  onChange={e => setNewPet({ ...newPet, birthday: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Weight (kg)</label>
                <input
                  type="number"
                  value={newPet.weight}
                  onChange={e => setNewPet({ ...newPet, weight: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter weight"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Allergies</label>
                <input
                  type="text"
                  value={newPet.allergies}
                  onChange={e => setNewPet({ ...newPet, allergies: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter allergies (if any)"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Favorite Food</label>
                <input
                  type="text"
                  value={newPet.favoriteFood}
                  onChange={e => setNewPet({ ...newPet, favoriteFood: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter favorite food"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Activities (comma-separated)</label>
                <input
                  type="text"
                  value={newPet.activities}
                  onChange={e => setNewPet({ ...newPet, activities: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="e.g., Fetch, Swimming"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Profile Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={e => setNewPet({ ...newPet, profileImage: e.target.files[0] })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
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
                  Add Pet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* View Pet Modal */}
      {showViewModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">{showViewModal.name}'s Profile</h3>
              <button
                onClick={() => setShowViewModal(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="space-y-3">
              <img src={showViewModal.profileImage} alt={showViewModal.name} className="w-full h-48 object-cover rounded-lg mb-3" />
              <p><strong>Type:</strong> {showViewModal.type}</p>
              <p><strong>Breed:</strong> {showViewModal.breed}</p>
              <p><strong>Age:</strong> {calculateAge(showViewModal.birthday)}</p>
              <p><strong>Weight:</strong> {showViewModal.weight} kg</p>
              <p><strong>Allergies:</strong> {showViewModal.allergies || 'None'}</p>
              <p><strong>Favorite Food:</strong> {showViewModal.favoriteFood || 'Not specified'}</p>
              <p><strong>Activities:</strong> {showViewModal.activities.join(', ') || 'None'}</p>
              </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setShowViewModal(null)}
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

export default PetProfiles;