// controllers/userController.js
const UserModel = require("../models/UserModel");
const Session = require("../models/Session");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const login = async (req, res) => {
  console.log("Login request received");
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      console.log("Login - Missing email or password");
      return res.status(400).json({ message: "Email and password are required" });
    }

    const foundUserFromEmail = await UserModel.findOne({ email });
    if (!foundUserFromEmail) {
      console.log("Login - Email not found:", email);
      return res.status(404).json({ message: "Email not found" });
    }

    const isMatch = bcrypt.compareSync(password, foundUserFromEmail.password);
    if (!isMatch) {
      console.log("Login - Invalid password for email:", email);
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Create a new session
    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
    await Session.deleteMany({ userId: foundUserFromEmail._id }); // Remove old sessions
    const session = await Session.create({
      userId: foundUserFromEmail._id,
      token,
      expiresAt,
    });

    console.log("Login - Created session:", {
      sessionId: session._id,
      userId: session.userId,
      token,
      expiresAt,
    });

    res.status(200).json({
      message: "Login successful",
      data: {
        token,
        user: {
          _id: foundUserFromEmail._id,
          fullName: foundUserFromEmail.fullName,
          email: foundUserFromEmail.email,
          bio: foundUserFromEmail.bio || "",
          role: foundUserFromEmail.role || "PetOwner",
        },
      },
    });
  } catch (error) {
    console.error("Login error:", error.stack);
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};

const signup = async (req, res) => {
  try {
    const { fullName, email, password, role } = req.body;
    if (!fullName || !email || !password) {
      console.log("Signup - Missing required fields");
      return res.status(400).json({ message: "Full name, email, and password are required" });
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      console.log("Signup - User already exists:", email);
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const newUser = {
      fullName,
      email,
      password: hashedPassword,
      bio: "",
      role: role || "PetOwner",
    };

    const createdUser = await UserModel.create(newUser);

    // Create a new session
    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
    const session = await Session.create({
      userId: createdUser._id,
      token,
      expiresAt,
    });

    console.log("Signup - Created session:", {
      sessionId: session._id,
      userId: session.userId,
      token,
      expiresAt,
    });

    res.status(201).json({
      message: "User created successfully",
      data: {
        token,
        user: {
          _id: createdUser._id,
          fullName: createdUser.fullName,
          email: createdUser.email,
          bio: createdUser.bio,
          role: createdUser.role,
        },
      },
    });
  } catch (err) {
    console.error("Signup error:", err.stack);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const logout = async (req, res) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "").trim();
    if (!token) {
      console.log("Logout - No token provided");
      return res.status(400).json({ message: "No token provided" });
    }

    const session = await Session.findOneAndDelete({ token });
    if (!session) {
      console.log("Logout - No session found for token:", token);
      return res.status(404).json({ message: "Session not found" });
    }

    console.log("Logout - Deleted session:", { token, userId: session.userId });
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Logout error:", error.stack);
    res.status(500).json({ message: "Error logging out", error: error.message });
  }
};

const updateUserBio = async (req, res) => {
  try {
    const { userId, bio } = req.body;
    if (!userId || bio === undefined) {
      console.log("Update bio - Missing userId or bio");
      return res.status(400).json({ message: "User ID and bio are required" });
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { bio },
      { new: true }
    );

    if (!updatedUser) {
      console.log("Update bio - User not found:", userId);
      return res.status(404).json({ message: "User not found" });
    }

    console.log("Update bio - Updated user:", { userId, bio });
    res.status(200).json({
      message: "Bio updated successfully",
      data: {
        _id: updatedUser._id,
        fullName: updatedUser.fullName,
        email: updatedUser.email,
        bio: updatedUser.bio,
        role: updatedUser.role,
      },
    });
  } catch (err) {
    console.error("Update bio error:", err.stack);
    res.status(500).json({ message: "Error updating bio", error: err.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const foundUser = await UserModel.findById(userId);
    if (!foundUser) {
      console.log("Get user - User not found:", userId);
      return res.status(404).json({ message: "User not found" });
    }

    console.log("Get user - Fetched user:", userId);
    res.json({
      message: "User fetched successfully",
      data: {
        _id: foundUser._id,
        fullName: foundUser.fullName,
        email: foundUser.email,
        role: foundUser.role || "PetOwner",
        bio: foundUser.bio || "",
      },
    });
  } catch (err) {
    console.error("Get user error:", err.stack);
    res.status(500).json({ message: "Error fetching user", error: err.message });
  }
};

module.exports = {
  signup,
  login,
  logout,
  updateUserBio,
  getUserById,
};