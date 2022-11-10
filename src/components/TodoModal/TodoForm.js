import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";

import "./TodoForm.css";

function TodoForm({ isEditing, isNew, handleNew, handleEdit, todoData }) {
  const [inputValue, setInputValue] = useState("");
  const [priority, setPriority] = useState(1);
  const [dueDate, setDueDate] = useState("0000-00-00");
  const [dateInput, setDateInput] = useState(true);
  const [nameIsValid, setNameIsValid] = useState(false);
  const [nameFocus, setNameFocus] = useState(false);
  const [nameChanged, setNameChanged] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isEditing) {
      setInputValue(todoData.name);
      setNameIsValid(true);
      setPriority(todoData.priority);
      setDueDate(
        todoData.dueDate ? todoData.dueDate.substring(0, 10) : "0000-00-00"
      );
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let start = new Date();
    let date;
    if (dueDate === "0000-00-00" || dueDate === "") {
      date = "";
    } else {
      date = `${dueDate}T${
        (start.getHours() < 10 ? "0" : "") + start.getHours()
      }:${(start.getMinutes() < 10 ? "0" : "") + start.getMinutes()}:${
        (start.getSeconds() < 10 ? "0" : "") + start.getSeconds()
      }.00`;
    }
    console.log(date);
    const data = {
      name: inputValue.trim(),
      priority: priority,
      dueDate: date,
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
      dispatch({ type: "RELOAD" });
    }
  };

  const handleNameChange = (e) => {
    const name = e.target.value;
    setNameChanged(true);
    if (name.trim().length >= 1 && name.length < 120 && nameFocus) {
      setNameIsValid(true);
    } else {
      setNameIsValid(false);
    }
    setInputValue(name);
  };

  const setRequired = nameChanged && nameFocus && nameIsValid === false;
  const validInputs = nameIsValid === true;
  return (
    <div className="todo-form">
      <form>
        <div className="todo-section">
          <div className={`todo-input ${setRequired ? "invalid-input" : ""}`}>
            <label htmlFor="newtodo-name">Name</label>

            <input
              type="text"
              value={inputValue}
              onChange={handleNameChange}
              onFocus={() => {
                setNameFocus(true);
              }}
              placeholder="Activity"
              name="name"
              id="name"
            />
          </div>
          {!setRequired ? null : (
            <span>Input a name between 1 and 120 characters</span>
          )}
        </div>
        <div className="todo-section">
          <div className="todo-input">
            <label>Priority</label>
            <select
              onChange={(e) => {
                setPriority(e.target.value);
              }}
              value={priority}
            >
              <option value={1}>High</option>
              <option value={2}>Medium</option>
              <option value={3}>Low</option>
            </select>
          </div>
          <div className="todo-input">
            <label htmlFor="todo-date">
              {isEditing && "Edit "}Due Date{dateInput && "?"}
            </label>
            <input
              type="checkbox"
              onClick={() => {
                setDateInput(!dateInput);
                !dateInput && setDueDate("0000-00-00");
              }}
            />
            <input
              onChange={(e) => {
                setDueDate(e.target.value);
              }}
              value={dueDate}
              type="date"
              name="newtodo-date"
              id="newtodo-date"
              disabled={dateInput}
            />
          </div>
          <div className={`form-btns ${!validInputs ? "disabled" : ""}`}>
            {!validInputs === true && (
              <p className="small-text">Fill all inputs to submit!</p>
            )}

            <button onClick={handleSubmit} disabled={!validInputs === true}>
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default TodoForm;
