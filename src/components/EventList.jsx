const EventList = ({ events, now, onEdit, onDelete }) => {
  if (events.length === 0) {
    return <p>No events yet</p>;
  }

  return (
    <ul className="event-list">
      {events.map((e) => {
        const isPast = e.end < now;

        return (
          <li key={e.id} className={`card event ${isPast ? "past" : ""}`}>
            <strong>{e.name}</strong>

            <div>
              Start: {e.start.toLocaleString()}
              <br />
              End: {e.end.toLocaleString()}
            </div>

            <div>
              <button onClick={() => onEdit(e)}>Edit</button>
              <button className="delete" onClick={() => onDelete(e.id)}>
                Delete
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default EventList;
