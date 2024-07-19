import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home"; 
import EditHologram from "./pages/EditHologram";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hologram/edit/:id" element={<EditHologram />} />
      </Routes>
    </div>
  );
}

export default App;
