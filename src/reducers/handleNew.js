const handleNew = (state = false, action) => {
  switch (action.type) {
    case "NEW_TODO":
      return !state;
    default:
      return state;
  }
};

export default handleNew;
