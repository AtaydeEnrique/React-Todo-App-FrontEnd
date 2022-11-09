import React from "react";
import TodoForm from "./TodoForm";

import "./TodoModal.css";
function TodoModal({ handleNew, newTodo, isEditing, handleEdit, data }) {
  return (
    <>
      <div className="todo-modal">
        <div className="individual-todo sticky taped post-it-modal">
          <div className="individual-todo-header">
            <h1>{newTodo ? "New" : "Editing"} Todo</h1>
          </div>
          {newTodo && (
            <>
              <TodoForm isNew={newTodo} handleNew={handleNew} />
              <button className="form-cancel" onClick={handleNew}>
                Cancel
              </button>
            </>
          )}
          {isEditing && (
            <>
              <TodoForm
                isEditing={isEditing}
                handleEdit={handleEdit}
                todoData={data}
              />
              <button className="form-cancel" onClick={handleEdit}>
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default TodoModal;
