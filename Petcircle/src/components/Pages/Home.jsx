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
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        {/* Combined Hero Section */}
        <div className="pt-10 relative">
          <div className="bg-gradient-to-br from-purple-50 to-fuchsia-50 rounded-xl shadow-lg p-8 mb-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <span className="bg-fuchsia-100 text-fuchsia-600 px-4 py-1 rounded-full text-sm font-medium inline-block">
                  Join 50,000+ Pet Lovers
                </span>
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-fuchsia-600 bg-clip-text text-transparent">
                  Welcome to PetCircle
                </h1>
                <p className="text-gray-600">
                  Connect with pet experts, join vibrant communities, and discover the best care practices for your beloved companions.
                </p>
                <button className="rounded-lg bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white px-6 py-3 font-medium hover:shadow-lg transition-shadow group">
                  Get Started
                  <i className="fas fa-arrow-right ml-2 transform group-hover:translate-x-1 transition-transform"></i>
                </button>
              </div>
              <div className="relative">
                <img
                  src="https://public.readdy.ai/ai/img_res/6b011b577298456e1ea7caa85edf82ca.jpg"
                  alt="Happy Pets"
                  className="w-full max-w-[400px] mx-auto rounded-xl shadow-xl transform hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Combined Features, Communities, and Feed */}
        <div className="grid lg:grid-cols-3 gap-8 pb-12">
          {/* Left Column: Features */}
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-center">Why PetCircle?</h2>
            {[
              {
                icon: "fas fa-users",
                title: "Connect",
                desc: "Join pet enthusiasts",
                bgColor: "bg-fuchsia-100",
                textColor: "text-fuchsia-600"
              },
              {
                icon: "fas fa-certificate",
                title: "Expert Advice",
                desc: "Professional guidance",
                bgColor: "bg-purple-100",
                textColor: "text-purple-600"
              },
              {
                icon: "fas fa-calendar-alt",
                title: "Events",
                desc: "Pet-friendly events",
                bgColor: "bg-green-100",
                textColor: "text-green-600"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className={`w-12 h-12 mx-auto mb-3 ${feature.bgColor} rounded-full flex items-center justify-center`}>
                  <i className={`${feature.icon} text-2xl ${feature.textColor}`}></i>
                </div>
                <h3 className="text-lg font-bold text-center mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-center text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>

          {/* Middle Column: Communities */}
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-center">Communities</h2>
            {[
              { name: 'Dog Lovers', image: 'https://public.readdy.ai/ai/img_res/8c8506197ee4503a959b264ee6ae5fc4.jpg', members: 15234 },
              { name: 'Cat Paradise', image: 'https://public.readdy.ai/ai/img_res/cbbd745aa1e2a55d8166b1b7bed10f59.jpg', members: 12876 },
              { name: 'Exotic Pets', image: 'https://public.readdy.ai/ai/img_res/ce455c79cf73b487c46ad74d0bf3f901.jpg', members: 8432 }
            ].map((community, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img src={community.image} alt={community.name} className="w-full h-32 object-cover" />
                <div className="p-4">
                  <h3 className="text-lg font-bold">{community.name}</h3>
                  <p className="text-gray-600 text-sm">{community.members.toLocaleString()} members</p>
                  <button className="mt-3 w-full rounded-lg bg-fuchsia-600 text-white px-4 py-2 text-sm hover:bg-fuchsia-700">
                    Join
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Feed */}
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Feed</h2>
              <button className="rounded-lg bg-purple-600 text-white px-4 py-2 text-sm hover:bg-purple-700">
                <i className="fas fa-plus mr-1"></i>Post
              </button>
            </div>
            {[
              {
                id: 1,
                author: "Dr. Sarah",
                username: "@petvet_sarah",
                time: "2h",
                content: "Summer pet care tips! #PetHealth",
                image: "https://public.readdy.ai/ai/img_res/f7dd56f159a9db6b88735e1dd1325bfe.jpg",
                avatar: "https://public.readdy.ai/ai/img_res/aa2665871874e88b41c81548140005d2.jpg",
                likes: 2400,
                comments: 156,
                verified: true
              },
              {
                id: 2,
                author: "Michael C.",
                username: "@groomer_mike",
                time: "5h",
                content: "Amazing transformation! #PetGrooming",
                image: "https://public.readdy.ai/ai/img_res/19ebcc29bb560123b6af7b79006d3ce4.jpg",
                avatar: "https://public.readdy.ai/ai/img_res/624ec08ce63c0772c7d712642d5dc2ea.jpg",
                likes: 1800,
                comments: 89,
                verified: false
              }
            ].map((post) => (
              <div key={post.id} className="bg-white rounded-lg shadow-md p-4">
                <div className="flex items-start space-x-3 mb-3">
                  <img src={post.avatar} className="w-10 h-10 rounded-full object-cover" alt={post.author} />
                  <div>
                    <div className="flex items-center space-x-1">
                      <h3 className="font-bold text-sm">{post.author}</h3>
                      {post.verified && <i className="fas fa-check-circle text-fuchsia-600 text-xs"></i>}
                      <span className="text-gray-500 text-xs">{post.username}</span>
                      <span className="text-gray-400 text-xs">• {post.time}</span>
                    </div>
                    <p className="text-gray-600 text-sm">{post.content}</p>
                  </div>
                </div>
                {post.image && (
                  <img src={post.image} className="w-full h-48 object-cover rounded-lg mb-3" alt="Post" />
                )}
                <div className="flex items-center space-x-4 text-sm">
                  <button onClick={() => handleLike(post.id)} className="flex items-center space-x-1 text-gray-600 hover:text-fuchsia-600">
                    <i className={`fa${likedPosts.has(post.id) ? 's' : 'r'} fa-heart`}></i>
                    <span>{post.likes.toLocaleString()}</span>
                  </button>
                  <button className="flex items-center space-x-1 text-gray-600 hover:text-fuchsia-600">
                    <i className="far fa-comment"></i>
                    <span>{post.comments}</span>
                  </button>
                  <button className="flex items-center space-x-1 text-gray-600 hover:text-fuchsia-600">
                    <i className="far fa-share-square"></i>
                    <span>Share</span>
                  </button>
                </div>
              </div>
            ))}
            <div className="bg-white rounded-lg shadow-md p-4">
              <h3 className="font-bold mb-3">Trending</h3>
              <div className="flex flex-wrap gap-2">
                {["#PetHealth", "#AdoptDontShop", "#CutePets"].map((topic, index) => (
                  <span key={index} className="bg-fuchsia-100 text-fuchsia-600 px-2 py-1 rounded-full text-sm hover:bg-blue-200">
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