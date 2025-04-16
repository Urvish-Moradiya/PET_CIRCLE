
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../AuthContext';
import axios from 'axios';
import profile from '../../assets/image/profile.jpg';
import background from '../../assets/image/background.jpg';

const PetOwnerProfile = () => {
  const { user, loading: authLoading, logout } = useAuth();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [bio, setBio] = useState('');
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [pets, setPets] = useState([]);
  const [joinedCommunities, setJoinedCommunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [leavingCommunity, setLeavingCommunity] = useState({});

  const fetchUserProfileAndData = useCallback(async (signal) => {
    const token = localStorage.getItem('authToken');
    const storedUserData = JSON.parse(localStorage.getItem('userData'));

    if (!token || !storedUserData || !storedUserData._id) {
      toast.error('Please login to view your profile', {
        position: 'top-right',
        autoClose: 3000,
      });
      navigate('/login');
      return;
    }

    try {
      // Fetch user profile
      console.log('Fetching user profile for ID:', storedUserData._id);
      const userResponse = await axios.get(`/api/user/${storedUserData._id}`, {
        headers: { Authorization: `Bearer ${token}` },
        signal,
      });
      if (!userResponse.data.data) {
        throw new Error('Invalid user data response');
      }
      setUserData(userResponse.data.data);
      setBio(userResponse.data.data.bio || '');
      localStorage.setItem('userData', JSON.stringify(userResponse.data.data));

      // Fetch pets
      console.log('Fetching pets for user ID:', storedUserData._id);
      const petUrl = '/pets';
      console.log('Pet API URL:', petUrl);
      const petsResponse = await axios.get(petUrl, {
        headers: { Authorization: `Bearer ${token}` },
        signal,
      });
      console.log('Pets response:', petsResponse.data);
      const petData = Array.isArray(petsResponse.data.data) ? petsResponse.data.data : [];
      if (petData.length === 0) {
        console.log('No pets found for user');
        toast.info('No pets found for this user', {
          position: 'top-right',
          autoClose: 3000,
        });
      }
      setPets(petData);

      // Fetch communities
      let communities = [];
      try {
        const rawCommunities = localStorage.getItem('joinedCommunities');
        console.log('Raw joinedCommunities:', rawCommunities);
        if (rawCommunities) {
          communities = JSON.parse(rawCommunities);
          if (!Array.isArray(communities)) {
            throw new Error('Invalid communities data format');
          }
        }
      } catch (parseError) {
        console.error('Error parsing joinedCommunities:', parseError);
        communities = [];
      }
      console.log('Parsed joined communities:', communities);
      setJoinedCommunities(communities);
    } catch (error) {
      if (axios.isCancel(error)) return;
      console.error('Fetch error:', error);
      let errorMessage = 'Failed to load profile or pet data';
      if (error.response) {
        const { status, data } = error.response;
        errorMessage = `${data.message || error.message} (Status: ${status})`;
        if (status === 404 && error.config.url.includes('/pets')) {
          errorMessage = 'No pets found for this user';
          setPets([]);
        } else if (status === 403) {
          errorMessage = 'Unauthorized access. Please login again.';
          navigate('/login');
        }
      } else if (error.request) {
        errorMessage = 'Network error. Please check your connection.';
      }
      toast.error(errorMessage, {
        position: 'top-right',
        autoClose: 3000,
      });
      setPets([]);
      let communities = [];
      try {
        const rawCommunities = localStorage.getItem('joinedCommunities');
        console.log('Raw joinedCommunities on error:', rawCommunities);
        if (rawCommunities) {
          communities = JSON.parse(rawCommunities) || [];
        }
      } catch (parseError) {
        console.error('Error parsing joinedCommunities on error:', parseError);
      }
      setJoinedCommunities(communities);
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    const controller = new AbortController();
    fetchUserProfileAndData(controller.signal);
    return () => controller.abort();
  }, [fetchUserProfileAndData]);

  const handleBioUpdate = async () => {
    if (!userData?._id || !bio.trim()) return;

    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.post(
        '/api/update-bio',
        { userId: userData._id, bio },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUserData(response.data.data);
      setBio(response.data.data.bio || '');
      localStorage.setItem('userData', JSON.stringify(response.data.data));
      toast.success('Bio updated successfully!', {
        position: 'top-right',
        autoClose: 2000,
      });
      setIsEditingBio(false);
    } catch (error) {
      console.error('Bio update error:', error);
      toast.error('Failed to update bio', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem('joinedCommunities');
      toast.success('Logged out successfully', {
        position: 'top-right',
        autoClose: 2000,
      });
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Failed to log out', {
        position: 'top-right',
        autoClose: 2000,
      });
    }
  };

  const leaveCommunity = (communityId) => {
    if (leavingCommunity[communityId]) return;

    console.log('Leaving community ID:', communityId);
    setLeavingCommunity((prev) => ({ ...prev, [communityId]: true }));
    try {
      const updatedCommunities = joinedCommunities.filter((community) => community._id !== communityId);
      setJoinedCommunities(updatedCommunities);
      localStorage.setItem('joinedCommunities', JSON.stringify(updatedCommunities));
      toast.success('Left community successfully', {
        position: 'top-right',
        autoClose: 2000,
      });
    } catch (error) {
      console.error('Leave community error:', error);
      toast.error('Failed to leave community', {
        position: 'top-right',
        autoClose: 3000,
      });
    } finally {
      setLeavingCommunity((prev) => ({ ...prev, [communityId]: false }));
    }
  };

  const calculateAge = useCallback((birthday) => {
    if (!birthday) return 'Age Unknown';
    const birthDate = new Date(birthday);
    if (isNaN(birthDate)) return 'Age Unknown';
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age >= 0 ? `${age} ${age === 1 ? 'year' : 'years'}` : 'Less than a year';
  }, []);

  const memoizedPets = useMemo(() => pets, [pets]);
  const memoizedCommunities = useMemo(() => joinedCommunities, [joinedCommunities]);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen pt-20 px-4 max-w-7xl mx-auto bg-[#faf9f9]">
        <div className="bg-white rounded-lg shadow-sm p-6 animate-pulse">
          <div className="h-48 bg-gray-200 rounded-t-lg"></div>
          <div className="pt-16 px-8 pb-8">
            <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!user || !userData) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen pt-20 px-4 max-w-7xl mx-auto bg-[#faf9f9]">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="h-48 relative">
          <img
            src={background}
            alt="Cover"
            className="w-full h-full object-cover"
            onError={(e) => (e.target.src = '/fallback-background.jpg')}
          />
          <div className="absolute -bottom-16 left-8">
            <img
              src={profile}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
              onError={(e) => (e.target.src = '/fallback-profile.jpg')}
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
                      className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-500 text-gray-700 resize-none"
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
                    <p className="text-gray-700 leading-relaxed italic">{bio || 'No bio yet.'}</p>
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
          {/* Pet Profiles Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">My Pets</h2>
            <div className="space-y-4">
              {memoizedPets.length > 0 ? (
                memoizedPets.map((pet) => (
                  <div
                    key={pet._id}
                    className="flex items-center space-x-4 p-3 rounded-lg bg-gray-100 hover:bg-gray-50 transition duration-200 cursor-pointer"
                    onClick={() => navigate(`/pets`)}
                  >
                    <img
                      src={pet.profileImage || 'https://via.placeholder.com/150'}
                      alt={pet.name || 'Pet'}
                      className="w-16 h-16 rounded-full object-cover shadow-sm"
                      onError={(e) => (e.target.src = '/fallback-pet.jpg')}
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{pet.name || 'Unnamed Pet'}</h3>
                      <p className="text-sm text-gray-600">{pet.type || 'Unknown Type'}</p>
                      <p className="text-sm text-gray-600">{pet.breed || 'Unknown Breed'}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-600 text-sm">No pets added yet.</p>
              )}
            </div>
          </div>

          {/* Joined Communities Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">Joined Communities</h2>
            <div className="space-y-4">
              {memoizedCommunities.length > 0 ? (
                memoizedCommunities.map((community) => (
                  <div
                    key={community._id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition duration-200"
                    onClick={() => navigate(`/communities`)}
                  >
                    <div className="flex items-center space-x-4">
                      <i className="fas fa-users text-fuchsia-500 text-xl"></i>
                      <div>
                        <h3 className="font-semibold text-gray-900">{community.title || 'Unnamed Community'}</h3>
                        <p className="text-sm text-gray-600">{community.description || 'No description available'}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-600 text-sm">No communities joined yet.</p>
              )}
            </div>
          </div>
        </div>

        <div className="md:col-span-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">My Posts</h2>
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
              ].map((post, index) => (
                <div key={`post-${index}`} className="border-b pb-6 last:border-b-0 last:pb-0">
                  <img
                    src={post.image}
                    alt="Post"
                    className="w-full h-64 object-cover rounded-lg mb-4 shadow-sm"
                    onError={(e) => (e.target.src = '/fallback-post.jpg')}
                  />
                  <p className="text-gray-800 mb-3">{post.content}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                      <button className="flex items-center space-x-1 hover:text-fuchsia-600 transition duration-200">
                        <i className="fas fa-heart"></i>
                        <span>{post.likes}</span>
                      </button>
                      <button className="flex items-center space-x-1 hover:text-fuchsia-600 transition duration-200">
                        <i className="fas fa-comment"></i>
                        <span>{post.comments}</span>
                      </button>
                      <button className="hover:text-fuchsia-600 transition duration-200">
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

export default PetOwnerProfile;