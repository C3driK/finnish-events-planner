import React from 'react';
import { useForm } from '@inertiajs/react';

export default function EventForm() {
  const { data, setData, post, processing, errors } = useForm({
    title: '',
    date: '',
    location: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('events.store')); // Laravel route helper
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          value={data.title}
          onChange={handleChange}
          required
        />
        {errors.title && <div>{errors.title}</div>}
      </div>

      <div>
        <label htmlFor="date">Date & Time</label>
        <input
          id="date"
          name="date"
          type="datetime-local"
          value={data.date}
          onChange={handleChange}
          required
        />
        {errors.date && <div>{errors.date}</div>}
      </div>

      <div>
        <label htmlFor="location">Location</label>
        <input
          id="location"
          name="location"
          type="text"
          value={data.location}
          onChange={handleChange}
          required
        />
        {errors.location && <div>{errors.location}</div>}
      </div>

      <div>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={data.description}
          onChange={handleChange}
        />
        {errors.description && <div>{errors.description}</div>}
      </div>

      <button type="submit" disabled={processing}>
        Add Event
      </button>
    </form>
  );
}
