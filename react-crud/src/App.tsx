import React from "react";
import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Menu from "./components/Menu";
import Navbar from "./components/Navbar";
import Products from "./admin/Products";

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="container-fluid">
        <div className="row">
          <Menu />

          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <Router>
              <Routes>
                <Route path="admin/products" element={<Products />} />
              </Routes>
            </Router>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
