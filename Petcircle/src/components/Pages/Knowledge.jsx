import React from 'react';

const Knowledge = () => {
  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Knowledge Center</h2>
          <div className="flex space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search articles & videos..."
                className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-500 w-64"
              />
              <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            </div>
            <select className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-fuchsia-500">
              <option value="all">All Content</option>
              <option value="articles">Articles</option>
              <option value="videos">Videos</option>
            </select>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img src="https://public.readdy.ai/ai/img_res/2bf5d190eb3b8834573b1c5ae365c037.jpg" className="w-full h-48 object-cover" />
            <div className="p-6">
              <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">Health</span>
              <h3 className="text-xl font-bold mt-4 mb-2">Essential Pet Vaccination Guide</h3>
              <p className="text-gray-600 mb-4">Learn about the core vaccines your pets need and when they should get them.</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <img src="https://public.readdy.ai/ai/img_res/722cd1b87a422a480a292c9ccc8e63cd.jpg" className="w-8 h-8 rounded-full" />
                  <span className="text-sm text-gray-600">Dr. Emily Chen</span>
                </div>
                <span className="text-sm text-gray-500">10 min read</span>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img src="https://public.readdy.ai/ai/img_res/c1a0de3b9ddf89eb031421b31714e150.jpg" className="w-full h-48 object-cover" />
            <div className="p-6">
              <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">Training</span>
              <h3 className="text-xl font-bold mt-4 mb-2">Basic Obedience Training Tips</h3>
              <p className="text-gray-600 mb-4">Master the fundamentals of dog training with these expert-approved techniques.</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <img src="https://public.readdy.ai/ai/img_res/8160792b3e97968a717f4f5046f434dc.jpg" className="w-8 h-8 rounded-full" />
                  <span className="text-sm text-gray-600">Mark Johnson</span>
                </div>
                <span className="text-sm text-gray-500">15 min read</span>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img src="https://public.readdy.ai/ai/img_res/27e59b4f73f859ff89761f5d1ef2c73d.jpg" className="w-full h-48 object-cover" />
            <div className="p-6">
              <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm">Grooming</span>
              <h3 className="text-xl font-bold mt-4 mb-2">Professional Grooming Secrets</h3>
              <p className="text-gray-600 mb-4">Expert tips for keeping your pet's coat healthy and beautiful at home.</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <img src="https://public.readdy.ai/ai/img_res/b7daeab6559d011577c14b2b3ed157d3.jpg" className="w-8 h-8 rounded-full" />
                  <span className="text-sm text-gray-600">Sarah Williams</span>
                </div>
                <span className="text-sm text-gray-500">12 min read</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-6">Featured Video Sessions</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative">
                <img src="https://public.readdy.ai/ai/img_res/1c9b2bdccac18569cfda4cd32eedec1a.jpg" className="w-full h-48 object-cover" />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <i className="fas fa-play-circle text-4xl text-white hover:text-fuchsia-500 cursor-pointer"></i>
                </div>
                <span className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm">15:24</span>
              </div>
              <div className="p-6">
                <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">Pet Care</span>
                <h4 className="text-xl font-bold mt-4 mb-2">Pet Dental Care Guide</h4>
                <p className="text-gray-600 mb-4">Essential tips for maintaining your pet's dental hygiene.</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <img src="https://public.readdy.ai/ai/img_res/8614935a019b6ea19c40057d9696454c.jpg" className="w-8 h-8 rounded-full" />
                    <span className="text-sm text-gray-600">Dr. Sarah Chen</span>
                  </div>
                  <span className="text-sm text-gray-500">2.5K views</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative">
                <img src="https://public.readdy.ai/ai/img_res/1a0daf0df785ad69e28544a5bbef51cf.jpg" className="w-full h-48 object-cover" />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <i className="fas fa-play-circle text-4xl text-white hover:text-fuchsia-500 cursor-pointer"></i>
                </div>
                <span className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm">20:15</span>
              </div>
              <div className="p-6">
                <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">Training</span>
                <h4 className="text-xl font-bold mt-4 mb-2">Advanced Dog Training</h4>
                <p className="text-gray-600 mb-4">Professional techniques for advanced dog training and behavior.</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <img src="https://public.readdy.ai/ai/img_res/438a26d7a9632cd870760801ea563d71.jpg" className="w-8 h-8 rounded-full" />
                    <span className="text-sm text-gray-600">Mark Wilson</span>
                  </div>
                  <span className="text-sm text-gray-500">3.8K views</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative">
                <img src="https://public.readdy.ai/ai/img_res/479a5d2ac5c90b38c5d07a7af5c682ac.jpg" className="w-full h-48 object-cover" />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <i className="fas fa-play-circle text-4xl text-white hover:text-fuchsia-500 cursor-pointer"></i>
                </div>
                <span className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm">18:30</span>
              </div>
              <div className="p-6">
                <span className="bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full text-sm">Nutrition</span>
                <h4 className="text-xl font-bold mt-4 mb-2">Pet Diet Planning</h4>
                <p className="text-gray-600 mb-4">Creating balanced and healthy meal plans for your pets.</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <img src="https://public.readdy.ai/ai/img_res/b34293231a4319225bd5374b897284c7.jpg" className="w-8 h-8 rounded-full" />
                    <span className="text-sm text-gray-600">Dr. Emma Taylor</span>
                  </div>
                  <span className="text-sm text-gray-500">1.9K views</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-purple-600 rounded-lg p-8 text-white">
          <h3 className="text-2xl font-bold mb-4">Upcoming Live Q&A Sessions</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white bg-opacity-10 p-6 rounded-lg">
              <div className="flex items-center space-x-4 mb-4">
                <img src="https://public.readdy.ai/ai/img_res/237fa8a9d7be6ee620702a41ae7fc3c9.jpg" className="w-12 h-12 rounded-full" />
                <div>
                  <h4 className="font-bold">Dr. Michael Brown</h4>
                  <p className="text-sm opacity-80">Veterinary Nutrition Expert</p>
                </div>
              </div>
              <h5 className="text-lg font-semibold mb-2">Pet Nutrition Essentials</h5>
              <p className="opacity-80 mb-4">Get your questions answered about proper pet nutrition and dietary requirements.</p>
              <div className="flex items-center justify-between">
                <span><i className="far fa-calendar-alt mr-2"></i>Mar 15, 2025</span>
                <button className="!rounded-button bg-white text-purple-600 px-4 py-2 whitespace-nowrap">Register Now</button>
              </div>
            </div>
            <div className="bg-white bg-opacity-10 p-6 rounded-lg">
              <div className="flex items-center space-x-4 mb-4">
                <img src="https://public.readdy.ai/ai/img_res/6b8476939758173c69fdcafb8de14e94.jpg" className="w-12 h-12 rounded-full" />
                <div>
                  <h4 className="font-bold">Lisa Anderson</h4>
                  <p className="text-sm opacity-80">Professional Dog Trainer</p>
                </div>
              </div>
              <h5 className="text-lg font-semibold mb-2">Behavioral Training Tips</h5>
              <p className="opacity-80 mb-4">Learn how to address common behavioral issues in dogs and cats.</p>
              <div className="flex items-center justify-between">
                <span><i className="far fa-calendar-alt mr-2"></i>Mar 18, 2025</span>
                <button className="!rounded-button bg-white text-purple-600 px-4 py-2 whitespace-nowrap">Register Now</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Knowledge;