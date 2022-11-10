const handleEdit = (state = false, action) => {
  switch (action.type) {
    case "EDIT_TODO":
      console.log(!state);
      return !state;
    default:
      return state;
  }
};

export default handleEdit;
