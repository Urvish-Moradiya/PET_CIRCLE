import React from 'react';
import icon from '../../assets/image/final2.png';

const Footer = () => {
  const quickLinks = [
    { href: '/', label: 'Home' },
    { href: '/adoption', label: 'Adoption' },
    { href: '/communities', label: 'Communities' },
    { href: '/knowledge', label: 'Knowledge' },
    { href: '/events', label: 'Events' },
    { href: '/pets', label: 'Pet Profiles' },
  ];

  const communities = [
    'Dog Lovers United',
    'Cat Paradise',
    'Exotic Pet Owners',
    'Pet Photography',
    'Small Pets Squad',
    'Pet Health & Wellness',
  ];

  const socialLinks = [
    { icon: 'fab fa-facebook-f', href: '#' },
    { icon: 'fab fa-twitter', href: '#' },
    { icon: 'fab fa-instagram', href: '#' },
    { icon: 'fab fa-linkedin-in', href: '#' },
  ];

  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img 
                src={icon} 
                alt="PetCircle Logo" 
                className="h-14 w-auto mr-2"  // Increased from h-8 to h-16
                loading="lazy"
              />
              <span className="text-3xl font-bold">PetCircle</span>
            </div>
            <p className="text-gray-400 text-sm">
              Connecting pet lovers worldwide since 2023.
            </p>
          </div>

          {/* Quick Links */}
          <nav className="space-y-4">
            <h4 className="text-lg font-bold">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-fuchsia-500 transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Communities */}
          <nav className="space-y-4">
            <h4 className="text-lg font-bold"><a href="/communities" >Communities</a></h4>
            <ul className="space-y-2">
              {communities.map((community) => (
                <li key={community}>
                  <a
                    href="#"  // Changed from # to /communities
                    className="text-gray-400 hover:text-fuchsia-500 transition-colors duration-200"
                  >
                    {community}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Connect Section */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold">Connect With Us</h4>
            <div className="flex gap-4 mb-6">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="text-gray-400 hover:text-fuchsia-500 transition-colors duration-200"
                  aria-label={`Follow us on ${social.icon.split('-')[2]}`}
                >
                  <i className={`${social.icon} text-xl`}></i>
                </a>
              ))}
            </div>
            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Subscribe to our newsletter"
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg 
                  focus:outline-none focus:ring-2 focus:ring-fuchsia-500 
                  text-white placeholder-gray-400 transition-all duration-200"
                aria-label="Email for newsletter subscription"
                required
              />
              <button
                type="submit"
                className="w-full py-2 bg-fuchsia-600 text-white rounded-lg 
                  hover:bg-fuchsia-700 focus:outline-none focus:ring-2 
                  focus:ring-fuchsia-500 focus:ring-offset-2 
                  focus:ring-offset-gray-800 transition-all duration-200"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} PetCircle. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;