const express = require("express");
const router = express.Router();
const communityController = require("../controllers/communityController");
const authMiddleware = require("../middleware/authMiddleware");

// Public routes
router.get("/communities", communityController.getCommunities);
router.get("/communities/:id", communityController.getCommunity);
router.get("/communities/:id/posts", communityController.getCommunityPosts);
router.post("/communities/:id/join", communityController.joinCommunity);
router.post("/communities/:id/posts", communityController.addPost);

// Protected routes
router.post("/communities", authMiddleware, communityController.addCommunity);
router.post("/communities/:id/leave", authMiddleware, communityController.leaveCommunity);

module.exports = router;

