import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useHttp from "../../hooks/use-http";

import "./TodoForm.css";

function TodoForm() {
  const [inputValue, setInputValue] = useState("");
  const [priority, setPriority] = useState(1);
  const [dueDate, setDueDate] = useState("");
  const [dateInput, setDateInput] = useState(true);
  const [nameIsValid, setNameIsValid] = useState(false);
  const [nameFocus, setNameFocus] = useState(false);
  const [nameChanged, setNameChanged] = useState(false);
  const isNew = useSelector((state) => state.newTodo);
  const isEditing = useSelector((state) => state.editTodo);
  const todoData = useSelector((state) => state.editData);
  const dispatch = useDispatch();
  const postData = useHttp();

  useEffect(() => {
    if (isEditing) {
      setInputValue(todoData.name);
      setNameIsValid(true);
      setPriority(todoData.priority);
      setDueDate(todoData.dueDate ? todoData.dueDate.substring(0, 10) : "");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let start = new Date();
    let date;
    if (dueDate === "") {
      date = "";
    } else {
      date = `${dueDate}T${
        (start.getHours() < 10 ? "0" : "") + start.getHours()
      }:${(start.getMinutes() < 10 ? "0" : "") + start.getMinutes()}:${
        (start.getSeconds() < 10 ? "0" : "") + start.getSeconds()
      }.00`;
    }
    const data = {
      name: inputValue.trim(),
      priority: priority,
      dueDate: date,
      completed: false,
    };

    if (isNew) {
      postData({
        url: `http://localhost:9090/todos/`,
        method: "POST",
        headers: new Headers({
          Accept: "application.json",
          "Content-Type": "application/json; charset=UTF-8",
        }),
        body: JSON.stringify(data),
      })
        .then(() => {
          dispatch({ type: "RELOAD" });
          dispatch({ type: "NEW_TODO" });
        })
        .catch();
    }

    if (isEditing) {
      postData({
        url: `http://localhost:9090/todos/${todoData.id}`,
        method: "PUT",
        headers: new Headers({
          "Content-type": "application/json; charset=UTF-8",
        }),
        body: JSON.stringify(data),
      })
        .then(() => {
          dispatch({
            type: "PUT_INFO",
            payload: { data: data, id: todoData.id },
          });
          dispatch({ type: "EDIT_TODO" });
        })
        .catch();
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
                !dateInput && setDueDate("");
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
