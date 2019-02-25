// Gom tất cả các Reduce con lại để hoạt động
import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorsReducer from "./errorsReducer";
import profileReduce from "./profileReduce";
import postReduce from "./postReduce";

// EXPORT
export default combineReducers({
  auth: authReducer,
  profile: profileReduce,
  errors: errorsReducer,
  post: postReduce
});
