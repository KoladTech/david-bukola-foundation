import { config } from "dotenv";
config({ path: ".env.local" });
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// console.log(process.env.NEXT_PUBLIC_FIREBASE_API_KEY);

// const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//   authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//   storageBucket:process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
//   measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
// };

const firebaseConfig = {
  apiKey: "AIzaSyCD2NQWNVTbrvh0z-Xp8kQ0QpslbImdUpE",
  authDomain: "davidbukolafoundation-db.firebaseapp.com",
  projectId: "davidbukolafoundation-db",
  storageBucket: "davidbukolafoundation-db.firebasestorage.app",
  messagingSenderId: "292529393801",
  appId: "1:292529393801:web:5eb4af6661b4bcb2653658",
  measurementId: "G-NMKWPKVKMQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// const analytics = getAnalytics(app);

// Initialize Firebase Analytics
export const analytics =
  typeof window !== "undefined" ? getAnalytics(app) : null;

export default db;
