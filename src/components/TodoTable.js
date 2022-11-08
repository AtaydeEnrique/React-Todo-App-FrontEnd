import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Todo from "./Todo";

import leftArrow from "../assets/icons/left_arrow.svg";
import rightArrow from "../assets/icons/right_arrow.svg";
import "./TodoTable.css";

function TodoTable({ handling }) {
  const [sortBy, setSortBy] = useState("null");
  const [sortDirection, setDirection] = useState("");
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.data);
  const reload = useSelector((state) => state.reload);
  const filter = useSelector((state) => state.filter);
  const info = useSelector((state) => state.info);
  const offset = useSelector((state) => state.offset);

  useEffect(() => {
    const fetchData = async () => {
      // CORS, Cross Origin Resource Sharing
      const response = await axios.get(
        `http://localhost:9090/todos?sortBy=${sortBy}&filterBy=${
          filter.length === 0 ? ",," : filter.join(",")
        }&direction=${sortDirection}&offset=${offset}`
      );
      dispatch({ type: "GET", payload: { data: response.data[0] } });
      dispatch({ type: "GET_INFO", payload: { data: response.data[1] } });
    };

    fetchData();
  }, [dispatch, reload, filter, offset, sortBy, sortDirection]);
  return (
    <>
      {todos?.length > 0 ? (
        <>
          <div className="todo-sorting-wrap">
            <div className="todo-sort-component">
              <p>Priority</p>
              <div className="sort-component-arrows">
                <img
                  src={leftArrow}
                  onClick={() => {
                    setSortBy("priority");
                    setDirection("desc");
                  }}
                />
                <img
                  src={rightArrow}
                  onClick={() => {
                    setSortBy("priority");
                    setDirection("asc");
                  }}
                />
              </div>
            </div>
            <div className="todo-sort-component">
              <p>Due Date</p>
              <div className="sort-component-arrows">
                <img
                  src={leftArrow}
                  onClick={() => {
                    setSortBy("date");
                    setDirection("asc");
                  }}
                />
                <img
                  src={rightArrow}
                  onClick={() => {
                    setSortBy("date");
                    setDirection("desc");
                  }}
                />
              </div>
            </div>
          </div>
          <div className="todos-wrap">
            {todos?.map((todo) => (
              <Todo key={todo.id} handling={handling} todo={todo} />
            ))}
          </div>
          <div className="todos-pagination">
            <div className="todos-pages">
              {/* Pagination */}
              {[...Array(info.totalPages).keys()].map((page) => (
                <span
                  onClick={() => {
                    dispatch({
                      type: "SET_PAGE_OFFSET",
                      payload: { data: page },
                    });
                  }}
                  key={page}
                >
                  {page + 1}
                </span>
              ))}
            </div>
            <div>Total todos: {info.totalTodos}</div> {/* Total Pages */}
          </div>
          <div className="tasks-time-table">
            <div className="time-table-component">
              <h3>Average time to finish tasks</h3>
              <div>
                <p>
                  {(info.averages.totalAv.toFixed(2) / 60).toFixed(2)} Minutes
                </p>
              </div>
            </div>
            <div>
              <h3>Average time to finish tasks by priority</h3>
              <div>
                <p>High: {(info.averages.hiAv / 60).toFixed(2)} Minutes</p>
              </div>
              <div>
                <p>Medium: {(info.averages.medAv / 60).toFixed(2)} Minutes</p>
              </div>
              <div>
                <p>Low: {(info.averages.lowAv / 60).toFixed(2)} Minutes</p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div>No data available</div>
      )}
    </>
  );
}

export default TodoTable;
