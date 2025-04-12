const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
  console.log("Login request received");
  try {
    const { email, password } = req.body;
    const foundUserFromEmail = await UserModel.findOne({ email });

    if (foundUserFromEmail) {
      const isMatch = bcrypt.compareSync(password, foundUserFromEmail.password);
      if (isMatch) {
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
        res.status(401).json({ message: "Invalid credentials" }); // Changed to 401 for unauthorized
      }
    } else {
      res.status(404).json({ message: "Email not found" });
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};

const signup = async (req, res) => {
  try {
    const { fullName, email, password, role } = req.body;
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const newUser = {
      fullName,
      email,
      password: hashedPassword,
      bio: "",
      role,
    };

    const createdUser = await UserModel.create(newUser);
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
    console.error("Signup error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const updateUserBio = async (req, res) => {
  try {
    const { userId, bio } = req.body;
    const updatedUser = await UserModel.findByIdAndUpdate(
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
    console.error("Update bio error:", err);
    res.status(500).json({ message: "Error updating bio", error: err.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const foundUser = await UserModel.findById(req.params.id);
    if (!foundUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({
      message: "User fetched successfully",
      data: {
        _id: foundUser._id,
        fullName: foundUser.fullName,
        email: foundUser.email,
        role: foundUser.role || "user",
        bio: foundUser.bio || "",
      },
    });
  } catch (err) {
    console.error("Get user error:", err);
    res.status(500).json({ message: "Error fetching user", error: err.message });
  }
};

module.exports = {
  signup,
  login,
  updateUserBio,
  getUserById,
};