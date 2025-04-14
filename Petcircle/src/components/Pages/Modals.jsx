import React from 'react';


export const MessageModal = ({ showMessageModal, setShowMessageModal, messageInput, setMessageInput }) => {
  if (!showMessageModal) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">New Message</h2>
          <button onClick={() => setShowMessageModal(false)} className="text-gray-500 hover:text-gray-700">
            <i className="fas fa-times text-xl"></i>
          </button>
        </div>
        <form className="space-y-6">
          <div>
            <label className="block text-gray-700 mb-2">To</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
              placeholder="Enter recipient's username or email"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Message</label>
            <textarea
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-500 h-32"
              placeholder="Type your message here..."
            ></textarea>
          </div>
          <button type="submit" className="!rounded-button bg-fuchsia-600 text-white w-full py-3 cursor-pointer hover:bg-fuchsia-700 whitespace-nowrap">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export const AddPetModal = ({ showAddPetModal, setShowAddPetModal, newPetForm, setNewPetForm, pets, setPets }) => {
  if (!showAddPetModal) return null;

  const handlePetFormChange = (e) => {
    const { name, value } = e.target;
    setNewPetForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddPet = (e) => {
    e.preventDefault();
    const newPet = {
      ...newPetForm,
      id: pets.length + 1,
      age: Math.floor((new Date() - new Date(newPetForm.birthday)) / (1000 * 60 * 60 * 24 * 365)),
      medicalHistory: [],
      gallery: [],
      milestones: [],
      profileImage: 'https://public.readdy.ai/ai/img_res/default_pet.jpg' // Default image
    };
    setPets((prev) => [...prev, newPet]);
    setNewPetForm({
      name: '',
      type: '',
      breed: '',
      birthday: '',
      weight: '',
      allergies: '',
      favoriteFood: '',
      activities: ''
    });
    setShowAddPetModal(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 w-full max-w-md overflow-y-auto max-h-[80vh]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Add New Pet</h2>
          <button onClick={() => setShowAddPetModal(false)} className="text-gray-500 hover:text-gray-700">
            <i className="fas fa-times text-xl"></i>
          </button>
        </div>
        <form onSubmit={handleAddPet} className="space-y-6">
          <div>
            <label className="block text-gray-700 mb-2">Pet Name</label>
            <input
              type="text"
              name="name"
              value={newPetForm.name}
              onChange={handlePetFormChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
              placeholder="Enter pet's name"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Pet Type</label>
            <select
              name="type"
              value={newPetForm.type}
              onChange={handlePetFormChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
            >
              <option value="Dog">Dog</option>
              <option value="Cat">Cat</option>
              <option value="Bird">Bird</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Breed</label>
            <input
              type="text"
              name="breed"
              value={newPetForm.breed}
              onChange={handlePetFormChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
              placeholder="Enter breed"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Birthday</label>
            <input
              type="date"
              name="birthday"
              value={newPetForm.birthday}
              onChange={handlePetFormChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Weight</label>
            <input
              type="text"
              name="weight"
              value={newPetForm.weight}
              onChange={handlePetFormChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
              placeholder="e.g., 10 kg"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Allergies</label>
            <input
              type="text"
              name="allergies"
              value={newPetForm.allergies}
              onChange={handlePetFormChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
              placeholder="e.g., Dairy, Pollen"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Favorite Food</label>
            <input
              type="text"
              name="favoriteFood"
              value={newPetForm.favoriteFood}
              onChange={handlePetFormChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
              placeholder="e.g., Chicken and Rice"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Favorite Activities</label>
            <input
              type="text"
              name="activities"
              value={newPetForm.activities}
              onChange={handlePetFormChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
              placeholder="e.g., Fetch, Swimming"
            />
          </div>
          <button type="submit" className="!rounded-button bg-fuchsia-600 text-white w-full py-3 cursor-pointer hover:bg-fuchsia-700 whitespace-nowrap">
            Add Pet
          </button>
        </form>
      </div>
    </div>
  );
};