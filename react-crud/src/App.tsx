import React from "react";
import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Main from "./main/Main";
import Products from "./admin/Products";
import ProductCreate from "./admin/ProductCreate";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="admin/products" element={<Products />} />
          <Route path="admin/products/create" element={<ProductCreate />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
