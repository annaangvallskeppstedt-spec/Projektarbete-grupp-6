import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import { HabitContext } from "../context/HabitContext";
import { Link } from "react-router-dom";

const Home = ({ events = [], todos = [] }) => {
  const { sortedHabits } = useContext(HabitContext);
  const now = new Date();

  /* -------- Upcoming events -------- */
  const upcomingEvents = events
    .filter(e => e.start > now)
    .sort((a, b) => a.start - b.start)
    .slice(0, 3);

  /* -------- Upcoming todos (NOT completed, closest deadline) -------- */
  const upcomingTodos = todos
    .filter(todo => !todo.completed)
    .sort(
      (a, b) => new Date(a.deadline) - new Date(b.deadline)
    )
    .slice(0, 3);

  return (
    <div className="container">
      <Navbar />
      <h1>Productivity Assistant App</h1>

      <div className="container-overview">

        {/* ---- TODOS ---- */}
        <div className="todo-overview">
          <h3>My Todos</h3>

          {upcomingTodos.length > 0 ? (
            upcomingTodos.map(todo => (
              <p key={todo.id}>
                {todo.text} –{" "}
                {new Date(todo.deadline).toLocaleDateString()}
              </p>
            ))
          ) : (
            <p>No active todos.</p>
          )}

          <Link to="/Todos">See all Todos</Link>
        </div>

        {/* ---- EVENTS ---- */}
        <div className="event-overview">
          <h3>My Events</h3>

          {upcomingEvents.length > 0 ? (
            upcomingEvents.map(e => (
              <p key={e.id}>
                {e.name} – {e.start.toLocaleDateString()}
              </p>
            ))
          ) : (
            <p>No upcoming events</p>
          )}

          <Link to="/Events">See all Events</Link>
        </div>

        {/* ---- HABITS ---- */}
        <div className="habits-overview">
          <h3>My Habits</h3>

          {sortedHabits && sortedHabits.length > 0 ? (
            [...sortedHabits]
              .sort((a, b) => b.progress - a.progress)
              .slice(0, 3)
              .map(habit => (
                <p key={habit.id}>
                  {habit.title} – {habit.progress} repetitions
                </p>
              ))
          ) : (
            <p>No habits yet</p>
          )}

          <Link to="/Habits">See all Habits</Link>
        </div>

      </div>
    </div>
  );
};

export default Home;
