
import axios from "axios";
import * as constant from "../constant";

export const getTeamSpaces = (data) => async (dispatch) => {
  try {
    const token = localStorage.getItem("accessToken");
    const { data } = await axios("http://localhost:3851/api/v1/teamspace", {
      headers: { Authorization: token },
    });
    dispatch({ type: constant.SET_TEAM_SPACE, data: data?.data || [] });
  } catch (error) {
    console.error("Error fetching documents:", error);
    dispatch({ type: constant.SET_TEAM_SPACE, data: [] });
  }
};
