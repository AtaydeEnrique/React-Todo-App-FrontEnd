import React from "react";

import deleteIcon from "../assets/icons/delete.svg";
import editIcon from "../assets/icons/edit.svg";
import "./Todo.css";
function Todo({ handling, todo: { name, completed } }) {
  return (
    <tr>
      <td className="checkbox-wrap">
        <div className="todo-checkbox">
          <label>
            <input type="checkbox" />
          </label>
        </div>
      </td>
      <td>{name}</td>
      <td>Cell B</td>
      <td>Cell B</td>
      <td className="action-icons">
        <img
          className="edit-icon"
          src={editIcon}
          alt="edit"
          onClick={handling}
        />
        <p>/</p>
        <img className="delete-icon" src={deleteIcon} alt="delete" />
      </td>
    </tr>
  );
}

export default Todo;
