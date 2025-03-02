import { auth } from '../Utility/firebaseConfig';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithCredential,
  signOut as firebaseSignOut
} from 'firebase/auth';
import { API_URL } from '../config/apiConfig';
import { signInWithGoogle } from '../Utility/googleAuth';

// Helper to get token and create headers
const getAuthHeaders = async () => {
  const user = auth.currentUser;
  if (!user) return {};
  
  const token = await user.getIdToken();
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };
};

export const authService = {
  // Register new user
  registerUser: async (email, password, username) => {
    // Create Firebase user
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    // Get token
    const token = await userCredential.user.getIdToken();
    
    // Register in our database
    const response = await fetch(`${API_URL}/users/register`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username })
    });
    
    return response.json();
  },

  signInWithGoogleAuth: async () => {
    const userData = await signInWithGoogle();
    
    if (!userData || !userData.idToken) {
      throw new Error('Google sign-in failed or was canceled');
    }
    
    console.log('Google token (first 20 chars):', userData.idToken.substring(0, 20));
    
    const credential = GoogleAuthProvider.credential(userData.idToken);
    const firebaseResult = await signInWithCredential(auth, credential);
    const token = await firebaseResult.user.getIdToken();
    // Register in our database
    const response = await fetch(`${API_URL}/users/register`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: userData.name })
    });
    
    return response.json();
  },
  
  
  // Get current user profile
  getCurrentUserProfile: async () => {
    const headers = await getAuthHeaders();
    
    const response = await fetch(`${API_URL}/users/me`, {
      headers
    });
    
    return response.json();
  },
  
  // Sign out
  signOut: async () => {
    await firebaseSignOut(auth);
  }
};