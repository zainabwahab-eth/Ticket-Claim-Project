import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAPhhg4yUbwIFtvBpmbHTMgr50ojf-_rhI",
  authDomain: "ticket-claim-project.firebaseapp.com",
  projectId: "ticket-claim-project",
  storageBucket: "ticket-claim-project.firebasestorage.app",
  messagingSenderId: "1094014542996",
  appId: "1:1094014542996:web:8c7d28946440442916c081",
  measurementId: "G-3QJBQK6RZ4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getFirestore(app);

export { analytics };
