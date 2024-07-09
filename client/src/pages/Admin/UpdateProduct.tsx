import { AdminMenu } from "../../components/Layout/AdminMenu";
import { Layout } from "../../components/Layout/Layout";
import { useState, useEffect } from "react";
import SelectFormSubmission from "../../components/admin/Select";
import axios from "axios";
import { toast } from "react-toastify";
import Card from "../../components/admin/ProductCard";
import { useAuth } from "../../context/auth";
import { useNavigate, useParams } from "react-router-dom";
export const UpdateProduct = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [pid, setPid] = useState("");
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState<any>();
  const [auth, setAuth] = useAuth();
  //getAllCatgeories
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/v1/product/get-product/${slug}`
      );
      if (data.success) {
        console.log("product data is ", data);
        setName(data.product.name);
        setDescription(data.product.description);
        setPrice(data.product.price);
        setQuantity(data.product.quantity);
        setCategory(data.product.category._id);
        setShipping(data.product.shipping);
        setPid(data.product._id);
      } else {
        toast.error("error1");
      }
    } catch (error) {
      console.log(error);
      toast.error("error2");
    }
  };
  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(
        `http://localhost:5000/api/v1/product/delete-product/${pid}`
      );
      if (data.success) {
        toast.success("product deleted succesfully");
        navigate("/dashboard/admin/products");
      } else {
        toast.error("error while deleting product 1");
      }
    } catch (error) {
      console.log(error);
      toast.error("error while deleting product 2");
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
  const handleSubmit = async () => {
    try {
      const { data } = await axios.put(
        `http://localhost:5000/api/v1/product/update-product/${pid}`,
        {
          name: name,
          description: description,
          price: price,
          quantity: quantity,
          photo: photo,
          shipping: shipping,
          category: category,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: "Bearer " + auth.token,
          },
        }
      );
      if (data.success) {
        toast.success("product updated successfully");
        navigate("/dashboard/admin/products");
      } else {
        toast.error("error while updating product 1");
      }
    } catch (error) {
      console.log(error);
      toast.error("error while updating product");
    }
  };
  useEffect(() => {
    getAllCategory();
    getProduct();
  }, []);
  return (
    <Layout>
      <div className="grid grid-cols-[1fr_3fr] gap-4 m-4">
        <div>
          <AdminMenu />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg m-3 ">
          <h1 className="my-6">Update Product</h1>
          {categories.length > 0 && (
            <SelectFormSubmission
              categories={categories}
              category={category}
              setCategory={setCategory}
            />
          )}
          <div className="photo my-4">
            <label>
              {photo ? photo.name : "Upload Photo "}
              <br />
              <input
                type="file"
                name="photo"
                accept="images/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setPhoto(e.target.files[0]);
                  }
                }}
              ></input>
            </label>
          </div>
          <div className="text-center ">
            {photo && (
              <div className="h-12">
                <img src={URL.createObjectURL(photo)} alt="product-photo" />
              </div>
            )}
          </div>
          <div className="m-4 mt-64">
            <input
              type="text"
              value={name}
              placeholder="Write name of the product"
              onChange={(e) => {
                setName(e.target.value);
              }}
              className="w-96 h-8 p-2 border-2"
            />
          </div>
          <div className="m-4">
            <input
              type="text"
              value={description}
              placeholder="Write description"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              className="w-96 h-8 p-2 border-2"
            />
          </div>
          <div className="m-4">
            <input
              type="number"
              value={price}
              placeholder="Write price of the product"
              onChange={(e) => {
                setPrice(e.target.value);
              }}
              className="w-96  h-8 p-2 border-2"
            />
          </div>
          <div className="m-4">
            <input
              type="number"
              value={quantity}
              placeholder="Write qunatity of the product"
              onChange={(e) => {
                setQuantity(e.target.value);
              }}
              className="w-96 h-8 p-2 border-2"
            />
          </div>
          <div className="m-4 ">
            <input
              type="sele"
              value={shipping}
              placeholder="Write shipping status of the product"
              onChange={(e) => {
                setShipping(e.target.value);
              }}
              className="w-96 h-8 p-2 border-2"
            />
          </div>
          <div>
            <button
              className="m-4 border-2 w-32 h-8 rounded-md bg-sky-300"
              onClick={handleSubmit}
            >
              Update product
            </button>
            <button
              className="m-4 border-2 w-32 h-8 rounded-md bg-red-600"
              onClick={handleDelete}
            >
              Delete product
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};
