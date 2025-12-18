import React from 'react';
import Navbar from "../components/Navbar";
import TodoList from "../components/TodoList";
import '../index.css'

function Todos() {
  return (
    <div className="todoapp">
      <Navbar />

      <h1>To Do List</h1>

    
      <TodoList />
    </div>
  );
}

export default Todos;