import React, { useState } from "react";

function TodoForm({ isEditing }) {
  const [inputValue, setInputValue] = useState("");
  const [nameIsValid, setNameIsValid] = useState(false);
  const [nameFocus, setNameFocus] = useState(false);

  const handleSubmitNewTodo = (e) => {
    e.preventDefault();
  };

  const handleNameChange = (e) => {
    const name = e.target.value;
    if (name.trim().length > 1 && name.length < 120 && nameFocus) {
      setNameIsValid(true);
    } else {
      setNameIsValid(false);
    }
    setInputValue(name);
  };

  const setRequired = nameFocus == true && nameIsValid == false;

  console.log(setRequired);
  console.log(false == 0);
  return (
    <div className={isEditing ? "edit-todo-form" : "new-todo-form"}>
      <form>
        <div className="new-todo-section">
          <div className="new-todo-input">
            <label htmlFor="newtodo-name">Name</label>
            <input
              type="text"
              value={inputValue}
              onChange={handleNameChange}
              onBlur={() => setNameFocus(true)}
              placeholder="Activity"
              name="newtodo-name"
              id="newtodo-name"
            />
            {!setRequired ? null : <span>Required</span>}
          </div>
        </div>
        <div className="new-todo-section">
          <div className="new-todo-input">
            <p>Priority</p>
            <select>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
          <div className="new-todo-input">
            <label htmlFor="newtodo-date">Due Date</label>
            <input type="date" name="newtodo-date" id="newtodo-date" />
          </div>
          <div className="todo-form-btns">
            <button type="submit" onClick={handleSubmitNewTodo}>
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default TodoForm;
