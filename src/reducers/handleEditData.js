const handleEditData = (state = {}, action) => {
  switch (action.type) {
    case "EDIT_DATA":
      state = action.payload;
      return state;
    default:
      return state;
  }
};

export default handleEditData;
