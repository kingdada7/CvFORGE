import React from "react";
import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import DocumentBuilder from "./pages/DocumentBulider";
import TemplateSelector from "./pages/TemplateSelector";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/builder" element={<DocumentBuilder />} />
        <Route path="/template" element={<TemplateSelector/>} />
      </Routes>
    </div>
  );
};

export default App;
