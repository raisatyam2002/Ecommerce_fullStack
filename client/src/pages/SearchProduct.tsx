import { Layout } from "../components/Layout/Layout";
import { useSearch } from "../context/searchContext";
import Card from "../components/admin/ProductCard";
export const SearchProduct = () => {
  const [state, setState] = useSearch();

  return (
    <Layout>
      <h1>Search Results</h1>
      {state.products && state.products.length ? (
        <div>
          {state.products.map((prod: any) => (
            <Card product={prod}></Card>
          ))}
        </div>
      ) : (
        <div>No products found</div>
      )}
    </Layout>
  );
};
