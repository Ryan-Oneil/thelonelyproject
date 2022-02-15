import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import {
  CHAT_URL,
  DASHBOARD_URL,
  HOMEPAGE_URL,
  LOGIN_URL,
  PROFILE_SETUP_URL,
  REGISTER_URL,
  RESET_PASSWORD_URL,
  USER_PROFILE_URL,
} from "./utils/urls";
import { ChakraProvider } from "@chakra-ui/react";
import Login from "./Auth/pages/Login";
import RegisterPage from "./Auth/pages/RegisterPage";
import ResetPasswordPage from "./Auth/pages/ResetPasswordPage";
import { initializeApp } from "firebase/app";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAuth } from "firebase/auth";
import { login, logout } from "./Auth/authReducer";
import PublicRoute from "./Auth/components/PublicRoute";
import PrivateRoute from "./Auth/components/PrivateRoute";
import ProfilePage from "./UserProfile/pages/ProfilePage";
import ChatPage from "./Chat/pages/ChatPage";
import { RegisterStatus } from "./Auth/enums/RegisterStatus";
import SetupProfilePage from "./UserProfile/pages/SetupProfilePage";

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
        const { email, uid } = authUser;
        const token = authUser.getIdTokenResult();

        token.then((idToken) => {
          const registeredStatus = idToken.claims.role
            ? RegisterStatus.REGISTERED
            : RegisterStatus.NOT_REGISTERED;

          dispatch(login({ registeredStatus, user: { email, uid } }));
        });
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
        >
          <Route
            path={`:userId`}
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          />
        </Route>
        <Route
          path={DASHBOARD_URL}
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        />
        <Route
          path={CHAT_URL}
          element={
            <PrivateRoute>
              <ChatPage />
            </PrivateRoute>
          }
        />
        <Route
          path={PROFILE_SETUP_URL}
          element={
            <PrivateRoute>
              <SetupProfilePage />
            </PrivateRoute>
          }
        />
      </Routes>
    </ChakraProvider>
  );
}

export default App;
