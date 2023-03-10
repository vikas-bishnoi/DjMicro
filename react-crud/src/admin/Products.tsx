import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Product } from "../interfaces/product";
import Wrapper from "./Wrapper";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const response = await fetch("http://localhost:8000/api/products");
      const data = await response.json();
      setProducts(data);
    };

    getProducts();
  }, []);

  const deleteProduct = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await fetch(`http://localhost:8000/api/products/${id}`, {
        method: "DELETE",
      });

      setProducts(products.filter((product: Product) => product.id !== id));
    }
  };

  return (
    <Wrapper>
      <div className="pt-3 pb-2 mb-3 border-bottom">
        <div className="btn-toolbar mb2 mb-md-8">
          <Link
            to="/admin/products/create"
            className="btn btn-sm btn-outline-secondary"
          >
            Add
          </Link>
        </div>
      </div>
      <div className="table-responsive">
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Image</th>
              <th scope="col">Title</th>
              <th scope="col">Likes</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product: Product) => {
              return (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>
                    <img src={product.image} alt={product.title} height="180" />
                  </td>
                  <td>{product.image}</td>
                  <td>{product.likes}</td>
                  <td>
                    <Link
                      to={`/admin/products/${product.id}/edit`}
                      className="btn btn-sm btn-outline-secondary"
                    >
                      Edit
                    </Link>
                    <a
                      href="#"
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => deleteProduct(product.id)}
                    >
                      Delete
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Wrapper>
  );
};

export default Products;
