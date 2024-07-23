import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home"; 
import EditHologram from "./pages/EditHologram";
import CreateHologram from "./components/CreateHologram";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hologram/edit/:id" element={<EditHologram />} />
        <Route path="/create-hologram"  element={<CreateHologram />} />
      </Routes>
    </div>
  );
}

export default App;
