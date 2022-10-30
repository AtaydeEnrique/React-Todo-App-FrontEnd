import React from "react";
import TodoForm from "./TodoForm";

import "./TodoModal.css";
function TodoModal({ handleNew, newTodo, isEditing, handleEdit }) {
  return (
    <div className="todo-modal">
      <div className="todo-overlay">
        <h1>{newTodo ? "New Todo" : "Editing"}</h1>
        {newTodo && (
          <>
            <TodoForm isEditing={newTodo} />
            <button onClick={handleNew}>Cancel</button>
          </>
        )}
        {isEditing && (
          <>
            <TodoForm isEditing={isEditing} />
            <button onClick={handleEdit}>Cancel</button>
          </>
        )}
      </div>
    </div>
  );
}

export default TodoModal;
