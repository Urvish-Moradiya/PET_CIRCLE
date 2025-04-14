const Session = require("../models/Session");

const authMiddleware = async (req, res, next) => {
  try {
    // Extract token from Authorization header
    const authHeader = req.header("Authorization");
    if (!authHeader) {
      console.log("authMiddleware - No Authorization header provided");
      return res.status(401).json({ error: "Authorization header missing" });
    }

    const token = authHeader.replace("Bearer ", "").trim();
    console.log("authMiddleware - Received token:", token); // Debug log

    if (!token) {
      console.log("authMiddleware - No token provided in header");
      return res.status(401).json({ error: "No token provided" });
    }

    // Find session and populate userId
    const session = await Session.findOne({ token }).populate({
      path: "userId",
      select: "_id fullName role", // Only fetch necessary fields
    });
    console.log("authMiddleware - Session lookup result:", session); // Debug log

    if (!session) {
      console.log("authMiddleware - No session found for token");
      return res.status(401).json({ error: "Invalid or expired token" });
    }

    if (!session.userId) {
      console.log("authMiddleware - Session found but no associated user");
      return res.status(401).json({ error: "No user associated with this session" });
    }

    // Check if session is expired (if expiresAt exists)
    if (session.expiresAt && new Date() > session.expiresAt) {
      console.log("authMiddleware - Session expired:", session.expiresAt);
      await Session.deleteOne({ _id: session._id }); // Clean up expired session
      return res.status(401).json({ error: "Session has expired" });
    }

    // Attach user to request
    req.user = {
      _id: session.userId._id,
      fullName: session.userId.fullName,
      role: session.userId.role,
    };
    console.log("authMiddleware - Authenticated user:", req.user); // Debug log

    next();
  } catch (error) {
    console.error("authMiddleware - Error:", error.stack);
    res.status(500).json({
      error: "Authentication failed",
      details: error.message,
    });
  }
};

module.exports = authMiddleware;