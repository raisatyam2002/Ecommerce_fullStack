import React from "react";
import { Card } from "antd";

const ProductCard = ({ product }: any) => {
  if (!product) {
    return <div>Loading...</div>; // Handle undefined product gracefully
  }

  return (
    <Card title="Card title" bordered={false} style={{ width: 300 }}>
      <div key={product._id}>
        <p>{product.name}</p>
        <p>{product.description}</p>
        <p>{product.price}</p>
        <p>{product.quantity}</p>
        <img
          src={`http://localhost:5000/api/v1/product/product-photo/${product._id}`}
          alt="product-photo"
        ></img>
      </div>
    </Card>
  );
};

export default ProductCard;
