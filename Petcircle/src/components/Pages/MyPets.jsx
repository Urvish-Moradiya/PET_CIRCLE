import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import '../../assets/css/MyPets.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Logo from '../../assets/image/newlogo.png'; 

const MyPets = () => {
  const animalTypes = {
    Dogs: [
      'Labrador', 'German Shepherd', 'Golden Retriever', 
      'Bulldog', 'Poodle'
    ],
    Cats: [
      'Siamese', 'Persian', 'Maine Coon', 
      'Bengal', 'Sphynx'
    ],
    Birds: [
      'Parrot', 'Cockatiel', 'Canary', 
      'Budgerigar', 'Finch'
    ]
  };

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    defaultValues: {
      animalType: '',
      breed: ''
    }
  });

  const selectedAnimalType = watch('animalType');

  const onSubmit = async(data) => {
    try {
      const res = await axios.post("/pet", data);

      if (res.status === 200) { 
        toast.success('Pet added successful!', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
        });

        setTimeout(() => {
          navigate("/Mypet");
        }, 2000);
      } else {
        throw new Error('Registration failed');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong. Please try again.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
      });
    }
  };

  return (
    <div className="addpet-container">
      <div className="addpet-header">
        <h1>Pet Registration</h1>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="addpet-form">
      <div className="addpet-header">
      <img src={Logo} alt="PetCircle Logo" className="addpet-logo" />
    </div>
          <div className="form-column">
            <div className="form-group">
              <label>Animal Type</label>
              <select {...register('animalType', { required: 'Please select an animal type', onChange: (e) => { setValue('breed', ''); } })}>
                <option value="">Select Animal Type</option>
                {Object.keys(animalTypes).map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <span style={{ color: "red" }}>
                {errors.animalType && (<p className="error-message">{errors.animalType.message}</p>)}
              </span>
            </div>
            <div className="form-group">
              <label>Breed</label>
              <select {...register('breed', { required: 'Please select a breed' })} disabled={!selectedAnimalType}>
                <option value="">Select Breed</option>
                {selectedAnimalType && animalTypes[selectedAnimalType].map((breed) => (
                  <option key={breed} value={breed}>{breed}</option>
                ))}
              </select>
              <span style={{ color: "red" }}>
                {errors.breed && (<p className="error-message">{errors.breed.message}</p>)}
              </span>
            </div>
          

          <div className="form-column">
            <div className="form-group">
              <label>Pet Nickname</label>
              <input {...register('petName', { required: 'Pet nickname is required', minLength: { value: 2, message: 'Nickname must be at least 2 characters' } })} placeholder="Enter pet nickname" />
              <span style={{ color: "red" }}>
                {errors.petName && (<p className="error-message">{errors.petName.message}</p>)}
              </span>
            </div>

            <div className="form-group">
              <label>Pet Age (years)</label>
              <input type="number" {...register('petAge', { required: 'Pet age is required', min: { value: 0, message: 'Age must be a positive number' }, max: { value: 30, message: 'Age cannot exceed 30 years' } })} placeholder="Enter pet age" step="0.1" />
              <span style={{ color: "red" }}>
                {errors.petAge && (<p className="error-message">{errors.petAge.message}</p>)}
              </span>
            </div>

            <div className="form-group">
              <label>Pet Weight (kg)</label>
              <input {...register('petWeight', { required: 'Pet weight is required', min: { value: 0, message: 'Weight must be a positive number' }, max: { value: 500, message: 'Weight cannot exceed 500 kg' } })} placeholder="Enter pet weight" />
              <span style={{ color: "red" }}>
                {errors.petWeight && (<p className="error-message">{errors.petWeight.message}</p>)}
              </span>
            </div>

            <div className="new-group">
              <label>Pet Gender</label>
              <div className="radio-group">
                <label>
                  <input type="radio" value="Male" {...register('petGender', { required: 'Please select pet gender' })} />
                  Male
                </label>
                <label>
                  <input type="radio" value="Female" {...register('petGender', { required: 'Please select pet gender' })} />
                  Female
                </label>
              </div>
              <span style={{ color: "red" }}>
                {errors.petGender && (<p className="error-message">{errors.petGender.message}</p>)}
              </span>
            </div>
          </div>
        </div>

        <button type="submit" className="submit-btn">
          Add Pet
        </button>
      </form>
              <ToastContainer />
    </div>
  );
};


export default MyPets;