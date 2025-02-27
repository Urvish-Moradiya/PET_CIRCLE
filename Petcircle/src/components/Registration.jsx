import React from 'react';
import { useForm } from 'react-hook-form';
import '../assets/css/Registration.css'; // Adjust the path as necessary
import { Link } from 'react-router-dom';

const Registration = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const submitHandler = (data) => {
    // Handle registration logic here
    console.log('Registration Data:', data);
    alert("Registration Successful");
    window.location.replace("/login"); // Redirect to login page after successful registration
  };

  const validationMethod = {
    nameValidator: {
      required: { value: true, message: "name is required" },
    },
    emailValidator: {
      required: { value: true, message: "Email is required" },
    },
    phoneValidator: {
      required: { value: true, message: "Phone number is required" },
    },
    passwordValidator: {
      required: { value: true, message: "Password is required" },
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
            <span style={{ color: "red" }}>{errors.ownerName?.message}</span>
          </div>
          <div className="input-group">
            <label>Email Address</label>
            <input type="email" {...register("email", validationMethod.emailValidator)} placeholder="Enter your email" />
            <span style={{ color: "red" }}>{errors.email?.message}</span>
          </div>
          <div className="input-group">
            <label>Phone Number</label>
            <input type="tel" {...register("phone", validationMethod.phoneValidator)} placeholder="Enter your phone number" />
            <span style={{ color: "red" }}>{errors.phone?.message}</span>
          </div>
          <div className="input-group">
            <label>Role</label>
            <select {...register("role", { required: "Role is required" })}>
              <option value="">Select Role</option>
              <option value="petOwner">Pet Owner</option>
              <option value="petExpert">Pet Expert</option>
            </select>
            <span style={{ color: "red" }}>{errors.role?.message}</span>
          </div>
          <div className="input-group">
            <label>Password</label>
            <input type="password" {...register("password", validationMethod.passwordValidator)} placeholder="Enter your password" />
            <span style={{ color: "red" }}>{errors.password?.message}</span>
          </div>
          <button type="submit" className="register-button">Register</button>
          <div className="login-footer">
            <p><b>Already have an account? </b><Link to="/login">Log In</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;