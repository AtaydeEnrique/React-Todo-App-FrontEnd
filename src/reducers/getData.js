const getDataReducer = (state = [], action) => {
  switch (action.type) {
    case "GET":
      return action.payload.data;

    case "PUT_INFO":
      // We assure we are viewing current info
      let temp2 = { ...action.payload.data };
      temp2.id = action.payload.id;
      let found1 = state.findIndex(
        (element) => element.id === action.payload.id
      );
      state[found1] = temp2;
      return state;

    case "PUT_CHECK":
      // We assure we are viewing current info
      let temp3 = { ...action.payload.data };
      temp3.id = action.payload.id;
      let found2 = state.findIndex(
        (element) => element.id === action.payload.id
      );
      temp3.checked = !action.payload.checked;
      state[found2] = temp3;
      return state;
    case "DELETE":
      // We assure we are always getting the updated array
      let found3 = state.findIndex((element) => element.id === action.payload);
      state.splice(found3, 1);
      return state;
    default:
      return state;
  }
};

export default getDataReducer;
