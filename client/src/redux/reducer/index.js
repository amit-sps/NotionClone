import { combineReducers } from "redux";
import { PrivatePageReducer } from "./privatePage";
import { TeamSpaceReducer } from "./teamspace";
import { KanbanBoardsReducer } from "./kanban";

const reducer = combineReducers({
  PrivatePageReducer,
  TeamSpaceReducer,
  KanbanBoardsReducer,
});

export default reducer;
