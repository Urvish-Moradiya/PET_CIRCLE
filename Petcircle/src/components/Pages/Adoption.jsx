import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Adoption = ({ adoptionListings, searchQuery, setSearchQuery, petTypeFilter, setPetTypeFilter, setSelectedChat, setShowMessageModal }) => {
  const [centers, setCenters] = useState([]);
  const [pets, setPets] = useState(adoptionListings);
  const [allPets, setAllPets] = useState([]); // State for all fetched pets
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    address: '',
    age: '',
    petType: '',
    breed: '',
    description: '',
    ownerContact: '' // Added ownerContact to formData
  });
  const [formError, setFormError] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  // Fetch adoption centers and all pets when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch centers
        const centersResponse = await axios.get('/centers');
        setCenters(centersResponse.data.data);

        // Fetch all pets
        const petsResponse = await axios.get('/adoptpet');
        const formattedPets = petsResponse.data.data.map(pet => ({
          id: pet._id,
          petName: pet.name,
          image: pet.image || 'https://via.placeholder.com/150',
          location: pet.address,
          age: pet.age,
          breed: pet.breed,
          description: pet.description,
          petType: pet.petType,
          ownerContact: pet.ownerContact, // Include ownerContact
          ownerId: 'current-user-id' // Replace with actual owner ID logic if available
        }));
        setAllPets(formattedPets);

        setError(null);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Format time for display
  const formatTime = (time) => {
    return new Date(time).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Handle new pet addition
  const handlePetAdded = (newPet) => {
    const formattedPet = {
      id: newPet._id,
      petName: newPet.name,
      image: newPet.image || 'https://via.placeholder.com/150',
      location: newPet.address,
      age: newPet.age,
      breed: newPet.breed,
      description: newPet.description,
      petType: newPet.petType,
      ownerContact: newPet.ownerContact, // Include ownerContact
      ownerId: 'current-user-id'
    };
    setPets([formattedPet, ...pets]);
    setAllPets([formattedPet, ...allPets]); // Add to all pets as well
  };

  // Form handlers
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setFormLoading(true);
      const response = await axios.post('/adoptpet', formData); // Updated endpoint to match your backend
      handlePetAdded(response.data.data);
      setShowForm(false);
      setFormData({
        name: '',
        image: '',
        address: '',
        age: '',
        petType: '',
        breed: '',
        description: '',
        ownerContact: '' // Reset ownerContact
      });
      setFormError(null);
    } catch (err) {
      setFormError(err.response?.data?.message || 'Error adding pet');
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Pet Adoption</h2>
          <div className="flex space-x-4">
            <button
              onClick={() => setShowForm(true)}
              className="!rounded-button bg-purple-600 text-white px-6 py-2 cursor-pointer hover:bg-purple-700 whitespace-nowrap"
            >
              <i className="fas fa-plus mr-2"></i>Post for Adoption
            </button>
            <div className="flex space-x-4">
              <select
                value={petTypeFilter}
                onChange={(e) => setPetTypeFilter(e.target.value)}
                className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
              >
                <option value="all">All Pets</option>
                <option value="dog">Dogs</option>
                <option value="cat">Cats</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-6">Featured Adoption Centers</h3>

          {loading && (
            <div className="text-center">Loading adoption centers...</div>
          )}

          {error && (
            <div className="text-center text-red-500">Error: {error}</div>
          )}

          {!loading && !error && (
            <div className="grid md:grid-cols-3 gap-8">
              {centers.map((center) => (
                <div key={center._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <img
                    src={center.image}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h4 className="text-xl font-bold mb-2">{center.name}</h4>
                    <div className="space-y-2 mb-4">
                      <p className="flex items-center text-gray-600">
                        <i className="fas fa-map-marker-alt mr-2 text-red-500"></i>
                        {center.address}
                      </p>
                      <p className="flex items-center text-gray-600">
                        <i className="fas fa-phone mr-2 text-green-500"></i>
                        {center.number}
                      </p>
                      <p className="flex items-center text-gray-600">
                        <i className="fas fa-clock mr-2 text-blue-500"></i>
                        Open: {formatTime(center.time)}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2 mb-4 flex-wrap">
                      {center.feature.map((feat, index) => (
                        <span
                          key={index}
                          className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-sm m-1"
                        >
                          {feat}
                        </span>
                      ))}
                    </div>
                    <button
                      onClick={() => center.url && window.open(center.url, '_blank')} // Redirect to URL
                      className="!rounded-button bg-fuchsia-600 text-white w-full py-2 cursor-pointer hover:bg-fuchsia-700 whitespace-nowrap disabled:bg-gray-400 disabled:cursor-not-allowed"
                      disabled={!center.url} // Disable button if no URL
                    >
                      Visit Center
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* All Available Pets Section */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-6">Available Pets for Adoption</h3>

          {loading && (
            <div className="text-center">Loading pets...</div>
          )}

          {error && (
            <div className="text-center text-red-500">Error: {error}</div>
          )}

          {!loading && !error && (
            <div className="grid md:grid-cols-3 gap-8">
              {allPets
                .filter(pet => petTypeFilter === 'all' || pet.petType === petTypeFilter)
                .map((listing) => (
                  <div key={listing.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="h-64 overflow-hidden">
                      <img src={listing.image} alt={listing.petName} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-2xl font-bold">{listing.petName}</h3>
                        <span className="bg-fuchsia-100 text-fuchsia-600 px-3 py-1 rounded-full">{listing.petType}</span>
                      </div>
                      <div className="space-y-2 mb-4">
                        <p className="text-gray-600"><i className="fas fa-map-marker-alt mr-2"></i>{listing.location}</p>
                        <p className="text-gray-600"><i className="fas fa-birthday-cake mr-2"></i>{listing.age} years old</p>
                        <p className="text-gray-600"><i className="fas fa-paw mr-2"></i>{listing.breed}</p>
                        <p className="text-gray-600">
                          <i className="fas fa-phone mr-2"></i>
                          <a href={`tel:${listing.ownerContact}`} className="text-fuchsia-600 hover:underline">
                            {listing.ownerContact}
                          </a>
                        </p>
                      </div>
                      <p className="text-gray-700 mb-6">{listing.description}</p>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-gray-500/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-6">Add Pet for Adoption</h2>

            {formError && <div className="text-red-500 mb-4">{formError}</div>}

            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-1">Pet Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1">Image URL</label>
                    <input
                      type="text"
                      name="image"
                      value={formData.image}
                      onChange={handleChange}
                      className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-1">Location *</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1">Age (years) *</label>
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      required
                      min="0"
                      className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-1">Pet Type *</label>
                    <input
                      type="text"
                      name="petType"
                      value={formData.petType}
                      onChange={handleChange}
                      required
                      className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1">Breed *</label>
                    <input
                      type="text"
                      name="breed"
                      value={formData.breed}
                      onChange={handleChange}
                      required
                      className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 mb-1">Owner Contact Number *</label>
                  <input
                    type="text"
                    name="ownerContact"
                    value={formData.ownerContact}
                    onChange={handleChange}
                    required
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
                    placeholder="e.g., 1234567890"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-1">Description *</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 h-24"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={formLoading}
                  className="px-4 py-2 bg-fuchsia-600 text-white rounded-lg hover:bg-fuchsia-700 disabled:bg-fuchsia-400"
                >
                  {formLoading ? 'Adding...' : 'Add Pet'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Adoption;