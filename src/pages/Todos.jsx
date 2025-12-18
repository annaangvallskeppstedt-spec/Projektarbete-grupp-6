import React from 'react';
import Navbar from "../components/navbar";
import TodoList from "../components/TodoList";
import '../index.css'

function Todos() {
  return (
    <div className="todoapp">
      <Navbar />

      <h2>To Do List</h2>

    
      <TodoList />
    </div>
  );
}

export default Todos;