import { combineReducers } from "redux";
import ErrorReducer from './errorReducer';
import ProjectReducer from "./projectReducer";
import BacklogReducer from "./backlogReducer";


export default combineReducers({
    errors: ErrorReducer,
    project: ProjectReducer,
    backlog: BacklogReducer
});