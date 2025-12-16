import React, { useMemo, useState,useEffect } from 'react';
import TodoItem from './TodoItem';

function TodoList() {
  const [text, setText] = useState('');
  const [deadline, setDeadline] = useState('');
  const [category, setCategory] = useState('work');
  const [filterCategory, setFilterCategory] = useState("all")

  const categories = [
    'work',
    'home',
    'parenting',
    'errands',
    'self-care',
    'finance',
    'relationships'
  ];

    <select
      className="category-filter"
      value={filterCategory}
      onChange={(e) => setFilterCategory(e.target.value)}
    >
      <option value="all">All Categories</option>
      {categories.map(cat => (
        <option key={cat} value={cat}>
          {cat}
        </option>
      ))}
    </select>

  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: 'Dentist appointment',
      category: 'self-care',
      deadline: '2025-12-20',
      completed: true
    },
    {
      id: 2,
      text: 'Meeting at school',
      category: 'parenting',
      deadline: '2025-12-18',
      completed: false
    },
    {
      id: 3,
      text: 'Return library book',
      category: 'errands',
      deadline: '2025-12-22',
      completed: false
    }
  ]);

  const completedTasks = useMemo(
    () => tasks.filter(task => task.completed),
    [tasks]
  );

     const filteredTodos = filterCategory === "all" ? TodoList : TodoList.filter(todo => todo.category.toLowerCase() === filter);

        useEffect(() =>  {
        localStorage.setItem("TodoList", JSON.stringify(TodoList))
    },[TodoList])

    const removeTodo = (title) => {
        setTodoList(TodoList.filter((h) => h.title !== title))
}

  function addTask() {
    const selectedDate = new Date(deadline);
    const currentDate = new Date();

    if (!text || !deadline || selectedDate <= currentDate) {
      alert('Please enter a task and select a future deadline.');
      return;
    }

    const newTask = {
      id: Date.now(),
      text,
      category,
      deadline,
      completed: false
    };

    setTasks([...tasks, newTask]);
    setText('');
    setDeadline('');
    setCategory('work');
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

    <ul className="todo-items">
      {tasks
      .filter(task => !task.completed)
      .filter(task =>
    filterCategory === 'all'
      ? true
      : task.category === filterCategory)
        .map(task => (

    <TodoItem
      key={task.id}
      task={task}
      deleteTask={deleteTask}
      toggleCompleted={toggleCompleted}
      />
      ))}
    </ul>
 
    <div className="todo-form">
      <input
        type="text"
        placeholder="Enter task..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        {categories.map(cat => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <input
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
      />

      <button onClick={addTask}>Add</button>
    </div>

    <div className="completed-task-list">
      <h2 className="cheading">Completed Tasks</h2>
      <table>
        <thead>
          <tr>
            <th>Task</th>
            <th>Category</th>
            <th>Deadline</th>
          </tr>
        </thead>
        <tbody>
          {completedTasks.map(ct => (
            <tr key={ct.id}>
              <td>{ct.text}</td>
              <td>{ct.category}</td>
              <td>{ct.deadline}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
}

export default TodoList;