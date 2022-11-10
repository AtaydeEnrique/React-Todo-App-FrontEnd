import React, { useState } from "react";

import TodoTable from "./components/TodoTable";

import arrow from "./assets/icons/updown_arrow.svg";
import "./App.css";
import TodoControls from "./components/TodoModal/TodoControls";

function App() {
  const [isEditing, setIsEditing] = useState(false);
  const [editingData, setEditingData] = useState({});
  const [controlClass, setControlClass] = useState(false);
  const [controlsExit, setControlsExit] = useState(false);

  const controlsViewHandler = () => {
    if (controlClass) {
      /* This setTimeout is used to delay unmount of component to handle
    animations before the component dissappears*/
      setControlsExit(true);
      setTimeout(() => {
        setControlClass(false);
        setControlsExit(false);
      }, "250");
    } else {
      setControlClass((s) => !s);
    }
  };

  const handleEdit = (todo) => {
    if (!isEditing) {
      setEditingData(todo);
    }
    setIsEditing((event) => !event);
  };

  return (
    <>
      <div className="App">
        <div className="app-title">
          <h1>Todo App</h1>
          <p className="small-text">Ricardo Enrique Ortega Atayde</p>
        </div>
        <div className="todos-app">
          {controlClass && (
            <TodoControls
              exiting={controlsExit}
              openControls={controlClass}
              isEditing={isEditing}
              handleEdit={handleEdit}
              editingData={editingData}
            />
          )}
          <img
            className={`controls-button${controlClass ? " clicked" : ""}`}
            src={arrow}
            onClick={controlsViewHandler}
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
