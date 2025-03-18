import React from 'react';

const LoginModal = ({
  showLoginModal,
  setShowLoginModal,
  loginEmail,
  setLoginEmail,
  loginPassword,
  setLoginPassword,
  setShowSignupModal,
}) => {
  if (!showLoginModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Login to PetCircle</h2>
          <button
            onClick={() => setShowLoginModal(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <i className="fas fa-times text-xl"></i>
          </button>
        </div>
        <form className="space-y-6">
          <div>
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
              placeholder="Enter your password"
            />
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span className="text-sm text-gray-600">Remember me</span>
            </label>
            <a href="#" className="text-sm text-fuchsia-600 hover:underline">
              Forgot password?
            </a>
          </div>
          <button
            type="submit"
            className="!rounded-button bg-fuchsia-600 text-white w-full py-3 cursor-pointer hover:bg-fuchsia-700 whitespace-nowrap"
          >
            Login
          </button>
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <button className="!rounded-button flex items-center justify-center py-2 px-4 border border-gray-300 hover:bg-gray-50 whitespace-nowrap">
              <i className="fab fa-google text-red-500"></i>
            </button>
            <button className="!rounded-button flex items-center justify-center py-2 px-4 border border-gray-300 hover:bg-gray-50 whitespace-nowrap">
              <i className="fab fa-facebook text-fuchsia-600"></i>
            </button>
            <button className="!rounded-button flex items-center justify-center py-2 px-4 border border-gray-300 hover:bg-gray-50 whitespace-nowrap">
              <i className="fab fa-apple"></i>
            </button>
          </div>
        </form>
        <p className="text-center mt-4 text-gray-600">
          Don't have an account?{' '}
          <button
            onClick={() => {
              setShowLoginModal(false);
              setShowSignupModal(true);
            }}
            className="text-fuchsia-600 hover:underline"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginModal;