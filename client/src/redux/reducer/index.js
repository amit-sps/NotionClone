import { combineReducers } from "redux";
import { PrivatePageReducer } from "./privatePage";
import { TeamSpaceReducer } from "./teamspace";


const  reducer = combineReducers({PrivatePageReducer, TeamSpaceReducer});

export default reducer;