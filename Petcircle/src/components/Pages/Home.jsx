import React, { useState } from 'react';

const Home = () => {
  const [postContent, setPostContent] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: 'Emily Parker',
      handle: '@emilyparker',
      avatar: 'https://public.readdy.ai/ai/img_res/2746e5a3dcbaa11fa5542e9b5d1a2417.jpg',
      content: "Max's first day at puppy training class was a success! 🐕 So proud of how quickly he's learning. #PuppyTraining #DogLife",
      image: 'https://public.readdy.ai/ai/img_res/1a3fc1627bc4e4cd4652c6fff61d1b99.jpg',
      likes: 234,
      comments: 45,
      shares: 12,
      timeAgo: '2 hours ago'
    },
    {
      id: 2,
      author: 'David Martinez',
      handle: '@davidmartinez',
      avatar: 'https://public.readdy.ai/ai/img_res/f2a151e62639ed14eca9d1ddd3acfaa2.jpg',
      content: "Luna enjoying her new cat tree! 😺 Best purchase ever. She hasn't left it since we set it up. #CatLife #PetFurniture",
      image: 'https://public.readdy.ai/ai/img_res/1f42c70ae91b788f5810c8f096d8d1c1.jpg',
      likes: 187,
      comments: 32,
      shares: 8,
      timeAgo: '4 hours ago'
    },
    {
      id: 3,
      author: 'Alexandra Rivers',
      handle: '@alexrivers',
      avatar: 'https://public.readdy.ai/ai/img_res/b53034c6237bf46aa565d1dfbf56a1a6.jpg',
      content: "Meet our newest family member, Charlie! 🦜 He's already learned to say 'hello' and 'good morning'. #ParrotLife #BirdLove",
      image: 'https://public.readdy.ai/ai/img_res/e298bb7a01fa04126096261a46b0045d.jpg',
      likes: 342,
      comments: 67,
      shares: 23,
      timeAgo: '6 hours ago'
    },
    {
      id: 4,
      author: 'Marcus Bennett',
      handle: '@marcusbennett',
      avatar: 'https://public.readdy.ai/ai/img_res/faa04708476920a871e952326a5ba37c.jpg',
      content: "Sunday morning hike with Rex! 🐕‍🦺 Nothing beats the fresh mountain air. #HikingWithDogs #WeekendVibes",
      image: 'https://public.readdy.ai/ai/img_res/92e9e3b21e2e0cfc7f6755a6b8676296.jpg',
      likes: 276,
      comments: 34,
      shares: 15,
      timeAgo: '8 hours ago'
    },
    {
      id: 5,
      author: 'Sophie Chen',
      handle: '@sophiechen',
      avatar: 'https://public.readdy.ai/ai/img_res/24cef4bdac697ff4716004073446d6a3.jpg',
      content: "Milo's first visit to the vet went perfectly! 🐱 Thank you Dr. Williams for making him feel so comfortable. #CatCare #PetHealth",
      image: 'https://public.readdy.ai/ai/img_res/9b86c1e1e8e75a329104eade3b9c1110.jpg',
      likes: 198,
      comments: 42,
      shares: 8,
      timeAgo: '10 hours ago'
    }
  ]);

  const communities = [
    { name: 'DogLovers', members: 15243 },
    { name: 'CatParadise', members: 12876 },
    { name: 'BirdFriends', members: 8932 },
    { name: 'PetTraining', members: 10567 },
    { name: 'ExoticPets', members: 6789 }
  ];

  const suggestedFriends = [
    {
      name: 'Sarah Wilson',
      handle: '@sarahwilson',
      avatar: 'https://public.readdy.ai/ai/img_res/0eec140f781d550e5e3f9b6a7317651b.jpg',
      bio: 'Dog trainer & animal behaviorist'
    },
    {
      name: 'Michael Chen',
      handle: '@michaelchen',
      avatar: 'https://public.readdy.ai/ai/img_res/df07227baeea700a678ffbd90137c6a1.jpg',
      bio: 'Cat café owner | Pet photographer'
    },
    {
      name: 'Emma Thompson',
      handle: '@emmathompson',
      avatar: 'https://public.readdy.ai/ai/img_res/cfe68644f500fa385ad9d98b65f09fd2.jpg',
      bio: 'Veterinary student | Bird enthusiast'
    }
  ];

  const trendingTopics = [
    { tag: 'PuppyTraining', posts: 12543 },
    { tag: 'CatCare', posts: 8976 },
    { tag: 'AdoptDontShop', posts: 15234 },
    { tag: 'PetHealth', posts: 7654 },
    { tag: 'RescueStories', posts: 9876 }
  ];

  const handleImageSelect = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreatePost = () => {
    if (postContent.trim() || selectedImage) {
      const newPost = {
        id: posts.length + 1,
        author: 'Jessica Anderson',
        handle: '@jessicaanderson',
        avatar: 'https://public.readdy.ai/ai/img_res/dbdbd4ada0245a2b978cfbd92c5b9a2f.jpg',
        content: postContent,
        image: selectedImage || 'https://public.readdy.ai/ai/img_res/2211b1b0aa7423f126cc992fd6b7f98e.jpg',
        likes: 0,
        comments: 0,
        shares: 0,
        timeAgo: 'Just now'
      };

      setPosts([newPost, ...posts]);
      setPostContent('');
      setSelectedImage(null);
    }
  };

  return (
    <div className="min-h-screen ">
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
                Connect with pet experts, join vibrant communities, and discover the best care practices for your beloved companions.
              </p>
              <div className="flex gap-6">
                <button className="bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white px-8 py-4 text-lg font-medium rounded-lg hover:shadow-lg transition-shadow">
                  Get Started
                  <i className="fas fa-arrow-right ml-2"></i>
                </button>
              </div>
            </div>
            <div className="relative hidden md:block pt-6">
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
              <div className="absolute bottom-110 left-90 bg-white p-4 rounded-xl shadow-xl">
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
      <div className="py-12">
  <div className="max-w-6xl mx-auto px-4">
    <h2 className="text-2xl font-bold text-center mb-10">Why Choose PetCircle?</h2>
    <div className="grid md:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex items-center">
        <div className="w-14 h-14 bg-fuchsia-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
          <i className="fas fa-users text-2xl text-fuchsia-600"></i>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-1">Connect with Pet Lovers</h3>
          <p className="text-gray-600 text-sm">Join a vibrant pet community and share experiences.</p>
        </div>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex items-center">
        <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
          <i className="fas fa-certificate text-2xl text-purple-600"></i>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-1">Expert Advice</h3>
          <p className="text-gray-600 text-sm">Get guidance from certified pet specialists.</p>
        </div>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex items-center">
        <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
          <i className="fas fa-calendar-alt text-2xl text-green-600"></i>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-1">Local Events</h3>
          <p className="text-gray-600 text-sm">Discover pet-friendly events nearby.</p>
        </div>
      </div>
    </div>
  </div>
</div>

      {/* Feed Section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-12 gap-8 relative">
          {/* Left Sidebar */}
          <div className="col-span-3 sticky top-8 h-[calc(100vh-4rem)]">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="flex flex-col items-center text-center">
                <img
                  src="https://public.readdy.ai/ai/img_res/dbdbd4ada0245a2b978cfbd92c5b9a2f.jpg"
                  alt="Profile"
                  className="w-24 h-24 rounded-full mb-4 object-cover"
                />
                <h2 className="text-xl font-semibold text-gray-900">Jessica Anderson</h2>
                <p className="text-gray-500 mb-4">@jessicaanderson</p>
              
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">My Communities</h3>
              <div className="space-y-4">
                {communities.map((community) => (
                  <div key={community.name} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <i className="fas fa-hashtag text-purple-600 mr-2"></i>
                      <span className="text-gray-700">{community.name}</span>
                    </div>
                    <span className="text-gray-500 text-sm">{community.members.toLocaleString()} members</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-span-6 max-h-[calc(200vh-4rem)]">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">PetCircle Daily Posts</h2>
              <div className="flex items-center space-x-2 text-gray-500">
                <button className="!rounded-button whitespace-nowrap hover:text-purple-600">
                  <i className="fas fa-sort-amount-down mr-2"></i>
                  Latest
                </button>
                <button className="!rounded-button whitespace-nowrap hover:text-purple-600">
                  <i className="fas fa-fire-alt mr-2"></i>
                  Popular
                </button>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="flex items-start space-x-4">
                <img
                  src="https://public.readdy.ai/ai/img_res/d7a4c1a9b8acaa43bac3894863e8f7ff.jpg"
                  alt="Profile"
                  className="w-12 h-12 rounded-full"
                />
                <div className="flex-1">
                  <textarea
                    placeholder="Share what your pet is up to..."
                    className="w-full p-4 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    rows={3}
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                  />
                  {selectedImage && (
                    <div className="mt-2">
                      <img src={selectedImage} alt="Preview" className="w-32 h-32 object-cover rounded" />
                    </div>
                  )}
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex space-x-4">
                      <label className="!rounded-button whitespace-nowrap text-gray-600 hover:text-purple-600 cursor-pointer">
                        <i className="fas fa-image mr-2"></i>
                        Photo/Video
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageSelect}
                        />
                      </label>
                      <button className="!rounded-button whitespace-nowrap text-gray-600 hover:text-purple-600 cursor-pointer">
                        <i className="fas fa-map-marker-alt mr-2"></i>
                        Location
                      </button>
                      <button className="!rounded-button whitespace-nowrap text-gray-600 hover:text-purple-600 cursor-pointer">
                        <i className="fas fa-paw mr-2"></i>
                        Tag Pet
                      </button>
                    </div>
                    <button
                      onClick={handleCreatePost}
                      className="!rounded-button whitespace-nowrap bg-purple-600 text-white px-6 py-2 hover:bg-purple-700 cursor-pointer"
                    >
                      Post
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-[calc(100vh-16rem)] overflow-y-auto pr-2 space-y-6">
              {posts.map((post) => (
                <div key={post.id} className="bg-white rounded-xl shadow-sm p-6 mb-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <img
                      src={post.avatar}
                      alt={post.author}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900">{post.author}</h4>
                      <p className="text-gray-500 text-sm">{post.handle} · {post.timeAgo}</p>
                    </div>
                  </div>
                  <p className="text-gray-800 mb-4">{post.content}</p>
                  <img
                    src={post.image}
                    alt="Post"
                    className="w-full rounded-xl mb-4"
                  />
                  <div className="flex items-center space-x-6 text-gray-500">
                    <button className="!rounded-button whitespace-nowrap flex items-center cursor-pointer hover:text-purple-600">
                      <i className="far fa-heart mr-2"></i>
                      {post.likes}
                    </button>
                    <button className="!rounded-button whitespace-nowrap flex items-center cursor-pointer hover:text-purple-600">
                      <i className="far fa-comment mr-2"></i>
                      {post.comments}
                    </button>
                    <button className="!rounded-button whitespace-nowrap flex items-center cursor-pointer hover:text-purple-600">
                      <i className="far fa-share-square mr-2"></i>
                      {post.shares}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="col-span-3 sticky top-8 h-[calc(100vh-4rem)]">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Trending Topics</h3>
              <div className="space-y-4">
                {trendingTopics.map((topic) => (
                  <div key={topic.tag} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <i className="fas fa-hashtag text-purple-600 mr-2"></i>
                      <span className="text-gray-700">{topic.tag}</span>
                    </div>
                    <span className="text-gray-500 text-sm">{topic.posts.toLocaleString()} posts</span>
                  </div>
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