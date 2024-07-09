import React from "react";
import { NavLink } from "react-router-dom";
import classNames from "classnames";

export const AdminMenu = () => {
  const linkClasses = ({ isActive }: any) =>
    classNames(
      "w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600",
      {
        "bg-blue-500 text-white": isActive,
        "text-gray-900 dark:text-white": !isActive,
      }
    );
  return (
    <ul className="m-4 w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
      <li className="w-full px-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600">
        <NavLink to="/dashboard/admin/createCategory" className={linkClasses}>
          Create Category
        </NavLink>
      </li>
      <li className="w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600">
        <NavLink to="/dashboard/admin/createProduct" className={linkClasses}>
          Create Product
        </NavLink>
      </li>
      <li className="w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600">
        <NavLink to="/dashboard/admin/products " className={linkClasses}>
          Products List
        </NavLink>
      </li>
      <li className="w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600">
        <NavLink to="/dashboard/admin/users " className={linkClasses}>
          Users
        </NavLink>
      </li>
    </ul>
  );
};
