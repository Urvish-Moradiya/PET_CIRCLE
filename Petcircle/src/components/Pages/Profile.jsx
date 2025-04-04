import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import profile from '../../assets/image/profile.jpg';
import background from '../../assets/image/background.jpg';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [bio, setBio] = useState('');
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('authToken');
      const storedUserData = JSON.parse(localStorage.getItem('userData'));
      console
      if (!token || !storedUserData) {
        toast.error('Please login to view your profile', { 
          position: 'top-right', 
          autoClose: 3000 
        });
        navigate('/login');
        return;
      }

      try {
        const response = await fetch(`http://localhost:5000/api/user/${storedUserData._id}`, {
          method: 'GET',
          headers: { 
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${token}`
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const result = await response.json();
        setUserData(result.data);
        setBio(result.data.bio || '');
        localStorage.setItem('userData', JSON.stringify(result.data));
        console.log('User data:', result.data);
      } catch (error) {
        console.error('Fetch user error:', error);
        toast.error('Failed to load profile data', { 
          position: 'top-right', 
          autoClose: 3000 
        });
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    toast.success('Logged out successfully', { 
      position: 'top-right', 
      autoClose: 2000 
    });
    navigate('/login');
  };

  const handleBioUpdate = async () => {
    if (!userData?._id) return;


    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch('http://localhost:5000/api/update-bio', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ userId: userData._id, bio }),
      });

      if (!response.ok) {
        throw new Error('Failed to update bio');
      }

      const result = await response.json();
      setUserData(result.data);
      setBio(result.data.bio || '');
      localStorage.setItem('userData', JSON.stringify(result.data));
      toast.success('Bio updated successfully!', { 
        position: 'top-right', 
        autoClose: 2000 
      });
      setIsEditingBio(false);
    } catch (error) {
      console.error('Bio update error:', error);
      toast.error('Failed to update bio', { 
        position: 'top-right', 
        autoClose: 3000 
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!userData) {
    return null; // or redirect to login
  }

  return (
    <div className="min-h-screen pt-20 px-4 max-w-7xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="h-48 relative">
          <img 
            src={background} 
            alt="Cover" 
            className="w-full h-full object-cover"
            onError={(e) => { e.target.src = '/fallback-background.jpg'; }}
          />
          <div className="absolute -bottom-16 left-8">
            <img 
              src={profile} 
              alt="Profile" 
              className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
              onError={(e) => { e.target.src = '/fallback-profile.jpg'; }}
            />
          </div>
        </div>
        <div className="pt-20 px-8 pb-8">
          <div className="flex justify-between items-start flex-col md:flex-row gap-6">
            <div className="w-full md:w-auto">
              <h1 className="text-3xl font-bold text-gray-900">{userData.fullName}</h1>
              <p className="text-gray-700 capitalize">{userData.role}</p>
              <p className="text-gray-600">{userData.email}</p>
              <div className="mt-3 max-w-lg">
                {isEditingBio ? (
                  <div className="w-full">
                    <textarea
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      className="w-full p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-fuchsia-500 text-gray-700 resize-none"
                      rows="3"
                      maxLength={200}
                      placeholder="Write your bio here (max 200 characters)..."
                    />
                    <div className="mt-3 flex justify-end space-x-3">
                      <button
                        onClick={handleBioUpdate}
                        className="bg-fuchsia-600 text-white px-5 py-2 rounded-lg hover:bg-fuchsia-700 transition duration-300 disabled:bg-gray-400"
                        disabled={!bio.trim()}
                      >
                        Save
                      </button>
                      <button
                        onClick={() => {
                          setBio(userData.bio || '');
                          setIsEditingBio(false);
                        }}
                        className="bg-gray-200 text-gray-700 px-5 py-2 rounded-lg hover:bg-gray-300 transition duration-300"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="text-gray-700 leading-relaxed italic">
                      {bio || 'No bio yet.'}
                    </p>
                    <button
                      onClick={() => setIsEditingBio(true)}
                      className="mt-2 text-fuchsia-600 hover:underline font-semibold"
                    >
                      Edit Bio
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="flex-shrink-0">
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition duration-300 flex items-center"
              >
                <i className="fas fa-sign-out-alt mr-2"></i>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-8">
        <div className="md:col-span-4 space-y-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">My Pets</h2>
            <div className="space-y-4">
              {[
                {
                  name: 'Luna',
                  type: 'Golden Retriever',
                  age: '2 years',
                  image: 'https://public.readdy.ai/ai/img_res/baaf805e37d7c7b142202322d37c8236.jpg',
                },
                {
                  name: 'Oliver',
                  type: 'British Shorthair',
                  age: '3 years',
                  image: 'https://public.readdy.ai/ai/img_res/43045d2d044b0d78be81ca6fae84a4c5.jpg',
                },
              ].map((pet) => (
                <div key={pet.name} className="flex items-center space-x-4">
                  <img
                    src={pet.image}
                    alt={pet.name}
                    className="w-16 h-16 rounded-full object-cover"
                    onError={(e) => { e.target.src = '/fallback-pet.jpg'; }}
                  />
                  <div>
                    <h3 className="font-semibold">{pet.name}</h3>
                    <p className="text-sm text-gray-600">{pet.type}</p>
                    <p className="text-sm text-gray-500">{pet.age}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">My Communities</h2>
            <div className="space-y-4">
              {[
                { name: 'Dog Lovers United', members: '15.2K', role: 'Member' },
                { name: 'Pet Photography', members: '10.2K', role: 'Member' },
                { name: 'Pet Health & Wellness', members: '14.5K', role: 'Member' },
              ].map((community) => (
                <div key={community.name} className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">{community.name}</h3>
                    <p className="text-sm text-gray-600">{community.members} members</p>
                  </div>
                  <span className="text-sm text-purple-600">{community.role}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="md:col-span-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">My Posts</h2>
            <div className="space-y-6 max-h-[800px] overflow-y-auto pr-4">
              {[
                {
                  image: 'https://public.readdy.ai/ai/img_res/e6de6b2c9fc46b792ea6e7bb673cdc22.jpg',
                  content: "Luna's first training session was a success! She's already mastered 'sit' and 'stay'. So proud of my little girl! 🐾 #PuppyTraining #GoldenRetriever",
                  likes: 156,
                  comments: 28,
                  time: '2 days ago',
                },
                {
                  image: 'https://public.readdy.ai/ai/img_res/f32055fc5fac5b55fd3c52bdc75f6bd6.jpg',
                  content: 'The moment we’ve been waiting for! Oliver and Luna finally becoming friends. It took time and patience, but seeing them play together makes it all worth it. ❤️ #PetFriendship',
                  likes: 234,
                  comments: 45,
                  time: '5 days ago',
                },
                {
                  image: 'https://public.readdy.ai/ai/img_res/f16e21024b99eb424c5ff1f9323b58e6.jpg',
                  content: 'Made some healthy homemade treats for the pets today! Recipe in the comments below 👇 #PetNutrition #HomemadePetTreats',
                  likes: 189,
                  comments: 56,
                  time: '1 week ago',
                },
              ].map((post, index) => (
                <div key={index} className="border-b pb-6 last:border-b-0 last:pb-0">
                  <img 
                    src={post.image} 
                    alt="Post" 
                    className="w-full h-64 object-cover rounded-lg mb-4"
                    onError={(e) => { e.target.src = '/fallback-post.jpg'; }}
                  />
                  <p className="text-gray-800 mb-3">{post.content}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                      <button className="flex items-center space-x-1 hover:text-purple-600">
                        <i className="fas fa-heart"></i>
                        <span>{post.likes}</span>
                      </button>
                      <button className="flex items-center space-x-1 hover:text-purple-600">
                        <i className="fas fa-comment"></i>
                        <span>{post.comments}</span>
                      </button>
                      <button className="hover:text-purple-600">
                        <i className="fas fa-share"></i>
                      </button>
                    </div>
                    <span>{post.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default Profile;