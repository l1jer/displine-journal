// 这里载入所有的 reducer
import { combineReducers } from "redux";

import auth from "./auth";

export default combineReducers({
  auth,
});
