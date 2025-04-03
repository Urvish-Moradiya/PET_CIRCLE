import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const LoginModal = ({ setShowSignupModal }) => {
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
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-100">
      {/* Left Section - Decorative */}
      <div className="lg:w-1/2 bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center p-8">
        <div className="text-white text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fadeIn">
            Welcome to PetCircle
          </h1>
          <p className="text-lg md:text-xl opacity-90">
            Connect with pet lovers, share stories, and find your furry friends
          </p>
          <div className="mt-8">
            <div className="w-16 h-16 mx-auto bg-white/20 rounded-full flex items-center justify-center">
              <i className="fas fa-paw text-3xl"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section - Login Form */}
      <div className="lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Sign In
          </h2>
          
          <form onSubmit={handleSubmit(submitHandler)} className="space-y-6">
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
                  placeholder="Enter your password"
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
                  Logging in...
                </span>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <button
                onClick={() => navigate('/signup')}
                className="text-fuchsia-600 hover:text-fuchsia-700 font-medium transition-colors duration-200"
                disabled={loading}
              >
                Sign Up
              </button>
            </p>
            <a
              href="#"
              className="text-sm text-gray-500 hover:text-fuchsia-600 mt-2 block"
            >
              Forgot Password?
            </a>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default LoginModal;