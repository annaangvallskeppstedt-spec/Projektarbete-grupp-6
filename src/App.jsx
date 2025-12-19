import { useState, useEffect } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Todos from "./pages/Todos";
import Habits from "./pages/Habits";
import Events from "./pages/Events";

function App() {
  const [events, setEvents] = useState([]);

  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <Routes>
      <Route path="/" element={<Home events={events} todos={todos} />} />

      <Route
        path="/todos"
        element={<Todos todos={todos} setTodos={setTodos} />}
      />

      <Route path="/habits" element={<Habits />} />

      <Route
        path="/events"
        element={<Events events={events} setEvents={setEvents} />}
      />
    </Routes>
  );
}

export default App;
