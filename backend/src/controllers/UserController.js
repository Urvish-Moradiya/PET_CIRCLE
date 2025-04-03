const userModel = require("../models/UserModel");
const bcrypt = require("bcrypt");

const loginUser = async (req, res) => {
  console.log("Login request received");
  try {
    const { email, password } = req.body;
    const foundUserFromEmail = await userModel.findOne({ email });

    if (foundUserFromEmail) {
      const isMatch = bcrypt.compareSync(password, foundUserFromEmail.password);
      if (isMatch) {
        // Use user ID as a simple authToken (not secure for production, but per your request)
        const authToken = foundUserFromEmail._id.toString();
        res.status(200).json({
          message: "Login successful",
          data: {
            token: authToken,
            user: {
              _id: foundUserFromEmail._id,
              fullName: foundUserFromEmail.fullName,
              email: foundUserFromEmail.email,
              bio: foundUserFromEmail.bio || "",
            },
          },
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
    const { fullName, email, password } = req.body;
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const newUser = {
      fullName,
      email,
      password: hashedPassword,
      bio: "", // Default empty bio
    };

    const createdUser = await userModel.create(newUser);
    const authToken = createdUser._id.toString();

    res.status(201).json({
      message: "User created successfully",
      data: {
        token: authToken,
        user: {
          _id: createdUser._id,
          fullName: createdUser.fullName,
          email: createdUser.email,
          bio: createdUser.bio,
        },
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// New function to update user bio
const updateUserBio = async (req, res) => {
  try {
    const { userId, bio } = req.body;
    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { bio },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Bio updated successfully",
      data: {
        _id: updatedUser._id,
        fullName: updatedUser.fullName,
        email: updatedUser.email,
        bio: updatedUser.bio,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Error updating bio", error: err });
  }
};

const getUserById = async (req, res) => {
  try {
    const foundUser = await userModel.findById(req.params.id);
    if (!foundUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({
      message: "User fetched successfully",
      data: {
        _id: foundUser._id,
        fullName: foundUser.fullName,
        email: foundUser.email,
        role: foundUser.role || "user", // Default to "user" if not set
        bio: foundUser.bio || "",
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching user", error: err.message });
  }
};

module.exports = {
  signup,
  loginUser,
  updateUserBio,
  getUserById,
};