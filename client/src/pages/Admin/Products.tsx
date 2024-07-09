import { useEffect, useState } from "react";
import { Layout } from "../../components/Layout/Layout";
import { AdminMenu } from "../../components/Layout/AdminMenu";
import axios from "axios";

import Card from "../../components/admin/ProductCard";

import { Link } from "react-router-dom";

export const Products = () => {
  const [products, setProducts] = useState([]);
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/v1/product/get-product"
      );
      if (data.success) {
        console.log(data.products);

        setProducts(data.products);
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProduct();
  }, [products]);
  return (
    <Layout>
      <div className="grid grid-cols-[1fr_3fr] gap-4 m-4">
        <div>
          <AdminMenu />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg m-3">
          <h1>All products list</h1>
        </div>
        {products?.map((product: any) => (
          <Link to={`/dashboard/admin/${product.slug}`}>
            <Card key={product._id} product={product}></Card>
          </Link>
        ))}
      </div>
    </Layout>
  );
};
