import React from "react";
import { useDispatch } from "react-redux";

import "./TodoPagination.css";
function TodoPagination({ totalPages, totalTodos, offset, up }) {
  const dispatch = useDispatch();

  return (
    <div className={`todos-pagination ${up ? "pagination1" : "pagination2"}`}>
      {up && <p className="todos-total">Total todos: {totalTodos}</p>}
      <div className="todos-pages">
        {/* Pagination */}
        {[...Array(totalPages).keys()].map((page) => (
          <span
            className={offset == page && "current-page"}
            onClick={() => {
              window.scrollTo(0, 0);
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
      {!up && <p className="todos-total">Total todos: {totalTodos}</p>}
    </div>
  );
}

export default TodoPagination;
