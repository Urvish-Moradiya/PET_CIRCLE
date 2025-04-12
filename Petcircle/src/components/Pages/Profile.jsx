import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import PetOwnerProfile from './PetOwnerProfile';
import PetExpertProfile from './PetExpertProfile';

const Profile = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  if (authLoading) {
    return <div className="flex justify-center items-center h-screen text-gray-600">Loading...</div>;
  }

  if (!user) {
    navigate('/login');
    return null;
  }

  // Render based on role
  const role = user.role?.toLowerCase();
  return role === 'petexpert' ? <PetExpertProfile /> : <PetOwnerProfile />;
};

export default Profile;