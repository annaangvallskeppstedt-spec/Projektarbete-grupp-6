import React, { useState } from 'react';
import TodoItem from './TodoItem';

function TodoList() {
  const [text, setText] = useState('');
  const [deadline, setDeadline] = useState('');

  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: 'Dentist appointment',
      deadline: '2025-12-20',
      completed: true
    },
    {
      id: 2,
      text: 'Meeting at school',
      deadline: '2025-12-18',
      completed: false
    },
    {
      id: 3,
      text: 'Return library book',
      deadline: '2025-12-22',
      completed: false
    }
  ]);

  const handleTaskChange = (e) => {
    setText(e.target.value);
  };

  const handleDeadlineChange = (e) => {
    setDeadline(e.target.value);
  };

  function addTask(text) {
    const selectedDate = new Date(deadline);
    const currentDate = new Date();

    if (!text || !deadline || selectedDate <= currentDate) {
      alert("Please enter a task and select a future deadline.");
      return;
    }

    const newTask = {
      id: tasks.length + 1,
      text,
      deadline,
      completed: false
    };

    setTasks([...tasks, newTask]);
    setText('');
    setDeadline('');
  }

  function deleteTask(id) {
    setTasks(tasks.filter(task => task.id !== id));
  }

  function toggleCompleted(id) {
    setTasks(
      tasks.map(task =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }

  return (
    <div className="todo-list">
      <ul>
        {tasks.map(task => (
          <TodoItem
            key={task.id}
            task={task}
            deleteTask={deleteTask}
            toggleCompleted={toggleCompleted}
          />
        ))}
      </ul>

      <input
        type="text"
        placeholder="Enter task..."
        value={text}
        onChange={handleTaskChange}
      />

      <input
        type="date"
        value={deadline}
        onChange={handleDeadlineChange}
      />

      <button onClick={() => addTask(text)}>Add</button>
    </div>
  );
}

export default TodoList;