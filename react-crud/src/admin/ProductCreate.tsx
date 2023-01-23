import React, { useState } from "react";
import Wrapper from "./Wrapper";

const ProductCreate = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");

  return (
    <Wrapper>
      <form onSubmit={() => {}}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            className="form-control"
            name="title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Image</label>
          <input
            type="text"
            className="form-control"
            name="image"
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <button className="pt-3 btn btn-outline-secondary">Save</button>
      </form>
    </Wrapper>
  );
};

export default ProductCreate;
