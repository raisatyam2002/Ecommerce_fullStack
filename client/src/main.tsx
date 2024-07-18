import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/auth.tsx";
import { SearchProvider } from "./context/searchContext.tsx";
import { CartProvider } from "./context/cart.tsx";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <CartProvider>
      <SearchProvider>
        <BrowserRouter>
          <React.StrictMode>
            <App />
          </React.StrictMode>
          ,
        </BrowserRouter>
      </SearchProvider>
    </CartProvider>
  </AuthProvider>
);
