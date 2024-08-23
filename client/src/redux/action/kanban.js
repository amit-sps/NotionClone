import axios from "axios";
import * as constant from "../constant";

export const getMyKanbanBoards = (data) => async (dispatch) => {
  try {
    const token = localStorage.getItem("accessToken");
    const { data } = await axios("http://localhost:3851/api/v1/kanban", {
      headers: { Authorization: token },
    });
    dispatch({ type: constant.SET_KANBAN_BOARDS, data: data?.data || [] });
  } catch (error) {
    console.error("Error fetching documents:", error);
    dispatch({ type: constant.SET_KANBAN_BOARDS, data: [] });
  }
};
