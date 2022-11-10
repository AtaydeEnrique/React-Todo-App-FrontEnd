import React from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";

import Filter from "../Filter";
import TodoModal from "../TodoModal/TodoModal";

import "./TodoControls.css";
const portalElement = document.querySelector("#modal");
function TodoControls({ exiting, openControls }) {
  const newTodo = useSelector((state) => state.newTodo);
  const editTodo = useSelector((state) => state.editTodo);
  const dispatch = useDispatch();

  return (
    <div
      className={`todos-list-controls ${
        openControls ? "cs-open" : "cs-closed"
      } ${exiting ? "exiting" : ""}`}
    >
      <Filter />
      <div className="new-todo-wrapper">
        <button onClick={() => dispatch({ type: "NEW_TODO" })}>
          + NEW TODO
        </button>
        {newTodo &&
          ReactDOM.createPortal(<TodoModal newTodo={newTodo} />, portalElement)}
      </div>
    </div>
  );
}

export default TodoControls;
