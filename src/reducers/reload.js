const reloadReducer = (state = false, action) => {
  switch (action.type) {
    case "RELOAD":
      state = !state;
      return state;
    default:
      return state;
  }
};

export default reloadReducer;
