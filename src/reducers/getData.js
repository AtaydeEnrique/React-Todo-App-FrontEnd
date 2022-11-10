const getDataReducer = (state = [], action) => {
  switch (action.type) {
    case "GET":
      state = action.payload.data;
      return state;

    default:
      return state;
  }
};

export default getDataReducer;
