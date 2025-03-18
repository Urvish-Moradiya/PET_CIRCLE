import React from 'react';

const Events = () => {
  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Pet Events & Meetups</h2>
          <button className="!rounded-button bg-purple-600 text-white px-6 py-2 cursor-pointer hover:bg-purple-700 whitespace-nowrap">
            <i className="fas fa-plus mr-2"></i>Create Event
          </button>
        </div>
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img src="https://public.readdy.ai/ai/img_res/3b002ace7d01fdefaf1026add1a443ea.jpg" className="w-full h-64 object-cover" />
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full">Adoption Drive</span>
                <span className="text-gray-600"><i className="far fa-calendar-alt mr-2"></i>Mar 20, 2025</span>
              </div>
              <h3 className="text-2xl font-bold mb-2">Spring Adoption Festival</h3>
              <p className="text-gray-600 mb-4">Join us for a day of meeting adorable pets looking for their forever homes. Free health checkups available.</p>
              <div className="flex items-center space-x-4 mb-6">
                <div><i className="fas fa-map-marker-alt text-red-500 mr-2"></i><span>Central Park, New York</span></div>
                <div><i className="fas fa-clock text-purple-600 mr-2"></i><span>10:00 AM - 4:00 PM</span></div>
              </div>
              <button className="!rounded-button bg-fuchsia-600 text-white w-full py-2 cursor-pointer hover:bg-fuchsia-700 whitespace-nowrap">RSVP Now</button>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img src="https://public.readdy.ai/ai/img_res/c2dfe6d8c9cc005b438b8a8ed4ba7f9d.jpg" className="w-full h-64 object-cover" />
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="bg-fuchsia-100 text-fuchsia-600 px-3 py-1 rounded-full">Workshop</span>
                <span className="text-gray-600"><i className="far fa-calendar-alt mr-2"></i>Mar 25, 2025</span>
              </div>
              <h3 className="text-2xl font-bold mb-2">Pet Training Workshop</h3>
              <p className="text-gray-600 mb-4">Learn essential training techniques from professional trainers. Perfect for new pet parents.</p>
              <div className="flex items-center space-x-4 mb-6">
                <div><i className="fas fa-map-marker-alt text-red-500 mr-2"></i><span>PetCircle Training Center</span></div>
                <div><i className="fas fa-clock text-purple-600 mr-2"></i><span>2:00 PM - 5:00 PM</span></div>
              </div>
              <button className="!rounded-button bg-fuchsia-600 text-white w-full py-2 cursor-pointer hover:bg-fuchsia-700 whitespace-nowrap">Register Now</button>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold mb-6">Upcoming Events Calendar</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg cursor-pointer">
              <div className="flex items-center space-x-4">
                <div className="text-center w-16">
                  <div className="text-2xl font-bold text-purple-600">15</div>
                  <div className="text-gray-500">Mar</div>
                </div>
                <div>
                  <h4 className="font-semibold">Pet First Aid Course</h4>
                  <p className="text-gray-600">Learn essential first aid for pets</p>
                </div>
              </div>
              <button className="!rounded-button bg-fuchsia-600 text-white px-4 py-2 whitespace-nowrap">RSVP</button>
            </div>
            <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg cursor-pointer">
              <div className="flex items-center space-x-4">
                <div className="text-center w-16">
                  <div className="text-2xl font-bold text-fuchsia-600">18</div>
                  <div className="text-gray-500">Mar</div>
                </div>
                <div>
                  <h4 className="font-semibold">Dog Park Meetup</h4>
                  <p className="text-gray-600">Social gathering for dogs and owners</p>
                </div>
              </div>
              <button className="!rounded-button bg-fuchsia-600 text-white px-4 py-2 whitespace-nowrap">RSVP</button>
            </div>
            <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg cursor-pointer">
              <div className="flex items-center space-x-4">
                <div className="text-center w-16">
                  <div className="text-2xl font-bold text-fuchsia-600">22</div>
                  <div className="text-gray-500">Mar</div>
                </div>
                <div>
                  <h4 className="font-semibold">Pet Nutrition Seminar</h4>
                  <p className="text-gray-600">Expert talks on pet dietary needs</p>
                </div>
              </div>
              <button className="!rounded-button bg-fuchsia-600 text-white px-4 py-2 whitespace-nowrap">RSVP</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;