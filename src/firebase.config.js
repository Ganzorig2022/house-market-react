// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAmzRJRuyW0HMZV6cUI7zQHH4dlY8SKUEA',
  authDomain: 'house-market-21ce4.firebaseapp.com',
  projectId: 'house-market-21ce4',
  storageBucket: 'house-market-21ce4.appspot.com',
  messagingSenderId: '354063448130',
  appId: '1:354063448130:web:e34fe32b9628129c9c15db',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();
