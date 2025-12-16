const EventList = ({ events, now, onEdit, onDelete }) => {
  return (
    <ul style={{ marginTop: "20px", listStyle: "none", padding: 0 }}>
      {events.map((e) => {
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

            <button
              onClick={() => onEdit(e)}
              style={{ marginRight: "10px" }}
            >
              Edit
            </button>
            <button onClick={() => onDelete(e.id)}>Delete</button>
          </li>
        );
      })}
    </ul>
  );
};

export default EventList;