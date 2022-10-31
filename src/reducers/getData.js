const getDataReducer = (state = [], action) => {
  switch (action.type) {
    case "GET":
      return action.payload.data;

    case "PUT_INFO":
      let temp2 = { ...action.payload.data };
      temp2.id = action.payload.id;
      let found = state.findIndex(
        (element) => element.id === action.payload.id
      );
      state[found] = temp2;
      return state;

    case "PUT_CHECK":
      let temp3 = { ...action.payload.data };
      temp3.id = action.payload.id;
      temp3.checked = !action.payload.checked;
      state[action.payload.id - 1] = temp3;
      return state;
    default:
      return state;
  }
};

export default getDataReducer;
