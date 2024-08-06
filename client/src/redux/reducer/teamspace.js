import Cookies from "js-cookie";
import * as constant from "../constant";

const initialState = {
  teamSpaces: [],
  documentsList: {},
};

export const TeamSpaceReducer = (state = initialState, action) => {
  switch (action.type) {
    case constant.SET_TEAM_SPACE:
      return {
        ...state,
        teamSpaces: action.data,
      };
    case constant.SET_TEAM_SPACE_DOCUMENTS:
      return {
        ...state,
        documentsList: {
          ...state.documentsList,
          [action.teamSpace]: action.data,
        },
      };
    default:
      return state;
  }
};
