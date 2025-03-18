import React from 'react';

const Communities = () => {
  const communities = [
    { name: 'Dog Lovers United', image: 'https://public.readdy.ai/ai/img_res/8c8506197ee4503a959b264ee6ae5fc4.jpg', members: 15234 },
    { name: 'Cat Paradise', image: 'https://public.readdy.ai/ai/img_res/cbbd745aa1e2a55d8166b1b7bed10f59.jpg', members: 12876 },
    { name: 'Exotic Pets Club', image: 'https://public.readdy.ai/ai/img_res/ce455c79cf73b487c46ad74d0bf3f901.jpg', members: 8432 }
  ];

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-16">Popular Communities</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {communities.map((community, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer">
              <div className="h-48 overflow-hidden">
                <img src={community.image} alt={community.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{community.name}</h3>
                <p className="text-gray-600 mb-4">{community.members.toLocaleString()} members</p>
                <button className="!rounded-button bg-fuchsia-600 text-white px-6 py-2 w-full cursor-pointer hover:bg-fuchsia-700 whitespace-nowrap">
                  Join Community
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Communities;