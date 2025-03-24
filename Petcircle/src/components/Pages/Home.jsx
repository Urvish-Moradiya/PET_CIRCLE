import React, { useState } from 'react';

const Home = () => {
  const [newPostContent, setNewPostContent] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [posts, setPosts] = useState([
    {
      id: 1,
      image: 'https://public.readdy.ai/ai/img_res/4bf4768a1e5602000170686d1adc91d0.jpg',
      author: 'Emily Parker',
      petName: 'Max',
      content: 'Max\'s first day at puppy training class! He\'s such a quick learner 🐾',
      likes: 234,
      comments: 45,
      time: '2 hours ago'
    },
    {
      id: 2,
      image: 'https://public.readdy.ai/ai/img_res/d6f4add0b6bbaae904e172e6e6b934eb.jpg',
      author: 'Sarah Thompson',
      petName: 'Luna',
      content: 'Luna showing off her majestic fluff after grooming ✨',
      likes: 312,
      comments: 67,
      time: '4 hours ago'
    }
  ]);

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
    if (newPostContent.trim() || selectedImage) {
      const newPost = {
        id: posts.length + 1,
        image: selectedImage || 'https://public.readdy.ai/ai/img_res/2211b1b0aa7423f126cc992fd6b7f98e.jpg',
        author: 'Current User',
        petName: 'Your Pet',
        content: newPostContent,
        likes: 0,
        comments: 0,
        time: 'Just now'
      };

      setPosts([newPost, ...posts]);
      setNewPostContent('');
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
      <div className="py-20 ">
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

      {/* Feed Section */}
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-12 gap-8">
        {/* Left Sidebar */}
        <div className="col-span-3">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-20">
            <div className="flex items-center space-x-3 mb-6">
              <img
                src="https://public.readdy.ai/ai/img_res/fdcc79b7fdcfa4db13a240b9a3801556.jpg"
                alt="Profile"
                className="h-16 w-16 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold">Jessica Anderson</h3>
                <p className="text-sm text-gray-500">@jessicaanderson</p>
              </div>
            </div>
 
            <h3 className="font-semibold text-lg mb-4">My Communities</h3>
            <ul className="space-y-3">
              {['Dog Lovers', 'Cat Paradise', 'Bird Friends', 'Exotic Pets', 'Pet Training'].map((item) => (
                <li key={item} className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded">
                  <i className="fas fa-hashtag text-purple-500"></i>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Main Feed */}
        <div className="col-span-6">
          {/* Create Post */}
          <div className="  bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex items-center space-x-4">
              <img
                src="https://public.readdy.ai/ai/img_res/824d0ed6d6226186101ad4859d588688.jpg"
                alt="User"
                className="h-10 w-10 rounded-full"
              />
              <input
                type="text"
                className="flex-1 bg-gray-100 rounded-full px-6 py-3 text-sm"
                placeholder="Share what your pet is up to..."
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
              />
            </div>
            {selectedImage && (
              <div className="mt-4 relative">
                <img src={selectedImage} alt="Selected" className="w-full h-48 object-cover rounded-lg" />
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-2 right-2 bg-gray-800 bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-70"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
            )}
            <div className="flex justify-between mt-4 pt-4 border-t">
              <label className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 cursor-pointer">
                <i className="fas fa-image"></i>
                <span>Photo/Video</span>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageSelect}
                />
              </label>
              <button className="flex items-center space-x-2 text-gray-600 hover:text-purple-600">
                <i className="fas fa-map-marker-alt"></i>
                <span>Location</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-600 hover:text-purple-600">
                <i className="fas fa-tag"></i>
                <span>Tag Pet</span>
              </button>
              <button
                onClick={handleCreatePost}
                className="rounded-lg bg-purple-600 text-white px-6 py-2 hover:bg-purple-700 transition duration-300"
              >
                Post
              </button>
            </div>
          </div>

          {/* Posts */}
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow-sm mb-6">
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img
                    src="https://public.readdy.ai/ai/img_res/73eea721aa8afaaaf90fec09b3c9da6d.jpg"
                    alt={post.author}
                    className="h-10 w-10 rounded-full"
                  />
                  <div>
                    <h4 className="font-semibold">{post.author}</h4>
                    <p className="text-sm text-gray-500">with {post.petName} • {post.time}</p>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <i className="fas fa-ellipsis-h"></i>
                </button>
              </div>
              <img
                src={post.image}
                alt={`${post.petName}'s post`}
                className="w-full h-[400px] object-cover"
              />
              <div className="p-6">
                <p className="text-gray-800 mb-4">{post.content}</p>
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex space-x-6">
                    <button className="flex items-center space-x-2 text-gray-600 hover:text-purple-600">
                      <i className="fas fa-heart"></i>
                      <span>{post.likes}</span>
                    </button>
                    <button className="flex items-center space-x-2 text-gray-600 hover:text-purple-600">
                      <i className="fas fa-comment"></i>
                      <span>{post.comments}</span>
                    </button>
                    <button className="flex items-center space-x-2 text-gray-600 hover:text-purple-600">
                      <i className="fas fa-bookmark"></i>
                    </button>
                  </div>
                  <button className="text-gray-600 hover:text-purple-600">
                    <i className="fas fa-share"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Sidebar */}
        <div className="col-span-3">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h3 className="font-semibold text-lg mb-4">Suggested Friends</h3>
            <div className="space-y-4">
              {([
                { name: 'Michael Chen', pet: 'Buddy', image: 'https://public.readdy.ai/ai/img_res/34416c102bdb776ee6c5b1cf4dfcad4e.jpg' },
                { name: 'Rachel White', pet: 'Milo', image: 'https://public.readdy.ai/ai/img_res/9ddc8740315e0b5ace8d350320b254f6.jpg' },
                { name: 'David Kim', pet: 'Coco', image: 'https://public.readdy.ai/ai/img_res/fc8ac65139d1e5cdfc2b6633ca5872cb.jpg' }
              ]).map((friend) => (
                <div key={friend.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img src={friend.image} alt={friend.name} className="h-10 w-10 rounded-full object-cover" />
                    <div>
                      <h4 className="font-semibold">{friend.name}</h4>
                      <p className="text-sm text-gray-500">with {friend.pet}</p>
                    </div>
                  </div>
                  <button className="rounded-lg text-sm bg-purple-600 text-white px-4 py-1 hover:bg-purple-700">
                    Follow
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="font-semibold text-lg mb-4">Trending Topics</h3>
            <ul className="space-y-4">
              {['#PuppyTraining', '#CatCare', '#PetHealth', '#AdoptDontShop', '#PetPhotography'].map((topic) => (
                <li key={topic} className="flex items-center justify-between cursor-pointer hover:bg-gray-50 p-2 rounded">
                  <span className="text-purple-600">{topic}</span>
                  <span className="text-sm text-gray-500">{Math.floor(Math.random() * 1000)}+ posts</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;