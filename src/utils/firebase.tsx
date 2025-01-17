"use client";

// import { useAuth } from "@clerk/nextjs";
// import { signInWithCustomToken } from "firebase/auth";
// import { auth } from "../../server/utils/firebase";

export const signinAuth = async () => {
  // const { getToken } = useAuth();
  // try {
  //   const token = await getToken({ template: "integration_firebase" });
  //   if (!token) {
  //     console.error("No token retrieved from Clerk.");
  //     return;
  //   }
  //   const userCredentials = await signInWithCustomToken(auth, token);
  //   console.log("Firebase User:", userCredentials.user);
  // } catch (error) {
  //   console.error("Error signing in with Firebase:", error);
  // }
};

export const signupAuth = () => {};
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO Add SDKs for Firebase products that you want to use
// https //firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
