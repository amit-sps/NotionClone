import axios from "axios";

const NetworkApi = axios.create({
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

NetworkApi.interceptors.request.use(async (config) => {
  let tokenData = localStorage.getItem("accessToken");
  console.log("tokenData", tokenData, config);
  // if (tokenData) {
  config.headers["Authorization"] = tokenData;
  // }
  return config;
});
NetworkApi.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    let tokenData = localStorage.getItem("accessToken");

    console.log("token response error: ", error);
    if (error?.response?.data?.message === "Token Expired") {
      let refreshToken = localStorage.getItem("refreshToken");
      let payload = {
        refreshToken: refreshToken,
      };
      try {
        if (tokenData) {
          // for passing and updating the refresh token need to add withcredentials:true
          let apiResponse = await axios.post(
            "http://localhost:3851/api/v1/auth/refresh-token",
            payload,
            { withCredentials: true }
          );
          localStorage.setItem("refreshToken", apiResponse.data.refreshToken);
          localStorage.setItem("accessToken", apiResponse.data.accessToken);
          localStorage.setItem("user", JSON.stringify(apiResponse.data.user));
          console.log("data error", error);
          // Update the Authorization header with the new accessToken
          axios.defaults.headers.common["Authorization"] =
            apiResponse.data.accessToken;
          error.config.headers["Authorization"] = apiResponse.data.accessToken;
        }
        // Retry the original request with the new accessToken
        return axios(error.config);
        // }
      } catch (refreshError) {
        console.log("refresh error: ", refreshError.response.data);
        if (
          refreshError.response.data.message ===
          "Refresh token is expired or used"
        ) {
          localStorage.clear();
          window.open("http://localhost:5173/login", "_self");
        }
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject("reject error : ", error);
  }
);
export default NetworkApi;
