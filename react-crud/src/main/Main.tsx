import React, { useState, useEffect } from "react";
import { Product } from "../interfaces/product";

const Main = () => {
  const [products, setProducts] = useState([] as Product[]);

  useEffect(() => {
    const getProducts = async () => {
      const response = await fetch("http://localhost:8001/api/products");
      const data = await response.json();
      setProducts(data);
    };

    getProducts();
  }, []);

  const like = async (id: number) => {
    await fetch("http://localhost:8001/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    const updatedProducts = products.map((product: Product) => {
      if (product.id === id) {
        product.likes += 1;
      }
      return product;
    });
    setProducts(updatedProducts);
  };
  return (
    <>
      <main>
        <div className="album py-5 bg-light">
          <div className="container">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
              {products.map((product: Product) => {
                return (
                  <div className="col">
                    <div className="card shadow-sm">
                      <img src={product.image} height="180" alt="" />
                      <div className="card-body">
                        <p className="card-text">{product.title}</p>
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="btn-group">
                            <button
                              type="button"
                              className="btn btn-sm btn-outline-secondary"
                              onClick={() => like(product.id)}
                            >
                              Like
                            </button>
                          </div>
                          <small className="text-muted">
                            {product.likes} Likes
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Main;
