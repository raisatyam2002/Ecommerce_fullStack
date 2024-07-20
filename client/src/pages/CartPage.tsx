import React from "react";
import { Layout } from "../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
export const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const { cart, setCart } = useCart();
  const handleRemove = (id: string) => {
    const updatedCart = cart.filter((prod) => prod._id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };
  const totalPrice = () => {
    let total = 0;
    cart?.map((prod) => {
      total = total + prod.price;
    });
    return total;
  };
  return (
    <Layout>
      CartPage
      <div className="mt-20 mx-64 flex justify-between">
        <div>
          <h1>
            {cart?.length > 0
              ? `You have ${cart.length} items in your cart
        ${auth?.token ? "" : "please login to checkout"}`
              : "Your Cart is empty"}
          </h1>
          {cart.map((prod) => (
            <div>
              <h1>{prod?.name}</h1>
              <h1>{prod?.price}</h1>
              <button
                className="bg-red-900"
                onClick={() => {
                  handleRemove(prod._id);
                }}
              >
                remove
              </button>
            </div>
          ))}
        </div>
        <div>
          <h1>Cart Summary</h1>
          <p>Total | Checkout | Payment</p>
          <hr />
          <h2>Total payment : {totalPrice()}</h2>
        </div>
      </div>
    </Layout>
  );
};
