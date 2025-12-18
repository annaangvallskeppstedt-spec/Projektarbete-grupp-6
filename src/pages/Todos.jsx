import React from 'react';
import Navbar from "../components/Navbar";
import TodoList from "../components/TodoList";
import '../index.css'

function Todos() {
  return (
     <div className="container">
      <Navbar />

      <h2>To Do List</h2>

    
      <TodoList />
    </div>
  );
}

export default Todos;