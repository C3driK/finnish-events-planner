import { useState } from 'react';

export default function EventForm({ onSubmit }) {
  const [form, setForm] = useState({
    title: '',
    date: '',
    location: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          value={form.title}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="date">Date & Time</label>
        <input
          id="date"
          name="date"
          type="datetime-local"
          value={form.date}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="location">Location</label>
        <input
          id="location"
          name="location"
          type="text"
          value={form.location}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={form.description}
          onChange={handleChange}
        />
      </div>

      <button type="submit">Add Event</button>
    </form>
  );
}




