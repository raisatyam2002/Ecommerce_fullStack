import {
  useContext,
  createContext,
  ReactNode,
  useState,
  SetStateAction,
  Dispatch,
} from "react";
interface props {
  children: ReactNode;
}
interface CartContextType {
  cart: any[];
  setCart: Dispatch<SetStateAction<any[]>>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<props> = ({ children }) => {
  const [cart, setCart] = useState<any[]>([]);
  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
