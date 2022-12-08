import React, { useEffect, useState } from "react";
import { FirebaseApp, initializeApp } from "@firebase/app";
import { getAuth, UserInfo } from "@firebase/auth";
import { AuthStage } from "@/features/Auth/enums/AuthStages";

export const AuthContext = React.createContext<{
  user: UserInfo | null;
  status: AuthStage;
}>({ user: null, status: AuthStage.INIT });

let firebaseApp: FirebaseApp;

export function AuthProvider({ children }: { children: JSX.Element }) {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [status, setStatus] = useState<AuthStage>(AuthStage.INIT);
  const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  };

  if (!firebaseApp) {
    firebaseApp = initializeApp(firebaseConfig);
  }

  useEffect(() => {
    const firebaseAuth = getAuth(firebaseApp);

    firebaseAuth.onAuthStateChanged(async (authUser) => {
      if (authUser) {
        setUser(authUser);
        setStatus(AuthStage.LOGGED_IN);
      } else {
        setUser(null);
        setStatus(AuthStage.LOGGED_OUT);
      }
    });
  }, []);

  const value = {
    user,
    status,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
