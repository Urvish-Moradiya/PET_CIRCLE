const userModel = require("../models/UserModel");
const bcrypt = require("bcrypt");

const loginUser = async (req, res) => {
  console.log("Login request received"); // Add this line to check if the route is hit
  try {
    const { email, password } = req.body;
    const foundUserFromEmail = await userModel.findOne({ email });
    
    if (foundUserFromEmail) {
      const isMatch = bcrypt.compareSync(password, foundUserFromEmail.password);
      if (isMatch) {
        res.status(200).json({
          message: "Login successful",
          data: foundUserFromEmail,
        });
      } else {
        res.status(404).json({ message: "Invalid credentials" });           
      }
    } else {
      res.status(404).json({ message: "Email not found" });
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Error logging in", error });
  }
};


// Signup Function
const signup = async (req, res) => {
  try {
    const { password, ...rest } = req.body;
   
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const newUser = {
      ...rest,
      password: hashedPassword,
    };
    const createdUser = await userModel.create(newUser);
    
    res.status(201).json({
      message: "User created successfully",
      data: createdUser,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error creating user",
      error: err,
    });
  }
};

// Add User Function (Direct Add)
const addUser = async (req, res) => {
  try {
    const savedUser = await userModel.create(req.body);
    res.json({
      message: "User saved successfully",
      data: savedUser,
    });
  } catch (err) {
    res.status(500).json({ message: "Error adding user", error: err });
  }
};

// Get All Users
const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find().populate("roleId");
    res.json({
      message: "Users fetched successfully",
      data: users,
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching users", error: err });
  }
};

// Get User By ID
const getUserById = async (req, res) => {
  try {
    const foundUser = await userModel.findById(req.params.id);
    res.json({
      message: "User fetched successfully",
      data: foundUser,
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching user", error: err });
  }
};

// Delete User By ID
const deleteUserById = async (req, res) => {
  try {
    const deletedUser = await userModel.findByIdAndDelete(req.params.id);
    res.json({
      message: "User deleted successfully",
      data: deletedUser,
    });
  } catch (err) {
    res.status(500).json({ message: "Error deleting user", error: err });
  }
};

module.exports = {
  addUser,
  getAllUsers,
  getUserById,
  deleteUserById,
  signup,
  loginUser,
};
