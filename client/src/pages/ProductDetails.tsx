import { useEffect, useState } from "react";
import { Layout } from "../components/Layout/Layout";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { error } from "console";
import ProductCard from "../components/admin/ProductCard";

const ProductDetails = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState<any>();
  const [relatedProducts, setRelatedProducts] = useState([]);

  const getSimilarProduct = async (pid: string, cid: string) => {
    try {
      console.log("cid ", cid, " pid ", pid);

      const { data } = await axios.get(
        `http://localhost:5000/api/v1/product/related-product/${pid}/${cid}`
      );

      console.log("similar products ", data.products);

      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  const getProductDetail = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/v1/product/get-product/${slug}`
      );
      if (data.success) {
        console.log("data is slug ", data);

        setProduct(data.product);
        // toast.success("succesfull");
        getSimilarProduct(data?.product._id, data?.product.category._id);
      } else {
        toast.error("error 1");
      }
    } catch (error) {
      toast.error("error 2");
      console.log(error);
    }
  };

  useEffect(() => {
    getProductDetail();
  }, []);

  return (
    <Layout>
      <h1>Product Det</h1>
      <div className="flex gap-16 m-20">
        <div className="w-4/12">photo</div>
        <div>
          <h4> name : {product?.name}</h4>
          <h4> price: {product?.price}</h4>
          <h4> description :{product?.description}</h4>
          <h4>Shipping: {product?.shipping ? "Available" : "Not Available"}</h4>
          <h4>category:{product?.category.name}</h4>
        </div>
      </div>
      <div>
        <h1> Similar Product</h1>
        <div>
          {relatedProducts.map((prod) => (
            <ProductCard product={prod}></ProductCard>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
