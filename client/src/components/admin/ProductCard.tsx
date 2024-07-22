import React, { useState } from "react";
import { Card } from "antd";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/cart";
import { toast } from "react-toastify";
const ProductCard = ({ product }: any) => {
  const { cart, setCart } = useCart();
  const navigate = useNavigate();
  console.log("after seRCG", product);
  const slug = product.slug;

  if (!product) {
    return <div>Loading...</div>; // Handle undefined product gracefully
  }

  return (
    <Card
      title="Product"
      bordered={false}
      style={{ width: 300, margin: "8px" }}
    >
      <div key={product._id}>
        <p>{product.name}</p>
        <p>{product.description}</p>
        <p> ${product.price}</p>
        <p>{product.quantity}</p>
        <img src={product.photo} alt="product-photo"></img>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "8px",
          }}
        >
          <button
            className="mr-6 w-36 h-12 bg-sky-400"
            onClick={() => {
              setCart([...cart, product]);
              // toast.success("product added to cart");
              localStorage.setItem("cart", JSON.stringify([...cart, product]));
            }}
          >
            Add to cart
          </button>
          <button
            className="bg-slate-700 w-36"
            onClick={() => {
              navigate(`/product-details/${slug}`);
            }}
          >
            More Details
          </button>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
