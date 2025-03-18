import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Communities from './components/Pages/Communities';
import Adoption from './components/Pages/Adoption';
import Messages from './components/Pages/Messages';
import Knowledge from './components/Pages/Knowledge';
import Events from './components/Pages/Events';
import PetProfiles from './components/Pages/PetProfiles';
import Footer from './components/Pages/Footer';
import LoginModal from './components/Pages/LoginModal';
import SignupModal from './components/Pages/SignupModal';
import { MessageModal, AddPetModal } from './components/Pages/Modals';
import Home from './components/Pages/Home';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messageInput, setMessageInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [petTypeFilter, setPetTypeFilter] = useState('all');
  const [showAddPetModal, setShowAddPetModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('pet-owner');
  const [newPetForm, setNewPetForm] = useState({
    name: '',
    type: 'Dog',
    breed: '',
    birthday: '',
    weight: '',
    allergies: '',
    favoriteFood: '',
    activities: '',
  });

  
  const [pets, setPets] = useState([
    {
      id: 1,
      name: 'Charlie',
      type: 'Dog',
      breed: 'Golden Retriever',
      age: 3,
      weight: '32 kg',
      birthday: '2022-03-15',
      medicalHistory: [
        { date: '2024-12-10', type: 'Vaccination', description: 'Annual rabies vaccination' },
        { date: '2024-09-05', type: 'Check-up', description: 'Regular health check-up - all clear' },
      ],
      activities: ['Swimming', 'Fetch', 'Agility Training'],
      favoriteFood: 'Organic chicken and rice',
      allergies: 'None',
      profileImage: 'https://public.readdy.ai/ai/img_res/5223d2974737aa66d924cd5e19e5fa04.jpg',
      gallery: [
        'https://public.readdy.ai/ai/img_res/5d60704529e36dfd46d47dc9d0409b4b.jpg',
        'https://public.readdy.ai/ai/img_res/3a4a42bc1e099af2142f1b218fdebbf5.jpg',
        'https://public.readdy.ai/ai/img_res/0f09d77558ce9ea5bcb4875feb145a0e.jpg',
      ],
      milestones: [
        { date: '2025-02-15', title: 'Won Agility Competition', description: 'First place in local dog agility championship' },
        { date: '2024-12-25', title: 'Completed Advanced Training', description: 'Graduated from advanced obedience training program' },
      ],
    },
    {
      id: 2,
      name: 'Luna',
      type: 'Cat',
      breed: 'Maine Coon',
      age: 2,
      weight: '6.5 kg',
      birthday: '2023-05-20',
      medicalHistory: [
        { date: '2025-01-15', type: 'Dental Cleaning', description: 'Regular dental check-up and cleaning' },
        { date: '2024-11-20', type: 'Vaccination', description: 'Annual vaccination update' },
      ],
      activities: ['Climbing', 'Bird Watching', 'Interactive Toys'],
      favoriteFood: 'Premium salmon wet food',
      allergies: 'Dairy products',
      profileImage: 'https://public.readdy.ai/ai/img_res/a7e03dacecbf314a8e3939ef70932396.jpg',
      gallery: [
        'https://public.readdy.ai/ai/img_res/8d2eef75cb8e48e0ea3b07ebbf590a2f.jpg',
        'https://public.readdy.ai/ai/img_res/7028bb61dc608911dd6ac6de07ab9255.jpg',
        'https://public.readdy.ai/ai/img_res/1c5be80d5f29b8d9c2e9ac8b61070678.jpg',
      ],
      milestones: [
        { date: '2025-01-10', title: 'Best in Show', description: 'Won Best in Show at local cat exhibition' },
        { date: '2024-12-01', title: 'New Trick Mastered', description: 'Learned to give high-five on command' },
      ],
    },
  ]);
  const [adoptionListings] = useState([
    {
      id: 1,
      petName: 'Luna',
      petType: 'Dog',
      breed: 'Golden Retriever',
      age: 2,
      location: 'San Francisco, CA',
      description: 'Luna is a friendly and energetic Golden Retriever looking for a loving home. She\'s great with children and other pets.',
      image: 'https://public.readdy.ai/ai/img_res/b63a3912967e63e31e15a01ad6840965.jpg',
      ownerId: 1,
    },
    {
      id: 2,
      petName: 'Oliver',
      petType: 'Cat',
      breed: 'British Shorthair',
      age: 1,
      location: 'New York, NY',
      description: 'Oliver is a calm and affectionate British Shorthair. He loves cuddles and would make a perfect companion.',
      image: 'https://public.readdy.ai/ai/img_res/36bb45e59d335dca1db74d37060f6dd4.jpg',
      ownerId: 2,
    },
  ]);
  const [messages] = useState([
    {
      id: 1,
      senderId: 1,
      receiverId: 2,
      content: "Hi, I'm interested in adopting Luna. Is she still available?",
      timestamp: new Date('2025-03-12T10:30:00'),
    },
    {
      id: 2,
      senderId: 2,
      receiverId: 1,
      content: 'Yes, Luna is still available! Would you like to schedule a meet and greet?',
      timestamp: new Date('2025-03-12T10:35:00'),
    },
  ]);

  const handleLike = (postId) => {
    setLikedPosts((prev) => {
      const newLiked = new Set(prev);
      if (newLiked.has(postId)) newLiked.delete(postId);
      else newLiked.add(postId);
      return newLiked;
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        setShowLoginModal={setShowLoginModal}
      />
      <button onClick={() => setShowLoginModal(true)}>Open Login</button>
      <button onClick={() => setShowSignupModal(true)}>Open Signup</button>
      <Routes>
        <Route path="/" element={<Home/> }/>
        <Route
          path="/adoption"
          element={
            <Adoption
              adoptionListings={adoptionListings}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              petTypeFilter={petTypeFilter}
              setPetTypeFilter={setPetTypeFilter}
              setSelectedChat={setSelectedChat}
              setShowMessageModal={setShowMessageModal}
            />
          }
        />
        <Route
          path="/messages"
          element={
            <Messages
              messages={messages}
              selectedChat={selectedChat}
              setSelectedChat={setSelectedChat}
              messageInput={messageInput}
              setMessageInput={setMessageInput}
            />
          }
        />
        <Route path="/communities" element={<Communities />} />
        <Route path="/knowledge" element={<Knowledge />} />
        <Route path="/events" element={<Events />} />
        <Route
          path="/pets"
          element={
            <PetProfiles
              pets={pets}
              setPets={setPets}
              setShowAddPetModal={setShowAddPetModal}
            />
          }
        />
      </Routes>
      <Footer />
      <LoginModal
        showLoginModal={showLoginModal}
        setShowLoginModal={setShowLoginModal}
        loginEmail={loginEmail}
        setLoginEmail={setLoginEmail}
        loginPassword={loginPassword}
        setLoginPassword={setLoginPassword}
        setShowSignupModal={setShowSignupModal}
      />
      <SignupModal
        showSignupModal={showSignupModal}
        setShowSignupModal={setShowSignupModal}
        selectedRole={selectedRole}
        setSelectedRole={setSelectedRole}
        setShowLoginModal={setShowLoginModal}
      />
      <MessageModal
        showMessageModal={showMessageModal}
        setShowMessageModal={setShowMessageModal}
        messageInput={messageInput}
        setMessageInput={setMessageInput}
      />
      <AddPetModal
        showAddPetModal={showAddPetModal}
        setShowAddPetModal={setShowAddPetModal}
        newPetForm={newPetForm}
        setNewPetForm={setNewPetForm}
        pets={pets}
        setPets={setPets}
      />
    </div>
  );
};

export default App;