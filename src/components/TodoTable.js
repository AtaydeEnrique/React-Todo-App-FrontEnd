import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import Todo from "./Todo";
import "./TodoTable.css";

function TodoTable({ handling }) {
  const [sortBy, setSortBy] = useState("null");
  const [sortDirection, setDirection] = useState("asc");
  const [currPage, setCurrPage] = useState(0);
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.data);
  const reload = useSelector((state) => state.reload);
  const filter = useSelector((state) => state.filter);
  const info = useSelector((state) => state.info);

  useEffect(() => {
    const fetchData = async () => {
      // CORS, Cross Origin Resource Sharing
      const response = await axios.get("http://localhost:9090/todos");
      // console.log(response);

      dispatch({ type: "GET", payload: { data: response } });
      const infoResponse = await axios.get("http://localhost:9090/todos");
      dispatch({ type: "GET_INFO", payload: { data: infoResponse } });
      // console.log(infoResponse);
    };

    fetchData();
  }, [dispatch, reload, filter]);

  useEffect(() => {
    // const paginationHandler = async () => {
    //   const response = await axios.get(
    //     `http://localhost:9090/todos?sortBy=${sortBy}&direction=${sortDirection}&offset=${currPage}`
    //   );
    //   dispatch({ type: "GET", payload: { data: response } });
    // };
    // paginationHandler();
  }, [currPage, sortBy, sortDirection]);
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
                  Due Date <span>&lt;</span>
                  <span>&gt;</span>
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
              {[...Array(2).keys()].map((page) => (
                <span
                  onClick={() => {
                    setCurrPage(page);
                  }}
                  key={page}
                >
                  {page + 1}
                </span>
              ))}
            </div>
            <div>Total todos: 5</div> {/* Total Pages */}
          </div>
        </>
      ) : (
        <div>No data available</div>
      )}
    </>
  );
}

export default TodoTable;
