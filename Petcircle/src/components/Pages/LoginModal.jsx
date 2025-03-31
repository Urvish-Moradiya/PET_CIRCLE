import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginModal = ({
  showLoginModal,
  setShowLoginModal,
  loginEmail,
  setLoginEmail,
  loginPassword,
  setLoginPassword,
  setShowSignupModal,
}) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);

  if (!showLoginModal) return null;

  const submitHandler = async (data) => {
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password
        }),
      });

      const result = await response.json();

      if (response.ok) {
        // Add token to localStorage
        localStorage.setItem('authToken', result.data.token);

        toast.success('Login successful!', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
        });

        setTimeout(() => {
          setShowLoginModal(false);
        }, 2000);
      } else {
        toast.error(result.message || "Invalid credentials", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Something went wrong.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true
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
      minLength: {
        value: 8,
        message: "Password must be at least 8 characters long",
      },
    },
  };

  return (
    <div className="fixed inset-0 bg-gray-600/75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Login to PetCircle</h2>
          <button
            onClick={() => setShowLoginModal(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <i className="fas fa-times text-xl"></i>
          </button>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit(submitHandler)}>
          <div>
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
              placeholder="Enter your email"
              {...register("email", validationMethod.emailValidator)}
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
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
              placeholder="Enter your password"
              {...register("password", validationMethod.passwordValidator)}
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />
            {errors.password && (
              <span className="text-red-500 text-sm">{errors.password.message}</span>
            )}
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span className="text-sm text-gray-600">Remember me</span>
            </label>
            <a href="#" className="text-sm text-fuchsia-600 hover:underline">
              Forgot password?
            </a>
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`!rounded-button bg-fuchsia-600 text-white w-full py-3 cursor-pointer hover:bg-fuchsia-700 whitespace-nowrap ${
              loading ? 'opacity-75 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className="text-center mt-4 text-gray-600">
          Don't have an account?{' '}
          <button
            onClick={() => {
              setShowLoginModal(false);
              setShowSignupModal(true);
            }}
            className="text-fuchsia-600 hover:underline"
          >
            Sign Up
          </button>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginModal;