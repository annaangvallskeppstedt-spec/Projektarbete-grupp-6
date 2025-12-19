const EventForm = ({ form, onChange, onSubmit, editingId }) => {
  return (
    <form className="card form event-form" onSubmit={onSubmit}>
      <div className="event-form-grid">
        {/* Event name */}
        <div className="field">
          <label>Event name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={onChange}
          />
        </div>

        {/* Start */}
        <div className="field">
          <label>Start</label>
          <input
            type="datetime-local"
            name="start"
            value={form.start}
            onChange={onChange}
          />
        </div>

        {/* End */}
        <div className="field">
          <label>End</label>
          <input
            type="datetime-local"
            name="end"
            value={form.end}
            onChange={onChange}
          />
        </div>
      </div>

      <button type="submit">
        {editingId ? "Save changes" : "Add event"}
      </button>
    </form>
  );
};

export default EventForm;
