// // routes/authRoutes.js
// const express = require("express");
// const router = express.Router();
// const authController = require("../controllers/authController");
// const authMiddleware = require('../middleware/authMiddleware');

// router.post("/login", authController.login);
// router.get('/verify', authMiddleware, authController.verifyToken);

// module.exports = router;

// const express = require("express");
// const router = express.Router();
// const Session = require("../models/Session");
// const authMiddleware = require("../middleware/authMiddleware");

// // Verify session
// router.get("/auth/verify", authMiddleware, async (req, res) => {
//   try {
//     console.log("auth/verify - User verified:", req.user); // Debug
//     res.status(200).json({ user: req.user });
//   } catch (error) {
//     console.error("auth/verify - Error:", error.message);
//     res.status(500).json({ error: "Verification failed" });
//   }
// });

// // Logout
// router.post("/auth/logout", authMiddleware, async (req, res) => {
//   try {
//     const token = req.header("Authorization")?.replace("Bearer ", "");
//     await Session.deleteOne({ token });
//     console.log("auth/logout - Session deleted for token:", token); // Debug
//     res.status(200).json({ message: "Logged out successfully" });
//   } catch (error) {
//     console.error("auth/logout - Error:", error.message);
//     res.status(500).json({ error: "Logout failed" });
//   }
// });

// // Login (example, adjust to your setup)
// router.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await require("../models/UserModel").findOne({ email });
//     if (!user) {
//       return res.status(400).json({ error: "Invalid credentials" });
//     }
//     const bcrypt = require("bcryptjs");
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ error: "Invalid credentials" });
//     }
//     const token = require("crypto").randomUUID();
//     const session = new Session({
//       token,
//       userId: user._id,
//       expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
//     });
//     await session.save();
//     console.log("auth/login - Session created:", token); // Debug
//     res.status(200).json({
//       token,
//       user: { _id: user._id, fullName: user.fullName, role: user.role },
//     });
//   } catch (error) {
//     console.error("auth/login - Error:", error.message);
//     res.status(500).json({ error: "Login failed" });
//   }
// });

// module.exports = router;



// const express = require("express");
// const router = express.Router();
// const User = require("../models/UserModel");
// const Session = require("../models/Session");
// const bcrypt = require("bcryptjs");
// const crypto = require("crypto");

// router.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     console.log("auth/login - Request:", { email }); // Debug
//     const user = await User.findOne({ email });
//     if (!user) {
//       console.log("auth/login - User not found");
//       return res.status(400).json({ error: "Invalid credentials" });
//     }
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       console.log("auth/login - Password mismatch");
//       return res.status(400).json({ error: "Invalid credentials" });
//     }
//     const token = crypto.randomUUID();
//     const session = new Session({
//       token,
//       userId: user._id,
//       expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
//     });
//     await session.save();
//     console.log("auth/login - Session created:", { token, userId: user._id }); // Debug
//     const response = {
//       user: { _id: user._id, fullName: user.fullName, role: user.role },
//       token,
//     };
//     console.log("auth/login - Response:", response); // Debug
//     res.status(200).json(response);
//   } catch (error) {
//     console.error("auth/login - Error:", error.message);
//     res.status(500).json({ error: "Login failed" });
//   }
// });

// module.exports = router;












const express = require("express");
const router = express.Router();
const User = require("../models/UserModel");
const Session = require("../models/Session");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("auth/login - Request:", { email }); // Debug
    const user = await User.findOne({ email });
    if (!user) {
      console.log("auth/login - User not found");
      return res.status(400).json({ error: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("auth/login - Password mismatch");
      return res.status(400).json({ error: "Invalid credentials" });
    }
    const token = crypto.randomUUID();
    const session = new Session({
      token,
      userId: user._id,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });
    await session.save();
    console.log("auth/login - Session created:", { token, userId: user._id }); // Debug
    const response = {
      user: { _id: user._id, fullName: user.fullName, role: user.role },
      token,
    };
    console.log("auth/login - Response:", response); // Debug
    res.status(200).json(response);
  } catch (error) {
    console.error("auth/login - Error:", error.message, error.stack);
    res.status(500).json({ error: "Login failed" });
  }
});

module.exports = router;