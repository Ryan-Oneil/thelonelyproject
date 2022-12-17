import React, { useEffect, useState } from "react";
import { FirebaseApp, initializeApp } from "@firebase/app";
import { getAuth, UserInfo } from "@firebase/auth";
import { AuthStage } from "@/features/Auth/enums/AuthStages";
import { RegisterStatus } from "@/features/Auth/enums/RegisterStatus";

const emptyUser = {
  uid: "",
  email: "",
  displayName: "",
  phoneNumber: "",
  photoURL: "",
  providerId: "",
};
export const AuthContext = React.createContext<{
  user: UserInfo;
  authStatus: AuthStage;
  registerStatus: RegisterStatus;
  setRegisterStatus: (status: RegisterStatus) => void;
}>({
  user: emptyUser,
  authStatus: AuthStage.INIT,
  registerStatus: RegisterStatus.NOT_REGISTERED,
  setRegisterStatus: () => {},
});

let firebaseApp: FirebaseApp;

export function AuthProvider({ children }: { children: JSX.Element }) {
  const [user, setUser] = useState<UserInfo>(emptyUser);
  const [authStatus, setAuthStatus] = useState<AuthStage>(AuthStage.INIT);
  const [registerStatus, setRegisterStatus] = useState<RegisterStatus>(
    RegisterStatus.NOT_REGISTERED
  );
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
        const token = await authUser.getIdTokenResult();

        const registeredStatus = token.claims.role
          ? RegisterStatus.REGISTERED
          : RegisterStatus.NOT_REGISTERED;

        setUser(authUser);
        setRegisterStatus(registeredStatus);
        setAuthStatus(AuthStage.LOGGED_IN);
      } else {
        setAuthStatus(AuthStage.LOGGED_OUT);
        setUser(emptyUser);
      }
    });
  }, []);

  const updateRegisterStatus = (status: RegisterStatus) => {
    setRegisterStatus(status);
  };

  const value = {
    user,
    authStatus,
    setRegisterStatus: updateRegisterStatus,
    registerStatus,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
