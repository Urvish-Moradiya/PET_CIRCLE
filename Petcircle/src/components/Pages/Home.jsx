import React, { useState } from 'react';

const Home = () => {
  const [likedPosts, setLikedPosts] = useState(new Set());

  const handleLike = (postId) => {
    setLikedPosts((prev) => {
      const newLiked = new Set(prev);
      if (newLiked.has(postId)) newLiked.delete(postId);
      else newLiked.add(postId);
      return newLiked;
    });
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="pt-10">
        <div className="relative w-full h-[550px] bg-gradient-to-br from-purple-50 to-fuchsia-50">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -right-10 top-1/2 transform -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-fuchsia-100 to-purple-100 rounded-full opacity-30"></div>
            <div className="absolute right-20 top-20 w-[150px] h-[150px] bg-gradient-to-br from-purple-200 to-fuchsia-200 rounded-full opacity-20"></div>
            <div className="absolute right-40 bottom-20 w-[200px] h-[200px] bg-gradient-to-br from-fuchsia-100 to-purple-100 rounded-full opacity-20"></div>
          </div>
          <div className="max-w-7xl mx-auto px-4 h-full grid md:grid-cols-2 gap-8 items-center relative">
            <div className="space-y-8">
              <div className="inline-block">
                <span className="bg-fuchsia-100 text-fuchsia-600 px-4 py-1 rounded-full text-sm font-medium">
                  Join 50,000+ Pet Lovers
                </span>
              </div>
              <div className="space-y-4">
                <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-600 to-fuchsia-600 bg-clip-text text-transparent leading-tight">
                  Welcome to PetCircle
                </h1>
                <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-fuchsia-600 bg-clip-text text-transparent leading-tight">
                  Transform Your Pet Care Journey
                </h2>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed">
                Connect with pet experts, join vibrant communities, and discover the best care practices for your beloved companions. Your perfect pet care companion starts here.
              </p>
              <div className="flex gap-6">
                <button className="rounded-button bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white px-8 py-4 text-lg font-medium hover:shadow-lg transition-shadow whitespace-nowrap group">
                  Get Started
                  <i className="fas fa-arrow-right ml-2 transform group-hover:translate-x-1 transition-transform"></i>
                </button>
              </div>
            </div>
            <div className="relative hidden md:block left-10 pt-6">
              <img
                src="https://public.readdy.ai/ai/img_res/6b011b577298456e1ea7caa85edf82ca.jpg"
                alt="Happy Pets"
                className="w-[500px] h-[500px] rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute -bottom-4 -left-20 bg-white p-4 rounded-xl shadow-xl">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-fuchsia-100 rounded-full flex items-center justify-center">
                    <i className="fas fa-heart text-fuchsia-600 text-lg"></i>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">Pet Community</h3>
                    <p className="text-gray-600">50K+ Active Members</p>
                  </div>
                </div>
              </div>
              <div className="absolute -top-0 left-90 bg-white p-4 pm rounded-xl shadow-xl">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <i className="fas fa-certificate text-purple-600 text-xl"></i>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">Expert Support</h3>
                    <p className="text-gray-600">24/7 Available</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Why Choose PetCircle?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center transform hover:scale-105 transition-transform hover:shadow-xl">
              <div className="w-20 h-20 mx-auto mb-4 bg-fuchsia-100 rounded-full flex items-center justify-center">
                <i className="fas fa-users text-4xl text-fuchsia-600"></i>
              </div>
              <h3 className="text-xl font-bold mb-4">Connect with Pet Lovers</h3>
              <p className="text-gray-600">Join a vibrant community of pet enthusiasts and share your experiences.</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg text-center transform hover:scale-105 transition-transform hover:shadow-xl">
              <div className="w-20 h-20 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
                <i className="fas fa-certificate text-4xl text-purple-600"></i>
              </div>
              <h3 className="text-xl font-bold mb-4">Expert Advice</h3>
              <p className="text-gray-600">Get professional guidance from certified pet care specialists.</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg text-center transform hover:scale-105 transition-transform hover:shadow-xl">
              <div className="w-20 h-20 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                <i className="fas fa-calendar-alt text-4xl text-green-600"></i>
              </div>
              <h3 className="text-xl font-bold mb-4">Local Events</h3>
              <p className="text-gray-600">Discover and participate in pet-friendly events near you.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Communities Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Popular Communities</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Dog Lovers United', image: 'https://public.readdy.ai/ai/img_res/8c8506197ee4503a959b264ee6ae5fc4.jpg', members: 15234 },
              { name: 'Cat Paradise', image: 'https://public.readdy.ai/ai/img_res/cbbd745aa1e2a55d8166b1b7bed10f59.jpg', members: 12876 },
              { name: 'Exotic Pets Club', image: 'https://public.readdy.ai/ai/img_res/ce455c79cf73b487c46ad74d0bf3f901.jpg', members: 8432 }
            ].map((community, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer">
                <div className="h-48 overflow-hidden">
                  <img src={community.image} alt={community.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{community.name}</h3>
                  <p className="text-gray-600 mb-4">{community.members.toLocaleString()} members</p>
                  <button className="rounded-button bg-fuchsia-600 text-white px-6 py-2 w-full cursor-pointer hover:bg-fuchsia-700 whitespace-nowrap">
                    Join Community
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Feed Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Pet Community Feed</h2>
            <div className="flex space-x-4">
              <button className="rounded-button bg-purple-600 text-white px-6 py-2 cursor-pointer hover:bg-purple-700 whitespace-nowrap">
                <i className="fas fa-plus mr-2"></i>Create Post
              </button>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search posts..."
                  className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-500 w-64"
                />
                <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-8">
            {[
              {
                id: 1,
                author: "Dr. Sarah Anderson",
                username: "@petvet_sarah",
                time: "2h ago",
                content: "Important tips for summer pet care! 🌞 #PetHealth #SummerCare",
                image: "https://public.readdy.ai/ai/img_res/f7dd56f159a9db6b88735e1dd1325bfe.jpg",
                avatar: "https://public.readdy.ai/ai/img_res/aa2665871874e88b41c81548140005d2.jpg",
                likes: 2400,
                comments: 156,
                verified: true,
                details: [
                  "Keep your pets cool this summer! Remember to:",
                  "1. Provide plenty of fresh water 💧",
                  "2. Never leave them in parked cars 🚫",
                  "3. Exercise during cooler hours 🌅",
                  "4. Watch for signs of heatstroke 🌡️"
                ]
              },
              {
                id: 2,
                author: "Michael Chen",
                username: "@groomer_mike",
                time: "5h ago",
                content: "Check out this amazing transformation! #PetGrooming #BeforeAndAfter",
                images: [
                  "https://public.readdy.ai/ai/img_res/a9e624832cf7cc12aa3da84c7430198c.jpg",
                  "https://public.readdy.ai/ai/img_res/19ebcc29bb560123b6af7b79006d3ce4.jpg"
                ],
                avatar: "https://public.readdy.ai/ai/img_res/624ec08ce63c0772c7d712642d5dc2ea.jpg",
                likes: 1800,
                comments: 89,
                verified: false
              }
            ].map((post) => (
              <div key={post.id} className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-start space-x-4 mb-4">
                  <img src={post.avatar} className="w-12 h-12 rounded-full object-cover" alt={post.author} />
                  <div>
                    <div className="flex items-center">
                      <h3 className="font-bold">{post.author}</h3>
                      {post.verified && <span className="ml-2 text-fuchsia-600"><i className="fas fa-check-circle"></i></span>}
                      <span className="ml-2 text-gray-500">{post.username}</span>
                      <span className="ml-2 text-gray-400">{post.time}</span>
                    </div>
                    <p className="text-gray-600 mt-1">{post.content}</p>
                  </div>
                </div>
                {post.image && (
                  <img src={post.image} className="w-full h-[400px] object-cover rounded-lg mb-4" alt="Post content" />
                )}
                {post.images && (
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    {post.images.map((img, index) => (
                      <img key={index} src={img} className="w-full h-[300px] object-cover rounded-lg" alt={`Post image ${index + 1}`} />
                    ))}
                  </div>
                )}
                <div className="space-y-4">
                  {post.details && (
                    <p className="text-gray-800">
                      {post.details.join('\n')}
                    </p>
                  )}
                  <div className="flex items-center space-x-6">
                    <button onClick={() => handleLike(post.id)} className="flex items-center space-x-2 text-gray-600 hover:text-fuchsia-600">
                      <i className={`fa${likedPosts.has(post.id) ? 's' : 'r'} fa-heart`}></i>
                      <span>{post.likes.toLocaleString()}</span>
                    </button>
                    <button className="flex items-center space-x-2 text-gray-600 hover:text-fuchsia-600">
                      <i className="far fa-comment"></i>
                      <span>{post.comments}</span>
                    </button>
                    <button className="flex items-center space-x-2 text-gray-600 hover:text-fuchsia-600">
                      <i className="far fa-share-square"></i>
                      <span>Share</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="font-bold text-xl mb-4">Trending Topics</h3>
              <div className="flex flex-wrap gap-2">
                {["#PetHealth", "#AdoptDontShop", "#CutePets", "#PetTraining", "#RescuePets"].map((topic, index) => (
                  <span key={index} className="bg-fuchsia-100 text-fuchsia-600 px-3 py-1 rounded-full cursor-pointer hover:bg-blue-200">
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;