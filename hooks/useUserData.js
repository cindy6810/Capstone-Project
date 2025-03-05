import { useState, useEffect } from 'react';
import { auth } from '../Utility/firebaseConfig';
import blankProfilePic from '../assets/blank_profile.png';
import { authService } from '../services/authService';

export const useUserData = () => {
  const [username, setUsername] = useState('User');
  const [profilePic, setProfilePic] = useState(blankProfilePic);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Check if user is logged in with Firebase
        const firebaseUser = auth.currentUser;
        
        if (!firebaseUser) {
          // No user logged in
          setIsLoading(false);
          return;
        }
        
        // Get user data from backend API
        const userData = await authService.getCurrentUserProfile();
        
        if (userData && !userData.error) {
          setUsername(userData.username || 'User');
          setProfilePic(userData.profile_pic_url || blankProfilePic);
        }
      } catch (error) {
        setError(error);
        console.error('Error fetching user data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return { username, profilePic, isLoading, error };
};