import React from "react";
import { Card } from "antd";

const ProductCard = ({ product }: any) => {
  if (!product) {
    return <div>Loading...</div>; // Handle undefined product gracefully
  }

  return (
    <Card
      title="Product"
      bordered={false}
      style={{ width: 900, margin: "8px" }}
    >
      <div key={product._id}>
        <p>{product.name}</p>
        <p>{product.description}</p>
        <p> ${product.price}</p>
        <p>{product.quantity}</p>
        <img
          src={`http://localhost:5000/api/v1/product/product-photo/${product._id}`}
          alt="product-photo"
        ></img>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "8px",
          }}
        >
          <button className="mr-6 w-36 h-12 bg-sky-400">Add to cart</button>
          <button className="bg-slate-700 w-36">More Details</button>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
