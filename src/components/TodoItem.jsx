import React, { useState } from 'react';

function TodoItem({ task, deleteTask, toggleCompleted, updateTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    text: task.text,
    description: task.description,
    deadline: task.deadline,
    category: task.category,
    timeEstimate: task.timeEstimate
  });

  function formatCategory(category) {
    return category
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  const isOverdue =
    !task.completed && new Date(task.deadline) < new Date();

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
      <li className={`todo ${isOverdue ? 'overdue' : ''}`}>
        <div className="c-cb">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => toggleCompleted(task.id)}
          />

          {isEditing ? (
            <div className="editForm">
              <input name="text" value={form.text} onChange={handleChange} />
              <input type="date" name="deadline" value={form.deadline} onChange={handleChange} />
              <input name="description" value={form.description} onChange={handleChange} />
              <input
                type="number"
                name="timeEstimate"
                value={form.timeEstimate}
                onChange={handleChange}
                min="1"
              />

              <select name="category" value={form.category} onChange={handleChange}>
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
            <label   className={`todoLabel ${task.completed ? 'completed' : ''} ${isOverdue ? 'overdue' : ''}
            `}
>
              {task.text} - {task.description}
              <small>
                {' '}– {formattedDate} – {task.timeEstimate} min
              </small>
            </label>
          )}

          <span className="todo-category">
            ({formatCategory(task.category)})
          </span>
        </div>

        <div className="actions">
          {!isEditing && !task.completed && (
            <button onClick={() => setIsEditing(true)}>✏️ Edit</button>
          )}
          <button onClick={() => deleteTask(task.id)}>Delete</button>
        </div>
      </li>
    </div>
  );
}

export default TodoItem;
