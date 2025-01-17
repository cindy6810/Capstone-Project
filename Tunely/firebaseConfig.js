// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDS7Ce-Rvap_8keSJ5Y3fEruwCuujShGBU",
  authDomain: "tunely-111.firebaseapp.com",
  projectId: "tunely-111",
  storageBucket: "tunely-111.firebasestorage.app",
  messagingSenderId: "209540280192",
  appId: "1:209540280192:web:3dea184079a814a6df1b65",
  measurementId: "G-FXYG5NPNBK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);