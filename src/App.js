import React, { useState } from "react";
import ReactDOM from "react-dom";

import Filter from "./components/Filter";
import TodoTable from "./components/TodoTable";
import TodoModal from "./components/TodoModal/TodoModal";

import arrow from "./assets/icons/updown_arrow.svg";
import "./App.css";

const portalElement = document.querySelector("#modal");

function App() {
  const [isEditing, setIsEditing] = useState(false);
  const [editingData, setEditingData] = useState({});
  const [newTodo, setNewTodo] = useState(false);
  const [controlClass, setControlClass] = useState(false);
  const [controlsExit, setControlsExit] = useState(false);

  const controlsViewHandler = () => {
    setControlsExit(true);
    setTimeout(() => {
      setControlClass(false);
      setControlsExit(false);
    }, "500");
  };

  const handleEdit = (todo) => {
    if (!isEditing) {
      setEditingData(todo);
    }
    setIsEditing((event) => !event);
  };

  const handleNew = () => {
    setNewTodo((event) => !event);
  };

  return (
    <>
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
      <div className="App">
        <div className="app-title">
          <h1>Todo App</h1>
          <p className="small-text">Ricardo Enrique Ortega Atayde</p>
        </div>
        <div className="todos-app">
          {controlClass && (
            <div
              className={`todos-list-controls ${
                controlClass ? "cs-open" : "cs-closed"
              } ${controlsExit ? "exiting" : ""}`}
            >
              <Filter />
              <div className="new-todo-wrapper">
                <button onClick={() => setNewTodo((s) => !s)}>
                  + NEW TODO
                </button>
              </div>
            </div>
          )}
          <img
            className={`controls-button${controlClass ? " clicked" : ""}`}
            src={arrow}
            onClick={() => {
              if (controlClass) {
                controlsViewHandler();
              } else {
                setControlClass((s) => !s);
              }
            }}
            alt="arrow"
          />
          <p className="small-text">
            Click to {controlClass ? "close" : "open"} controls
          </p>
          <TodoTable handling={handleEdit} />
        </div>
      </div>
    </>
  );
}

export default App;
