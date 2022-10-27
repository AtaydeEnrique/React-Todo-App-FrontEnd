import React, { useState } from "react";
import Todo from "./Todo";
import "./TodoTable.css";

function TodoTable({ handling }) {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <table className="todo-table">
      <thead>
        <tr>
          <th>
            <input type="checkbox" />
          </th>
          <th>Name</th>
          <th>Priority &lt; &gt;</th>
          <th>Due Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <Todo handling={handling} />
      </tbody>
    </table>
  );
}

export default TodoTable;
