import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import { HOMEPAGE_URL, LOGIN_URL } from "./components/urls";
import { ChakraProvider } from "@chakra-ui/react";
import Login from "./pages/auth/Login";

function App() {
  return (
    <ChakraProvider>
      <Routes>
        <Route path={HOMEPAGE_URL} element={<Homepage />} />
        <Route path={LOGIN_URL} element={<Login />} />
      </Routes>
    </ChakraProvider>
  );
}

export default App;
