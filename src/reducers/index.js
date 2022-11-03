import getDataReducer from "./getData";
import reloadReducer from "./reload";
import setFiltersReducer from "./setFilters";

import { combineReducers } from "@reduxjs/toolkit";

const rootReducers = combineReducers({
  data: getDataReducer,
  reload: reloadReducer,
  filter: setFiltersReducer,
});

export default rootReducers;
