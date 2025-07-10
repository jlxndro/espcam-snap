import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CCTV from "./pages/CCTV";
import ESP from "./pages/ESP";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cctv" element={<CCTV />} />
        <Route path="/esp" element={<ESP />} />
      </Routes>
    </Router>
  );
}

export default App;
