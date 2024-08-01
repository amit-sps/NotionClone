import { useAuth } from "@/context/auth";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, useSearchParams } from "react-router-dom";

const Authenticated = ({ element }) => {
  const [{ user }, setAuth] = useAuth();
  const [auth] = useAuth();

  const [loading, setLoading] = useState(true);
  const [params] = useSearchParams();
  const googleToken = params.get("googleToken");
  if (googleToken) {
    localStorage.setItem("accessToken", googleToken);
  }

  useEffect(() => {
    //get user if he is login with google and if normal login then this one is not run
    const getUser = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3851/api/v1/auth/login/success",
          { headers: { Authorization: googleToken || localStorage.getItem("accessToken") } }
        );
        if (res && res.data.success) {
          console.log(res.data.user);
          setAuth({
            ...auth,
            user: res.data.user,
          });
          localStorage.setItem("user", JSON.stringify(res.data.user));
          localStorage.setItem("accessToken", res.data.accessToken);
          localStorage.setItem("refreshToken", res.data.refreshToken);
          setLoading(false);
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    getUser();
  }, []);

  return loading ? (
    <>Loading...</>
  ) : user ? (
    <>{element}</>
  ) : (
    <Navigate to={"/login"} />
  );
};

export default Authenticated;
