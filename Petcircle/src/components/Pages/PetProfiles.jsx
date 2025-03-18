import React from 'react';

const PetProfiles = ({ pets, setPets, setShowAddPetModal }) => {
  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">My Pet Profiles</h2>
          <button
            onClick={() => setShowAddPetModal(true)}
            className="!rounded-button bg-purple-600 text-white px-6 py-2 cursor-pointer hover:bg-purple-700 whitespace-nowrap"
          >
            <i className="fas fa-plus mr-2"></i>Add New Pet
          </button>
        </div>
        {pets.map((pet) => (
          <div key={pet.id} className="bg-white rounded-lg shadow-lg mb-8">
            <div className="grid md:grid-cols-3 gap-8 p-8">
              {/* Left Column: Image and Gallery */}
              <div className="space-y-6">
                <div className="relative">
                  <img
                    src={pet.profileImage}
                    alt={pet.name}
                    className="w-full h-80 object-cover rounded-lg"
                  />
                  <span className="absolute top-4 right-4 bg-fuchsia-100 text-fuchsia-600 px-3 py-1 rounded-full">
                    {pet.type}
                  </span>
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-2">{pet.name}</h3>
                  <p className="text-gray-600">{pet.breed}</p>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {pet.gallery.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${pet.name}'s gallery`}
                      className="w-full h-24 object-cover rounded-lg cursor-pointer hover:opacity-75 transition-opacity"
                    />
                  ))}
                </div>
              </div>

              {/* Middle Column: Basic Info, Activities, Medical History */}
              <div className="space-y-6">
                <div>
                  <h4 className="text-xl font-semibold mb-4">Basic Information</h4>
                  <div className="space-y-3">
                    <div className="flex items-center text-gray-600">
                      <i className="fas fa-birthday-cake w-6"></i>
                      <span className="mr-2">Birthday:</span>
                      {pet.isEditing ? (
                        <input
                          type="date"
                          value={pet.birthday}
                          onChange={(e) => {
                            const updatedPet = {
                              ...pet,
                              birthday: e.target.value,
                              age: Math.floor(
                                (new Date() - new Date(e.target.value)) /
                                  (1000 * 60 * 60 * 24 * 365)
                              ),
                            };
                            setPets(pets.map((p) => (p.id === pet.id ? updatedPet : p)));
                          }}
                          className="px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
                        />
                      ) : (
                        <span>{new Date(pet.birthday).toLocaleDateString()}</span>
                      )}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <i className="fas fa-weight w-6"></i>
                      <span className="mr-2">Weight:</span>
                      {pet.isEditing ? (
                        <input
                          type="text"
                          value={pet.weight}
                          onChange={(e) => {
                            const updatedPet = { ...pet, weight: e.target.value };
                            setPets(pets.map((p) => (p.id === pet.id ? updatedPet : p)));
                          }}
                          className="px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
                        />
                      ) : (
                        <span>{pet.weight}</span>
                      )}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <i className="fas fa-exclamation-circle w-6"></i>
                      <span className="mr-2">Allergies:</span>
                      {pet.isEditing ? (
                        <input
                          type="text"
                          value={pet.allergies}
                          onChange={(e) => {
                            const updatedPet = { ...pet, allergies: e.target.value };
                            setPets(pets.map((p) => (p.id === pet.id ? updatedPet : p)));
                          }}
                          className="px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
                        />
                      ) : (
                        <span>{pet.allergies}</span>
                      )}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <i className="fas fa-bone w-6"></i>
                      <span className="mr-2">Favorite Food:</span>
                      {pet.isEditing ? (
                        <input
                          type="text"
                          value={pet.favoriteFood}
                          onChange={(e) => {
                            const updatedPet = { ...pet, favoriteFood: e.target.value };
                            setPets(pets.map((p) => (p.id === pet.id ? updatedPet : p)));
                          }}
                          className="px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
                        />
                      ) : (
                        <span>{pet.favoriteFood}</span>
                      )}
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-4">Favorite Activities</h4>
                  <div className="flex flex-wrap gap-2">
                    {pet.activities.map((activity, index) => (
                      <span
                        key={index}
                        className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full"
                      >
                        {activity}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-4">Medical History</h4>
                  <div className="space-y-3">
                    {pet.medicalHistory.map((record, index) => (
                      <div key={index} className="bg-gray-50 p-3 rounded-lg">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-semibold">{record.type}</span>
                          <span className="text-sm text-gray-500">{record.date}</span>
                        </div>
                        <p className="text-gray-600 text-sm">{record.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Milestones and Quick Actions */}
              <div className="space-y-6">
                <div>
                  <h4 className="text-xl font-semibold mb-4">Milestones & Achievements</h4>
                  <div className="relative pl-8 space-y-6">
                    {pet.milestones.map((milestone, index) => (
                      <div key={index} className="relative">
                        <div className="absolute -left-8 w-4 h-4 bg-fuchsia-600 rounded-full mt-2"></div>
                        <div className="border-l-2 border-fuchsia-200 pl-6 pb-6">
                          <div className="bg-white p-4 rounded-lg shadow">
                            <div className="flex justify-between items-center mb-2">
                              <h5 className="font-semibold text-fuchsia-600">{milestone.title}</h5>
                              <span className="text-sm text-gray-500">{milestone.date}</span>
                            </div>
                            <p className="text-gray-600">{milestone.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-4">Quick Actions</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => {
                        const updatedPet = { ...pet, isEditing: !pet.isEditing };
                        setPets(pets.map((p) => (p.id === pet.id ? updatedPet : p)));
                      }}
                      className="!rounded-button bg-fuchsia-600 text-white px-4 py-2 whitespace-nowrap"
                    >
                      <i className={`fas ${pet.isEditing ? 'fa-check' : 'fa-edit'} mr-2`}></i>
                      {pet.isEditing ? 'Save Changes' : 'Edit Profile'}
                    </button>
                    <button
                      onClick={() => {
                        const newPhotoUrl =
                          'https://readdy.ai/api/search-image?query=Beautiful pet portrait in modern studio setting with perfect lighting showing personality and charm professional photography&width=300&height=300&flag=d82433cde449012385e7fee49bc7d764&seq=' +
                          Math.floor(Math.random() * 1000) +
                          '&orientation=squarish';
                        const updatedPet = {
                          ...pet,
                          gallery: [...pet.gallery, newPhotoUrl],
                        };
                        setPets(pets.map((p) => (p.id === pet.id ? updatedPet : p)));
                      }}
                      className="!rounded-button bg-purple-600 text-white px-4 py-2 whitespace-nowrap"
                    >
                      <i className="fas fa-camera mr-2"></i>Add Photos
                    </button>
                    <button
                      onClick={() => {
                        const type = prompt('Enter health record type (e.g., Vaccination, Check-up):');
                        const description = prompt('Enter description:');
                        if (type && description) {
                          const newRecord = {
                            date: new Date().toISOString().split('T')[0],
                            type,
                            description,
                          };
                          const updatedPet = {
                            ...pet,
                            medicalHistory: [newRecord, ...pet.medicalHistory],
                          };
                          setPets(pets.map((p) => (p.id === pet.id ? updatedPet : p)));
                        }
                      }}
                      className="!rounded-button bg-green-600 text-white px-4 py-2 whitespace-nowrap"
                    >
                      <i className="fas fa-notes-medical mr-2"></i>Add Health Record
                    </button>
                    <button
                      onClick={() => {
                        const title = prompt('Enter achievement title:');
                        const description = prompt('Enter achievement description:');
                        if (title && description) {
                          const newMilestone = {
                            date: new Date().toISOString().split('T')[0],
                            title,
                            description,
                          };
                          const updatedPet = {
                            ...pet,
                            milestones: [newMilestone, ...pet.milestones],
                          };
                          setPets(pets.map((p) => (p.id === pet.id ? updatedPet : p)));
                        }
                      }}
                      className="!rounded-button bg-blue-600 text-white px-4 py-2 whitespace-nowrap"
                    >
                      <i className="fas fa-trophy mr-2"></i>Add Achievement
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PetProfiles;