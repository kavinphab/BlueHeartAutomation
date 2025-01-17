"use client";

import { useAuth } from "@clerk/nextjs";
import { auth } from "@/utils/firebase";
import { signInWithCustomToken } from "firebase/auth";
import { useEffect } from "react";

const AuthProvider = () => {
  const { isLoaded, getToken, userId } = useAuth();
  useEffect(() => {
    if (!isLoaded) return;

    const checkFirebase = async () => {
      // Handle if the user is not signed in
      // You could display content, or redirect them to a sign-in page
      if (userId) {
        const token = await getToken({ template: "integration_firebase" });

        const userCredentials = await signInWithCustomToken(auth, token || "");
        // The userCredentials.user object can call the methods of
        // the Firebase platform as an authenticated user.
        console.log("User:", userCredentials.user);
      }
    };
    checkFirebase();
  }, [isLoaded]);
  return <></>;
};

export default AuthProvider;
