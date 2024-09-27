import React, { useEffect, useState } from "react";
import { useUserStore } from "@/store";
import { Redirect } from "expo-router";

const GlobalAuthProvider = ({ children }) => {
  const { token, logOut } = useUserStore();
  const [isReady, setIsReady] = useState(false);
  const currentTime = new Date().toISOString();

  useEffect(() => {
    // Set the component as ready after it mounts
    setIsReady(true);

    if (token) {
      if (token.expiresAt <= currentTime) {
        logOut();
      }
    }
  }, [token]);

  // If token is expired or not present, redirect to sign-in page
  if (isReady && (!token || token.expiresAt <= currentTime)) {
    return <Redirect href="/(auth)/sign-in" />;
  } else {
    return <Redirect href="/(root)/(tabs)" />;
  }

  // Render children (rest of the app) if token is valid
  return <>{children}</>;
};

export default GlobalAuthProvider;
