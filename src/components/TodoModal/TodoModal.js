import React from "react";
import { useDispatch, useSelector } from "react-redux";

import TodoForm from "./TodoForm";

import "./TodoModal.css";

function TodoModal() {
  const newTodo = useSelector((state) => state.newTodo);
  const editTodo = useSelector((state) => state.editTodo);
  const dispatch = useDispatch();

  return (
    <div className="todo-modal">
      <div className="individual-todo sticky taped post-it-modal">
        <div className="individual-todo-header">
          <h1>{newTodo ? "New" : "Editing"} Todo</h1>
        </div>

        {editTodo && (
          <>
            <TodoForm />
            <button
              className="form-cancel"
              onClick={() => {
                dispatch({ type: "EDIT_TODO" });
              }}
            >
              Cancel
            </button>
          </>
        )}
        {newTodo && (
          <>
            <TodoForm />
            <button
              className="form-cancel"
              onClick={() => {
                dispatch({ type: "NEW_TODO" });
              }}
            >
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default TodoModal;
