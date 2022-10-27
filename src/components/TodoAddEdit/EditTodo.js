import React from "react";

import "./EditTodo.css";
import TodoForm from "./TodoForm";
function EditTodo({ isEditing, handleEdit }) {
  return (
    <div className="todo-overlay">
      <div className="todo-edit">
        <h1>Editing</h1>
        <TodoForm isEditing={isEditing} handleEdit={handleEdit} />
        <button onClick={handleEdit}>Cancel</button>
      </div>
    </div>
  );
}

export default EditTodo;
