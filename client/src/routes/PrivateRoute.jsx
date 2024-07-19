import { useEffect, useState } from "react";
// import axios from "axios";
import axios from "@/axiosConfig";
import { useAuth } from "@/context/auth";
import { Outlet } from "react-router-dom";
import Spinner from "@/components/Spinner";
import NetworkApi from "@/Api/jwtInterceptor";
import { useNavigate } from "react-router-dom";

const ProtectedRoutes = () => {
  const [ok, setOk] = useState(false);

  const [auth] = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const authCheck = async () => {
      const res = await NetworkApi.get(
        "http://localhost:3851/api/v1/auth/user-auth"
      );
      if (res?.data?.ok) {
        setOk(true);
      } else {
        setOk(false);
        localStorage.clear();
      }
    };
    console.log("auth", auth);
    if (auth?.accessToken) authCheck();
  }, [auth]);

  console.log("auth check", auth, ok);
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    console.log(
      "Object.keys(user).length",
      auth.user,
      auth.user && Object.keys(auth.user).length > 0
    );
    // if (!auth.user && !Object.keys(auth.user).length > 0) {
    //   navigate("/login");
    // }
    if (accessToken) {
      setOk(true);
    }
  });

  return ok ? <Outlet /> : <Spinner />;
};

export default ProtectedRoutes;
