import Cookies from "js-cookie";
import * as constant from "../constant";

const initialState = {
  teamSpaces: [],
};

export const TeamSpaceReducer = (state = initialState, action) => {
  switch (action.type) {
    case constant.SET_TEAM_SPACE:
      return {
        ...state,
        teamSpaces: action.data,
      };

    default:
      return state;
  }
};
