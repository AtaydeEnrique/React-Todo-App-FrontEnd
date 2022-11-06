import getDataReducer from "./getData";
import reloadReducer from "./reload";
import setFiltersReducer from "./setFilters";
import getInfoReducer from "./getInfo";

import { combineReducers } from "@reduxjs/toolkit";

const rootReducers = combineReducers({
  data: getDataReducer,
  reload: reloadReducer,
  filter: setFiltersReducer,
  info: getInfoReducer,
});

export default rootReducers;
