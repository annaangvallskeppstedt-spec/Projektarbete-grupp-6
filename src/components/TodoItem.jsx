import React from 'react';

function TodoItem({ task, deleteTask, toggleCompleted }) {
  return (
    <li className="todo">
      <div className="c-cb">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleCompleted(task.id)}
        />
        <label className="todo-label">{task.text}</label>
      </div>

      <div className="btn-group">
        <button className="btn btn-danger" onClick={() => deleteTask(task.id)}>
          Delete
        </button>
      </div>
    </li>
  );
}

export default TodoItem;