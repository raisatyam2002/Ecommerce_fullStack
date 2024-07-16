import React, { useEffect, useState } from "react";
import { Layout } from "../components/Layout/Layout";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import ProductCard from "../components/admin/ProductCard";
export const SingleCategory = () => {
  const [products, setProducts] = useState<any[]>();
  const params = useParams();
  const { slug } = params;
  const getProductCategory = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/v1/product/product-category/${slug}`
      );
      if (data.success) {
        setProducts(data.products);

        // toast.success("got products  category");
      } else {
        toast.error("error 1 ");
      }
    } catch (error) {
      toast.error("error in getting productsCategory");
    }
  };
  useEffect(() => {
    if (slug) getProductCategory();
  }, [slug]);
  return (
    <Layout>
      <h1>{slug}</h1>
      <div>
        {products?.map((prod) => (
          <div key={prod._id}>
            <ProductCard product={prod}></ProductCard>
          </div>
        ))}
      </div>
    </Layout>
  );
};
