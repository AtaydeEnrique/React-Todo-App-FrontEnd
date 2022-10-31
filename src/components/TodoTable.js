import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import Todo from "./Todo";
import "./TodoTable.css";

function TodoTable({ handling }) {
  const [deleteItem, setDeleteItem] = useState(false);
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.data);
  const reload = useSelector((state) => state.reload);

  const deleteItemHandler = () => {
    setDeleteItem((event) => !event);
  };

  useEffect(() => {
    const fetchData = async () => {
      // CORS, Cross Origin Resource Sharing
      const response = await axios.get("http://localhost:9090/todos/");
      dispatch({ type: "GET", payload: response });
    };

    fetchData();
  }, [dispatch, deleteItem, reload]);

  return (
    <>
      {todos?.length > 0 ? (
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
              <th>Priority &lt; &gt;</th>
              <th>Due Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {todos?.map((todo) => (
              <Todo
                key={todo.id}
                handling={handling}
                todo={todo}
                deleteItemHandler={deleteItemHandler}
              />
            ))}
          </tbody>
        </table>
      ) : (
        <div>No data available</div>
      )}
    </>
  );
}

export default TodoTable;
