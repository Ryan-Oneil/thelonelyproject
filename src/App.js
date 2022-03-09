import { Route, Routes } from "react-router-dom";
import {
  CHAT_URL,
  DASHBOARD_URL,
  HOMEPAGE_URL,
  LOGIN_URL,
  PROFILE_FIND_MATCHES,
  PROFILE_SETUP_URL,
  REGISTER_URL,
  RESET_PASSWORD_URL,
  USER_PROFILE_URL,
} from "./utils/urls";
import { ChakraProvider } from "@chakra-ui/react";
import { initializeApp } from "firebase/app";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAuth } from "firebase/auth";
import Homepage from "./Base/pages/Homepage";
import PublicRoute from "./features/Auth/components/PublicRoute";
import RegisterPage from "./features/Auth/pages/RegisterPage";
import ResetPasswordPage from "./features/Auth/pages/ResetPasswordPage";
import PrivateRoute from "./features/Auth/components/PrivateRoute";
import ProfilePage from "./features/UserProfile/pages/ProfilePage";
import ChatPage from "./features/Chat/pages/ChatPage";
import SetupProfilePage from "./features/UserProfile/pages/SetupProfilePage";
import FindMatchPage from "./features/UserProfile/pages/FindMatchPage";
import { RegisterStatus } from "./features/Auth/enums/RegisterStatus";
import { login, logout } from "./features/Auth/authReducer";
import Login from "./features/Auth/pages/Login";

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
        >
          <Route
            path={":chatId"}
            element={
              <PrivateRoute>
                <ChatPage />
              </PrivateRoute>
            }
          />
        </Route>
        <Route
          path={PROFILE_SETUP_URL}
          element={
            <PrivateRoute>
              <SetupProfilePage />
            </PrivateRoute>
          }
        />
        <Route
          path={PROFILE_FIND_MATCHES}
          element={
            <PrivateRoute>
              <FindMatchPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </ChakraProvider>
  );
}

export default App;
