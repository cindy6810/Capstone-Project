import { initializeApp } from 'firebase/app';
import { getAuth, signInWithCredential, GoogleAuthProvider } from 'firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const firebaseConfig = {
  apiKey: "AIzaSyDS7Ce-Rvap_8keSJ5Y3fEruwCuujShGBU",
  authDomain: "tunely-111.firebaseapp.com",
  databaseURL: "https://tunely-111-default-rtdb.firebaseio.com",
  projectId: "tunely-111",
  storageBucket: "tunely-111.firebasestorage.app",
  messagingSenderId: "209540280192",
  appId: "1:209540280192:web:f3e421fc788eabccdf1b65",
  measurementId: "G-H4SETH4W1R",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Configure Google Sign-In
GoogleSignin.configure({
  webClientId: '209540280192-cfv5dseulqeeq95t9vagrhmbt2acfva4.apps.googleusercontent.com', // Use your web client ID
});

// Function for Google Sign-In
export const signInWithGoogle = async () => {
  try {
    // Get user information from Google Sign-In
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    const googleCredential = GoogleAuthProvider.credential(userInfo.idToken);
    
    // Sign in to Firebase with the Google credential
    const userCredential = await signInWithCredential(auth, googleCredential);
    return userCredential.user; // Return the signed-in user
  } catch (error) {
    throw new Error(error.message);
  }
};

export default app;
