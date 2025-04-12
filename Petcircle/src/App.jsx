import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/AuthContext';
import Navbar from './components/Navbar';
import Communities from './components/Pages/Communities';
import Adoption from './components/Pages/Adoption';
import Knowledge from './components/Pages/Knowledge';
import Events from './components/Pages/Events';
import PetProfiles from './components/Pages/PetProfiles';
import Footer from './components/Pages/Footer';
import { MessageModal, AddPetModal } from './components/Pages/Modals';
import Home from './components/Pages/Home';
import axios from 'axios';
import Profile from './components/Pages/Profile';
import LoginModal from './components/Pages/LoginModal';
import SignupModal from './components/Pages/SignupModal';
import Knowledge2 from './components/Pages/Knowledge2';

const App = () => {
  axios.defaults.baseURL = 'http://localhost:5000';

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [messageInput, setMessageInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [petTypeFilter, setPetTypeFilter] = useState('all');
  const [showAddPetModal, setShowAddPetModal] = useState(false);
  const [adoptionListings] = useState([]);
  const [pets, setPets] = useState([]);

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

  return (
    <AuthProvider>
        <div className="min-h-screen bg-[#faf9f9] flex flex-col">
          <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
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
            <Route path="/knowledge2" element={<Knowledge2 />} />
            <Route path="/events" element={<Events />} />
            <Route path="/pets" element={<PetProfiles pets={pets} setPets={setPets} />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<LoginModal />} />
            <Route path="/signup" element={<SignupModal />} />
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
    </AuthProvider>
  );
};

export default App;