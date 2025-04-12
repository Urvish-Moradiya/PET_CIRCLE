// components/PetProfiles.jsx
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const PetProfiles = ({ userId, pets, setPets }) => {
  const [showAddPetForm, setShowAddPetForm] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const navigate = useNavigate();

  // Fetch pets for the specific user
  useEffect(() => {
    const fetchPets = async () => {
      try {
        if (!userId) {
          console.log("No userId, showing login prompt");
          toast.warn("Please log in to view your pets.", {
            position: "top-right",
            autoClose: 3000,
          });
          return;
        }
  
        console.log("Fetching pets for userId:", userId);
        const response = await axios.get(`http://localhost:5000/pets?userId=${userId}`);
        if (response.status === 200) {
          const petData = Array.isArray(response.data.data)
            ? response.data.data.map((pet) => ({
                ...pet,
                activities: Array.isArray(pet.activities) ? pet.activities : [],
              }))
            : [];
          console.log("Fetched petData:", petData);
          setPets(petData);
        } else if (response.status === 404) {
          console.log("No pets found for userId:", userId);
          setPets([]);
          toast.info("No pets found for this user.", {
            position: "top-right",
            autoClose: 3000,
          });
        } else {
          throw new Error(response.data.message || "Failed to fetch pets");
        }
      } catch (error) {
        console.error("Fetch error:", error.response ? error.response.data : error.message);
        toast.error("Failed to fetch pets: " + (error.response?.data?.message || error.message), {
          position: "top-right",
          autoClose: 3000,
        });
      }
    };
  
    if (userId) fetchPets();
  }, [userId, setPets]);
  
  const submitHandler = async (data) => {
    try {
      if (!userId) {
        toast.error("Please log in to add a pet.", {
          position: "top-right",
          autoClose: 3000,
        });
        return;
      }

      const newPet = {
        userId,
        name: data.name,
        type: data.type,
        breed: data.breed,
        birthday: data.birthday,
        weight: Number(data.weight),
        allergies: data.allergies || "None",
        favoriteFood: data.favoriteFood || "Not specified",
        activities: data.activities ? data.activities.split(",").map((act) => act.trim()) : [],
        profileImage: data.profileImage || "https://via.placeholder.com/150",
      };

      const response = await axios.post("http://localhost:5000/pets", newPet, {
        headers: { "Content-Type": "application/json" },
      });
      if (response.status === 201) {
        setPets((prevPets) => [...prevPets, response.data.data]);
        toast.success("Pet added successfully!", {
          position: "top-right",
          autoClose: 2000,
        });
        setTimeout(() => {
          setShowAddPetForm(false);
          reset();
        }, 2000);
      } else {
        throw new Error(response.data.message || "Failed to add pet");
      }
    } catch (error) {
      console.error("Submit error:", error);
      toast.error(error.message || "Failed to add pet.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const validationMethod = {
    nameValidator: { required: { value: true, message: "Pet name is required" } },
    typeValidator: { required: { value: true, message: "Pet type is required" } },
    breedValidator: { required: { value: true, message: "Breed is required" } },
    birthdayValidator: { required: { value: true, message: "Birthday is required" } },
    weightValidator: {
      required: { value: true, message: "Weight is required" },
      pattern: { value: /^[0-9]+(\.[0-9]+)?$/, message: "Enter a valid weight (e.g., 5 or 5.5)" },
    },
  };

  if (!userId) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">My Pet Profiles</h2>
        <p className="text-gray-600 mb-6">You are not logged in.</p>
        <button
          onClick={() => navigate("/login")}
          className="rounded-button bg-purple-600 text-white px-6 py-2 cursor-pointer hover:bg-purple-700 whitespace-nowrap"
        >
          <i className="fas fa-sign-in-alt mr-2"></i>Log In
        </button>
      </div>
    );
  }

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">My Pet Profiles</h2>
          <button
            onClick={() => setShowAddPetForm(!showAddPetForm)}
            className="rounded-button bg-purple-600 text-white px-6 py-2 cursor-pointer hover:bg-purple-700 whitespace-nowrap"
          >
            <i className={`fas ${showAddPetForm ? "fa-times" : "fa-plus"} mr-2`}></i>
            {showAddPetForm ? "Close Form" : "Add New Pet"}
          </button>
        </div>

        {showAddPetForm && (
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h3 className="text-2xl font-semibold mb-6">Add New Pet</h3>
            <form className="space-y-6" onSubmit={handleSubmit(submitHandler)}>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 mb-2">Pet Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter pet name"
                    {...register("name", validationMethod.nameValidator)}
                  />
                  {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Pet Type</label>
                  <select
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    {...register("type", validationMethod.typeValidator)}
                  >
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
                  <input
                    type="text"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter breed"
                    {...register("breed", validationMethod.breedValidator)}
                  />
                  {errors.breed && <span className="text-red-500 text-sm">{errors.breed.message}</span>}
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Birthday</label>
                  <input
                    type="date"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    {...register("birthday", validationMethod.birthdayValidator)}
                  />
                  {errors.birthday && (
                    <span className="text-red-500 text-sm">{errors.birthday.message}</span>
                  )}
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Weight (in kg)</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter weight"
                    {...register("weight", validationMethod.weightValidator)}
                  />
                  {errors.weight && (
                    <span className="text-red-500 text-sm">{errors.weight.message}</span>
                  )}
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Allergies (optional)</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter allergies (if any)"
                    {...register("allergies")}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Favorite Food (optional)</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter favorite food"
                    {...register("favoriteFood")}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-gray-700 mb-2">
                    Favorite Activities (comma-separated, optional)
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="e.g., Fetch, Swimming, Napping"
                    {...register("activities")}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-gray-700 mb-2">Profile Image URL (optional)</label>
                  <input
                    type="url"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter image URL"
                    {...register("profileImage")}
                  />
                </div>
              </div>
              <button
                type="submit"
                className="rounded-button bg-purple-600 text-white w-full py-3 cursor-pointer hover:bg-purple-700 whitespace-nowrap"
              >
                Add Pet
              </button>
            </form>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-8">
          {Array.isArray(pets) && pets.length > 0 ? (
            pets.map((pet) => (
              <div key={pet._id} className="bg-white rounded-lg shadow-lg mb-8">
                <div className="grid md:grid-cols-2 gap-8 p-8">
                  <div className="space-y-6">
                    <div className="relative">
                      <img
                        src={pet.profileImage || "https://via.placeholder.com/150"}
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
                  </div>
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-xl font-semibold mb-4">Basic Information</h4>
                      <div className="space-y-3">
                        <div className="flex items-center text-gray-600">
                          <i className="fas fa-birthday-cake w-6"></i>
                          <span className="mr-2">Birthday:</span>
                          <span>{new Date(pet.birthday).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <i className="fas fa-weight w-6"></i>
                          <span className="mr-2">Weight:</span>
                          <span>{pet.weight} kg</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <i className="fas fa-exclamation-circle w-6"></i>
                          <span className="mr-2">Allergies:</span>
                          <span>{pet.allergies || "None"}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <i className="fas fa-bone w-6"></i>
                          <span className="mr-2">Favorite Food:</span>
                          <span>{pet.favoriteFood || "None"}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold mb-4">Favorite Activities</h4>
                      <div className="flex flex-wrap gap-2">
                        {Array.isArray(pet.activities) && pet.activities.length > 0 ? (
                          pet.activities.map((activity, index) => (
                            <span
                              key={index}
                              className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full"
                            >
                              {activity}
                            </span>
                          ))
                        ) : (
                          <span className="text-gray-600">No activities listed.</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-center col-span-2">No pets available yet.</p>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default PetProfiles;