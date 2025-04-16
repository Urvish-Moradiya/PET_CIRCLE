// const User = require('../models/UserModel');
// const Community = require('../models/CommunityModel');
// const Post = require('../models/CommunityPost');
// const Registration = require('../models/Eventpetregister');
// const Pet = require('../models/PetModel');
// const Article = require('../models/Article');
// const Session = require('../models/petSession');
// const Adoption = require('../models/AdoptionModel');

// exports.getAdminStats = async (req, res) => {
//     const totalUsers = await User.countDocuments();
//     const communities = await Community.find();
//     const totalPosts = await Post.countDocuments();
//     const eventRegistrations = await Registration.countDocuments();
//     const totalPets = await Pet.countDocuments();
//     const totalArticles = await Article.countDocuments();
//     const totalSessions = await Session.countDocuments();
//     const totalAdoptions = await Adoption.countDocuments({ status: 'approved' });
//     res.status(200).json({
//       totalUsers,
//       avgPostsPerCommunity: communities.length ? (totalPosts / communities.length).toFixed(1) : 0,
//       eventRegistrations,
//       totalPets,
//       totalArticles,
//       totalSessions,
//       totalAdoptions,
//     });
//   };