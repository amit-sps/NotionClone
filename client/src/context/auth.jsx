// import axios from "axios";
import axios from "@/axiosConfig";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useLayoutEffect,
  useRef,
} from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
const AuthContext = createContext(null);

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
  const token = localStorage.getItem("accessToken");
  const [auth, setAuth] = useState(
    {
      user: null,
      accessToken: "",
    },
    []
  );
  const navigate = useNavigate();
  const socket = useRef();

  axios.defaults.headers.common["Authorization"] = token;
  useEffect(() => {
    socket.current = io("http://localhost:3851", { transports: ["websocket"] });
  }, []);

  useLayoutEffect(() => {
    // let isMounted = true;
    // const controller = new AbortController();
    // const data = localStorage.getItem("user");
    // const token = localStorage.getItem("accessToken");
    // if (data) {
    //   const parsData = JSON.parse(data);
    //   setAuth({
    //     ...auth,
    //     user: parsData,
    //     token: token,
    //   });
    // }
    // else {
    //   //get user if he is login with google login option and if normal login then this one is not run
    //   const getUser = async () => {
    //     try {
    //       const res = await axios.get(
    //         "http://localhost:3851/api/v1/auth/login/success",
    //         {
    //           signal: controller.signal,
    //         }
    //       );
    //       console.log("response check", res);
    //       if (res && res.data.success) {
    //         toast.success(res.data && res.data.message);
    //         isMounted &&
    //           setAuth({
    //             ...auth,
    //             user: res.data.user,
    //           });
    //         localStorage.setItem("user", JSON.stringify(res.data.user));
    //         localStorage.setItem("accessToken", res.data.accessToken);
    //         localStorage.setItem("refreshToken", res.data.refreshToken);
    //         navigate(location.state || "/documents");
    //       } else {
    //         toast.error(res.data.message);
    //       }
    //     } catch (error) {
    //       console.log("error", error);
    //       navigate("/login", { state: { from: location }, replace: true });
    //     }
    //   };
    //   getUser();
    // }
    // return () => {
    //   isMounted = false;
    //   controller.abort();
    // };
  }, []);

  return (
    <AuthContext.Provider value={[auth, setAuth, socket]}>
      {children}
    </AuthContext.Provider>
  );
};

//custom hooks
const useAuth = () => useContext(AuthContext);
// const useAuth = () => {
//   const { auth } = useContext(AuthContext);
//   useDebugValue(auth, (auth) => (auth?.user ? "Logged In" : "Logged Out"));
//   return useContext(AuthContext);
// };

export { useAuth, AuthProvider };
