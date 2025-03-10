import { useState, useEffect } from 'react';
import { auth } from '../Utility/firebaseConfig';
import { getCurrentUser } from '../Utility/googleAuth';
import { getUserData } from '../Utility/firebaseConfig';
import blankProfilePic from '../assets/blank_profile.png';

export const useUserData = () => {
  const [username, setUsername] = useState('User');
  const [profilePic, setProfilePic] = useState(blankProfilePic);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const googleUser = await getCurrentUser();
        if (googleUser) {
          setUsername(googleUser.name);
          setProfilePic(googleUser.photoUrl || blankProfilePic);
          return;
        }

        const firebaseUser = auth.currentUser;
        if (firebaseUser) {
          const userData = await getUserData(firebaseUser.uid);
          if (userData?.username) {
            setUsername(userData.username);
            setProfilePic(firebaseUser.photoURL || blankProfilePic);
          }
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