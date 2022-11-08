import React, { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import deleteIcon from "../assets/icons/delete.svg";
import editIcon from "../assets/icons/edit.svg";

import "./Todo.css";
function Todo({ handling, todo }) {
  const [isChecked, setIsChecked] = useState(todo.completed);
  const dispatch = useDispatch();

  const closeEditModalHandler = (e) => {
    handling(todo);
  };

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
  return (
    <>
      <div className="individual-todo sticky taped">
        <div className="individual-todo-header">
          <h3>{todo.name}</h3>
          <p>
            {todo.priority === 1
              ? "High"
              : todo.priority === 2
              ? "Medium"
              : todo.priority === 3 && "Low"}
          </p>
        </div>
        <div className="individual-todo-body">
          <div className="individual-todo-info">
            <p>
              {todo.dueDate
                ? "Due to: " + todo.dueDate.substring(0, 10)
                : "No due date"}
            </p>

            <p>
              {todo.completedDate
                ? "Date of completion: " + todo.completedDate.substring(0, 10)
                : "Not completed yet"}
            </p>
          </div>
          <div className="individual-todo-completed">
            <div className="todo-checkbox">
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
          <img
            className="edit-icon"
            src={editIcon}
            alt="edit"
            onClick={closeEditModalHandler}
          />
          <p>/</p>
          <img
            className="delete-icon"
            src={deleteIcon}
            alt="delete"
            onClick={deleteTodoHandler}
          />
        </div>
      </div>
    </>
  );
}

export default Todo;
