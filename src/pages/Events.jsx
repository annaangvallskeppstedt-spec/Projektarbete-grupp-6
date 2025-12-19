import { useState } from "react";
import Navbar from "../components/Navbar";
import EventForm from "../components/EventForm";
import EventList from "../components/EventList";
import "../index.css";

const Events = () => {
  const Events = ({ events, setEvents }) => {
  const [filter, setFilter] = useState("all");
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    start: "",
    end: "",
    });
  }
  const now = new Date();

//  handlers //

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm({ name: "", start: "", end: "" });
    setEditingId(null);
  };

  const editEvent = (event) => {
    setEditingId(event.id);
    setForm({
      name: event.name,
      start: event.start.toISOString().slice(0, 16),
      end: event.end.toISOString().slice(0, 16),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.start || !form.end) return;

    const start = new Date(form.start);
    const end = new Date(form.end);

    setEvents((prev) => {
      const updated = editingId
        ? prev.map((ev) =>
            ev.id === editingId
              ? { ...ev, name: form.name, start, end }
              : ev
          )
        : [...prev, { id: Date.now(), name: form.name, start, end }];

      return updated.sort((a, b) => a.start - b.start);
    });

    resetForm();
  };

  const deleteEvent = (id) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  };

  //  derived data  //

  const filteredEvents = events.filter((e) => {
    if (filter === "future") return e.start > now;
    if (filter === "past") return e.end < now;
    return true;
  });

  // 🔹 Minimal översikt: 3 kommande events
  const upcomingEvents = events
    .filter((e) => e.start > now)
    .sort((a, b) => a.start - b.start)
    .slice(0, 3);

  //  render  //

  return (
    <div className="container">
      <Navbar />

      <h2>Event Planner</h2>

      <div className="events-layout">
        {/* Vänster spalt */}
        <div className="events-left">
          <EventForm
            form={form}
            onChange={handleChange}
            onSubmit={handleSubmit}
            editingId={editingId}
          />
        </div>

        {/* Höger spalt */}
        <div className="events-right">
          {/* Översikt */}
          {upcomingEvents.length > 0 && (
            <div className="event-overview">
              <h3>Upcoming events</h3>
              <ul>
                {upcomingEvents.map((e) => (
                  <li key={e.id}>
                    {e.name} – {e.start.toLocaleDateString()}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Filter */}
          <div className="event-filters">
            <button onClick={() => setFilter("all")}>All events</button>
            <button onClick={() => setFilter("future")}>Future</button>
            <button onClick={() => setFilter("past")}>Past</button>
          </div>

          {/* Lista */}
          <EventList
            events={filteredEvents}
            now={now}
            onEdit={editEvent}
            onDelete={deleteEvent}
          />
        </div>
      </div>
    </div>
  );
};

export default Events;
