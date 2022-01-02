import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import {
  HOMEPAGE_URL,
  LOGIN_URL,
  REGISTER_URL,
  RESET_PASSWORD_URL,
} from "./components/urls";
import { ChakraProvider } from "@chakra-ui/react";
import Login from "./pages/auth/Login";
import RegisterPage from "./pages/auth/RegisterPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";

function App() {
  return (
    <ChakraProvider>
      <Routes>
        <Route path={HOMEPAGE_URL} element={<Homepage />} />
        <Route path={LOGIN_URL} element={<Login />} />
        <Route path={REGISTER_URL} element={<RegisterPage />} />
        <Route path={RESET_PASSWORD_URL} element={<ResetPasswordPage />} />
      </Routes>
    </ChakraProvider>
  );
}

export default App;
