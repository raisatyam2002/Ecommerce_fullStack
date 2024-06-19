import React from "react";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import axios from "axios";
import { Outlet } from "react-router-dom";
import CircularIndeterminate from "../Spinner";
export const AdminPrivate = () => {
  const [auth, setAuth] = useAuth();
  const [ok, setOk] = useState(false);
  useEffect(() => {
    async function authCheck() {
      const res = await axios.get(
        "http://localhost:5000/api/v1/auth/admin-auth",
        {
          headers: {
            Authorization: "Bearer " + auth?.token,
          },
        }
      );
      if (res.data.ok && auth.user.role === 1) {
        setOk(true);
      }
    }
    if (auth?.token) {
      authCheck();
    }
  }, [auth?.token, auth.user?.role]);
  return ok ? <Outlet /> : <CircularIndeterminate role={auth?.user?.role} />;
};
