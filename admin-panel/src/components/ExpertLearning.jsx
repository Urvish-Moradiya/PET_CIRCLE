import React, { useState, useEffect } from 'react';

const ExpertLearning = () => {
  const [showLoginPanel, setShowLoginPanel] = useState(false);
  const [activeTab, setActiveTab] = useState('articles');
  const [articles, setArticles] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(null);
  const [newItem, setNewItem] = useState({
    title: '',
    category: '',
    content: '',
    description: '',
    image: '',
    thumbnail: '',
    redirectUrl: '',
    duration: '',
    author: '',
  });

  // Mock token; replace with actual auth logic
  const token = localStorage.getItem('authToken') || 'your-token-here';

  // Stats data (dynamic except Recent counts)
  const [statsData, setStatsData] = useState([
    { icon: 'fa-book', title: 'Total Articles', value: '0', change: '+8.5%' },
    { icon: 'fa-video', title: 'Total Sessions', value: '0', change: '+12.3%' },
    { icon: 'fa-file-alt', title: 'Recent Articles', value: '5', change: '+3.2%' },
    { icon: 'fa-clock', title: 'Recent Sessions', value: '3', change: '+4.7%' },
  ]);

  // Fetch articles and sessions
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch articles
        const articlesResponse = await fetch('http://localhost:5000/articles', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!articlesResponse.ok) throw new Error('Failed to fetch articles');
        const articlesData = await articlesResponse.json();
        // Mock articles if endpoint not available
        const mockArticles = articlesData || [
          {
            _id: '1',
            title: 'Dog Training Basics',
            category: 'Training',
            image: 'https://via.placeholder.com/150',
            author: 'Jane Doe',
            createdAt: '2025-04-01T00:00:00Z',
            content: 'Sample content',
            redirectUrl: 'http://example.com',
          },
        ];
        setArticles(mockArticles);

        // Fetch sessions
        const sessionsResponse = await fetch('http://localhost:5000/petsessions', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!sessionsResponse.ok) throw new Error('Failed to fetch sessions');
        const sessionsData = await sessionsResponse.json();
        // Mock sessions if endpoint not available
        const mockSessions = sessionsData || [
          {
            _id: '1',
            title: 'Pet Nutrition Guide',
            category: 'Nutrition',
            thumbnail: 'https://via.placeholder.com/150',
            author: 'John Smith',
            duration: '30 min',
            views: 100,
            createdAt: '2025-04-02T00:00:00Z',
            description: 'Sample description',
            redirectUrl: 'http://example.com',
          },
        ];
        setSessions(mockSessions);

        // Update stats
        setStatsData(prev => [
          { ...prev[0], value: mockArticles.length.toString() },
          { ...prev[1], value: mockSessions.length.toString() },
          prev[2],
          prev[3],
        ]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Add article or session
  const addItem = async (e) => {
    e.preventDefault();
    try {
      const endpoint = activeTab === 'articles' ? '/articles' : '/petsessions';
      const body = activeTab === 'articles'
        ? {
            title: newItem.title,
            category: newItem.category,
            content: newItem.content,
            image: newItem.image,
            redirectUrl: newItem.redirectUrl,
            author: newItem.author || 'Anonymous',
          }
        : {
            title: newItem.title,
            category: newItem.category,
            description: newItem.description,
            thumbnail: newItem.thumbnail,
            redirectUrl: newItem.redirectUrl,
            duration: newItem.duration,
            author: newItem.author || 'Anonymous',
          };
      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        throw new Error(`Failed to add ${activeTab === 'articles' ? 'article' : 'session'}`);
      }
      const result = await response.json();
      if (activeTab === 'articles') {
        setArticles([...articles, result.article]);
        setStatsData(prev => [
          { ...prev[0], value: (parseInt(prev[0].value) + 1).toString() },
          prev[1],
          prev[2],
          prev[3],
        ]);
      } else {
        setSessions([...sessions, result.session]);
        setStatsData(prev => [
          prev[0],
          { ...prev[1], value: (parseInt(prev[1].value) + 1).toString() },
          prev[2],
          prev[3],
        ]);
      }
      setShowAddModal(false);
      setNewItem({
        title: '',
        category: '',
        content: '',
        description: '',
        image: '',
        thumbnail: '',
        redirectUrl: '',
        duration: '',
        author: '',
      });
    } catch (err) {
      alert(`Error adding ${activeTab === 'articles' ? 'article' : 'session'}: ${err.message}`);
    }
  };

  // Delete article or session
  const deleteItem = async (id, type) => {
    if (!window.confirm(`Are you sure you want to delete this ${type}?`)) return;
    try {
      const endpoint = type === 'article' ? `/articles/${id}` : `/petsessions/${id}`;
      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        throw new Error(`Failed to delete ${type}`);
      }
      if (type === 'article') {
        setArticles(articles.filter(a => a._id !== id));
        setStatsData(prev => [
          { ...prev[0], value: (parseInt(prev[0].value) - 1).toString() },
          prev[1],
          prev[2],
          prev[3],
        ]);
      } else {
        setSessions(sessions.filter(s => s._id !== id));
        setStatsData(prev => [
          prev[0],
          { ...prev[1], value: (parseInt(prev[1].value) - 1).toString() },
          prev[2],
          prev[3],
        ]);
      }
    } catch (err) {
      alert(`Error deleting ${type}: ${err.message}`);
    }
  };

  if (loading) return <div className="flex-1 flex items-center justify-center">Loading...</div>;
  if (error) return <div className="flex-1 flex items-center justify-center text-red-600">Error: {error}</div>;

  return (
    <div className="flex-1 overflow-auto">
      {/* Header */}
      <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <h2 className="text-xl font-semibold text-gray-800">ExpertLearning Management</h2>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search content..."
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
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {statsData.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-indigo-100 text-indigo-600">
                  <i className={`fas ${stat.icon} fa-lg`}></i>
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-500">{stat.title}</h3>
                  <p className="text-2xl font-semibold text-gray-800">{stat.value}</p>
                </div>
              </div>
              <div className="mt-2">
                <span className="text-sm text-green-600">
                  <i className="fas fa-arrow-up mr-1"></i>{stat.change} from last month
                </span>
              </div>
            </div>
          ))}
        </div>
        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('articles')}
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === 'articles'
                  ? 'border-b-2 border-indigo-600 text-indigo-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Articles
            </button>
            <button
              onClick={() => setActiveTab('sessions')}
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === 'sessions'
                  ? 'border-b-2 border-indigo-600 text-indigo-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Sessions
            </button>
          </div>
        </div>
        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder={`Search ${activeTab}...`}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                <i className="fas fa-search absolute left-3 top-2.5 text-gray-400"></i>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white">
                <option value="">All Categories</option>
                {activeTab === 'articles'
                  ? ['Training', 'Behavior', 'Nutrition', 'Health'].map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))
                  : ['Pet Care', 'Training', 'Nutrition', 'Emergency'].map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
              </select>
              <button
                onClick={() => setShowAddModal(true)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 cursor-pointer"
              >
                <i className="fas fa-plus mr-2"></i>Add {activeTab === 'articles' ? 'Article' : 'Session'}
              </button>
            </div>
          </div>
        </div>
        {/* Content Table */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Image
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Author
                  </th>
                  {activeTab === 'sessions' && (
                    <>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Duration
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Views
                      </th>
                    </>
                  )}
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {(activeTab === 'articles' ? articles : sessions).map(item => (
                  <tr key={item._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <img
                        src={item.image || item.thumbnail || 'https://via.placeholder.com/50'}
                        alt={item.title}
                        className="h-10 w-10 object-cover rounded"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      <button
                        onClick={() => setShowViewModal(item)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        {item.title}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.author}
                    </td>
                    {activeTab === 'sessions' && (
                      <>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.duration}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.views}
                        </td>
                      </>
                    )}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setShowViewModal(item)}
                          className="text-indigo-600 hover:text-indigo-900 cursor-pointer"
                          title="View Details"
                        >
                          <i className="fas fa-eye"></i>
                        </button>
                        <button
                          onClick={() => deleteItem(item._id, activeTab === 'articles' ? 'article' : 'session')}
                          className="text-red-600 hover:text-red-900 cursor-pointer"
                          title="Delete"
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to{' '}
              <span className="font-medium">{activeTab === 'articles' ? articles.length : sessions.length}</span> of{' '}
              <span className="font-medium">{activeTab === 'articles' ? articles.length : sessions.length}</span>{' '}
              {activeTab}
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
      </div>
      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Add {activeTab === 'articles' ? 'Article' : 'Session'}
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <form onSubmit={addItem} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={newItem.title}
                  onChange={e => setNewItem({ ...newItem, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter title"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={newItem.category}
                  onChange={e => setNewItem({ ...newItem, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                >
                  <option value="">Select category</option>
                  {activeTab === 'articles'
                    ? ['Training', 'Behavior', 'Nutrition', 'Health'].map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))
                    : ['Pet Care', 'Training', 'Nutrition', 'Emergency'].map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {activeTab === 'articles' ? 'Content' : 'Description'}
                </label>
                <textarea
                  value={activeTab === 'articles' ? newItem.content : newItem.description}
                  onChange={e =>
                    setNewItem({
                      ...newItem,
                      [activeTab === 'articles' ? 'content' : 'description']: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder={`Enter ${activeTab === 'articles' ? 'content' : 'description'}`}
                  rows="4"
                  required
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {activeTab === 'articles' ? 'Image URL' : 'Thumbnail URL'}
                </label>
                <input
                  type="url"
                  value={activeTab === 'articles' ? newItem.image : newItem.thumbnail}
                  onChange={e =>
                    setNewItem({
                      ...newItem,
                      [activeTab === 'articles' ? 'image' : 'thumbnail']: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder={`Enter ${activeTab === 'articles' ? 'image' : 'thumbnail'} URL`}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Redirect URL</label>
                <input
                  type="url"
                  value={newItem.redirectUrl}
                  onChange={e => setNewItem({ ...newItem, redirectUrl: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter redirect URL"
                  required
                />
              </div>
              {activeTab === 'sessions' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                  <input
                    type="text"
                    value={newItem.duration}
                    onChange={e => setNewItem({ ...newItem, duration: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter duration (e.g., 30 min)"
                    required
                  />
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
                <input
                  type="text"
                  value={newItem.author}
                  onChange={e => setNewItem({ ...newItem, author: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter author (optional)"
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
                  Add {activeTab === 'articles' ? 'Article' : 'Session'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* View Modal */}
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
              <img
                src={showViewModal.image || showViewModal.thumbnail || 'https://via.placeholder.com/300'}
                alt={showViewModal.title}
                className="w-full h-48 object-cover rounded-lg mb-3"
              />
              <p><strong>Category:</strong> {showViewModal.category}</p>
              <p><strong>Author:</strong> {showViewModal.author}</p>
              {activeTab === 'sessions' && (
                <>
                  <p><strong>Duration:</strong> {showViewModal.duration}</p>
                  <p><strong>Views:</strong> {showViewModal.views}</p>
                </>
              )}
              <p><strong>Created:</strong> {new Date(showViewModal.createdAt).toLocaleDateString()}</p>
              <p>
                <strong>{activeTab === 'articles' ? 'Content' : 'Description'}:</strong>{' '}
                {showViewModal.content || showViewModal.description}
              </p>
              <p>
                <strong>Redirect URL:</strong>{' '}
                <a href={showViewModal.redirectUrl} className="text-indigo-600 hover:text-indigo-900" target="_blank" rel="noopener noreferrer">
                  {showViewModal.redirectUrl}
                </a>
              </p>
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

export default ExpertLearning;