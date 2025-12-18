import { useState } from "react";
import Navbar from "../components/navbar";
import EventForm from "../components/EventForm";
import EventList from "../components/EventList";
import "../index.css";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState("all");
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    start: "",
    end: "",
  });

  const now = new Date();

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

    const startDate = new Date(form.start);
    const endDate = new Date(form.end);

    if (editingId) {
      setEvents((prev) =>
        prev
          .map((ev) =>
            ev.id === editingId
              ? { ...ev, name: form.name, start: startDate, end: endDate }
              : ev
          )
          .sort((a, b) => a.start - b.start)
      );
    } else {
      const newEvent = {
        id: Date.now(),
        name: form.name,
        start: startDate,
        end: endDate,
      };

      setEvents((prev) =>
        [...prev, newEvent].sort((a, b) => a.start - b.start)
      );
    }

    resetForm();
  };

  const deleteEvent = (id) => {
    setEvents(events.filter((e) => e.id !== id));
  };

  const filteredEvents = events.filter((e) => {
    if (filter === "future") return e.start > now;
    if (filter === "past") return e.end < now;
    return true;
  });

  return (
    <div className="container">
      <Navbar />

      <h2>Event Planner</h2>

      <EventForm
        form={form}
        onChange={handleChange}
        onSubmit={handleSubmit}
        editingId={editingId}
      />

      <div style={{ marginTop: "20px" }}>
        <button onClick={() => setFilter("all")}>All events</button>
        <button onClick={() => setFilter("future")}>Future</button>
        <button onClick={() => setFilter("past")}>Past</button>
      </div>

      <EventList
        events={filteredEvents}
        now={now}
        onEdit={editEvent}
        onDelete={deleteEvent}
      />
    </div>
  );
};

export default Events;
