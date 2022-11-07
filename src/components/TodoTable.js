import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import Todo from "./Todo";
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
          <table className="todo-table">
            <thead>
              <tr>
                <th>
                  <div className="todo-checkbox">
                    <label>
                      <input type="checkbox" name="" />
                    </label>
                  </div>
                </th>
                <th>Name</th>
                <th>
                  Priority
                  <span
                    onClick={() => {
                      setSortBy("priority");
                      setDirection("desc");
                    }}
                  >
                    &lt;
                  </span>
                  <span
                    onClick={() => {
                      setSortBy("priority");
                      setDirection("asc");
                    }}
                  >
                    &gt;
                  </span>
                </th>
                <th>
                  Due Date{" "}
                  <span
                    onClick={() => {
                      setSortBy("date");
                      setDirection("desc");
                    }}
                  >
                    &lt;
                  </span>
                  <span
                    onClick={() => {
                      setSortBy("date");
                      setDirection("asc");
                    }}
                  >
                    &gt;
                  </span>
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {todos?.map((todo) => (
                <Todo key={todo.id} handling={handling} todo={todo} />
              ))}
            </tbody>
          </table>
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
        </>
      ) : (
        <div>No data available</div>
      )}
    </>
  );
}

export default TodoTable;
