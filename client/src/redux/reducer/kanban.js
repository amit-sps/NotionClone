import * as constant from "../constant";

const initialState = {
  myKanbanBoards: [],
};

export const KanbanBoardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case constant.SET_KANBAN_BOARDS:
      return {
        ...state,
        myKanbanBoards: action.data,
      };

    default:
      return state;
  }
};
