import firebase from "firebase/app";
import "firebase/firestore"; // Import Firestore if needed
import { firebaseConfig } from "./firebaseConfig"; // Your Firebase configuration file

// Initialize Firebase
if (!firebase.apps?.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
