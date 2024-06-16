import { NavLink } from "react-router-dom";
import { BsShop } from "react-icons/bs";
export const Headers = () => {
  return (
    <div className="flex font-poppins text-xl bg-zinc-200 shadow-lg h-12 pt-2 px-1 ">
      <NavLink to="/" className="flex space-x-2 font-extrabold">
        <BsShop className="m-1"></BsShop>
        <span>Ecommerce App</span>
      </NavLink>
      <ul className="flex ms-auto">
        <li className="mr-6">
          <NavLink to="/" className="">
            Home
          </NavLink>
        </li>
        <li className="mr-6">
          <NavLink to="/category" className="">
            Category
          </NavLink>
        </li>
        <li className="mr-6">
          <NavLink to="/register">Register</NavLink>
        </li>
        <li className="mr-6">
          <NavLink to="/login">Login</NavLink>
        </li>

        <li className="mr-6">
          <NavLink to="/cart">Cart(0)</NavLink>
        </li>
      </ul>
    </div>
  );
};
