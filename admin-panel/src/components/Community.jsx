import React, { useState, useEffect } from 'react';

const Community = () => {
  const [showLoginPanel, setShowLoginPanel] = useState(false);
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(null);
  const [newCommunity, setNewCommunity] = useState({
    id: '',
    title: '',
    description: '',
    image: '',
  });

  // Mock token; replace with actual auth logic
  const token = localStorage.getItem('authToken') || 'your-token-here';

  // Stats data (Total Communities dynamic, others static)
  const [analyticsData, setAnalyticsData] = useState([
    { icon: 'fa-users', title: 'Total Communities', value: '0', change: '+12.3%' },
    { icon: 'fa-star', title: 'Featured Communities', value: '28', change: '+5.6%' },
    { icon: 'fa-comment', title: 'Active Discussions', value: '1,245', change: '+18.2%' },
    { icon: 'fa-user-plus', title: 'New Members Today', value: '156', change: '+9.1%' },
  ]);

  // Fetch communities
  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/api/communities', {
    
        });
        if (!response.ok) {
          throw new Error('Failed to fetch communities');
        }
        const data = await response.json();
        // Mock data if endpoint not available
        const mockCommunities = data
        setCommunities(mockCommunities);
        setAnalyticsData(prev => [
          { ...prev[0], value: mockCommunities.length.toString() },
          ...prev.slice(1),
        ]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCommunities();
  }, []);

  // Add new community
  const addCommunity = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/communities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newCommunity),
      });
      if (!response.ok) {
        throw new Error('Failed to add community');
      }
      const result = await response.json();
      setCommunities([result, ...communities]);
      setAnalyticsData(prev => [
        { ...prev[0], value: (parseInt(prev[0].value) + 1).toString() },
        ...prev.slice(1),
      ]);
      setShowAddModal(false);
      setNewCommunity({ id: '', title: '', description: '', image: '' });
    } catch (err) {
      alert('Error adding community: ' + err.message);
    }
  };

  // Delete community
  const deleteCommunity = async (communityId) => {
    if (!window.confirm('Are you sure you want to delete this community?')) return;
    try {
      const response = await fetch(`http://localhost:5000/api/communities/${communityId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to delete community');
      }
      setCommunities(communities.filter(community => community.id !== communityId));
      setAnalyticsData(prev => [
        { ...prev[0], value: (parseInt(prev[0].value) - 1).toString() },
        ...prev.slice(1),
      ]);
    } catch (err) {
      alert('Error deleting community: ' + err.message);
    }
  };

  if (loading) return <div className="flex-1 flex items-center justify-center">Loading...</div>;
  if (error) return <div className="flex-1 flex items-center justify-center text-red-600">Error: {error}</div>;

  return (
    <div className="flex-1 overflow-auto">
      {/* Header */}
      <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <h2 className="text-xl font-semibold text-gray-800">Community Management</h2>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search communities..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <i className="fas fa-search absolute left-3 top-2.5 text-gray-400"></i>
          </div>
          <button className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 cursor-pointer">
            <i className="fas fa-bell"></i>
          </button>
          <div className="relative">
            <button
              onClick={() => setShowLoginPanel(!showLoginPanel)}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white">
                <span className="text-sm font-medium">AD</span>
              </div>
              <span className="text-sm font-medium text-gray-700">Admin</span>
            </button>
            {showLoginPanel && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg z-50 border border-gray-200">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">Login</h3>
                    <button
                      onClick={() => setShowLoginPanel(false)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                      <input
                        type="password"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Enter your password"
                        required
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="remember"
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                          Remember me
                        </label>
                      </div>
                      <button type="button" className="text-sm text-indigo-600 hover:text-indigo-800">
                        Forgot password?
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowLoginPanel(false)}
                      className="w-full py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Sign in
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
      {/* Main Content */}
      <div className="p-6">
        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {analyticsData.map((item, index) => (
            <div key={index} className="flex items-center p-3 border border-gray-100 rounded-lg">
              <div className={`p-3 rounded-full ${item.icon === 'fa-star' ? 'bg-yellow-100 text-yellow-600' : 'bg-indigo-100 text-indigo-600'}`}>
                <i className={`fas ${item.icon} fa-lg`}></i>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">{item.title}</p>
                <p className="text-lg font-semibold text-gray-800">{item.value}</p>
                <p className="text-xs text-gray-500">{item.change}</p>
              </div>
            </div>
          ))}
        </div>
        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by name or description..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                <i className="fas fa-search absolute left-3 top-2.5 text-gray-400"></i>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setShowAddModal(true)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 cursor-pointer"
              >
                <i className="fas fa-plus mr-2"></i>Add Community
              </button>
            </div>
          </div>
        </div>
        {/* Community Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {communities.map(community => (
            <div key={community.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="relative h-48">
                <img src={community.image || 'https://via.placeholder.com/300'} alt={community.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{community.title}</h3>
                <p className="text-gray-600 mb-4">{community.description}</p>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">Members</p>
                    <p className="text-lg font-semibold text-gray-800">{community.members}</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">Posts</p>
                    <p className="text-lg font-semibold text-gray-800">{community.posts}</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">Created</p>
                    <p className="text-lg font-semibold text-gray-800">
                      {new Date(community.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => setShowViewModal(community)}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 cursor-pointer"
                  >
                    View Community
                  </button>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => deleteCommunity(community.id)}
                      className="p-2 text-red-600 hover:text-red-900 cursor-pointer"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Pagination */}
        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">1</span> to <span className="font-medium">{communities.length}</span> of <span className="font-medium">{communities.length}</span> communities
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer">
              Previous
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 cursor-pointer">
              1
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer">
              Next
            </button>
          </div>
        </div>
      </div>
      {/* Add Community Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Add Community</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <form onSubmit={addCommunity} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Community ID</label>
                <input
                  type="text"
                  value={newCommunity.id}
                  onChange={e => setNewCommunity({ ...newCommunity, id: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter unique ID (e.g., dog-lovers)"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={newCommunity.title}
                  onChange={e => setNewCommunity({ ...newCommunity, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter community title"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={newCommunity.description}
                  onChange={e => setNewCommunity({ ...newCommunity, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter description"
                  rows="4"
                  required
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                <input
                  type="url"
                  value={newCommunity.image}
                  onChange={e => setNewCommunity({ ...newCommunity, image: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter image URL"
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 cursor-pointer"
                >
                  Add Community
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* View Community Modal */}
      {showViewModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">{showViewModal.title}</h3>
              <button
                onClick={() => setShowViewModal(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="space-y-3">
              <img src={showViewModal.image || 'https://via.placeholder.com/300'} alt={showViewModal.title} className="w-full h-48 object-cover rounded-lg mb-3" />
              <p><strong>Description:</strong> {showViewModal.description}</p>
              <p><strong>Members:</strong> {showViewModal.members}</p>
              <p><strong>Posts:</strong> {showViewModal.posts}</p>
              <p><strong>Created:</strong> {new Date(showViewModal.createdAt).toLocaleDateString()}</p>
              <p><strong>ID:</strong> {showViewModal.id}</p>
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setShowViewModal(null)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Community;