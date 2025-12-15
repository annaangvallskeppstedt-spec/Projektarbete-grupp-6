import { useState } from "react";
import Navbar from "../components/navbar";

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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.start || !form.end) return;

    const startDate = new Date(form.start);
    const endDate = new Date(form.end);

    if (editingId) {
      // uppdatera event
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
      // nytt event
      const newEvent = {
        id: Date.now(),
        name: form.name,
        start: startDate,
        end: endDate,
      };

      setEvents((prev) => [...prev, newEvent].sort((a, b) => a.start - b.start));
    }

    resetForm();
  };

  const editEvent = (event) => {
    setEditingId(event.id);
    setForm({
      name: event.name,
      start: event.start.toISOString().slice(0, 16),
      end: event.end.toISOString().slice(0, 16),
    });
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

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "350px" }}>
        <input
          type="text"
          name="name"
          placeholder="Event name"
          value={form.name}
          onChange={handleChange}
        />

        <label>Start</label>
        <input
          type="datetime-local"
          name="start"
          value={form.start}
          onChange={handleChange}
        />

        <label>End</label>
        <input
          type="datetime-local"
          name="end"
          value={form.end}
          onChange={handleChange}
        />

        <button type="submit">
          {editingId ? "Save changes" : "Add event"}
        </button>
      </form>

      <div style={{ marginTop: "20px" }}>
        <button onClick={() => setFilter("all")}>All events</button>
        <button onClick={() => setFilter("future")}>Future</button>
        <button onClick={() => setFilter("past")}>Past</button>
      </div>

      <ul style={{ marginTop: "20px", listStyle: "none", padding: 0 }}>
        {filteredEvents.map((e) => {
          const isPast = e.end < now;

          return (
            <li
              key={e.id}
              style={{
                marginBottom: "15px",
                opacity: isPast ? 0.5 : 1,
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "6px",
              }}
            >
              <strong>{e.name}</strong>
              <br />
              Start: {e.start.toLocaleString()}
              <br />
              End: {e.end.toLocaleString()}
              <br />

              <button onClick={() => editEvent(e)} style={{ marginRight: "10px" }}>
                Edit
              </button>
              <button onClick={() => deleteEvent(e.id)}>Delete</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Events;


const Events = () => {

    return(
        <>
        
        </>
    )
}

export default Events
