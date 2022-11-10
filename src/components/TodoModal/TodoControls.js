import React, { useState } from "react";
import ReactDOM from "react-dom";

import Filter from "../Filter";
import TodoModal from "../TodoModal/TodoModal";

const portalElement = document.querySelector("#modal");

function TodoControls({
  exiting,
  openControls,
  isEditing,
  handleEdit,
  editingData,
}) {
  const [newTodo, setNewTodo] = useState(false);

  const handleNew = () => {
    setNewTodo((event) => !event);
  };

  return (
    <div
      className={`todos-list-controls ${
        openControls ? "cs-open" : "cs-closed"
      } ${exiting ? "exiting" : ""}`}
    >
      <Filter />
      <div className="new-todo-wrapper">
        <button onClick={() => setNewTodo((s) => !s)}>+ NEW TODO</button>
        {isEditing &&
          ReactDOM.createPortal(
            <TodoModal
              isEditing={isEditing}
              handleEdit={handleEdit}
              data={editingData}
            />,
            portalElement
          )}
        {newTodo &&
          ReactDOM.createPortal(
            <TodoModal newTodo={newTodo} handleNew={handleNew} />,
            portalElement
          )}
      </div>
    </div>
  );
}

export default TodoControls;
