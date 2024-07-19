/* eslint-disable no-unused-vars */
import axios from "@/axiosConfig";
import { useAuth } from "@/context/auth";

const useRefreshToken = () => {
  const [auth, setAuth] = useAuth();

  const refresh = async () => {
    const response = await axios.post(
      "http://localhost:3851/api/v1/auth/refresh-token",
      {
        refreshToken: localStorage.getItem("refreshToken"),
      },
      {
        withCredentials: true,
      }
    );
    setAuth((prev) => {
      console.log(JSON.stringify(prev));
      console.log(response.data.accessToken);
      return { ...prev, accessToken: response.data.accessToken };
    });
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
