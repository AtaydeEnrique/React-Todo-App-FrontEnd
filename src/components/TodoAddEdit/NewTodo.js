import React, { useState } from "react";
import TodoForm from "./TodoForm";
import "./NewTodo.css";

function NewTodo() {
  const [newTodo, setNewTodo] = useState(false);

  return (
    <div className="new-todo-wrapper">
      <button onClick={() => setNewTodo((s) => !s)}>+ New ToDo</button>
      {newTodo && <TodoForm />}
    </div>
  );
}

export default NewTodo;
