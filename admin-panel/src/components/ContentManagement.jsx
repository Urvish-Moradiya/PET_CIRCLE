import React, { useState } from 'react';

const ContentManagement = () => {
  const [showLoginPanel, setShowLoginPanel] = useState(false);

  const postsData = [
    { id: 1, title: 'Top 10 Pet Care Tips', author: 'Sarah Johnson', date: 'April 10, 2025', status: 'Published' },
    { id: 2, title: 'Dog Training Guide', author: 'Michael Chen', date: 'April 12, 2025', status: 'Pending' },
    { id: 3, title: 'Cat Nutrition Basics', author: 'Emily Rodriguez', date: 'April 14, 2025', status: 'Draft' },
  ];

  return (
    <div className="flex-1 overflow-auto">
      {/* Header */}
      <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <h2 className="text-xl font-semibold text-gray-800">Content Management</h2>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
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
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 md:mb-0">Manage Content</h3>
            <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search posts..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-full"
                />
                <i className="fas fa-search absolute left-3 top-2.5 text-gray-400"></i>
              </div>
              <div className="flex space-x-3">
                <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white">
                  <option value="">All Types</option>
                  <option value="article">Article</option>
                  <option value="post">Post</option>
                  <option value="video">Video</option>
                </select>
                <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white">
                  <option value="">All Status</option>
                  <option value="published">Published</option>
                  <option value="pending">Pending</option>
                  <option value="draft">Draft</option>
                </select>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 cursor-pointer">
                  <i className="fas fa-plus mr-2"></i>Add Content
                </button>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Author
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {postsData.map(post => (
                  <tr key={post.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {post.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {post.author}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {post.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        post.status === 'Published' ? 'bg-green-100 text-green-800' :
                        post.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {post.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button className="text-indigo-600 hover:text-indigo-900 cursor-pointer">
                          <i className="fas fa-eye"></i>
                        </button>
                        <button className="text-blue-600 hover:text-blue-900 cursor-pointer">
                          <i className="fas fa-edit"></i>
                        </button>
                        <button className="text-red-600 hover:text-red-900 cursor-pointer">
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
              Showing <span className="font-medium">1</span> to <span className="font-medium">3</span> of <span className="font-medium">50</span> posts
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer">
                Previous
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 cursor-pointer">
                1
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer">
                2
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer">
                3
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentManagement;