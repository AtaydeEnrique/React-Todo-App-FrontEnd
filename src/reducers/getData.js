const getDataReducer = (state = [], action) => {
  switch (action.type) {
    case "GET":
      state = action.payload.data.data;
      return state;

    case "PUT_INFO":
      let temp2 = { ...action.payload.data };
      temp2.id = action.payload.id;
      let found1 = state.findIndex(
        (element) => element.id === action.payload.id
      );
      state[found1] = temp2;
      return state;

    case "PUT_CHECK":
      let temp3 = { ...action.payload.data };
      temp3.id = action.payload.id;
      let found2 = state.findIndex(
        (element) => element.id === action.payload.id
      );
      temp3.checked = !action.payload.checked;
      state[found2] = temp3;
      return state;

    default:
      return state;
  }
};

export default getDataReducer;
