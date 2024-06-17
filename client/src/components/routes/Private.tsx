import React from "react";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import axios from "axios";
import { Outlet } from "react-router-dom";
import CircularIndeterminate from "../Spinner";
export const Private = () => {
  const [auth, setAuth] = useAuth();
  const [ok, setOk] = useState(false);
  useEffect(() => {
    async function authCheck() {
      const res = await axios.get(
        "http://localhost:5000/api/v1/auth/user-auth",
        {
          headers: {
            Authorization: "Bearer " + auth?.token,
          },
        }
      );
      if (res.data.ok) {
        setOk(true);
      }
    }
    if (auth?.token) {
      authCheck();
    }
  }, [auth?.token]);
  return ok ? <Outlet /> : <CircularIndeterminate />;
};
