import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";

function TodoForm({ isEditing, isNew, handleNew, handleEdit, todoData }) {
  const [inputValue, setInputValue] = useState("");
  const [priority, setPriority] = useState("High");
  const [dueDate, setDueDate] = useState("0000-00-00");
  const [dateInput, setDateInput] = useState(true);
  const [nameIsValid, setNameIsValid] = useState(false);
  const [nameFocus, setNameFocus] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isEditing) setInputValue(todoData.name);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let start = new Date();
    let createdDate;
    if (dueDate === "0000-00-00") {
      createdDate = "";
    } else {
      createdDate = `${dueDate} ${start.getHours()}:${start.getMinutes()}:${start.getSeconds()}`;
    }
    const data = {
      name: inputValue.trim(),
      priority: priority,
      date: createdDate,
      completed: false,
    };

    if (isNew) {
      try {
        await axios.post("http://localhost:9090/todos/", data);
        dispatch({ type: "RELOAD" });
        handleNew();
      } catch (error) {
        console.log(error.response);
      }
    }

    if (isEditing) {
      await axios.put(`http://localhost:9090/todos/${todoData.id}`, data);
      dispatch({ type: "PUT_INFO", payload: { data: data, id: todoData.id } });
      handleEdit();
    }
  };

  const handleNameChange = (e) => {
    const name = e.target.value;
    let start = new Date();
    console.log(
      `${dueDate} ${start.getHours()}:${start.getMinutes()}:${start.getSeconds()}`
    );
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
            <label>Priority</label>
            <select
              onChange={(e) => {
                setPriority(e.target.value);
              }}
            >
              <option value={1}>High</option>
              <option value={2}>Medium</option>
              <option value={3}>Low</option>
            </select>
          </div>
          <div className="todo-input">
            <label htmlFor="todo-date">Due Date</label>
            <input
              type="checkbox"
              onClick={() => {
                setDateInput(!dateInput);
              }}
            />
            <input
              onChange={(e) => {
                setDueDate(e.target.value);
              }}
              type="date"
              name="newtodo-date"
              id="newtodo-date"
              disabled={dateInput}
            />
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
