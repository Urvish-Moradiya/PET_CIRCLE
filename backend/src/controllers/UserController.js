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



const signup = async (req, res) => {
  try {
    const { email, phone, password, ...rest } = req.body; 
    //1. check karna ki ye email,number register he ya nhi
    const existingUser = await userModel.findOne({
      $or: [{ email: email }, { phone: phone }]
    });

    if (existingUser) {
      // 2. If user exists, return an error response
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // 3. Hash the password using bcrypt
    const salt = bcrypt.genSaltSync(10); // Generate a salt with 10 rounds (makes the password harder to crack)
    const hashedPassword = bcrypt.hashSync(password, salt); // Hash the password

    // 4. Create a new user object with the hashed password
    const newUser = {
      ...rest, // Include any additional fields from the request (name, etc.)
      email,   // Ensure email is passed to the new user object
      phone,   // Ensure phone is passed to the new user object
      password: hashedPassword, // Store the hashed password
    };

    // 5. Save the new user to the database
    const createdUser = await userModel.create(newUser);

    // 6. Send a success response with the newly created user data
    res.status(201).json({
      message: "User created successfully",
      data: createdUser,
    });

  } catch (err) {
    // 7. If an error occurs, return an error response
    res.status(500).json({
      message: "server error",
      error: err.message,
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
