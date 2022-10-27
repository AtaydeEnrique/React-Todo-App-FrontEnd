import React, { useState } from "react";
import Filter from "./components/Filter";
import NewTodo from "./components/TodoAddEdit/NewTodo";
import TodoTable from "./components/TodoTable";
import "./App.css";
import EditTodo from "./components/TodoAddEdit/EditTodo";

function App() {
  const [isEditing, setIsEditing] = useState(false);
  const handleEdit = () => {
    setIsEditing((editing) => !editing);
  };

  return (
    <>
      {isEditing && <EditTodo isEditing={isEditing} handleEdit={handleEdit} />}
      <div className="App">
        <div>
          <h1>To do List</h1>
        </div>
        <div>
          <Filter />
          <NewTodo />
          <TodoTable handling={handleEdit} />
        </div>
      </div>
    </>
  );
}

export default App;
