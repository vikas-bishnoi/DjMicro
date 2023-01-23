import React, { SyntheticEvent, useState } from "react";
import { redirect } from "react-router-dom";
import Wrapper from "./Wrapper";

const ProductCreate = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();
    console.log(title, image);
    await fetch("http://localhost:8000/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        image,
      }),
    });
    redirect("/admin/products");
  };

  return (
    <Wrapper>
      <form onSubmit={submit}>
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
