import React, { useState } from "react";
import { useDispatch } from "react-redux";

import "./Filter.css";
function Filter() {
  const [name, setName] = useState("");
  const [priority, setPriority] = useState("NoF");
  const [completed, setCompleted] = useState("NoF");
  const dispatch = useDispatch();

  const submitFilterHandler = (e) => {
    e.preventDefault();
    dispatch({
      type: "SET_PAGE_OFFSET",
      payload: { data: 0 },
    });
    dispatch({
      type: "SET_FILTER",
      payload: [name.length === 0 ? "NoF" : name, priority, completed],
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
                <option value="NoF">All</option>
                <option value={1}>High</option>
                <option value={2}>Medium</option>
                <option value={3}>Low</option>
              </select>
            </div>
            <div className="todo-state-filter">
              <p>State</p>
              <select value={completed} onChange={completedFilterHandler}>
                <option value="NoF">All</option>
                <option value={true}>Done</option>
                <option value={false}>Undone</option>
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
