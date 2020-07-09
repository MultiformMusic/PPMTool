import { combineReducers } from "redux";
import ErrorReducer from './errorReducer';
import ProjectReducer from "./projectReducer";

export default combineReducers({
    errors: ErrorReducer,
    project: ProjectReducer
});