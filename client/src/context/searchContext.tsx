import { useContext, createContext, useState } from "react";

type SearchContextType = [
  { products: any[] }, // Define as an array of products
  React.Dispatch<React.SetStateAction<{ products: any[] }>>
];

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider = ({ children }: any) => {
  const [state, setState] = useState<{ products: any[] }>({
    products: [],
  });

  return (
    <SearchContext.Provider value={[state, setState]}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = (): SearchContextType => {
  const context = useContext(SearchContext);

  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }

  return context;
};
