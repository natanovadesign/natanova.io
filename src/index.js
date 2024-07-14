import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBulMro8vX8NxCcacYM2MwpE_id07O7SMY",
  authDomain: "natanova-56f03.firebaseapp.com",
  projectId: "natanova-56f03",
  storageBucket: "natanova-56f03.appspot.com",
  messagingSenderId: "799122816735",
  appId: "1:799122816735:web:9eab9b40c7a3ea6732336a",
  measurementId: "G-RJ5KP5WVZX"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);