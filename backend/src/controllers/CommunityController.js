const Community = require("../models/CommunityModel");
const Post = require("../models/CommunityPost");

const communityController = {
  getCommunities: async (req, res) => {
    try {
      const communities = await Community.find().populate("joinedUsers", "fullName");
      console.log("Sending communities:", communities); // Debug log
      res.status(200).json(communities);
    } catch (error) {
      console.error("Get communities error:", error.message, error.stack); // Detailed log
      res.status(500).json({ error: "Failed to fetch communities" });
    }
  },

  getCommunity: async (req, res) => {
    try {
      const { id } = req.params;
      console.log("Fetching community with ID:", id); // Debug log
      const community = await Community.findOne({ id }).populate("joinedUsers", "fullName");
      if (!community) {
        return res.status(404).json({ error: "Community not found" });
      }
      res.status(200).json(community);
    } catch (error) {
      console.error("Get community error:", error.message, error.stack); // Detailed log
      res.status(500).json({ error: "Failed to fetch community" });
    }
  },

  addCommunity: async (req, res) => {
    try {
      const { id, title, description, image } = req.body;

      if (!id || !title || !description) {
        return res
          .status(400)
          .json({ error: "ID, title, and description are required" });
      }

      const existingCommunity = await Community.findOne({ id });
      if (existingCommunity) {
        return res.status(400).json({ error: "Community ID already exists" });
      }

      const newCommunity = new Community({
        id,
        title,
        description,
        image: image || "",
      });

      const savedCommunity = await newCommunity.save();
      console.log("Added community:", savedCommunity); // Debug log
      res.status(201).json(savedCommunity);
    } catch (error) {
      console.error("Add community error:", error.message, error.stack); // Detailed log
      res.status(500).json({ error: "Failed to add community" });
    }
  },

  getCommunityPosts: async (req, res) => {
    try {
      const { id } = req.params;
      console.log("Fetching posts for community ID:", id); // Debug log
      const posts = await Post.find({ communityId: id }).populate("userId", "fullName");
      res.status(200).json(posts);
    } catch (error) {
      console.error("Get community posts error:", error.message, error.stack); // Detailed log
      res.status(500).json({ error: "Failed to fetch community posts" });
    }
  },

  addPost: async (req, res) => {
    try {
      const { id } = req.params;
      const { content, author, role } = req.body;

      if (!content || !author) {
        return res.status(400).json({ error: "Content and author are required" });
      }

      const community = await Community.findOne({ id });
      if (!community) {
        return res.status(404).json({ error: "Community not found" });
      }

      const lastPost = await Post.findOne().sort({ id: -1 });
      const newPostId = lastPost && lastPost.id ? lastPost.id + 1 : 1;

      const newPost = new Post({
        id: newPostId,
        communityId: id,
        content,
        author,
        userId: null,
        role: role || "Guest",
      });

      const savedPost = await newPost.save();

      community.posts += 1;
      await community.save();

      console.log("Added post:", savedPost); // Debug log
      res.status(201).json(savedPost);
    } catch (error) {
      console.error("Add post error:", error.message, error.stack); // Detailed log
      res.status(500).json({ error: "Failed to add post" });
    }
  },

  joinCommunity: async (req, res) => {
    try {
      const { id } = req.params;
      console.log("Joining community with ID:", id); // Debug log

      const community = await Community.findOne({ id });
      if (!community) {
        console.log("Community not found for ID:", id); // Debug log
        return res.status(404).json({ error: "Community not found" });
      }

      community.members += 1;
      const updatedCommunity = await community.save();

      console.log("Community updated:", updatedCommunity); // Debug log
      res.status(200).json(updatedCommunity);
    } catch (error) {
      console.error("Join community error:", error.message, error.stack); // Detailed log
      res.status(500).json({ error: "Failed to join community" });
    }
  },

  leaveCommunity: async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.user._id;
      console.log("Leaving community with ID:", id, "for user:", userId); // Debug log

      const community = await Community.findOne({ id });
      if (!community) {
        return res.status(404).json({ error: "Community not found" });
      }

      if (!community.joinedUsers.includes(userId)) {
        return res.status(400).json({ error: "User not a member" });
      }

      community.joinedUsers = community.joinedUsers.filter((uid) => !uid.equals(userId));
      community.members = community.joinedUsers.length;
      const updatedCommunity = await community.save();

      console.log("User left community:", updatedCommunity); // Debug log
      res.status(200).json(updatedCommunity);
    } catch (error) {
      console.error("Leave community error:", error.message, error.stack); // Detailed log
      res.status(500).json({ error: "Failed to leave community" });
    }
  },

    deleteCommunity: async (req, res) => {
      try {
        const { id } = req.params;
        const community = await Community.findOne({ id });
        if (!community) {
          return res.status(404).json({ error: 'Community not found' });
        }
        await Community.deleteOne({ id });
        await Post.deleteMany({ communityId: id }); // Optional: delete related posts
        res.status(200).json({ message: 'Community deleted successfully' });
      } catch (error) {
        console.error('Delete community error:', error.message, error.stack);
        res.status(500).json({ error: 'Failed to delete community' });
      }
    }
  };

module.exports = communityController;