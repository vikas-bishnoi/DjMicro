import React from "react";
import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Menu from "./components/Menu";
import Navbar from "./components/Navbar";
import Products from "./admin/Products";
import Main from "./main/Main";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="admin/products" element={<Products />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
