import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Todos from "./pages/Todos";
import Habits from "./pages/Habits";
import Events from "./pages/Events";

function App() {
  const [events, setEvents] = useState([]);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home events={events} />} />
        <Route path="/todos" element={<Todos />} />
        <Route path="/habits" element={<Habits />} />
        <Route
          path="/events"
          element={<Events events={events} setEvents={setEvents} />}
        />
      </Routes>
    </div>
  );
}

export default App;
