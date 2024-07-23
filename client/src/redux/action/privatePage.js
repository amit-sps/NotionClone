import axios from "axios";
import * as constant from "../constant";

export const getPrivatePages = (data) => async (dispatch) => {
  try {
    const token = localStorage.getItem("accessToken");
    const { data } = await axios("http://localhost:3851/api/v1/private", {
      headers: { Authorization: token },
    });
    dispatch({ type: constant.SET_PRIVATE_PAGE, data: data?.data || [] });
  } catch (error) {
    console.error("Error fetching documents:", error);
    dispatch({ type: constant.SET_PRIVATE_PAGE, data: [] });
  }
};
