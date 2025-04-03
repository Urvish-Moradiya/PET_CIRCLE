import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const SignupModal = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState('pet-owner');
  const navigate = useNavigate();

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
      
      const res = await axios.post("/api/signup", formData); // Base URL is set in App.js
      
      if (res.status === 200 || res.status === 201) {
        toast.success('Registration successful! Please login.', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          onClose: () => navigate('/login')
        });
      } else {
        throw new Error('Registration failed');
      }
    } catch (error) {
      console.error('Error:', error.response?.data);
      toast.error(error.response?.data?.message || 'Something went wrong. Please try again.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
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
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-100">
      {/* Left Section - Decorative */}
      <div className="lg:w-1/2 bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center p-8">
        <div className="text-white text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fadeIn">
            Join PetCircle
          </h1>
          <p className="text-lg md:text-xl opacity-90">
            Create an account and become part of our pet-loving community
          </p>
          <div className="mt-8">
            <div className="w-16 h-16 mx-auto bg-white/20 rounded-full flex items-center justify-center">
              <i className="fas fa-paw text-3xl"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section - Signup Form */}
      <div className="lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Sign Up
          </h2>
          
          <form onSubmit={handleSubmit(submitHandler)} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                I am a:
              </label>
              <div className="flex justify-center gap-4">
                {roles.map((role) => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => setSelectedRole(role)}
                    disabled={loading}
                    className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                      selectedRole === role
                        ? 'bg-fuchsia-600 text-white'
                        : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                    } ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
                  >
                    {role === 'pet-owner' ? 'Pet Owner' : 'Pet Expert'}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Full Name
              </label>
              <div className="relative">
                <i className="fas fa-user absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-500 transition-all duration-200"
                  placeholder="Enter your full name"
                  {...register("fullName", validationMethod.nameValidator)}
                  disabled={loading}
                />
              </div>
              {errors.fullName && (
                <span className="text-red-500 text-sm mt-1 block">
                  {errors.fullName.message}
                </span>
              )}
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Email Address
              </label>
              <div className="relative">
                <i className="fas fa-envelope absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                <input
                  type="email"
                  className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-500 transition-all duration-200"
                  placeholder="Enter your email"
                  {...register("email", validationMethod.emailValidator)}
                  disabled={loading}
                />
              </div>
              {errors.email && (
                <span className="text-red-500 text-sm mt-1 block">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <i className="fas fa-lock absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                <input
                  type="password"
                  className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-500 transition-all duration-200"
                  placeholder="Create a password"
                  {...register("password", validationMethod.passwordValidator)}
                  disabled={loading}
                />
              </div>
              {errors.password && (
                <span className="text-red-500 text-sm mt-1 block">
                  {errors.password.message}
                </span>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg text-white font-semibold bg-gradient-to-r from-fuchsia-600 to-rose-500 hover:from-fuchsia-700 hover:to-rose-600 transition-all duration-200 transform hover:scale-105 ${
                loading ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <i className="fas fa-spinner fa-spin mr-2"></i>
                  Signing Up...
                </span>
              ) : (
                'Sign Up'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <button
                onClick={() => navigate('/login')}
                className="text-fuchsia-600 hover:text-fuchsia-700 font-medium transition-colors duration-200"
                disabled={loading}
              >
                Sign In
              </button>
            </p>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default SignupModal;