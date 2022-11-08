const getInfoReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_INFO":
      state = action.payload.data;
      return state;

    default:
      return state;
  }
};

export default getInfoReducer;
