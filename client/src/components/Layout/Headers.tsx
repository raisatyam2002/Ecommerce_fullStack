import { NavLink } from "react-router-dom";
import { BsShop } from "react-icons/bs";
import { useAuth } from "../../context/auth";
import Dropdown from "../Dropdown";
import useCategory from "../../hooks/useCategory";
import DropdownCategory from "../DropdownCategory";
import { useCart } from "../../context/cart";
// import ContentBadge from "../Badge";
import { Badge } from "antd";
export const Headers = () => {
  const { cart } = useCart();
  const [auth, setAuth] = useAuth();
  function handleLogout() {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");
  }
  const categories = useCategory();
  //   console.log("handleLogout in Headers:", handleLogout);
  return (
    <div className="flex font-poppins text-3xl bg-zinc-200 shadow-lg  py-8 px-1  Header">
      <NavLink to="/" className="flex space-x-2 font-extrabold">
        <BsShop className="m-1"></BsShop>
        <span>Ecommerce App</span>
      </NavLink>
      <ul className="flex ms-auto">
        <li className="mr-6">
          <NavLink to="/" className="">
            HOME
          </NavLink>
        </li>
        <li className="mr-6">
          <DropdownCategory categories={categories}></DropdownCategory>
        </li>

        {!auth.user ? (
          <>
            <li className="mr-6">
              <NavLink to="/register">Register</NavLink>
            </li>
            <li className="mr-6">
              <NavLink to="/login">Login</NavLink>
            </li>
          </>
        ) : (
          <>
            {/* <li className="mr-6">
              <NavLink onClick={handleLogout} to="/login">
                logout
              </NavLink>
            </li> */}
            <li className="mr-6">
              <Dropdown handleLogout={handleLogout} role={auth.user.role} />
            </li>
          </>
        )}

        <li className="mr-6">
          <Badge count={cart?.length}>
            <NavLink to="/cart" className="text-xl">
              Cart
            </NavLink>
          </Badge>
        </li>
      </ul>
    </div>
  );
};
