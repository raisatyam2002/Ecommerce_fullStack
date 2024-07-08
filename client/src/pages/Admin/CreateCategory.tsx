import { toast } from "react-toastify";
import { AdminMenu } from "../../components/Layout/AdminMenu";
import { Layout } from "../../components/Layout/Layout";
import { useEffect, useState } from "react";
import axios from "axios";
import Table from "../../components/admin/Table";
import { CategoryForm } from "../../components/admin/CategoryForm";
import { useAuth } from "../../context/auth";

const CreateCategory = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [auth, setAuth] = useAuth();
  const [updatedName, setUpdatedName] = useState();
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/v1/category/get-category"
      );
      console.log("data is", data);
      if (data.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("error while getting categories");
    }
  };
  const handleSubmit = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/category/createCategory",
        {
          name: name,
        },
        {
          headers: {
            authorization: "Bearer " + auth.token,
          },
        }
      );

      if (data.success) {
        getAllCategory();
        toast.success("category added succesfully");
      } else {
        toast.error("error in adding category");
      }
    } catch (error) {
      console.log(error);
      toast.error("error in adding category");
    }
  };
  const handleDelete = async (id: String) => {
    try {
      console.log("id is", id);

      const { data } = await axios.delete(
        `http://localhost:5000/api/v1/category/delete-category/${id}`,
        {
          headers: {
            authorization: "Bearer " + auth.token,
          },
        }
      );
      if (data.success) {
        getAllCategory();
        toast.success("deleted category");
      } else {
        toast.error("error while deleting category error 1");
      }
    } catch (error) {
      console.log(error);
      toast.error("error while deleting category error 2");
    }
  };
  const handleUpdate = async (id: string) => {
    // alert(id);
    // alert(updatedName);
    try {
      const { data } = await axios.put(
        `http://localhost:5000/api/v1/category/update-category/${id}`,
        {
          updateName: updatedName,
        },
        {
          headers: {
            authorization: "Bearer " + auth.token,
          },
        }
      );
      console.log("updated data is", data);
      if (data.success) {
        getAllCategory();
        toast.success("category updated succesfully");
      } else {
        toast.error("error in updating category");
      }
    } catch (error) {
      console.log(error);
      toast.error("error while updating category error 2");
    }
  };
  useEffect(() => {
    getAllCategory();
  }, []);
  return (
    <Layout>
      <div className="grid grid-cols-[1fr_3fr] gap-2 m-4">
        <div>
          <AdminMenu />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg m-1">
          <h1>Create Category</h1>
          <CategoryForm
            value={name}
            setName={setName}
            handleSubmit={handleSubmit}
          ></CategoryForm>
          <Table
            categories={categories}
            handleDelete={handleDelete}
            updatedName={updatedName}
            setUpdatedName={setUpdatedName}
            handleUpdate={handleUpdate}
          ></Table>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
