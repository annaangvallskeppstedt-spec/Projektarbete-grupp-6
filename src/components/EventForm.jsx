const EventForm = ({ form, onChange, onSubmit, editingId }) => {
  return (
    <div className="formContainer">
    <form className="card form" onSubmit={onSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Event name"
        value={form.name}
        onChange={onChange}
      />

      <label>Start</label>
      <input
        type="datetime-local"
        name="start"
        value={form.start}
        onChange={onChange}
      />

      <label>End</label>
      <input
        type="datetime-local"
        name="end"
        value={form.end}
        onChange={onChange}
      />

      <button type="submit">
        {editingId ? "Save changes" : "Add event"}
      </button>
    </form>
    </div>
  );

};
export default EventForm;
