
import React, { useMemo, useState,useEffect } from 'react';
import TodoItem from './TodoItem';

function TodoList() {
  const [text, setText] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [category, setCategory] = useState('work');
  const [filterCategory, setFilterCategory] = useState("all")
  const [timeEstimate, setTimeEstimate] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); 
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortBy, setSortBy] = useState(localStorage.getItem('sortBy') ||
  'deadline');
  const [sortOrder, setSortOrder] = useState(localStorage.getItem('sortOrder') || 'asc');
  
  const categories = [
    'Work',
    'Home',
    'Parenting',
    'Errands',
    'Self-care',
    'Finance',
    'Relationships'
  ];

  const [tasks, setTasks] = useState(() => {
  const saved = localStorage.getItem('todos');
  return saved ? JSON.parse(saved) : [
    {
      id: 1,
      text: 'Dentist',
      description: 'root canal',
      category: 'self-care',
      timeEstimate: 60,
      deadline: '2025-12-29',
      completed: false
    },
    {
      id: 2,
      text: 'Meeting at school',
      description: 'Room 203',
      category: 'parenting',
      timeEstimate: 30,
      deadline: '2025-12-18',
      completed: false
    },
    {
      id: 3,
      text: 'Return library book',
      description: 'Stadsbiblioteket',
      category: 'errands',
      timeEstimate: 20,
      deadline: '2025-12-28',
      completed: false
    }
  ];
});

useEffect(() => {
  localStorage.setItem('todos', JSON.stringify(tasks));
}, [tasks]);

  useEffect(() => {
  const saved = JSON.parse(localStorage.getItem('todoFilters'));
  if (saved) {
  setStatusFilter(saved.statusFilter);
  setSelectedCategories(saved.selectedCategories);
  }
  }, []);

  useEffect(() => {
  localStorage.setItem(
  'todoFilters',
  JSON.stringify({ statusFilter, selectedCategories })
  );
  }, [statusFilter, selectedCategories]);

  useEffect(() => {
  localStorage.setItem('sortBy', sortBy);
  localStorage.setItem('sortOrder', sortOrder);
  }, [sortBy, sortOrder]);

  const isOverdue =
  !tasks.completed && new Date(tasks.deadline) < new Date();

  const filteredTasks = useMemo(() => {
  return tasks.filter(task => {
  if (statusFilter === 'completed' && !tasks.completed) return false;
  if (statusFilter === 'active' && task.completed) return false;

  if (
  selectedCategories.length > 0 &&
  !selectedCategories.includes(task.category)
  ) {
  return false;
  }

  return true;
  });
  }, [tasks, statusFilter, selectedCategories]);
  const sortedTasks = useMemo(() => {
  const sorted = [...filteredTasks];

  sorted.sort((a, b) => {
    let result = 0;

    if (sortBy === 'deadline') {
      result = new Date(a.deadline) - new Date(b.deadline);
    }

    if (sortBy === 'time') {
      result = a.timeEstimate - b.timeEstimate;
    }

    if (sortBy === 'status') {
      result = Number(a.completed) - Number(b.completed);
    }

    return sortOrder === 'asc' ? result : -result;
  });

  return sorted;
}, [filteredTasks, sortBy, sortOrder]);

  const totalCount = tasks.length;
  const visibleCount = filteredTasks.length;

  const categoryCounts = useMemo(() => {
  return tasks.reduce((acc, task) => {
  acc[task.category] = (acc[task.category] || 0) + 1;
  return acc;
  }, {});
  }, [tasks]);

  const totalTime = useMemo(() => {
  return filteredTasks
  .filter(task => !tasks.completed)
  .reduce((sum, task) => sum + (task.timeEstimate || 0), 0);
  }, [filteredTasks]);

  function formatTime(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    if (hours && mins) return `${hours}h ${mins}m`;
    if (hours) return `${hours}h`;
    return `${mins}m`;
  }

  function addTask() {
  const selectedDate = new Date(deadline);
  const today = new Date();

  if (!text || !deadline || !timeEstimate || selectedDate <= today) {
  alert('Fill in all fields and choose a future date');
  return;
  }

  const newTask = {
  id: Date.now(),
  text,
  description,
  category,
  deadline,
  timeEstimate: Number(timeEstimate),
  completed: false
  };

  setTasks([...tasks, newTask]);
  setText('');
  setDescription('');
  setDeadline('');
  setCategory('');
  setTimeEstimate('');
  }

  function deleteTask(id) {
  setTasks(tasks.filter(task => task.id !== id));
  }

  function updateTask(id, updatedFields) {
  setTasks(tasks.map(task =>
    task.id === id
      ? { ...task, ...updatedFields }
      : task
  ));
  }
  
  function toggleCompleted(id) {
  setTasks(
  tasks.map(task =>
  task.id === id ? { ...task, completed: !tasks.completed } : task
  )
  );
  }

  function resetFilters() {
  setStatusFilter('all');
  setSelectedCategories([]);
  }

  return (
  <div className="todo-list">
 <div className="todo-form">
  <input
  type="text"
  placeholder="Title"
  value={text}
  onChange={e => setText(e.target.value)}
  />

    <input
  type="text"
  placeholder="Description"
  value={description}
  onChange={e => setDescription(e.target.value)}
  />

<select value={category} onChange={e => setCategory(e.target.value)}>
{categories.map(cat => (
<option key={cat} value={cat}>{cat}</option>
))}
</select>

<input
type="number"
placeholder="Time estimate (minutes)"
value={timeEstimate}
onChange={e => setTimeEstimate(e.target.value)}
min="1"
/>

<input
type="date"
value={deadline}
onChange={e => setDeadline(e.target.value)}
/>

<button onClick={addTask}>Add task</button>
</div>
  <p>Sort items by:</p>
  <div className='sortItems'>
  <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
  <option value="">Status</option>
  <option value="deadline">Deadline</option>
  <option value="time">Duration</option>
  </select>

<select value={sortOrder} onChange={e => setSortOrder(e.target.value)}>
  <option value="">Order</option>
  <option value="asc">Ascending order</option>
  <option value="desc">Descending order</option>
</select>

<select value={category} onChange={e => setCategory(e.target.value)}>
  <option value="">Category</option>
{categories.map(cat => (
<option key={cat} value={cat}>{cat}</option>
))}
</select>
</div>

<div className='listContainer'>
  <label>Filter by status:</label>
  <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
  <option value="all">All</option>
  <option value="active">Not completed</option>
  <option value="completed">Completed</option>
  </select>

<label>Filter by category:</label>
<select
  value={filterCategory}
  onChange={e => setFilterCategory(e.target.value)}
>
  <option value="all">All</option>
  {categories.map(cat => (
    <option key={cat} value={cat}>
      {cat}
    </option>
  ))}
</select>

  <button onClick={resetFilters}>Reset filters</button>
</div>

  <ul className="todo-items">
  {filteredTasks.map(task => (
  <TodoItem
  key={task.id}
  task={task}
  deleteTask={deleteTask}
  toggleCompleted={toggleCompleted}
  updateTask={updateTask}
  />
  ))}
  </ul>
   <p>Total remaining time: {formatTime(totalTime)}</p>
  <p> {visibleCount} of {totalCount} items</p>
</div>
);
}

export default TodoList;
