import { useEffect, useState } from "react";
import { Layout } from "../components/Layout/Layout";
import { useAuth } from "../context/auth";
import axios from "axios";
import { toast } from "react-toastify";
import Card from "../components/admin/ProductCard";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";

export const HomePage = () => {
  const [loading, setLoading] = useState(false);
  const [auth] = useAuth();
  const [products, setProducts] = useState<any>([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState<any>([]);
  const [radio, setRadio] = useState<any>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/v1/product/product-count"
      );
      if (data.success) {
        setTotal(data.total);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:5000/api/v1/product/product-list/${page}`
      );
      if (data.success) {
        setProducts(data.products);
        // toast.success("got all product");
      } else {
        toast.error("error 1 while gettting product");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("error 2 while gettting product");
    }
  };
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/v1/category/get-category"
      );
      console.log("data is", data);
      if (data.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("error while getting categories");
    }
  };
  const handleFilterCategory = (value: any, id: any) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/product/product-filter",
        {
          checked: checked,
          radio: radio,
        }
      );
      if (data.success) {
        setProducts(data.products);
        // toast.success(data.message);
      } else {
        toast.error("error 1 while fetching product");
      }
    } catch (error) {
      console.log(error);
      toast.error("error 2 while fetching product");
    }
  };
  useEffect(() => {
    if (!checked.length && !radio.length) getProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);
  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);
  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);
  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:5000/api/v1/product/product-list/${page}`
      );
      console.log(data.prdoucts);

      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <Layout title="All best offers">
      <div className="grid grid-cols-3 gap-4 m-5">
        <div className="">
          <div>
            <h4>filter By category</h4>
            <div className="flex flex-col">
              {categories.map((c: any) => (
                <Checkbox
                  key={c._id}
                  onChange={(e) => {
                    handleFilterCategory(e.target.checked, c._id);
                    console.log(e.target.checked, c._id);
                  }}
                >
                  {c.name}
                </Checkbox>
              ))}
            </div>
          </div>
          <div className="mt-12">
            <h4>filter By Price</h4>
            <div className="flex flex-col">
              <Radio.Group
                onChange={(e) => {
                  setRadio(e.target.value);
                }}
              >
                {Prices?.map((p) => (
                  <div key={p._id}>
                    <Radio value={p.array}>{p.name}</Radio>
                  </div>
                ))}
              </Radio.Group>
            </div>

            <div>
              <button
                onClick={() => {
                  window.location.reload();
                }}
              >
                Reset Filter
              </button>
            </div>
          </div>
        </div>
        {products.length > 0 ? (
          <div className=" col-span-2">
            <h1 className="text-xl"> All products</h1>
            <div className="flex">
              {products?.map((product: any) => (
                <Card key={product._id} product={product}></Card>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <h1>No products found</h1>
          </div>
        )}
        <div
          className="m-2 p-3"
          onClick={(e) => {
            e.preventDefault();
            setPage(page + 1);
          }}
        >
          {products && products.length < total && (
            <button className="w-32">
              {loading ? "Loading...." : "Load More"}
            </button>
          )}
        </div>
      </div>
    </Layout>
  );
};
