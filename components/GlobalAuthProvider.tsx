import React, { useEffect, useState } from "react";
import { useUserStore } from "@/store";
import { Redirect } from "expo-router";

const GlobalAuthProvider = ({ children }) => {
  const { token, logOut, firstLaunch, setFirstLaunch } = useUserStore();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Set the component as ready after it mounts
    setIsReady(true);

    // Check if the token is expired and log out the user if necessary
    if (token) {
      const currentTime = new Date().toISOString();
      if (token?.expiresAt <= currentTime) {
        logOut();
      }
    }
  }, [token, logOut]);

  // If the component is ready, handle the redirection logic
  if (isReady) {
    if (firstLaunch) {
      return;
    } else if (
      (!firstLaunch && !token) ||
      token?.expiresAt <= new Date().toISOString()
    ) {
      return <Redirect href="/(auth)/sign-in" />;
    } else {
      return <Redirect href="/(root)/(tabs)" />;
    }
  }

  // Render children (rest of the app) if the token is valid
  return <>{children}</>;
};

export default GlobalAuthProvider;
