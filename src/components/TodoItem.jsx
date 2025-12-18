import React, { useState } from 'react';

function TodoItem({
  task,
  deleteTask,
  toggleCompleted,
  updateTask
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    text: task.text,
    deadline: task.deadline,
    category: task.category
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function saveEdit() {
    updateTask(task.id, form);
    setIsEditing(false);
  }

  const formattedDate = new Date(task.deadline).toLocaleDateString(
    'en-US',
    { month: 'short', day: 'numeric', year: 'numeric' }
  );

  return (
    
<div className="formContainer">
    <li className="todo">
      <div className="c-cb">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleCompleted(task.id)}
        />

        {isEditing ? (
          <div className="edit-form">
            <input
              name="text"
              value={form.text}
              onChange={handleChange}
            />

            <input
              type="date"
              name="deadline"
              value={form.deadline}
              onChange={handleChange}
            />

            <select
              name="category"
              value={form.category}
              onChange={handleChange}
            >
              <option value="work">work</option>
              <option value="home">home</option>
              <option value="parenting">parenting</option>
              <option value="errands">errands</option>
              <option value="self-care">self-care</option>
              <option value="finance">finance</option>
              <option value="relationships">relationships</option>
            </select>

            <button onClick={saveEdit}>Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        ) : (
          <label className="todo-label">
            {task.text} – {formattedDate} ({task.category})
          </label>
        )}
      </div>

      <div className="actions">
        {!isEditing && !task.completed && (
          <button onClick={() => setIsEditing(true)}>✏️ Edit</button>
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
