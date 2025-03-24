const express = require("express");
const router = express.Router();
const communityController = require("../controllers/communityController");

router.get("/communities", communityController.getCommunities);
router.get("/communities/:id", communityController.getCommunity);
router.post("/communities", communityController.addCommunity);
router.get("/communities/:id/posts", communityController.getCommunityPosts);
router.post("/communities/:id/posts", communityController.addPost);
router.post("/communities/:id/join", communityController.joinCommunity);
router.post("/communities/:id/leave", communityController.leaveCommunity);

module.exports = router;