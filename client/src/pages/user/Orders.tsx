import React from "react";
import { Layout } from "../../components/Layout/Layout";
import { UserMenu } from "../../components/Layout/UserMenu";

export const Orders = () => {
  return (
    <Layout>
      <div className="grid grid-cols-[1fr_3fr] gap-4 m-4">
        <div>
          <UserMenu />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg m-3">
          <h1>Orders</h1>
        </div>
      </div>
    </Layout>
  );
};
