import React from 'react';

function TodoItem({ task, deleteTask, toggleCompleted }) {
  const formattedDate = new Date(task.deadline).toLocaleDateString(
    'en-US',
    { month: 'short', day: 'numeric', year: 'numeric' }
  );

  const isOverdue =
    !task.completed && new Date(task.deadline) < new Date();

  return (
    <li className="todo">
      <div className="c-cb">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleCompleted(task.id)}
        />
        <label className={`todo-label ${isOverdue ? 'overdue' : ''}`}>
          {task.text} — <small>{formattedDate}</small>
        </label>
      </div>

      <div className="btn-group">
        <button onClick={() => deleteTask(task.id)}>
          Delete
        </button>
      </div>
    </li>
  );
}

export default TodoItem;