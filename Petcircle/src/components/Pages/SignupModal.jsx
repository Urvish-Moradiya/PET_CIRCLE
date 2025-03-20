import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignupModal = ({
  showSignupModal,
  setShowSignupModal,
  selectedRole,
  setSelectedRole,
  setShowLoginModal,
}) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);

  if (!showSignupModal) return null;

  const roles = ['pet-owner', 'pet-expert'];

  const submitHandler = async (data) => {
    setLoading(true);
    try {
      const formData = {
        fullName: data.fullName,
        email: data.email,
        password: data.password,
        role: selectedRole
      };
      console.log('Form Data:', formData);
      
      const res = await axios.post("http://localhost:5000/user", formData);
      
      if (res.status === 200 || res.status === 201) {
        toast.success('Registration successful!', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
        });
        setTimeout(() => {
          setShowSignupModal(false);
        }, 2000);
      } else {
        throw new Error('Registration failed');
      }
    } catch (error) {
      console.error('Error:', error.response?.data);
      toast.error(error.response?.data?.message || 'Something went wrong. Please try again.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const validationMethod = {
    nameValidator: { required: { value: true, message: "Name is required" } },
    emailValidator: {
      required: { value: true, message: "Email is required" },
      pattern: {
        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        message: "Enter a valid email address",
      },
    },
    passwordValidator: {
      required: { value: true, message: "Password is required" },
      minLength: { value: 8, message: "Password must be at least 8 characters long" },
    },
  };

  return (
    <div className="fixed inset-0 bg-gray-600/75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Join PetCircle</h2>
          <button
            onClick={() => setShowSignupModal(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <i className="fas fa-times text-xl"></i>
          </button>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit(submitHandler)}>
          <div>
            <label className="block text-gray-700 mb-2">I am a:</label>
            <div className="flex justify-center gap-4">
              {roles.map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => setSelectedRole(role)}
                  className={`!rounded-button px-6 py-2 whitespace-nowrap cursor-pointer ${
                    selectedRole === role
                      ? 'bg-fuchsia-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {role === 'pet-owner' ? 'Pet Owner' : 'Pet Expert'}
                </button>
              ))}
            </div>
            {!selectedRole && (
              <span className="text-red-500 text-sm">Please select a role</span>
            )}
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
              placeholder="Enter your full name"
              {...register("fullName", validationMethod.nameValidator)}
            />
            {errors.fullName && (
              <span className="text-red-500 text-sm">{errors.fullName.message}</span>
            )}
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
              placeholder="Enter your email"
              {...register("email", validationMethod.emailValidator)}
            />
            {errors.email && (
              <span className="text-red-500 text-sm">{errors.email.message}</span>
            )}
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
              placeholder="Create a password"
              {...register("password", validationMethod.passwordValidator)}
            />
            {errors.password && (
              <span className="text-red-500 text-sm">{errors.password.message}</span>
            )}
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`!rounded-button bg-fuchsia-600 text-white w-full py-3 cursor-pointer hover:bg-fuchsia-700 whitespace-nowrap ${
              loading ? 'opacity-75 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>
        <p className="text-center mt-4 text-gray-600">
          Already have an account?{' '}
          <button
            onClick={() => {
              setShowSignupModal(false);
              setShowLoginModal(true);
            }}
            className="text-fuchsia-600 hover:underline"
          >
            Login
          </button>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignupModal;