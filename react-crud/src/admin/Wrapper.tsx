import React from "react";
import Menu from "../components/Menu";
import Navbar from "../components/Navbar";

const Wrapper = () => {
  return (
    <div>
      <Navbar />
      <div className="container-fluid">
        <div className="row">
          <Menu />
        </div>
      </div>
    </div>
  );
};

export default Wrapper;
