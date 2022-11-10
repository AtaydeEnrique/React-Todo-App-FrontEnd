import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useHttp from "../hooks/use-http";

import Todo from "./Todo";
import TodoPagination from "./TodoPagination";

import leftArrow from "../assets/icons/left_arrow.svg";
import rightArrow from "../assets/icons/right_arrow.svg";
import "./TodoTable.css";

function TodoTable() {
  const [sortBy, setSortBy] = useState("null");
  const [sortDirection, setDirection] = useState("");
  const fetchData = useHttp();
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.data);
  const reload = useSelector((state) => state.reload);
  const filter = useSelector((state) => state.filter);
  const info = useSelector((state) => state.info);
  const offset = useSelector((state) => state.offset);

  useEffect(() => {
    const saveData = (data) => {
      dispatch({ type: "GET", payload: { data: data[0] } });
      dispatch({ type: "GET_INFO", payload: { data: data[1] } });
    };
    try {
      fetchData(
        {
          url: `http://localhost:9090/todos?sortBy=${sortBy}&filterBy=${
            filter.length === 0 ? ",," : filter.join(",")
          }&direction=${sortDirection}&offset=${offset}`,
        },
        saveData
      );
    } catch (e) {}
  }, [dispatch, reload, filter, offset, sortBy, sortDirection]);

  return (
    <>
      {todos?.length > 0 ? (
        <>
          <TodoPagination
            totalPages={info.totalPages}
            totalTodos={info.totalTodos}
            offset={offset}
            up={true}
          />
          <div className="todo-sorting-wrap">
            <p>Sort by</p>
            <div className="todo-sorting-body">
              <div className="todo-sort-component">
                <p>Priority</p>
                <div className="sort-component-arrows">
                  <img
                    src={leftArrow}
                    onClick={() => {
                      setSortBy("priority");
                      setDirection("desc");
                    }}
                    alt="descending sort arrow"
                  />
                  <img
                    src={rightArrow}
                    onClick={() => {
                      setSortBy("priority");
                      setDirection("asc");
                    }}
                    alt="ascending sort arrow"
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
                    alt="descending sort arrow"
                  />
                  <img
                    src={rightArrow}
                    onClick={() => {
                      setSortBy("date");
                      setDirection("desc");
                    }}
                    alt="ascending sort arrow"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="todos-wrap">
            {todos?.map((todo) => (
              <Todo key={todo.id} todo={todo} />
            ))}
          </div>
          <TodoPagination
            totalPages={info.totalPages}
            totalTodos={info.totalTodos}
            offset={offset}
            up={false}
          />
          <div className="tasks-time-table">
            <div className="time-table-component">
              <h3>Average time to finish tasks</h3>
              <div>
                <p>
                  {(info.averages.totalAv.toFixed(2) / 60).toFixed(2)} Minutes
                </p>
              </div>
            </div>
            <div className="time-table-component">
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
        <div className="todos-nodata">
          <h1>No data available</h1>
          <p>Open controls to start adding data!</p>
        </div>
      )}
    </>
  );
}

export default TodoTable;
