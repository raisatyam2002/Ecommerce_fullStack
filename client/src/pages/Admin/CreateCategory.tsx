import { AdminMenu } from "../../components/Layout/AdminMenu";
import { Layout } from "../../components/Layout/Layout";

const CreateCategory = () => {
  return (
    <Layout>
      <div className="grid grid-cols-[1fr_3fr] gap-4 m-4">
        <div>
          <AdminMenu />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg m-3">
          <h1>Create Category</h1>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
