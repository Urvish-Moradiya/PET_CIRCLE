// src/components/PetProfiles.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

const PetProfiles = ({ pets, setPets }) => {
  const [showAddPetForm, setShowAddPetForm] = useState(false);
  const fileInputRefs = useRef({}); // Object to store refs for each pet
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await axios.get('http://localhost:5000/pets');
        if (response.status === 200) {
          setPets(response.data.data);
        } else {
          throw new Error(response.data.message || 'Failed to fetch pets');
        }
      } catch (error) {
        toast.error('Failed Halloween pets: ' + error.message, {
          position: "top-right",
          autoClose: 3000,
        });
      }
    };
    fetchPets();
  }, [setPets]);

  const submitHandler = async (data) => {
    try {
      const newPet = {
        name: data.name,
        type: data.type,
        breed: data.breed,
        birthday: data.birthday,
        weight: Number(data.weight),
        allergies: data.allergies,
        favoriteFood: data.favoriteFood,
        activities: data.activities ? data.activities.split(',').map(act => act.trim()) : [],
        profileImage: data.profileImage,
      };

      const response = await axios.post('http://localhost:5000/pets', newPet);
      if (response.status === 201) {
        setPets((prevPets) => [...prevPets, response.data.data]);
        toast.success('Pet added successfully!', { position: "top-right", autoClose: 2000 });
        setTimeout(() => {
          setShowAddPetForm(false);
          reset();
        }, 2000);
      } else {
        throw new Error(response.data.message || 'Failed to add pet');
      }
    } catch (error) {
      toast.error(error.message || 'Failed to add pet.', { position: "top-right", autoClose: 3000 });
    }
  };

  const triggerFileInput = (petId) => {
    if (fileInputRefs.current[petId]) {
      fileInputRefs.current[petId].click();
    }
  };

  const validationMethod = {
    nameValidator: { required: { value: true, message: "Pet name is required" } },
    typeValidator: { required: { value: true, message: "Pet type is required" } },
    breedValidator: { required: { value: true, message: "Breed is required" } },
    birthdayValidator: { required: { value: true, message: "Birthday is required" } },
    weightValidator: { 
      required: { value: true, message: "Weight is required" },
      pattern: { value: /^[0-9]+(\.[0-9]+)?$/, message: "Enter a valid weight (e.g., 5 or 5.5)" }
    },
  };

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">My Pet Profiles</h2>
          <button
            onClick={() => setShowAddPetForm(!showAddPetForm)}
            className="rounded-button bg-purple-600 text-white px-6 py-2 cursor-pointer hover:bg-purple-700 whitespace-nowrap"
          >
            <i className={`fas ${showAddPetForm ? 'fa-times' : 'fa-plus'} mr-2`}></i>
            {showAddPetForm ? 'Close Form' : 'Add New Pet'}
          </button>
        </div>

        {showAddPetForm && (
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h3 className="text-2xl font-semibold mb-6">Add New Pet</h3>
            <form className="space-y-6" onSubmit={handleSubmit(submitHandler)}>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 mb-2">Pet Name</label>
                  <input type="text" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="Enter pet name" {...register("name", validationMethod.nameValidator)} />
                  {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Pet Type</label>
                  <select className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" {...register("type", validationMethod.typeValidator)}>
                    <option value="">Select pet type</option>
                    <option value="Dog">Dog</option>
                    <option value="Cat">Cat</option>
                    <option value="Bird">Bird</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.type && <span className="text-red-500 text-sm">{errors.type.message}</span>}
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Breed</label>
                  <input type="text" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="Enter breed" {...register("breed", validationMethod.breedValidator)} />
                  {errors.breed && <span className="text-red-500 text-sm">{errors.breed.message}</span>}
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Birthday</label>
                  <input type="date" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" {...register("birthday", validationMethod.birthdayValidator)} />
                  {errors.birthday && <span className="text-red-500 text-sm">{errors.birthday.message}</span>}
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Weight (in kg)</label>
                  <input type="text" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="Enter weight" {...register("weight", validationMethod.weightValidator)} />
                  {errors.weight && <span className="text-red-500 text-sm">{errors.weight.message}</span>}
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Allergies (optional)</label>
                  <input type="text" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="Enter allergies (if any)" {...register("allergies")} />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Favorite Food (optional)</label>
                  <input type="text" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="Enter favorite food" {...register("favoriteFood")} />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-gray-700 mb-2">Favorite Activities (comma-separated, optional)</label>
                  <input type="text" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="e.g., Fetch, Swimming, Napping" {...register("activities")} />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-gray-700 mb-2">Profile Image URL (optional)</label>
                  <input type="url" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="Enter image URL" {...register("profileImage")} />
                </div>
              </div>
              <button type="submit" className="rounded-button bg-purple-600 text-white w-full py-3 cursor-pointer hover:bg-purple-700 whitespace-nowrap">Add Pet</button>
            </form>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-8">
          {pets.map((pet) => (
            <div key={pet.id} className="bg-white rounded-lg shadow-lg mb-8">
              <div className="grid md:grid-cols-2 gap-8 p-8">
                <div className="space-y-6">
                  <div className="relative">
                    <img src={pet.profileImage} alt={pet.name} className="w-full h-80 object-cover rounded-lg" />
                    <span className="absolute top-4 right-4 bg-fuchsia-100 text-fuchsia-600 px-3 py-1 rounded-full">{pet.type}</span>
                  </div>
                  <div className="text-center">
                    <h3 className="text-2xl font-bold mb-2">{pet.name}</h3>
                    <p className="text-gray-600">{pet.breed}</p>
                  </div>
                  
                </div>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xl font-semibold mb-4">Basic Information</h4>
                    <div className="space-y-3">
                      <div className="flex items-center text-gray-600">
                        <i className="fas fa-birthday-cake w-6"></i>
                        <span className="mr-2">Birthday:</span>
                        {pet.isEditing ? (
                          <input type="date" value={pet.birthday} onChange={(e) => setPets(pets.map(p => p.id === pet.id ? { ...p, birthday: e.target.value } : p))} className="px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-fuchsia-500" />
                        ) : (
                          <span>{new Date(pet.birthday).toLocaleDateString()}</span>
                        )}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <i className="fas fa-weight w-6"></i>
                        <span className="mr-2">Weight:</span>
                        {pet.isEditing ? (
                          <input type="text" value={pet.weight} onChange={(e) => setPets(pets.map(p => p.id === pet.id ? { ...p, weight: e.target.value } : p))} className="px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-fuchsia-500" />
                        ) : (
                          <span>{pet.weight}</span>
                        )}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <i className="fas fa-exclamation-circle w-6"></i>
                        <span className="mr-2">Allergies:</span>
                        {pet.isEditing ? (
                          <input type="text" value={pet.allergies} onChange={(e) => setPets(pets.map(p => p.id === pet.id ? { ...p, allergies: e.target.value } : p))} className="px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-fuchsia-500" />
                        ) : (
                          <span>{pet.allergies}</span>
                        )}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <i className="fas fa-bone w-6"></i>
                        <span className="mr-2">Favorite Food:</span>
                        {pet.isEditing ? (
                          <input type="text" value={pet.favoriteFood} onChange={(e) => setPets(pets.map(p => p.id === pet.id ? { ...p, favoriteFood: e.target.value } : p))} className="px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-fuchsia-500" />
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
                        <span key={index} className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full">{activity}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-4">Quick Actions</h4>
                    <div className="grid grid-cols-1 gap-4">
                      <button onClick={() => setPets(pets.map(p => p.id === pet.id ? { ...p, isEditing: !p.isEditing } : p))} className="rounded-button bg-fuchsia-600 text-white px-4 py-2 whitespace-nowrap">
                        <i className={`fas ${pet.isEditing ? 'fa-check' : 'fa-edit'} mr-2`}></i>
                        {pet.isEditing ? 'Save Changes' : 'Edit Profile'}
                      </button>
                     
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default PetProfiles;