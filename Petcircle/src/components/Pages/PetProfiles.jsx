
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

const PetProfiles = ({ pets, setPets }) => {
  // Hooks at the top
  const { user, loading, logout } = useAuth();
  const [showAddPetForm, setShowAddPetForm] = useState(false);
  const [showEditPetForm, setShowEditPetForm] = useState(false);
  const [editingPet, setEditingPet] = useState(null);
  const [fetched, setFetched] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();
  const navigate = useNavigate();

  // User ID
  const userId = user?._id;

  // Fetch pets
  useEffect(() => {
    const fetchPets = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          throw new Error("No authentication token found");
        }

        console.log("Fetching pets for userId:", userId);
        const response = await axios.get(`http://localhost:5000/pets?userId=${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 200) {
          const petData = Array.isArray(response.data.data)
            ? response.data.data.map((pet) => ({
              ...pet,
              activities: Array.isArray(pet.activities) ? pet.activities : [],
              profileImage: pet.profileImage || null,
            }))
            : [];
          console.log("Fetched petData:", petData);
          setPets(petData);
          setFetched(true);
        } else if (response.status === 404) {
          console.log("No pets found for userId:", userId);
          setPets([]);
          setFetched(true);
          toast.info("No pets found for this user.", {
            position: "top-right",
            autoClose: 3000,
          });
        }
      } catch (error) {
        console.error("Fetch error:", error.response ? error.response.data : error.message);
        if (error.response?.status === 401) {
          toast.error("Session expired. Please log in again.", {
            position: "top-right",
            autoClose: 3000,
          });
          await logout();
          navigate("/login");
        } else {
          toast.error("Failed to fetch pets ", {
            position: "top-right",
            autoClose: 3000,
          });
        }
      }
    };

    if (userId && !loading && !fetched) {
      fetchPets();
    }
  }, [userId, loading, fetched, logout, navigate]);

  // Add pet
  const submitHandler = async (data) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const formData = new FormData();
      formData.append("userId", userId);
      formData.append("name", data.name);
      formData.append("type", data.type);
      formData.append("breed", data.breed);
      formData.append("birthday", data.birthday);
      formData.append("weight", data.weight);
      formData.append("allergies", data.allergies || "None");
      formData.append("favoriteFood", data.favoriteFood || "Not specified");
      if (data.activities) {
        formData.append("activities", data.activities.split(",").map((act) => act.trim()));
      }
      if (data.profileImage && data.profileImage[0]) {
        formData.append("profileImage", data.profileImage[0]);
      }

      console.log("Adding pet for userId:", userId);
      const response = await axios.post("http://localhost:5000/pets", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
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
      }
    } catch (error) {
      console.error("Submit error:", error.response ? error.response.data : error.message);
      if (error.response?.status === 401) {
        toast.error("Session expired. Please log in again.", {
          position: "top-right",
          autoClose: 3000,
        });
        await logout();
        navigate("/login");
      } else {
        toast.error(error.response?.data?.error || "Failed to add pet.", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    }
  };

  // Edit pet
  const editHandler = async (data) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const formData = new FormData();
      formData.append("userId", userId);
      formData.append("name", data.name);
      formData.append("type", data.type);
      formData.append("breed", data.breed);
      formData.append("birthday", data.birthday);
      formData.append("weight", data.weight);
      formData.append("allergies", data.allergies || "None");
      formData.append("favoriteFood", data.favoriteFood || "Not specified");
      if (data.activities) {
        formData.append("activities", data.activities.split(",").map((act) => act.trim()));
      }
      if (data.profileImage && data.profileImage[0]) {
        formData.append("profileImage", data.profileImage[0]);
      }

      console.log("Updating pet:", editingPet._id);
      const response = await axios.put(`http://localhost:5000/pets/${editingPet._id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        setPets((prevPets) =>
          prevPets.map((pet) =>
            pet._id === editingPet._id ? response.data.data : pet
          )
        );
        toast.success("Pet updated successfully!", {
          position: "top-right",
          autoClose: 2000,
        });
        setTimeout(() => {
          setShowEditPetForm(false);
          setEditingPet(null);
          reset();
        }, 2000);
      }
    } catch (error) {
      console.error("Edit error:", error.response ? error.response.data : error.message);
      if (error.response?.status === 401) {
        toast.error("Session expired. Please log in again.", {
          position: "top-right",
          autoClose: 3000,
        });
        await logout();
        navigate("/login");
      } else {
        toast.error(error.response?.data?.error || "Failed to update pet.", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    }
  };

  // Delete pet
  const deleteHandler = async (petId) => {
    if (!window.confirm("Are you sure you want to delete this pet?")) {
      return;
    }

    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        throw new Error("No authentication token found");
      }

      console.log("Deleting pet:", petId);
      const response = await axios.delete(`http://localhost:5000/pets/${petId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        setPets((prevPets) => prevPets.filter((pet) => pet._id !== petId));
        toast.success("Pet deleted successfully!", {
          position: "top-right",
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.error("Delete error:", error.response ? error.response.data : error.message);
      if (error.response?.status === 401) {
        toast.error("Session expired. Please log in again.", {
          position: "top-right",
          autoClose: 3000,
        });
        await logout();
        navigate("/login");
      } else {
        toast.error(error.response?.data?.error || "Failed to delete pet.", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    }
  };

  // Open edit form
  const openEditForm = (pet) => {
    setEditingPet(pet);
    setShowEditPetForm(true);
    setShowAddPetForm(false);
    setValue("name", pet.name);
    setValue("type", pet.type);
    setValue("breed", pet.breed);
    setValue("birthday", new Date(pet.birthday).toISOString().split("T")[0]);
    setValue("weight", pet.weight);
    setValue("allergies", pet.allergies === "None" ? "" : pet.allergies);
    setValue("favoriteFood", pet.favoriteFood === "Not specified" ? "" : pet.favoriteFood);
    setValue("activities", pet.activities?.join(", ") || "");
  };

  // Form validation
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

  // Conditional rendering
  if (loading) {
    return <div className="py-20 text-center">Loading...</div>;
  }

  if (!user) {
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
            onClick={() => {
              setShowAddPetForm(!showAddPetForm);
              setShowEditPetForm(false);
              setEditingPet(null);
              reset();
            }}
            className="rounded-button bg-purple-600 text-white px-6 py-2 cursor-pointer hover:bg-purple-700 whitespace-nowrap"
          >
            <i className={`fas ${showAddPetForm ? "fa-times" : "fa-plus"} mr-2`}></i>
            {showAddPetForm ? "Close Form" : "Add New Pet"}
          </button>
        </div>

        {(showAddPetForm || showEditPetForm) && (
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h3 className="text-2xl font-semibold mb-6">
              {showEditPetForm ? "Edit Pet" : "Add New Pet"}
            </h3>
            <form
              className="space-y-6"
              onSubmit={handleSubmit(showEditPetForm ? editHandler : submitHandler)}
              encType="multipart/form-data"
            >
              <div className="grid md:grid-cols-2 gap-6">
                {showEditPetForm && editingPet.profileImage && (
                  <div className="md:col-span-2 mb-4">
                    <label className="block text-gray-700 mb-2">Current Image</label>
                    <img
                      src={`${editingPet.profileImage}?t=${new Date().getTime()}`}
                      alt="Current pet"
                      className="w-32 h-32 object-cover rounded-lg"
                      onError={(e) => {
                        console.error("Image load error:", editingPet.profileImage);
                        e.target.src = "https://via.placeholder.com/150";
                      }}
                    />
                  </div>
                )}
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
                  <label className="block text-gray-700 mb-2">Profile Image (optional)</label>
                  <input
                    type="file"
                    accept="image/jpeg,image/jpg,image/png"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    {...register("profileImage")}
                  />
                </div>
              </div>
              <button
                type="submit"
                className="rounded-button bg-purple-600 text-white w-full py-3 cursor-pointer hover:bg-purple-700 whitespace-nowrap"
              >
                {showEditPetForm ? "Update Pet" : "Add Pet"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowAddPetForm(false);
                  setShowEditPetForm(false);
                  setEditingPet(null);
                  reset();
                }}
                className="rounded-button bg-gray-600 text-white w-full py-3 mt-4 cursor-pointer hover:bg-gray-700 whitespace-nowrap"
              >
                Cancel
              </button>
            </form>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6 px-4 sm:px-6 lg:px-8">
          {Array.isArray(pets) && pets.length > 0 ? (
            pets.map((pet) => (
              <div
                key={pet._id}
                className="bg-white rounded-xl shadow-sm overflow-hidden transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div className="grid md:grid-cols-2 gap-6 p-6">
                  {/* Image Section */}
                  <div className="space-y-4">
                    <div className="relative">
                      <img
                        src={pet.profileImage ? `${pet.profileImage}?t=${new Date().getTime()}` : "https://via.placeholder.com/150"}
                        alt={pet.name}
                        className="w-full h-64 object-cover rounded-lg transition-transform duration-300 transform hover:scale-105"
                        onError={(e) => {
                          console.error("Image load error:", pet.profileImage);
                          e.target.src = "https://via.placeholder.com/150";
                        }}
                      />
                      <span className="absolute top-3 right-3 bg-indigo-100 text-indigo-700 text-sm font-medium px-3 py-1 rounded-full">
                        {pet.type}
                      </span>
                    </div>
                    <div className="text-center">
                      <h3 className="text-xl font-semibold text-gray-900">{pet.name}</h3>
                      <p className="text-gray-500 text-sm">{pet.breed}</p>
                    </div>
                  </div>

                  {/* Info Section */}
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">Basic Information</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center text-gray-600">
                          <i className="fas fa-birthday-cake w-5 mr-2 text-indigo-500"></i>
                          <span>Birthday: {new Date(pet.birthday).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <i className="fas fa-weight w-5 mr-2 text-indigo-500"></i>
                          <span>Weight: {pet.weight} kg</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <i className="fas fa-exclamation-circle w-5 mr-2 text-indigo-500"></i>
                          <span>Allergies: {pet.allergies || "None"}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <i className="fas fa-bone w-5 mr-2 text-indigo-500"></i>
                          <span>Favorite Food: {pet.favoriteFood || "None"}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">Favorite Activities</h4>
                      <div className="flex flex-wrap gap-2">
                        {Array.isArray(pet.activities) && pet.activities.length > 0 ? (
                          pet.activities.map((activity, index) => (
                            <span
                              key={index}
                              className="bg-indigo-50 text-indigo-600 text-sm font-medium px-3 py-1 rounded-full"
                            >
                              {activity}
                            </span>
                          ))
                        ) : (
                          <span className="text-gray-500 text-sm">No activities listed.</span>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <button
                        onClick={() => openEditForm(pet)}
                        className="flex-1 bg-indigo-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200 flex items-center justify-center"
                      >
                        <i className="fas fa-edit mr-2"></i> Edit
                      </button>
                      <button
                        onClick={() => deleteHandler(pet._id)}
                        className="flex-1 bg-red-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200 flex items-center justify-center"
                      >
                        <i className="fas fa-trash mr-2"></i> Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center col-span-2 text-lg">No pets available yet.</p>
          )}
        </div>

      </div>
      <ToastContainer />
    </div>
  );
};

export default PetProfiles;
