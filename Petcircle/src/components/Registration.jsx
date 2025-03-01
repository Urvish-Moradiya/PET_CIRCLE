import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import '../assets/css/Registration.css'; // Adjust the path as necessary
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Registration = () => {
  const { register, handleSubmit, formState: { errors } } = useForm(); 
  const navigate = useNavigate();

  const submitHandler = async (data) => {
    try {
      const res = await axios.post("/user", data);

      if (res.status === 200) { 
        toast.success('Registration successful!', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
        });

        setTimeout(() => {
          navigate("/login");
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

  const validationMethod = {
    nameValidator: {
      required: { value: true, message: "Name is required" },
    },
    emailValidator: {
      required: {
        value: true,
        message: "Email is required",
      },
      pattern: {
        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        message: "Enter a valid email address",
      },
    },
    phoneValidator: {
      required: {
        value: true,
        message: "Phone number is required",
      },
      pattern: {
        value: /^[0-9]{10}$/,
        message: "Enter a valid 10-digit phone number",
      },
    },
    passwordValidator: {
      required: {
        value: true,
        message: "Password is required",
      },
      minLength: {
        value: 8,
        message: "Password must be at least 8 characters long",
      },
    },
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="logo-section">
          <img src="/src/assets/image/newlogo.png" alt="PetCircle Logo" className="logo" />
          <div className="text-container">
            <h1 className="register-title">Join PetCircle</h1>
            <p className="register-subtitle">Connect with pet lovers worldwide</p>
          </div>
        </div>
        <form onSubmit={handleSubmit(submitHandler)} className="register-form">
          <div className="input-group">
            <label>Full Name</label>
            <input type="text" {...register("fullName", validationMethod.nameValidator)} placeholder="Enter your name" />
            {errors.fullName && <span style={{ color: 'red' }}>{errors.fullName.message}</span>}
          </div>
          <div className="input-group">
            <label>Email Address</label>
            <input type="email" {...register("email", validationMethod.emailValidator)} placeholder="Enter your email" />
            {errors.email && <span style={{ color: 'red' }}>{errors.email.message}</span>}
          </div>
          <div className="input-group">
            <label>Phone Number</label>
            <input type="tel" {...register("phone", validationMethod.phoneValidator)} placeholder="Enter your phone number" />
            {errors.phone && <span style={{ color: 'red' }}>{errors.phone.message}</span>}
          </div>
          <div className="input-group">
            <label>Role</label>
            <select {...register("role", { required: "Role is required" })}>
              <option value="">Select Role</option>
              <option value="petOwner">Pet Owner</option>
              <option value="petExpert">Pet Expert</option>
            </select>
            {errors.role && <span style={{ color: 'red' }}>{errors.role.message}</span>}
          </div>
          <div className="input-group">
            <label>Password</label>
            <input type="password" {...register("password", validationMethod.passwordValidator)} placeholder="Enter your password" />
            {errors.password && <span style={{ color: 'red' }}>{errors.password.message}</span>}
          </div>
          <button type="submit" className="register-button">Register</button>
          <div className="login-footer">
            <p><b>Already have an account? </b><Link to="/login">Log In</Link></p>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Registration;
