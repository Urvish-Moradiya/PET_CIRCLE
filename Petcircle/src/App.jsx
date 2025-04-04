import React, { useState, useEffect } from 'react'; // Added useEffect
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Communities from './components/Pages/Communities';
import Adoption from './components/Pages/Adoption';
import Knowledge from './components/Pages/Knowledge';
import Events from './components/Pages/Events';
import PetProfiles from './components/Pages/PetProfiles';
import Footer from './components/Pages/Footer';
import { MessageModal, AddPetModal } from './components/Pages/Modals';
import Home from './components/Pages/Home';
import axios from "axios";
import Profile from './components/Pages/Profile';
import LoginModal from './components/Pages/LoginModal';
import SignupModal from './components/Pages/SignupModal';

const App = () => {
  axios.defaults.baseURL = "http://localhost:5000";

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [messageInput, setMessageInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [petTypeFilter, setPetTypeFilter] = useState('all');
  const [showAddPetModal, setShowAddPetModal] = useState(false);
  const [pets, setPets] = useState(); // Consider initializing as empty array: []
  const [adoptionListings] = useState(); // Consider initializing as empty array: []
  const [user, setUser] = useState(null);
  const [newPetForm, setNewPetForm] = useState({
    name: '',
    type: '',
    breed: '',
    birthday: '',
    weight: '',
    allergies: '',
    favoriteFood: '',
    activities: '',
  });

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

  // Load user from localStorage on initial render
  useEffect(() => {
    const storedUser = localStorage.getItem('userData');
    const token = localStorage.getItem('authToken');
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#faf9f9] flex flex-col">
      <Navbar
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        user={user}
        setUser={setUser}
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/adoption"
          element={
            <Adoption
              adoptionListings={adoptionListings}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              petTypeFilter={petTypeFilter}
              setPetTypeFilter={setPetTypeFilter}
              setShowMessageModal={setShowMessageModal}
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
        <Route 
          path="/profile" 
          element={<Profile user={user} setUser={setUser} />} 
        />
        <Route 
          path="/login" 
          element={<LoginModal setUser={setUser} />} 
        />
        <Route 
          path="/signup" 
          element={<SignupModal />} 
        />
      </Routes>

      <Footer />

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
        setPets={setPets}
      />
    </div>
  );
};

export default App;