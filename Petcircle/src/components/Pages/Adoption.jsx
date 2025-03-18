import React from 'react';

const Adoption = ({ adoptionListings, searchQuery, setSearchQuery, petTypeFilter, setPetTypeFilter, setSelectedChat, setShowMessageModal }) => {
  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Pet Adoption</h2>
          <div className="flex space-x-4">
            <button className="!rounded-button bg-purple-600 text-white px-6 py-2 cursor-pointer hover:bg-purple-700 whitespace-nowrap">
              <i className="fas fa-plus mr-2"></i>Post for Adoption
            </button>
            <div className="flex space-x-4">
              <input
                type="text"
                placeholder="Search pets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-500 w-64"
              />
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
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img src="https://public.readdy.ai/ai/img_res/d60d98ab6a5803929fde8b03bc23b4f7.jpg" alt="Happy Tails Adoption Center" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h4 className="text-xl font-bold mb-2">Happy Tails Adoption Center</h4>
                <div className="space-y-2 mb-4">
                  <p className="flex items-center text-gray-600"><i className="fas fa-map-marker-alt mr-2 text-red-500"></i>123 Pet Haven Street, New York</p>
                  <p className="flex items-center text-gray-600"><i className="fas fa-phone mr-2 text-green-500"></i>(555) 123-4567</p>
                  <p className="flex items-center text-gray-600"><i className="fas fa-clock mr-2 text-blue-500"></i>Open: 9:00 AM - 6:00 PM</p>
                </div>
                <div className="flex items-center space-x-2 mb-4">
                  <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-sm">No-Kill Shelter</span>
                  <span className="bg-fuchsia-100 text-fuchsia-600 px-2 py-1 rounded-full text-sm">Vet on Site</span>
                </div>
                <button className="!rounded-button bg-fuchsia-600 text-white w-full py-2 cursor-pointer hover:bg-fuchsia-700 whitespace-nowrap">Visit Center</button>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img src="https://public.readdy.ai/ai/img_res/e31198bc8c151a5cf0433d8a60548857.jpg" alt="Paws & Love Shelter" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h4 className="text-xl font-bold mb-2">Paws & Love Shelter</h4>
                <div className="space-y-2 mb-4">
                  <p className="flex items-center text-gray-600"><i className="fas fa-map-marker-alt mr-2 text-red-500"></i>456 Animal Care Lane, Boston</p>
                  <p className="flex items-center text-gray-600"><i className="fas fa-phone mr-2 text-green-500"></i>(555) 987-6543</p>
                  <p className="flex items-center text-gray-600"><i className="fas fa-clock mr-2 text-blue-500"></i>Open: 10:00 AM - 7:00 PM</p>
                </div>
                <div className="flex items-center space-x-2 mb-4">
                  <span className="bg-purple-100 text-purple-600 px-2 py-1 rounded-full text-sm">Rehabilitation</span>
                  <span className="bg-yellow-100 text-yellow-600 px-2 py-1 rounded-full text-sm">Training</span>
                </div>
                <button className="!rounded-button bg-fuchsia-600 text-white w-full py-2 cursor-pointer hover:bg-fuchsia-700 whitespace-nowrap">Visit Center</button>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img src="https://public.readdy.ai/ai/img_res/fccd25ba08a1d6417b3b738866ad4607.jpg" alt="Furry Friends Forever" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h4 className="text-xl font-bold mb-2">Furry Friends Forever</h4>
                <div className="space-y-2 mb-4">
                  <p className="flex items-center text-gray-600"><i className="fas fa-map-marker-alt mr-2 text-red-500"></i>789 Rescue Road, San Francisco</p>
                  <p className="flex items-center text-gray-600"><i className="fas fa-phone mr-2 text-green-500"></i>(555) 246-8135</p>
                  <p className="flex items-center text-gray-600"><i className="fas fa-clock mr-2 text-blue-500"></i>Open: 8:00 AM - 5:00 PM</p>
                </div>
                <div className="flex items-center space-x-2 mb-4">
                  <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-sm">Emergency Care</span>
                  <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-sm">Foster Program</span>
                </div>
                <button className="!rounded-button bg-fuchsia-600 text-white w-full py-2 cursor-pointer hover:bg-fuchsia-700 whitespace-nowrap">Visit Center</button>
              </div>
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {adoptionListings.map((listing) => (
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
                </div>
                <p className="text-gray-700 mb-6">{listing.description}</p>
                <button
                  onClick={() => {
                    setSelectedChat(listing.ownerId);
                    setShowMessageModal(true);
                  }}
                  className="!rounded-button bg-fuchsia-600 text-white px-6 py-2 w-full cursor-pointer hover:bg-fuchsia-700 whitespace-nowrap"
                >
                  Contact Owner
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Adoption;