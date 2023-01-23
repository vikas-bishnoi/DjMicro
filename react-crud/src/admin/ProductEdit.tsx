import React, { SyntheticEvent, useState, useEffect } from "react";
import { redirect, useParams } from "react-router-dom";
import { Product } from "../interfaces/product";
import Wrapper from "./Wrapper";

const ProductEdit = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");

  const params = useParams();

  useEffect(() => {
    const getProduct = async () => {
      console.log(params);
      const response = await fetch(
        `http://localhost:8000/api/products/${params.id}`
      );
      const product: Product = await response.json();
      setTitle(product.title);
      setImage(product.image);
    };

    getProduct();
  }, []);
  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();
    console.log(title, image);
    await fetch(`http://localhost:8000/api/products/${params.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        image,
      }),
    });
    return redirect("/admin/products");
  };

  return (
    <Wrapper>
      <form onSubmit={submit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            className="form-control"
            defaultValue={title}
            name="title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Image</label>
          <input
            type="text"
            className="form-control"
            defaultValue={image}
            name="image"
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <button className="pt-3 btn btn-outline-secondary">Save</button>
      </form>
    </Wrapper>
  );
};

export default ProductEdit;
