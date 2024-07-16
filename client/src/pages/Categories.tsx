import React from "react";
import { Layout } from "../components/Layout/Layout";
import useCategory from "../hooks/useCategory";
import { useNavigate } from "react-router-dom";
export const Categories = () => {
  const navigate = useNavigate();
  const categories = useCategory();
  return (
    <Layout>
      {categories.map((cat) => (
        <div className="m-12" key={cat._id}>
          <button
            className="bg-blue-500 w-32  h-16"
            onClick={() => navigate(`/category/${cat.slug}`)}
          >
            {cat.name}
          </button>
        </div>
      ))}
    </Layout>
  );
};
