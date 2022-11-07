import getDataReducer from "./getData";
import reloadReducer from "./reload";
import setFiltersReducer from "./setFilters";
import getInfoReducer from "./getInfo";
import pageOffset from "./pageOffset";

import { combineReducers } from "@reduxjs/toolkit";

const rootReducers = combineReducers({
  data: getDataReducer,
  reload: reloadReducer,
  filter: setFiltersReducer,
  info: getInfoReducer,
  offset: pageOffset,
});

export default rootReducers;
