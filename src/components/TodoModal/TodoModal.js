import React from "react";
import TodoForm from "./TodoForm";

import "./TodoModal.css";
function TodoModal({ handleNew, newTodo, isEditing, handleEdit, data }) {
  return (
    <div className="todo-modal">
      <div className="todo-overlay">
        <h1>{newTodo ? "New Todo" : "Editing"}</h1>
        {newTodo && (
          <>
            <TodoForm isNew={newTodo} handleNew={handleNew} />
            <button onClick={handleNew}>Cancel</button>
          </>
        )}
        {isEditing && (
          <>
            <TodoForm
              isEditing={isEditing}
              handleEdit={handleEdit}
              todoData={data}
            />
            <button onClick={handleEdit}>Cancel</button>
          </>
        )}
      </div>
    </div>
  );
}

export default TodoModal;
