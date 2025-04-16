import React, { useState, useEffect } from 'react';

const UserManagement = () => {
  const [showLoginPanel, setShowLoginPanel] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editUser, setEditUser] = useState(null);
  const [sortField, setSortField] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');

  // Mock token; replace with actual auth logic
  const token = localStorage.getItem('authToken') || 'your-token-here';

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/api/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const result = await response.json();
        // Mock response shape to match schema
        const mockUsers = result.data 
        setUsers(mockUsers);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Update user bio
  const updateBio = async (userId, bio) => {
    try {
      const response = await fetch('http://localhost:5000/api/update-bio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId, bio }),
      });
      if (!response.ok) {
        throw new Error('Failed to update bio');
      }
      const result = await response.json();
      setUsers(users.map(u => (u._id === userId ? { ...u, bio: result.data.bio } : u)));
      setEditUser(null);
    } catch (err) {
      alert('Error updating bio: ' + err.message);
    }
  };

  

  // Delete user (placeholder)
  const deleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      // Placeholder API call
      const response = await fetch(`http://localhost:5000/api/user/${userId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to delete user');
      }
      setUsers(users.filter(u => u._id !== userId));
    } catch (err) {
      alert('Error deleting user: ' + err.message);
    }
  };

  // Handle sorting
  const handleSort = (field) => {
    const newOrder = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortOrder(newOrder);
    setUsers([...users].sort((a, b) => {
      if (field === 'createdAt') {
        return newOrder === 'asc'
          ? new Date(a[field]) - new Date(b[field])
          : new Date(b[field]) - new Date(a[field]);
      }
      return newOrder === 'asc'
        ? a[field].localeCompare(b[field])
        : b[field].localeCompare(a[field]);
    }));
  };

  if (loading) return <div className="flex-1 flex items-center justify-center">Loading...</div>;
  if (error) return <div className="flex-1 flex items-center justify-center text-red-600">Error: {error}</div>;

  return (
    <div className="flex-1 overflow-auto">
      {/* Header */}
      <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <h2 className="text-xl font-semibold text-gray-800">User Management</h2>
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
            <h3 className="text-lg font-semibold text-gray-800 mb-4 md:mb-0">User Management</h3>
            <div className="flex flex-col space-y-3 md:flex-row md:space-y-0 md:space-x-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search users..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-full"
                />
                <i className="fas fa-search absolute left-3 top-2.5 text-gray-400"></i>
              </div>
              <div className="flex flex-col space-y-3 md:flex-row md:space-y-0 md:space-x-3">
                <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white">
                  <option value="">All Roles</option>
                  <option value="PetOwner">PetOwner</option>
                  <option value="PetExpert">PetExpert</option>
                </select>
              
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 cursor-pointer">
                  <i className="fas fa-download mr-2"></i>Export CSV
                </button>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('fullName')}>
                    User {sortField === 'fullName' && (sortOrder === 'asc' ? '↑' : '↓')}
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('role')}>
                    Role {sortField === 'role' && (sortOrder === 'asc' ? '↑' : '↓')}
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('email')}>
                    Email {sortField === 'email' && (sortOrder === 'asc' ? '↑' : '↓')}
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('createdAt')}>
                    Join Date {sortField === 'createdAt' && (sortOrder === 'asc' ? '↑' : '↓')}
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map(user => (
                  <tr key={user._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                          <i className="fas fa-user-circle text-indigo-600 text-4xl"></i>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{user.fullName}</div>
                          <div className="text-sm text-gray-500">{user.bio || 'No bio'}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.role === 'PetExpert' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
   
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          className="text-indigo-600 hover:text-indigo-900 cursor-pointer"
                          onClick={() => setEditUser(user)}
                        >
                          <i className="fas fa-edit"></i>
                        </button>
                        <button
                          className={`${user.status === 'Active' ? 'text-yellow-600 hover:text-yellow-900' : 'text-green-600 hover:text-green-900'} cursor-pointer`}
                          onClick={() => toggleStatus(user._id, user.status)}
                        >
                          <i className={`fas ${user.status === 'Active' ? 'fa-ban' : 'fa-check-circle'}`}></i>
                        </button>
                        <button
                          className="text-red-600 hover:text-red-900 cursor-pointer"
                          onClick={() => deleteUser(user._id)}
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
              Showing <span className="font-medium">1</span> to <span className="font-medium">{users.length}</span> of <span className="font-medium">{users.length}</span> users
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
      {/* Edit Modal */}
      {editUser && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Edit User</h3>
              <button
                onClick={() => setEditUser(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={editUser.fullName}
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={editUser.email}
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                <textarea
                  value={editUser.bio || ''}
                  onChange={(e) => setEditUser({ ...editUser, bio: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  rows="4"
                  placeholder="Enter user bio"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <select
                  value={editUser.role}
                  onChange={(e) => setEditUser({ ...editUser, role: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                >
                  <option value="PetOwner">PetOwner</option>
                  <option value="PetExpert">PetExpert</option>
                </select>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setEditUser(null)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={() => updateBio(editUser._id, editUser.bio)}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 cursor-pointer"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;