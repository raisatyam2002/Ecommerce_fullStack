import React from "react";
import { Layout } from "../../components/Layout/Layout";
import { UserMenu } from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";
export const Dashboard = () => {
  const [auth, setAuth] = useAuth();
  return (
    <Layout>
      <div className="grid grid-cols-[1fr_3fr] gap-4 m-4">
        <div>
          <UserMenu />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg m-3">
          <h3 className="text-xl font-semibold mb-2">
            name: {auth?.user.name}
          </h3>
          <h3 className="text-lg text-gray-700 mb-1">
            email: {auth?.user.email}
          </h3>
          <h3 className="text-lg text-gray-700">
            address: {auth?.user.address}
          </h3>
        </div>
      </div>
    </Layout>
  );
};
