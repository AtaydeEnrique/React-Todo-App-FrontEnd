import React, { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import deleteIcon from "../assets/icons/delete.svg";
import editIcon from "../assets/icons/edit.svg";

import "./Todo.css";
function Todo({ handling, todo, deleteItemHandler }) {
  const [isChecked, setIsChecked] = useState(todo.completed);
  const dispatch = useDispatch();

  const closeEditModalHandler = (e) => {
    handling(todo);
  };

  const deleteTodoHandler = async () => {
    dispatch({ type: "CHANGE_ID", payload: { id: todo.id } });
    await axios.delete(`http://localhost:9090/todos/${todo.id}`);
    deleteItemHandler();
  };

  const changeCompletedHandler = async () => {
    await axios.put(`http://localhost:9090/todos/${todo.id}`);
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
            />
          </label>
        </div>
      </td>
      <td>{todo.name}</td>
      <td>Cell B</td>
      <td>Cell B</td>
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
