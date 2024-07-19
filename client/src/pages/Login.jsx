import { useEffect, useState } from "react";
import "./login.css";
import Layout from "../Layout/Layout";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/auth";
import { CookiesProvider, useCookies } from "react-cookie";
// import axios from "axios";
import axios from "@/axiosConfig";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookie] = useCookies(["accessToken"]);
  const navigate = useNavigate();
  const location = useLocation();

  const [auth, setAuth] = useAuth();

  const loginwithgoogle = () => {
    window.open("http://localhost:3851/auth/google/callback", "_self");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3851/api/v1/auth/login", {
        email,
        password,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          accessToken: res.data.token,
        });
        console.log("response handleSubmit login", res);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        localStorage.setItem("accessToken", res.data.accessToken);
        localStorage.setItem("refreshToken", res.data.refreshToken);
        // setCookie("accessToken", res.data?.accessToken, { path: "/" });
        navigate(location.state || "/documents");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
      navigate("/login", { state: { from: location }, replace: true });
    }
  };

  const user = localStorage.getItem("user");
  useEffect(() => {
    console.log(
      "Object.keys(user).length",
      user,
      user && Object.keys(user).length > 0
    );
    if (user && Object.keys(user).length > 0) {
      navigate("/documents");
    }
  });

  return (
    <div className="flex items-center justify-center h-full">
      <div className="login-page">
        <div className="form">
          <form className="login-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name=""
              id=""
              placeholder="email"
              className="rounded-2"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              name=""
              id=""
              placeholder="password"
              className="rounded-2"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
            <p className="message">
              Not Registerd?
              <span
                className="alert-link"
                onClick={() => navigate("/register")}
              >
                {" "}
                Create an account
              </span>
            </p>
          </form>
          <button className="login-with-google-btn" onClick={loginwithgoogle}>
            Sign In With Google
          </button>
          <p className="mt-4">
            <Link to="/forgot-password">Forgot Password?</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
