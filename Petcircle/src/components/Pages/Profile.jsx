import React from 'react';
import profile from '../../assets/image/profile.jpg'
import background from '../../assets/image/background.jpg'
const Profile = () => {
  return (
    <div className="pt-20 px-4 max-w-7xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="h-50 relative">
          <img
            src={background}
            alt="Cover"
            className="w-full h-full object-cover"
          />
          <div className="absolute -bottom-16 left-8">
            <img
              src={profile}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
            />
          </div>
        </div>
        <div className="pt-20 px-8 pb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Urvish Moradiya 
              </h1>
              <p>Pet Owner</p>
              <p className="text-gray-600">jessica.anderson@email.com</p>
              <div className="mt-3 max-w-2xl">
                <p className="text-gray-700 leading-relaxed">
                  Passionate pet parent and animal welfare advocate with over 5
                  years of experience in pet care and training. I love sharing
                  my journey with my furry companions and helping other pet
                  owners provide the best care for their beloved animals.
                  Currently working on pet behavior research and promoting
                  responsible pet ownership.
                </p>
                <div className="flex items-center space-x-6 mt-4">
                  <div className="flex items-center space-x-2">
                    <i className="fas fa-map-marker-alt text-gray-500"></i>
                    <span className="text-gray-700">San Francisco, CA</span>
                  </div>
  
                </div>
              </div>
            </div>
            <button  
              className="rounded-button bg-purple-600 text-white px-6 py-2 hover:bg-purple-700 transition duration-300 whitespace-nowrap"
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-8 mt-8">
        <div className="col-span-4">
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">My Pets</h2>
              <div className="space-y-4">
                {[
                  {
                    name: "Luna",
                    type: "Golden Retriever",
                    age: "2 years",
                    image:
                      "https://public.readdy.ai/ai/img_res/baaf805e37d7c7b142202322d37c8236.jpg",
                  },
                  {
                    name: "Oliver",
                    type: "British Shorthair",
                    age: "3 years",
                    image:
                      "https://public.readdy.ai/ai/img_res/43045d2d044b0d78be81ca6fae84a4c5.jpg",
                  },
                ].map((pet, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <img
                      src={pet.image}
                      alt={pet.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold">{pet.name}</h3>
                      <p className="text-sm text-gray-600">{pet.type}</p>
                      <p className="text-sm text-gray-500">{pet.age}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">My Communities</h2>
              <div className="space-y-4">
                {[
                  {
                    name: "Dog Lovers United",
                    members: "15.2K",
                    role: "Member",
                  },
                  {
                    name: "Pet Photography",
                    members: "10.2K",
                    role: "Member",
                  },
                  {
                    name: "Pet Health & Wellness",
                    members: "14.5K",
                    role: "Member",
                  },
                ].map((community, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div>
                      <h3 className="font-semibold">{community.name}</h3>
                      <p className="text-sm text-gray-600">
                        {community.members} members
                      </p>
                    </div>
                    <span className="text-sm text-purple-600">
                      {community.role}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">My Posts</h2>
            <div className="space-y-6 max-h-[800px] overflow-y-auto pr-4">
              {[
                {
                  image:
                    "https://public.readdy.ai/ai/img_res/e6de6b2c9fc46b792ea6e7bb673cdc22.jpg",
                  content:
                    "Luna's first training session was a success! She's already mastered 'sit' and 'stay'. So proud of my little girl! 🐾 #PuppyTraining #GoldenRetriever",
                  likes: 156,
                  comments: 28,
                  time: "2 days ago",
                },
                {
                  image:
                    "https://public.readdy.ai/ai/img_res/f32055fc5fac5b55fd3c52bdc75f6bd6.jpg",
                  content:
                    "The moment we've been waiting for! Oliver and Luna finally becoming friends. It took time and patience, but seeing them play together makes it all worth it. ❤️ #PetFriendship",
                  likes: 234,
                  comments: 45,
                  time: "5 days ago",
                },
                {
                  image:
                    "https://public.readdy.ai/ai/img_res/f16e21024b99eb424c5ff1f9323b58e6.jpg",
                  content:
                    "Made some healthy homemade treats for the pets today! Recipe in the comments below 👇 #PetNutrition #HomemadePetTreats",
                  likes: 189,
                  comments: 56,
                  time: "1 week ago",
                },
              ].map((post, index) => (
                <div
                  key={index}
                  className="border-b pb-6 last:border-b-0 last:pb-0"
                >
                  <img
                    src={post.image}
                    alt="Post"
                    className="w-full h-64 object-cover rounded-lg mb-4"
                  />
                  <p className="text-gray-800 mb-3">{post.content}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                      <button className="flex items-center space-x-1 hover:text-purple-600">
                        <i className="fas fa-heart"></i>
                        <span>{post.likes}</span>
                      </button>
                      <button className="flex items-center space-x-1 hover:text-purple-600">
                        <i className="fas fa-comment"></i>
                        <span>{post.comments}</span>
                      </button>
                      <button className="hover:text-purple-600">
                        <i className="fas fa-share"></i>
                      </button>
                    </div>
                    <span>{post.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;