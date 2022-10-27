import React from "react";

import "./Filter.css";
function Filter() {
  const submitFilterHandler = (e) => {
    e.preventDefault();
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
          />
        </div>
        <div className="todo-filter-wrapper">
          <div className="todo-drop-filters">
            <div className="todo-prio-filter">
              <p>Priority</p>
              <select>
                <option value="all">All</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
            <div className="todo-state-filter">
              <p>State</p>
              <select>
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
