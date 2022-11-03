import React, { useState } from "react";
import { useDispatch } from "react-redux";

import "./Filter.css";
function Filter() {
  const [name, setName] = useState("");
  const [priority, setPriority] = useState("all");
  const [completed, setCompleted] = useState("all");
  const dispatch = useDispatch();

  const submitFilterHandler = (e) => {
    e.preventDefault();
    dispatch({
      type: "SET_FILTER",
      payload: [name, priority, completed],
    });
  };

  const nameFilterHandler = (e) => {
    setName(e.target.value);
  };

  const priorityFilterHandler = (e) => {
    setPriority(e.target.value);
  };

  const completedFilterHandler = (e) => {
    setCompleted(e.target.value);
  };

  return (
    <div className="todo-filter-section">
      <form>
        <div className="todo-name-filter">
          <label htmlFor="todo-name">Name</label>
          <input
            type="text"
            placeholder="Filter by text..."
            name="todo-name"
            id="todo-name"
            value={name}
            onChange={nameFilterHandler}
          />
        </div>
        <div className="todo-filter-wrapper">
          <div className="todo-drop-filters">
            <div className="todo-prio-filter">
              <p>Priority</p>
              <select value={priority} onChange={priorityFilterHandler}>
                <option value="all">All</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
            <div className="todo-state-filter">
              <p>State</p>
              <select value={completed} onChange={completedFilterHandler}>
                <option value="all">All</option>
                <option value="done">Done</option>
                <option value="undone">Undone</option>
              </select>
            </div>
          </div>
          <div className="todo-filter-button">
            <button type="submit" onClick={submitFilterHandler}>
              Search
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Filter;
