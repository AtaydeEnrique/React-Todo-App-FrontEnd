import React, { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import deleteIcon from "../assets/icons/delete.svg";
import editIcon from "../assets/icons/edit.svg";

import "./Todo.css";
function Todo({ todo }) {
  const [isChecked, setIsChecked] = useState(todo.completed);
  const dispatch = useDispatch();

  const deleteTodoHandler = async () => {
    await axios.delete(`http://localhost:9090/todos/${todo.id}`);
    dispatch({ type: "RELOAD" });
  };

  const changeCompletedHandler = async () => {
    setIsChecked(!isChecked);
    if (isChecked) {
      // Request to set todo as completed
      await axios.put(`http://localhost:9090/todos/${todo.id}/undone`, {
        ...todo,
        completed: isChecked,
      });
    } else {
      // Request to set todo as completed
      await axios.put(`http://localhost:9090/todos/${todo.id}/done`, {
        ...todo,
        completed: isChecked,
      });
    }
    dispatch({ type: "PUT_CHECK", payload: todo });
    dispatch({ type: "RELOAD" });
  };

  const todoPriority =
    todo.priority === 1
      ? "High"
      : todo.priority === 2
      ? "Medium"
      : todo.priority === 3 && "Low";

  // Time left calculation --------- START
  let message = "";
  let messageClass;
  if (todo.dueDate) {
    const dueDate = new Date(todo.dueDate);
    let diff = Math.floor(dueDate.getTime() - new Date());
    let day = 1000 * 60 * 60 * 24;

    let days = Math.floor(diff / day);

    message += "Time left: ";
    message += days + " days / ";
    message += (days / 7).toFixed(2) + " weeks";
    messageClass = days / 7 <= 1 ? "red" : days / 7 <= 2 ? "yellow" : "green";
  }
  // Time left calculation --------- END
  const dueDateString = new Date(todo.dueDate).toString().substring(3, 15);
  let completedDateString = "";
  if (todo.completedDate) {
    completedDateString = new Date(todo.completedDate)
      .toString()
      .substring(3, 24);
  }
  return (
    <>
      <div className="individual-todo sticky taped">
        <div className="individual-todo-header">
          <h3 className={isChecked ? "header-text-done" : "header-text-undone"}>
            {todo.name}
          </h3>
          <p className={"header-prio header-" + todoPriority}>
            {todoPriority} Priority
          </p>
        </div>
        <div className="individual-todo-body">
          <div className="individual-todo-info">
            <p>{todo.dueDate ? "Due to: " + dueDateString : "No due date"}</p>
            {message && !isChecked && (
              <p className={"todo-info-time-left-" + messageClass}>{message}</p>
            )}
            <p>
              {todo.completedDate
                ? "Date of completion: " + completedDateString
                : "Not completed yet"}
            </p>
          </div>
          <div className="individual-todo-completed">
            <div className="todo-checkbox">
              <p className="small-text">Completed</p>
              <label>
                <input
                  type="checkbox"
                  value={isChecked}
                  onChange={changeCompletedHandler}
                  defaultChecked={isChecked}
                />
              </label>
            </div>
          </div>
        </div>
        <div className="individual-todo-actions">
          <div>
            <img
              className="edit-icon"
              src={editIcon}
              alt="edit"
              onClick={() => {
                dispatch({ type: "EDIT_TODO" });
                dispatch({ type: "EDIT_DATA", payload: todo });
              }}
            />
            <p className="small-text">Edit</p>
          </div>
          <p>/</p>
          <div>
            <img
              className="delete-icon"
              src={deleteIcon}
              alt="delete"
              onClick={deleteTodoHandler}
            />
            <p className="small-text">Delete</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Todo;
