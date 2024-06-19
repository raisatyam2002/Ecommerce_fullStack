import "./App.css";
import { Layout } from "./components/Layout/Layout";
import { Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Policy } from "./pages/Policy";
import { PageNotFound } from "./pages/PageNotFound";
import { Register } from "./pages/Auth/Register";
import { Login } from "./pages/Auth/Login";
import { Dashboard } from "./pages/user/Dashboard";
import { Private } from "./components/routes/Private";
import { ForgotPassword } from "./pages/Auth/ForgotPassword";
import { AdminPrivate } from "./components/routes/AdminPrivate";
import { AdminDashboard } from "./pages/Admin/AdminDashboard";
import CreateCategory from "./pages/Admin/CreateCategory";
import { CreateProduct } from "./pages/Admin/CreateProduct";
import { Users } from "./pages/Admin/Users";
import { Profile } from "./pages/user/Profile";
import { Orders } from "./pages/user/Orders";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/dashboard/user" element={<Private />}>
          <Route path="" element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="orders" element={<Orders />} />
        </Route>
        <Route path="/dashboard/admin" element={<AdminPrivate />}>
          <Route path="" element={<AdminDashboard />} />
          <Route path="createCategory" element={<CreateCategory />} />
          <Route path="createProduct" element={<CreateProduct />} />
          <Route path="users" element={<Users />} />
        </Route>

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
