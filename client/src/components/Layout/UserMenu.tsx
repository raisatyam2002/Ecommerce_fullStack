import React from "react";
import { NavLink } from "react-router-dom";

export const UserMenu = () => {
  return (
    <ul className="m-4 w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
      <li className="w-full px-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600">
        <NavLink to="/dashboard/user/profile">Profile</NavLink>
      </li>
      <li className="w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600">
        <NavLink to="/dashboard/user/orders">Orders</NavLink>
      </li>
    </ul>
  );
};
