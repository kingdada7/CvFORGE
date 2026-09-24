import React from "react";
import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import DocumentBuilder from "./pages/DocumentBulider";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/builder" element={<DocumentBuilder />} />
      </Routes>
    </div>
  );
};

export default App;
