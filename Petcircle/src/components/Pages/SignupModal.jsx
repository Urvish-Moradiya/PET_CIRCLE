import React from 'react';

const SignupModal = ({
  showSignupModal,
  setShowSignupModal,
  selectedRole,
  setSelectedRole,
  setShowLoginModal,
}) => {
  if (!showSignupModal) return null;

  const roles = ['pet-owner', 'pet-expert'];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Join PetCircle</h2>
          <button
            onClick={() => setShowSignupModal(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <i className="fas fa-times text-xl"></i>
          </button>
        </div>
        <form className="space-y-6">
          <div>
            <label className="block text-gray-700 mb-2">I am a:</label>
            <div className="flex justify-center gap-4">
              {roles.map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => setSelectedRole(role)}
                  className={`!rounded-button px-6 py-2 whitespace-nowrap cursor-pointer ${
                    selectedRole === role
                      ? 'bg-fuchsia-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {role === 'pet-owner' ? 'Pet Owner' : 'Pet Expert'}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
              placeholder="Enter your full name"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
              placeholder="Create a password"
            />
          </div>
          <button
            type="submit"
            className="!rounded-button bg-fuchsia-600 text-white w-full py-3 cursor-pointer hover:bg-fuchsia-700 whitespace-nowrap"
          >
            Sign Up
          </button>
        </form>
        <p className="text-center mt-4 text-gray-600">
          Already have an account?{' '}
          <button
            onClick={() => {
              setShowSignupModal(false);
              setShowLoginModal(true);
            }}
            className="text-fuchsia-600 hover:underline"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignupModal;