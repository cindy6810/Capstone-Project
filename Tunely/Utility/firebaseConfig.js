import { initializeApp } from 'firebase/app';
import { getAuth, signInWithCredential } from 'firebase/auth';

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

export default app;
