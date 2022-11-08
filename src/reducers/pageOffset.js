const pageOffset = (state = 0, action) => {
  switch (action.type) {
    case "SET_PAGE_OFFSET":
      state = action.payload.data;
      return state;

    default:
      return state;
  }
};

export default pageOffset;
