const getInfoReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_INFO":
      return state;

    default:
      return state;
  }
};

export default getInfoReducer;
