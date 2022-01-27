import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import {
  HOMEPAGE_URL,
  LOGIN_URL,
  REGISTER_URL,
  RESET_PASSWORD_URL,
  USER_PROFILE_URL,
} from "./constants/urls";
import { ChakraProvider } from "@chakra-ui/react";
import Login from "./pages/auth/Login";
import RegisterPage from "./pages/auth/RegisterPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
import { initializeApp } from "firebase/app";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAuth } from "firebase/auth";
import { login, logout } from "./reducers/authReducer";
import PublicRoute from "./components/PublicRoute";
import PrivateRoute from "./components/PrivateRoute";
import ProfilePage from "./pages/userprofile/ProfilePage";

function App() {
  const dispatch = useDispatch();
  const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
  };
  initializeApp(firebaseConfig);

  useEffect(() => {
    getAuth().onAuthStateChanged((authUser) => {
      if (authUser) {
        const { displayName, email, uid } = authUser;
        dispatch(login({ displayName, email, uid }));
      } else {
        dispatch(logout());
      }
    });
  }, []);

  return (
    <ChakraProvider>
      <Routes>
        <Route path={HOMEPAGE_URL} element={<Homepage />} />
        <Route
          path={LOGIN_URL}
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path={REGISTER_URL}
          element={
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>
          }
        />
        <Route path={RESET_PASSWORD_URL} element={<ResetPasswordPage />} />
        <Route
          path={USER_PROFILE_URL}
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        />
      </Routes>
    </ChakraProvider>
  );
}

export default App;
