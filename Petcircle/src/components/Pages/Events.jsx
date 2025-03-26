import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Events = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [rsvpEvents, setRsvpEvents] = useState([]);

  const locations = ['All Locations', 'New York', 'Los Angeles', 'Chicago', 'Miami', 'Seattle'];
  const eventTypes = ['All Events', 'Pet Playdates', 'Adoption Events', 'Training Workshops', 'Pet Health Clinics'];
  const sortOptions = [
    { label: 'Date', value: 'date' },
    { label: 'Attendees', value: 'attendees' },
    { label: 'Title', value: 'title' },
  ];

  const events = [
    {
      id: 1,
      title: 'Spring Pet Playdate Festival',
      type: 'Pet Playdates',
      date: '2025-04-15',
      time: '10:00 AM - 2:00 PM',
      location: 'Central Park, New York',
      description: 'Join us for a fun-filled day of pet playdates, games, and socializing. Perfect for dogs and their owners!',
      image: 'https://public.readdy.ai/ai/img_res/184f8e8dd091bff847cc2f224eed4a9f.jpg',
      attendees: 45,
    },
    {
      id: 2,
      title: 'Pet Training Masterclass',
      type: 'Training Workshops',
      date: '2025-04-20',
      time: '2:00 PM - 5:00 PM',
      location: 'Pet Academy, Los Angeles',
      description: 'Learn advanced training techniques from certified professional trainers. Limited spots available!',
      image: 'https://public.readdy.ai/ai/img_res/230a8dfd8946b185942e61c94a887516.jpg',
      attendees: 28,
    },
    {
      id: 3,
      title: 'Adoption Day: Find Your Forever Friend',
      type: 'Adoption Events',
      date: '2025-04-25',
      time: '11:00 AM - 4:00 PM',
      location: 'City Shelter, Chicago',
      description: 'Meet adorable pets looking for their forever homes. Adoption counselors available on-site at live event.',
      image: 'https://public.readdy.ai/ai/img_res/35d687561fef4506901a860c1ee2b76b.jpg',
      attendees: 120,
    },
    {
      id: 4,
      title: 'Pet Health & Wellness Fair',
      type: 'Pet Health Clinics',
      date: '2025-05-01',
      time: '9:00 AM - 3:00 PM',
      location: 'Veterinary Center, Miami',
      description: 'Free health screenings, nutrition consultations, and wellness workshops for all pets also surprise gifts.',
      image: 'https://public.readdy.ai/ai/img_res/97c60caac5137e48c695ee5f101b457d.jpg',
      attendees: 85,
    },
    {
      id: 5,
      title: 'Puppy Socialization Meet-up',
      type: 'Pet Playdates',
      date: '2025-05-05',
      time: '3:00 PM - 5:00 PM',
      location: 'Dog Park, Seattle',
      description: 'Special meetup for puppies to learn social skills and make new friends in a safe environment also playfull area.',
      image: 'https://public.readdy.ai/ai/img_res/1678d87079b9e0289b28482d7bd8d7df.jpg',
      attendees: 32,
    },
    {
      id: 6,
      title: 'Advanced Pet First Aid Workshop',
      type: 'Training Workshops',
      date: '2025-05-10',
      time: '1:00 PM - 5:00 PM',
      location: 'Community Center, Seattle',
      description: 'Learn essential first aid skills for pets from experienced veterinarians. Hands-on practice with pet mannequins.',
      image: 'https://public.readdy.ai/ai/img_res/26086124676a4c4e5a10db3bee2ce8ba.jpg',
      attendees: 40,
    },
  ];

  const handleRSVP = (eventId) => {
    setRsvpEvents((prev) =>
      prev.includes(eventId.toString())
        ? prev.filter((id) => id !== eventId.toString())
        : [...prev, eventId.toString()]
    );
  };

  // Filter and sort events for "All Events"
  const filteredEvents = events
    .filter((event) => {
      const matchesType = selectedFilter === 'all' || event.type === selectedFilter;
      const matchesLocation = selectedLocation === 'all' || event.location.includes(selectedLocation);
      return matchesType && matchesLocation;
    })
    .sort((a, b) => {
      if (sortBy === 'date') return new Date(a.date) - new Date(b.date);
      if (sortBy === 'attendees') return b.attendees - a.attendees;
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      return 0;
    });

  // Get upcoming events (next 3 by date)
  const upcomingEvents = events
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 3);

  const Dropdown = ({ label, items, selected, onSelect, icon }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-lg bg-white px-4 py-2 text-gray-700 border border-gray-300 flex items-center space-x-2 hover:bg-gray-50"
        >
          <i className={`fas ${icon}`} />
          <span>{selected === 'all' ? label : selected}</span>
          <i className="fas fa-chevron-down" />
        </button>
        {isOpen && (
          <div className="absolute top-full mt-2 w-48 bg-white rounded-lg shadow-lg z-10">
            {items.map((item) => (
              <button
                key={typeof item === 'string' ? item : item.value}
                onClick={() => {
                  onSelect(typeof item === 'string' ? (item === `All ${label}s` ? 'all' : item) : item.value);
                  setIsOpen(false);
                }}
                className="block w-full text-left px-4 py-2 hover:bg-purple-50"
              >
                {typeof item === 'string' ? item : item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  const EventCard = ({ event, onRSVP, isAttending, isCompact = false }) => (
    <div className={`bg-white rounded-xl shadow-sm overflow-hidden ${isCompact ? 'h-[450px]' : ''}`}>
      <div className="h-48 overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
          onError={(e) => (e.currentTarget.src = '/fallback-image.jpg')} // Add fallback image in public folder
        />
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">{event.type}</span>
          <span className="text-gray-500 text-sm">
            <i className="fas fa-users mr-2" />
            {event.attendees} attending
          </span>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-1">{event.title}</h3>
        <p className={`text-gray-600 mb-4 ${isCompact ? 'line-clamp-2' : ''}`}>{event.description}</p>
        {!isCompact && (
          <div className="space-y-2 text-gray-500">
            <div className="flex items-center">
              <i className="fas fa-calendar-alt w-6" />
              <span>{new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
            <div className="flex items-center">
              <i className="fas fa-clock w-6" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center">
              <i className="fas fa-map-marker-alt w-6" />
              <span>{event.location}</span>
            </div>
          </div>
        )}
        <button
          onClick={() => onRSVP(event.id)}
          className={`mt-6 w-full rounded-lg py-2 px-4 font-medium text-white transition-colors ${
            isAttending ? 'bg-green-600 hover:bg-green-700' : 'bg-purple-600 hover:bg-purple-700'
          }`}
        >
          <span className="flex items-center justify-center">
            <i className={`fas ${isAttending ? 'fa-check' : 'fa-calendar-plus'} mr-2`} />
            {isAttending ? 'Attending' : 'Register Now'}
          </span>
        </button>
      </div>
    </div>
  );

  // Slick settings for the auto-sliding carousel
  const slickSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000, // Slide every 3 seconds
    arrows: false, // Hide arrows for a cleaner look
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <style>
        {`
          .slick-dots li button:before {
            font-size: 10px;
            color: #9333ea;
            opacity: 0.3;
          }
          .slick-dots li.slick-active button:before {
            opacity: 1;
          }
          .slick-slide > div {
            margin: 0 15px; /* Adds spacing between slides */
          }
          .slick-list {
            margin: 0 -15px; /* Compensates for slide margins */
          }
        `}
      </style>

      {/* Hero Section */}
      <div className="relative h-[500px] overflow-hidden">
        <img
          src="https://public.readdy.ai/ai/img_res/5e3c92b70f0936ad8c184c4416f5ec91.jpg"
          alt="Pet Events Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 to-transparent">
          <div className="max-w-7xl mx-auto px-4 h-full flex items-center">
            <div className="max-w-2xl">
              <h1 className="text-5xl font-bold text-white mb-6">Join Fun Pet Events & Meetups!</h1>
              <p className="text-xl text-white/90 mb-8">
                Connect with fellow pet lovers, learn from experts, and create unforgettable memories.
              </p>
              <button className="rounded-lg bg-white text-purple-900 px-8 py-3 text-lg font-semibold hover:bg-purple-50 transition-colors">
                Discover Events
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Filters and Sort */}
        <div className="flex flex-wrap gap-4 mb-8 items-center">
          <Dropdown
            label="Event Type"
            items={eventTypes}
            selected={selectedFilter}
            onSelect={setSelectedFilter}
            icon="fa-filter"
          />
          <Dropdown
            label="Location"
            items={locations}
            selected={selectedLocation}
            onSelect={setSelectedLocation}
            icon="fa-map-marker-alt"
          />
          <Dropdown
            label="Sort By"
            items={sortOptions}
            selected={sortBy}
            onSelect={setSortBy}
            icon="fa-sort"
          />
        </div>


        {/* All Events Section */}
        <h2 className="text-3xl font-bold text-gray-900 mb-10">All Events</h2>
        {filteredEvents.length === 0 ? (
          <p className="text-gray-600 text-center">No events match your filters.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onRSVP={handleRSVP}
                isAttending={rsvpEvents.includes(event.id.toString())}
                isCompact={false} // Full version for grid
              />
            ))}
          </div>
        )}

                {/* Upcoming Events Section with Slick Auto-Slide */}
          <div className='mt-8'>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Upcoming Events</h2>
          <Slider {...slickSettings}>
            {upcomingEvents.map((event) => (
              <div key={event.id}>
                <EventCard
                  event={event}
                  onRSVP={handleRSVP}
                  isAttending={rsvpEvents.includes(event.id.toString())}
                  isCompact={true} // Compact version for carousel
                />
              </div>
            ))}
          </Slider>
        </div>

      </main>
    </div>
  );
};

export default Events;