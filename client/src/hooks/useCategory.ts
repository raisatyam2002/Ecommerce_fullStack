import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const useCategory = () => {
  const [categories, setCategories] = useState<any[]>([]);
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
  useEffect(() => {
    getAllCategory();
  }, []);
  return categories;
};
export default useCategory;
