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
    await axios.put(`http://localhost:9090/todos/${todo.id}`, {
      ...todo,
      completed: !isChecked,
    });
    dispatch({ type: "PUT_CHECK", payload: todo });
  };
  return (
    <tr>
      <td className="checkbox-wrap">
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
      </td>
      <td>{todo.name}</td>
      <td>
        {todo.priority === 1
          ? "High"
          : todo.priority === 2
          ? "Medium"
          : todo.priority === 3 && "Low"}
      </td>
      <td>{todo.dueDate ? todo.dueDate.substring(0, 10) : "No due date"}</td>
      <td className="action-icons">
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
      </td>
    </tr>
  );
}

export default Todo;
