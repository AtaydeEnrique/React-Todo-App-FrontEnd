import React, { useState, useEffect } from "react";
import axios from "axios";

import Todo from "./Todo";
import "./TodoTable.css";

function TodoTable({ handling }) {
  const [isEditing, setIsEditing] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      // CORS, Cross Origin Resource Sharing
      const response = await axios.get("http://localhost:9090/todos/");
      setData(response);
    };

    fetchData();
  }, []);
  console.log(data);
  console.log(data?.data?.length);

  return (
    <>
      {data?.data?.length > 0 ? (
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
            {data?.data?.map((todo) => (
              <Todo key={todo.id} handling={handling} todo={todo} />
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
