import { Layout } from "../components/Layout/Layout";
import { useAuth } from "../context/auth";

export const HomePage = () => {
  const [auth] = useAuth();
  return (
    <Layout>
      {JSON.stringify(auth.user)}
      {auth.token}
      <h1>home</h1>
    </Layout>
  );
};
