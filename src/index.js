
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
  apiKey: "AIzaSyBaCseS8uJlwyjHvxYhvKV-lwxqp32gqJk",
  authDomain: "natanova-723c7.firebaseapp.com",
  projectId: "natanova-723c7",
  storageBucket: "natanova-723c7.firebasestorage.app",
  messagingSenderId: "835486685301",
  appId: "1:835486685301:web:0978f80c50fe0c5617403c",
  measurementId: "G-SH3PYBBW9Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);