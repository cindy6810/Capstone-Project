import React, { useState, useEffect } from 'react';
import { Image } from 'react-native';
import { getCurrentUser } from '../Utility/googleAuth';
import { auth } from '../Utility/firebaseConfig';
import blankProfilePic from '../assets/blank_profile.png';

const TopBarProfileIcon = ({ size = 30 }) => {
  const [profilePic, setProfilePic] = useState(null);

  useEffect(() => {
    const fetchProfilePic = async () => {
      try {
        const googleUser = await getCurrentUser();
        if (googleUser?.photoUrl) {
          setProfilePic(googleUser.photoUrl);
          return;
        }
        const firebaseUser = auth.currentUser;
        if (firebaseUser?.photoURL) {
          setProfilePic(firebaseUser.photoURL);
          return;
        }
      } catch (error) {
        console.error('Error fetching profile picture:', error);
      }
    };

    fetchProfilePic();
  }, []);

  return (
    <Image
      source={typeof profilePic === 'string' ? { uri: profilePic } : blankProfilePic}
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
      }}
    />
  );
};

export default TopBarProfileIcon;