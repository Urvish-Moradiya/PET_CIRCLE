import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <i className="fas fa-paw text-3xl text-fuchsia-500 mr-2"></i>
              <span className="text-2xl font-bold">PetCircle</span>
            </div>
            <p className="text-gray-400">Connecting pet lovers worldwide since 2023.</p>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-fuchsia-500">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-fuchsia-500">Contact</a></li>
              <li><a href="#" className="text-gray-400 hover:text-fuchsia-500">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-fuchsia-500">Terms of Service</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4">Community</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-fuchsia-500">Forums</a></li>
              <li><a href="#" className="text-gray-400 hover:text-fuchsia-500">Events</a></li>
              <li><a href="#" className="text-gray-400 hover:text-fuchsia-500">Adoption Centers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-fuchsia-500">Support Groups</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4">Connect With Us</h4>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="text-gray-400 hover:text-fuchsia-500"><i className="fab fa-facebook-f text-xl"></i></a>
              <a href="#" className="text-gray-400 hover:text-fuchsia-500"><i className="fab fa-twitter text-xl"></i></a>
              <a href="#" className="text-gray-400 hover:text-fuchsia-500"><i className="fab fa-instagram text-xl"></i></a>
              <a href="#" className="text-gray-400 hover:text-fuchsia-500"><i className="fab fa-linkedin-in text-xl"></i></a>
            </div>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Subscribe to our newsletter"
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-500 text-white placeholder-gray-400"
              />
              <button className="!rounded-button bg-fuchsia-600 text-white w-full py-2 cursor-pointer hover:bg-fuchsia-700 whitespace-nowrap">
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 PetCircle. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;