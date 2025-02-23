import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAHJLYoacB01yv3eLxN2XaugB4diGWBRzk",
  authDomain: "task-board-plus.firebaseapp.com",
  projectId: "task-board-plus",
  storageBucket: "task-board-plus.firebasestorage.app",
  messagingSenderId: "1023702090366",
  appId: "1:1023702090366:web:fbebe55f360aef63148e2f"
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);

export { db };