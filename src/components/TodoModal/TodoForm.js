import React, { useState, useEffect } from "react";
import axios from "axios";

function TodoForm({ isEditing, newTodo }) {
  const [inputValue, setInputValue] = useState("");
  const [nameIsValid, setNameIsValid] = useState(false);
  const [nameFocus, setNameFocus] = useState(false);

  const addTodo = async (item) => {
    const { data } = axios.post("http://localhost:9090/todos/", {
      name: inputValue,
      completed: false,
    });
  };

  const handleSubmit = (e) => {
    addTodo();
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

  const setRequired = nameFocus === true && nameIsValid === false;

  return (
    <div className="todo-form">
      <form>
        <div className="todo-section">
          <div className="todo-input">
            <label htmlFor="newtodo-name">Name</label>
            <input
              type="text"
              value={inputValue}
              onChange={handleNameChange}
              onBlur={() => setNameFocus(true)}
              placeholder="Activity"
              name="name"
              id="name"
            />
            {!setRequired ? null : <span>Required</span>}
          </div>
        </div>
        <div className="todo-section">
          <div className="todo-input">
            <p>Priority</p>
            <select>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
          <div className="todo-input">
            <label htmlFor="todo-date">Due Date</label>
            <input type="date" name="newtodo-date" id="newtodo-date" />
          </div>
          <div className="form-btns">
            <button type="submit" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default TodoForm;
