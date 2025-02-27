// App.jsx
import React, { useState } from 'react';
import "tailwindcss"
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import Home from './components/Pages/Home';
import Login from './components/Login';
import MyPets  from './components/Pages/MyPets';
import  Communities  from './components/Pages/Communities';
import  Adoption  from './components/Pages/Adoption';
import  Events  from './components/Pages/Events';
import  Messages  from './components/Pages/Messages';
import  Settings  from './components/Pages/Settings';
import Registration from './components/Registration';

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (email, password) => {
    if (email === 'admin@example.com' && password === '112233') {
      setUser({ email, role: 'admin' });
      return true;
    } else {
      return false;
    }
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
      <Routes>
        {/* Routes without sidebar */}
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Registration />} />

        {/* Routes with sidebar */}
        <Route
          path="/*"
          element={
            <MainLayout user={user} onLogout={handleLogout}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/my-pet" element={<MyPets />} />
                <Route path="/communities" element={<Communities />} />
                <Route path="/adoption" element={<Adoption />} />
                <Route path="/events" element={<Events />} />
                <Route path="/messages" element={<Messages />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </MainLayout>
          }
        />
      </Routes>
  );
}

export default App;
