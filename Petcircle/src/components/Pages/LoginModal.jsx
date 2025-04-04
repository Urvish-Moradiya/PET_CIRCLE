import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const LoginModal = ({ setUser }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submitHandler = async (data) => {
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email, password: data.password }),
      });

      const result = await response.json();

      if (response.ok) {
        localStorage.setItem('authToken', result.data.token);
        localStorage.setItem('userData', JSON.stringify(result.data.user));
        setUser(result.data.user); // Update parent state to trigger Navbar re-render
        
        toast.success('Login successful!', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          onClose: () => navigate('/profile')
        });
      } else {
        toast.error(result.message || "Invalid credentials", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Something went wrong.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const validationMethod = {
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
    <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col lg:flex-row">
      {/* Left Section - Decorative */}
      <div className="lg:w-1/2 bg-gradient-to-br from-purple-700 via-purple-600 to-pink-600 p-8 flex items-center justify-center">
        <div className="text-white text-center space-y-6 animate-fade-in">
          <div className="relative">
            <div className="absolute -top-12 -left-12 w-24 h-24 bg-white/10 rounded-full animate-pulse"></div>
            <h1 className="text-4xl font-extrabold tracking-tight relative">
              PetCircle
              <span className="absolute -top-2 -right-6 text-2xl text-pink-300">✨</span>
            </h1>
          </div>
          <p className="text-lg opacity-90 max-w-xs mx-auto">
            Join a vibrant community of pet enthusiasts and their furry companions
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

      {/* Right Section - Login Form */}
      <div className="lg:w-1/2 p-8 flex items-center justify-center">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Welcome Back
            </h2>
            <p className="mt-2 text-gray-600">Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit(submitHandler)} className="space-y-6">
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
                  {...register("email", validationMethod.emailValidator)}
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
                  {...register("password", validationMethod.passwordValidator)}
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
                  Signing in...
                </span>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="text-center space-y-3">
            <p className="text-sm text-gray-600">
              New to PetCircle?{' '}
              <button
                onClick={() => navigate('/signup')}
                className="text-purple-600 hover:text-purple-700 font-medium transition-colors duration-200"
                disabled={loading}
              >
                Create an account
              </button>
            </p>
            <a
              href="#"
              className="text-sm text-gray-500 hover:text-purple-600 transition-colors duration-200"
            >
              Forgot your password?
            </a>
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

export default LoginModal;