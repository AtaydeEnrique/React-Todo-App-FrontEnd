import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";

function TodoForm({ isEditing, isNew, handleNew, handleEdit, todoData }) {
  const [inputValue, setInputValue] = useState("");
  const [nameIsValid, setNameIsValid] = useState(false);
  const [nameFocus, setNameFocus] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isEditing) setInputValue(todoData.name);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: inputValue,
      completed: false,
    };

    if (isNew) {
      await axios.post("http://localhost:9090/todos/", data);
      dispatch({ type: "RELOAD" });
      handleNew();
    }

    if (isEditing) {
      await axios.put(`http://localhost:9090/todos/${todoData.id}`, data);
      dispatch({ type: "PUT_INFO", payload: { data: data, id: todoData.id } });
      handleEdit();
    }
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
            <button onClick={handleSubmit}>Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default TodoForm;
