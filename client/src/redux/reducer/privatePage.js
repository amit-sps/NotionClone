import Cookies from "js-cookie";
import * as constant from "../constant";

const initialState = {
  privatePages: [],
};

export const PrivatePageReducer = (state = initialState, action) => {
  switch (action.type) {
    case constant.SET_PRIVATE_PAGE:
      return {
        ...state,
        privatePages: action.data,
      };

    default:
      return state;
  }
};
