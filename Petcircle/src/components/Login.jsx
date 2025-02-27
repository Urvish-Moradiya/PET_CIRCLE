import React from 'react';
import { useForm } from 'react-hook-form';
import '../assets/css/Loginpage.css';
import {Link } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const submitHandler = (data) => {
    const isLoggedIn = onLogin(data.email, data.password);
    if (isLoggedIn) {
      alert("Login Successful");
      window.location.replace("/");
    } else {
      alert("Invalid credentials");
    }
  };

  const validationmethod = {
    emailValidator: {
      required: { value: true, message: "Email is required" },
    },
    passwordValidator: {
      required: { value: true, message: "Password is required" },
    },
  };
  return (
    <div className="login-container">
      <div className="login-card">
        <div className="logo-section">
          <img src="/src/assets/image/newlogo.png" alt="PetCircle Logo" className="logo" />
          <div className="text-container">
            <h1 className="login-title">Welcome to PetCircle</h1>
            <p className="login-subtitle">Connect with pet lovers worldwide</p>
          </div>
        </div>
        <form onSubmit={handleSubmit(submitHandler)} className="login-form">
          <div className="input-group">
            <label>Email Address</label>
            <input type="email" {...register("email", validationmethod.emailValidator)} placeholder="Enter your email" />
            <span style={{ color: "red" }}>{errors.email?.message}</span>
          </div>
          <div className="input-group">
            <label>Password</label>
            <input type="password" {...register("password", validationmethod.passwordValidator)} placeholder="Enter your password" />
            <span style={{ color: "red" }}>{errors.password?.message}</span>
          </div>
          <button type="submit" className="login-button">Log In</button>
          <div className="social-login">
            <button type="button" className="google-login">Sign in with Google</button>
          </div>
          <div className="login-footer">
            <p><b>New to PetCircle? </b><Link to="/register">Create Account</Link></p>
            <p><a href="/forgot-password">Forgot Password?</a></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;