import React from "react";
import { Layout } from "../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
export const CartPage = () => {
  const navigate = useNavigate();
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
          <h4>Total : {totalPrice()} </h4>
          {auth?.user?.address ? (
            <>
              <div className="mb-3">
                <h4>Current Address</h4>
                <h5>{auth?.user?.address}</h5>
                <button
                  className="bg-yellow-300 w-40 rounded-md"
                  onClick={() => navigate("/dashboard/user/profile")}
                >
                  Update Address
                </button>
              </div>
            </>
          ) : (
            <div className="mb-3">
              {auth?.token ? (
                <button
                  className="bg-yellow-300 w-40 rounded-md"
                  onClick={() => navigate("/dashboard/user/profile")}
                >
                  Update Address
                </button>
              ) : (
                <button
                  className="bg-yellow-300 w-48 h-8
                   rounded-md"
                  onClick={() =>
                    navigate("/login", {
                      state: "/cart",
                    })
                  }
                >
                  Please Login to checkout
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};
