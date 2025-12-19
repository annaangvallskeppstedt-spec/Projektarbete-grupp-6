import React from 'react';
import Navbar from "../components/Navbar";
import TodoList from "../components/TodoList";
import '../index.css'

function Todos({ todos, setTodos }) {
  return (
    <div className="container">
      <Navbar />
      <h2>To Do List</h2>

      <TodoList todos={todos} setTodos={setTodos} />
    </div>
  );
}

export default Todos;