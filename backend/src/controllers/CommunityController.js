const Community = require("../models/CommunityModel");
const Post = require("../models/CommunityPost");

const communityController = {
  getCommunities: async (req, res) => {
    try {
      const communities = await Community.find();
      res.status(200).json(communities);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch communities" });
    }
  },

  getCommunity: async (req, res) => {
    try {
      const { id } = req.params;
      const community = await Community.findOne({ id });
      if (!community) {
        return res.status(404).json({ error: "Community not found" });
      }
      res.status(200).json(community);
    } catch (error) {
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
      res.status(201).json(savedCommunity);
    } catch (error) {
      res.status(500).json({ error: "Failed to add community" });
    }
  },

  getCommunityPosts: async (req, res) => {
    try {
      const { id } = req.params;
      const posts = await Post.find({ communityId: id });
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch community posts" });
    }
  },

  addPost: async (req, res) => {
    try {
      const { id } = req.params; // Community ID
      const { content, author } = req.body;
  
      if (!content || !author) {
        return res
          .status(400)
          .json({ error: "Content and author are required" });
      }
  
      const community = await Community.findOne({ id });
      if (!community) {
        return res.status(404).json({ error: "Community not found" });
      }
  
      // Auto-increment post ID based on existing posts
      const lastPost = await Post.findOne().sort({ id: -1 });
      const newPostId = lastPost && lastPost.id ? lastPost.id + 1 : 1;
  
      const newPost = new Post({
        id: newPostId,
        communityId: id,
        content,
        author,
      });
  
      const savedPost = await newPost.save();
  
      community.posts += 1;
      await community.save();
  
      res.status(201).json(savedPost);
    } catch (error) {
      res.status(500).json({ error: "Failed to add post" });
    }
  },

  joinCommunity: async (req, res) => {
    try {
      const { id } = req.params;
      const { userId } = req.body;

      if (!userId) {
        return res.status(400).json({ error: "User ID is required" });
      }

      const community = await Community.findOne({ id });
      if (!community) {
        return res.status(404).json({ error: "Community not found" });
      }

      if (community.joinedUsers.includes(userId)) {
        return res.status(400).json({ error: "User already joined" });
      }

      community.joinedUsers.push(userId);
      community.members = community.joinedUsers.length;
      const updatedCommunity = await community.save();

      res.status(200).json(updatedCommunity);
    } catch (error) {
      res.status(500).json({ error: "Failed to join community" });
    }
  },

  leaveCommunity: async (req, res) => {
    try {
      const { id } = req.params;
      const { userId } = req.body;

      if (!userId) {
        return res.status(400).json({ error: "User ID is required" });
      }

      const community = await Community.findOne({ id });
      if (!community) {
        return res.status(404).json({ error: "Community not found" });
      }

      if (!community.joinedUsers.includes(userId)) {
        return res.status(400).json({ error: "User not a member" });
      }

      community.joinedUsers = community.joinedUsers.filter(
        (uid) => uid !== userId
      );
      community.members = community.joinedUsers.length;
      const updatedCommunity = await community.save();

      res.status(200).json(updatedCommunity);
    } catch (error) {
      res.status(500).json({ error: "Failed to leave community" });
    }
  },
};

module.exports = communityController;