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
      // Normalize role for backend
      const normalizedRole = selectedRole === 'pet-owner' ? 'PetOwner' : 'PetExpert';

      const formData = {
        fullName: data.fullName,
        email: data.email,
        password: data.password,
        role: normalizedRole,
      };

      const res = await axios.post('/api/signup', formData);

      if (res.status === 200 || res.status === 201) {
        toast.success('Registration successful! Please log in.', {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: true,
          onClose: () => navigate('/login'), // Redirects to login page after successful signup
        });
      } else {
        throw new Error('Registration failed');
      }
    } catch (error) {
      console.error('Signup error:', error.response?.data || error);
      toast.error(error.response?.data?.message || 'Something went wrong. Please try again.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const validationMethod = {
    nameValidator: { required: { value: true, message: 'Name is required' } },
    emailValidator: {
      required: { value: true, message: 'Email is required' },
      pattern: {
        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        message: 'Enter a valid email address',
      },
    },
    passwordValidator: {
      required: { value: true, message: 'Password is required' },
      minLength: { value: 8, message: 'Password must be at least 8 characters long' },
    },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-2 mt-10">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col lg:flex-row h-150">
        {/* Left Section - Decorative */}
        <div className="lg:w-1/2 bg-gradient-to-br from-purple-700 via-purple-600 to-pink-600 p-8 flex items-center justify-center">
          <div className="text-white text-center space-y-6 animate-fade-in">
            <div className="relative">
              <div className="absolute -top-12 -left-12 w-24 h-24 bg-white/10 rounded-full animate-pulse"></div>
              <h1 className="text-4xl font-extrabold tracking-tight relative">
                Join PetCircle
                <span className="absolute -top-2 -right-6 text-2xl text-pink-300">🐾</span>
              </h1>
            </div>
            <p className="text-lg opacity-90 max-w-xs mx-auto">
              Become part of our loving pet community today
            </p>
            <div className="mt-6 flex justify-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center transform hover:scale-110 transition-transform duration-300">
                <i className="fas fa-paw text-xl"></i>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center transform hover:scale-110 transition-transform duration-300">
                <i className="fas fa-heart text-xl"></i>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Signup Form */}
        <div className="lg:w-1/2 p-8 flex items-center justify-center">
          <div className="w-full max-w-md space-y-6">
            <div className="text-center">
              <h2 className="text-3xl mt-5 font-bold text-gray-900 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Create Account
              </h2>
              <p className="mt-2 text-gray-600">Join our pet-loving community</p>
            </div>

            <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  I am a:
                </label>
                <div className="flex justify-center gap-4">
                  {roles.map((role) => (
                    <button
                      key={role}
                      type="button"
                      onClick={() => setSelectedRole(role)}
                      disabled={loading}
                      className={`flex-1 py-2 px-4 rounded-xl font-medium transition-all duration-300 ${
                        selectedRole === role
                          ? 'bg-purple-600 text-white shadow-md'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      } ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:scale-105'}`}
                    >
                      {role === 'pet-owner' ? 'Pet Owner' : 'Pet Expert'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <div className="relative group">
                  <i className="fas fa-user absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-purple-600 transition-colors"></i>
                  <input
                    type="text"
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-50 transition-all duration-300"
                    placeholder="John Doe"
                    {...register('fullName', validationMethod.nameValidator)}
                    disabled={loading}
                  />
                </div>
                {errors.fullName && (
                  <span className="text-red-500 text-xs">{errors.fullName.message}</span>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <div className="relative group">
                  <i className="fas fa-envelope absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-purple-600 transition-colors"></i>
                  <input
                    type="email"
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-50 transition-all duration-300"
                    placeholder="your@email.com"
                    {...register('email', validationMethod.emailValidator)}
                    disabled={loading}
                  />
                </div>
                {errors.email && (
                  <span className="text-red-500 text-xs">{errors.email.message}</span>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative group">
                  <i className="fas fa-lock absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-purple-600 transition-colors"></i>
                  <input
                    type="password"
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-50 transition-all duration-300"
                    placeholder="••••••••"
                    {...register('password', validationMethod.passwordValidator)}
                    disabled={loading}
                  />
                </div>
                {errors.password && (
                  <span className="text-red-500 text-xs">{errors.password.message}</span>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 px-4 rounded-xl text-white font-medium bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-200 ${
                  loading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <i className="fas fa-spinner fa-spin mr-2"></i>
                    Creating Account...
                  </span>
                ) : (
                  'Sign Up'
                )}
              </button>
            </form>

            <div className="text-center space-y-3">
              <p className="text-sm text-gray-600">
                Already a member?{' '}
                <button
                  onClick={() => navigate('/login')}
                  className="text-purple-600 hover:text-purple-700 font-medium transition-colors duration-200"
                  disabled={loading}
                >
                  Sign In
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        theme="colored"
      />
    </div>
  );
};

export default SignupModal;