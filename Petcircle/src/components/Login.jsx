import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import '../assets/css/Loginpage.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submitHandler = async (data) => {
    setLoading(true);
    setErrorMessage("");

    try {
      console.log("Sending login request with data:", data);

      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log("Parsed response JSON:", result);

      if (response.ok) {
        alert("Login successful");

        localStorage.setItem('role', result.data.role);  // Store the user role in localStorage
        navigate("/dashboard");
      } else {
        setErrorMessage(result.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("Something went wrong, please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const validationmethod = {
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
    passwordValidator: {
      required: {
        value: true,
        message: "Password is required",
      },
      minLength: {
        value: 6,
        message: "Password must be at least 6 characters long",
      },
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
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Logging in...' : 'Log In'}
          </button>
          <div className="social-login">
            <button type="button" className="google-login">Sign in with Google</button>
          </div>
          <div className="login-footer">
            <p><b>New to PetCircle? </b><Link to="/register">Create Account</Link></p>
            <p><a href="/forgot-password">Forgot Password?</a></p>
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;