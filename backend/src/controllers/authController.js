const UserModel = require("../models/UserModel");
const Session = require("../models/Session");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

const login = async (req, res) => {
  console.log("Login request received:", req.body);
  try {
    const { email, password } = req.body;
    const foundUserFromEmail = await UserModel.findOne({ email });

    if (foundUserFromEmail) {
      const isMatch = bcrypt.compareSync(password, foundUserFromEmail.password);
      if (isMatch) {
        const token = uuidv4();
        const session = await Session.create({ userId: foundUserFromEmail._id, token });
        console.log('Created session:', { token, userId: session.userId }); // Debug
        res.status(200).json({
          message: "Login successful",
          data: {
            token,
            user: {
              _id: foundUserFromEmail._id,
              fullName: foundUserFromEmail.fullName,
              email: foundUserFromEmail.email,
              role: foundUserFromEmail.role || "PetOwner",
              bio: foundUserFromEmail.bio || "",
            },
          },
        });
      } else {
        console.log('Invalid password for email:', email);
        res.status(401).json({ message: "Invalid credentials" });
      }
    } else {
      console.log('Email not found:', email);
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
      role: role || "PetOwner",
    };

    const createdUser = await UserModel.create(newUser);
    const token = uuidv4();
    await Session.create({ userId: createdUser._id, token });

    res.status(201).json({
      message: "User created successfully",
      data: {
        token,
        user: {
          _id: createdUser._id,
          fullName: createdUser.fullName,
          email: createdUser.email,
          role: createdUser.role,
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
        role: updatedUser.role || "PetOwner",
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
        role: foundUser.role || "PetOwner",
        bio: foundUser.bio || "",
      },
    });
  } catch (err) {
    console.error("Get user error:", err);
    res.status(500).json({ message: "Error fetching user", error: err.message });
  }
};

// const verifyToken = async (req, res) => {
//     try {
//       console.log('Verify user:', req.user); // Debug
//       res.status(200).json({ user: req.user });
//     } catch (error) {
//       console.error('Verify token error:', error);
//       res.status(401).json({ error: 'Invalid token' });
//     }
//   };

router.get("/auth/verify", authMiddleware, async (req, res) => {
  try {
    console.log("auth/verify - User verified:", req.user); // Debug
    res.status(200).json({ user: req.user });
  } catch (error) {
    console.error("auth/verify - Error:", error.message);
    res.status(500).json({ error: "Verification failed" });
  }
});

module.exports = {
  signup,
  login,
  updateUserBio,
  getUserById,
  verifyToken,
};