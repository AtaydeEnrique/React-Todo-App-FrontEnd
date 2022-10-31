import getDataReducer from "./getData";
import reloadReducer from "./reload";

import { combineReducers } from "@reduxjs/toolkit";

const rootReducers = combineReducers({
  data: getDataReducer,
  reload: reloadReducer,
});

export default rootReducers;
