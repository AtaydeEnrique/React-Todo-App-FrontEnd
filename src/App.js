import React, { useState } from "react";
import Filter from "./components/Filter";
import TodoTable from "./components/TodoTable";
import "./App.css";
import TodoModal from "./components/TodoModal/TodoModal";

function App() {
  const [isEditing, setIsEditing] = useState(false);
  const [editingData, setEditingData] = useState({});
  const [newTodo, setNewTodo] = useState(false);

  const handleEdit = (todo) => {
    if (!isEditing) {
      setEditingData(todo);
    }
    setIsEditing((event) => !event);
  };

  const handleNew = () => {
    setNewTodo((event) => !event);
  };

  return (
    <>
      {isEditing && (
        <TodoModal
          isEditing={isEditing}
          handleEdit={handleEdit}
          data={editingData}
        />
      )}
      {newTodo && <TodoModal newTodo={newTodo} handleNew={handleNew} />}
      <div className="App">
        <div>
          <h1>To do List</h1>
        </div>
        <div>
          <Filter />
          <div className="new-todo-wrapper">
            <button onClick={() => setNewTodo((s) => !s)}>+ New ToDo</button>
          </div>
          <TodoTable handling={handleEdit} />
        </div>
      </div>
    </>
  );
}

export default App;
