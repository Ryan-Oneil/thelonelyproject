import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import { HOMEPAGE_URL } from "./components/urls";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <ChakraProvider>
      <Routes>
        <Route path={HOMEPAGE_URL} element={<Homepage />} />
      </Routes>
    </ChakraProvider>
  );
}

export default App;
