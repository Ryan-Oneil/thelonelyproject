import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import { HOMEPAGE_URL } from "./components/urls";

function App() {
  return (
    <Routes>
      <Route path={HOMEPAGE_URL} element={<Homepage />} />
    </Routes>
  );
}

export default App;
