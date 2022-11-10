import React, { useState } from "react";
import { useSelector } from "react-redux";
import ReactDOM from "react-dom";

import TodoTable from "./components/TodoTable";
import TodoModal from "./components/TodoModal/TodoModal";
import TodoControls from "./components/TodoModal/TodoControls";

import arrow from "./assets/icons/updown_arrow.svg";
import "./App.css";

const portalElement = document.querySelector("#modal");
function App() {
  const [controlClass, setControlClass] = useState(false);
  const [controlsExit, setControlsExit] = useState(false);
  const editTodo = useSelector((state) => state.editTodo);

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

  return (
    <>
      <div className="App">
        <div className="app-title">
          <h1>Todo App</h1>
          <p className="small-text">Ricardo Enrique Ortega Atayde</p>
        </div>
        <div className="todos-app">
          {controlClass && (
            <TodoControls exiting={controlsExit} openControls={controlClass} />
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
          <TodoTable />
        </div>
      </div>
      {editTodo && ReactDOM.createPortal(<TodoModal />, portalElement)}
    </>
  );
}

export default App;
