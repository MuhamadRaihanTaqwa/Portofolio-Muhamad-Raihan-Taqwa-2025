// firebase-setup.js - Firebase Configuration and Initialization

// Import Firebase modules
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js';
import { getFirestore, collection, addDoc, onSnapshot, orderBy, query } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js';

// Firebase configuration - REPLACE WITH YOUR OWN CONFIG
const firebaseConfig = {
    apiKey: "your-api-key",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "123456789",
    appId: "your-app-id"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Make Firebase functions available globally
window.firebaseFirestore = { collection, addDoc, onSnapshot, orderBy, query };
window.db = db;

console.log('Firebase initialized successfully');