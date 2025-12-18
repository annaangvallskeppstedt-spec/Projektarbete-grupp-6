import React, { useState } from 'react';


function TodoItem({ task, deleteTask, toggleCompleted, updateText }) {

  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  const formattedDate = new Date(task.deadline).toLocaleDateString(
    'en-US',
    { month: 'short', day: 'numeric', year: 'numeric' }
  );

  function formatTime(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    if (hours && mins) return `${hours}h ${mins}m`;
    if (hours) return `${hours}h`;
    return `${mins}m`;
  }
  
  const isOverdue =
    !task.completed && new Date(task.deadline) < new Date();

  function saveEdit() {
    if (editText.trim()) {
      updateText(task.id, editText.trim());
    }
    setIsEditing(false);
  }

  function cancelEdit() {
    setEditText(task.text);
    setIsEditing(false);
  }

  return (
    
<div className="formContainer">
    <li className="todo">
      <div className="c-cb">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleCompleted(task.id)}
        />

        <label className={`todo-label ${isOverdue ? 'overdue' : ''}`}>
          {isEditing ? (
            <input
              type="text"
              value={editText}
              autoFocus
              onChange={e => setEditText(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') saveEdit();
                if (e.key === 'Escape') cancelEdit();
              }}
            />
          ) : (
            <span>{task.text}</span>
          )}

          {' '}– {task.description}

          <small>
            {' '}
            – {formattedDate}
            – {formatTime(task.timeEstimate)}
            – ({task.category})
          </small>
        </label>
      </div>

      <div className="actions">
        {!task.completed && (
          isEditing ? (
            <>
              <button onClick={saveEdit}>Save</button>
              <button onClick={cancelEdit}>Cancel</button>
            </>
          ) : (
            <button onClick={() => setIsEditing(true)}>Edit</button>
          )
        )}

        <button onClick={() => deleteTask(task.id)}>
          Delete
        </button>
      </div>
    </li>
    </div>
  );
}

export default TodoItem;
