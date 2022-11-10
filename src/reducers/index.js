import getDataReducer from "./getData";
import reloadReducer from "./reload";
import setFiltersReducer from "./setFilters";
import getInfoReducer from "./getInfo";
import pageOffset from "./pageOffset";
import handleNew from "./handleNew";
import handleEdit from "./handleEdit";
import handleEditData from "./handleEditData";

import { combineReducers } from "@reduxjs/toolkit";

const rootReducers = combineReducers({
  data: getDataReducer,
  reload: reloadReducer,
  filter: setFiltersReducer,
  info: getInfoReducer,
  offset: pageOffset,
  newTodo: handleNew,
  editTodo: handleEdit,
  editData: handleEditData,
});

export default rootReducers;
