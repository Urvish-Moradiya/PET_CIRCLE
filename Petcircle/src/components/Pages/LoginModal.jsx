// import React, { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../AuthContext';
// import axios from 'axios';

// const LoginModal = () => {
//   const { register, handleSubmit, formState: { errors } } = useForm();
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const { login } = useAuth();

//   const submitHandler = async (data) => {
//     setLoading(true);
//     try {
//       const response = await axios.post('http://localhost:5000/api/login', {
//         email: data.email,
//         password: data.password,
//       });
//       console.log('Login response:', response.data);
//       const { user, token } = response.data.data;
//       login(user, token);
//       console.log('Stored token after login:', localStorage.getItem('authToken')); // Debug
//       toast.success('Login successful!', {
//         position: 'top-right',
//         autoClose: 3000,
//       });
//       navigate('/profile');
//     } catch (error) {
//       console.error('Login error:', error);
//       const errorMessage =
//         error.response?.data?.message || 'Invalid email or password';
//       toast.error(errorMessage, {
//         position: 'top-right',
//         autoClose: 3000,
//       });
//     } finally {
//       setLoading(false);
//     }
//   };
  
//   const validationRules = {
//     email: {
//       required: { value: true, message: 'Email is required' },
//       pattern: {
//         value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
//         message: 'Enter a valid email address',
//       },
//     },
//     password: {
//       required: { value: true, message: 'Password is required' },
//       minLength: { value: 8, message: 'Password must be at least 8 characters long' },
//     },
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
//       <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col lg:flex-row">
//         <div className="lg:w-1/2 bg-gradient-to-br from-fuchsia-600 to-rose-500 p-8 flex items-center justify-center">
//           <div className="text-white text-center space-y-6">
//             <h1 className="text-4xl font-extrabold tracking-tight">PetCircle</h1>
//             <p className="text-lg opacity-90 max-w-xs mx-auto">
//               Join our community of pet lovers and experts
//             </p>
//             <div className="mt-6 flex justify-center gap-4">
//               <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center transform hover:scale-110 transition-transform duration-300">
//                 <i className="fas fa-paw text-xl"></i>
//               </div>
//               <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center transform hover:scale-110 transition-transform duration-300">
//                 <i className="fas fa-heart text-xl"></i>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="lg:w-1/2 p-8 flex items-center justify-center">
//           <div className="w-full max-w-md space-y-8">
//             <div className="text-center">
//               <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
//               <p className="mt-2 text-gray-600">Sign in to your PetCircle account</p>
//             </div>
//             <form onSubmit={handleSubmit(submitHandler)} className="space-y-6">
//               <div className="space-y-2">
//                 <label className="block text-sm font-medium text-gray-700">
//                   Email Address
//                 </label>
//                 <div className="relative">
//                   <i className="fas fa-envelope absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-fuchsia-600"></i>
//                   <input
//                     type="email"
//                     className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-500 bg-gray-50 transition-all duration-300"
//                     placeholder="your@email.com"
//                     {...register('email', validationRules.email)}
//                     disabled={loading}
//                   />
//                 </div>
//                 {errors.email && (
//                   <span className="text-red-500 text-xs">{errors.email.message}</span>
//                 )}
//               </div>
//               <div className="space-y-2">
//                 <label className="block text-sm font-medium text-gray-700">
//                   Password
//                 </label>
//                 <div className="relative">
//                   <i className="fas fa-lock absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-fuchsia-600"></i>
//                   <input
//                     type="password"
//                     className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-500 bg-gray-50 transition-all duration-300"
//                     placeholder="••••••••"
//                     {...register('password', validationRules.password)}
//                     disabled={loading}
//                   />
//                 </div>
//                 {errors.password && (
//                   <span className="text-red-500 text-xs">{errors.password.message}</span>
//                 )}
//               </div>
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className={`w-full py-3 px-4 rounded-lg text-white font-medium bg-gradient-to-r from-fuchsia-600 to-rose-500 hover:from-fuchsia-700 hover:to-rose-600 transition-all duration-300 ${
//                   loading ? 'opacity-70 cursor-not-allowed' : 'hover:scale-105'
//                 }`}
//               >
//                 {loading ? (
//                   <span className="flex items-center justify-center">
//                     <i className="fas fa-spinner fa-spin mr-2"></i>
//                     Signing in...
//                   </span>
//                 ) : (
//                   'Sign In'
//                 )}
//               </button>
//             </form>
//             <div className="text-center space-y-3">
//               <p className="text-sm text-gray-600">
//                 New to PetCircle?{' '}
//                 <button
//                   onClick={() => navigate('/signup')}
//                   className="text-fuchsia-600 hover:text-fuchsia-700 font-medium"
//                   disabled={loading}
//                 >
//                   Create an account
//                 </button>
//               </p>
//               <a
//                 href="#"
//                 className="text-sm text-gray-500 hover:text-fuchsia-600"
//               >
//                 Forgot your password?
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>
//       <ToastContainer position="top-right" autoClose={3000} hideProgressBar theme="colored" />
//     </div>
//   );
// };

// export default LoginModal;

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import axios from "axios";

const LoginModal = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const submitHandler = async (data) => {
    setLoading(true);
    try {
      console.log("LoginModal - Submitting:", { email: data.email }); // Debug
      const response = await axios.post("http://localhost:5000/api/login", {
        email: data.email,
        password: data.password,
      });
      console.log("LoginModal - Raw response:", response); // Debug
      console.log("LoginModal - Response data:", response.data); // Debug

      // Flexible response parsing
      let user, token;
      if (response.data.user && response.data.token) {
        // Format: { user, token }
        ({ user, token } = response.data);
      } else if (response.data.data && response.data.data.user && response.data.data.token) {
        // Format: { data: { user, token } }
        ({ user, token } = response.data.data);
      } else {
        throw new Error(
          `Invalid response format: Missing user or token. Received: ${JSON.stringify(response.data)}`
        );
      }

      // Validate user and token
      if (!user || !token) {
        throw new Error("User or token is undefined after parsing");
      }

      await login(user, token);
      console.log("LoginModal - Stored token:", localStorage.getItem("authToken")); // Debug
      toast.success("Login successful!", {
        position: "top-right",
        autoClose: 3000,
      });
      navigate("/communities");
    } catch (error) {
      console.error("LoginModal - Error:", error);
      const errorMessage =
        error.response?.data?.error ||
        error.message ||
        "Invalid email or password";
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const validationRules = {
    email: {
      required: { value: true, message: "Email is required" },
      pattern: {
        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        message: "Enter a valid email address",
      },
    },
    password: {
      required: { value: true, message: "Password is required" },
      minLength: { value: 8, message: "Password must be at least 8 characters long" },
    },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col lg:flex-row">
        <div className="lg:w-1/2 bg-gradient-to-br from-fuchsia-600 to-rose-500 p-8 flex items-center justify-center">
          <div className="text-white text-center space-y-6">
            <h1 className="text-4xl font-extrabold tracking-tight">PetCircle</h1>
            <p className="text-lg opacity-90 max-w-xs mx-auto">
              Join our community of pet lovers and experts
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
        <div className="lg:w-1/2 p-8 flex items-center justify-center">
          <div className="w-full max-w-md space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
              <p className="mt-2 text-gray-600">Sign in to your PetCircle account</p>
            </div>
            <form onSubmit={handleSubmit(submitHandler)} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <div className="relative">
                  <i className="fas fa-envelope absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-fuchsia-600"></i>
                  <input
                    type="email"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-500 bg-gray-50 transition-all duration-300"
                    placeholder="your@email.com"
                    {...register("email", validationRules.email)}
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
                <div className="relative">
                  <i className="fas fa-lock absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-fuchsia-600"></i>
                  <input
                    type="password"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-500 bg-gray-50 transition-all duration-300"
                    placeholder="••••••••"
                    {...register("password", validationRules.password)}
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
                className={`w-full py-3 px-4 rounded-lg text-white font-medium bg-gradient-to-r from-fuchsia-600 to-rose-500 hover:from-fuchsia-700 hover:to-rose-600 transition-all duration-300 ${
                  loading ? "opacity-70 cursor-not-allowed" : "hover:scale-105"
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <i className="fas fa-spinner fa-spin mr-2"></i>
                    Signing in...
                  </span>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>
            <div className="text-center space-y-3">
              <p className="text-sm text-gray-600">
                New to PetCircle?{" "}
                <button
                  onClick={() => navigate("/signup")}
                  className="text-fuchsia-600 hover:text-fuchsia-700 font-medium"
                  disabled={loading}
                >
                  Create an account
                </button>
              </p>
              <a
                href="#"
                className="text-sm text-gray-500 hover:text-fuchsia-600"
              >
                Forgot your password?
              </a>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar theme="colored" />
    </div>
  );
};

export default LoginModal;