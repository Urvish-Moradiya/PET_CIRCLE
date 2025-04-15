import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../AuthContext';
import axios from 'axios';
import profile from '../../assets/image/profile.jpg';
import background from '../../assets/image/background.jpg';

const PetExpertProfile = () => {
  const { user, loading: authLoading, logout } = useAuth(); // Added logout
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [bio, setBio] = useState('');
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('authToken');
      const storedUserData = JSON.parse(localStorage.getItem('userData'));

      if (!token || !storedUserData) {
        toast.error('Please login to view your profile', {
          position: 'top-right',
          autoClose: 3000,
        });
        navigate('/login');
        return;
      }

      try {
        const response = await axios.get(`/api/user/${storedUserData._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUserData(response.data.data);
        setBio(response.data.data.bio || '');
        localStorage.setItem('userData', JSON.stringify(response.data.data));
      } catch (error) {
        console.error('Fetch user error:', error);
        toast.error('Failed to load profile data', {
          position: 'top-right',
          autoClose: 3000,
        });
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  const handleBioUpdate = async () => {
    if (!userData?._id) return;

    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.post(
        '/api/update-bio',
        { userId: userData._id, bio },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
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
      await logout(); // Use logout from AuthContext
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

  if (authLoading || loading) {
    return <div className="flex justify-center items-center h-screen text-gray-600">Loading...</div>;
  }

  if (!user || !userData) {
    navigate('/login');
    return null;
  }

  console.log(userData);

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
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">My Consultations</h2>
            <div className="space-y-4">
              {[
                { client: 'John Doe', topic: 'Dog Nutrition', date: '2025-04-10' },
                { client: 'Jane Smith', topic: 'Cat Behavior', date: '2025-04-08' },
              ].map((consult) => (
                <div key={consult.client} className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">{consult.client}</h3>
                    <p className="text-sm text-gray-600">{consult.topic}</p>
                  </div>
                  <span className="text-sm text-gray-500">{consult.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="md:col-span-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Articles Published</h2>
            <div className="space-y-6">
              {[
                { title: 'Best Diets for Senior Dogs', views: 1200, date: '1 week ago' },
                { title: 'Understanding Cat Anxiety', views: 850, date: '2 weeks ago' },
              ].map((article, index) => (
                <div key={index} className="border-b pb-6 last:border-b-0 last:pb-0">
                  <h3 className="font-semibold">{article.title}</h3>
                  <p className="text-gray-600">Views: {article.views}</p>
                  <p className="text-sm text-gray-500">Published: {article.date}</p>
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

export default PetExpertProfile;