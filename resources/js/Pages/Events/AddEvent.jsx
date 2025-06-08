import React from 'react';
import '../../../css/addevent.css';
import { useForm } from '@inertiajs/react';
import Layout from '@/Layouts/Layout'; // Layout for header/nav/footer

export default function AddEvent() {
  const { data, setData, post, processing, errors } = useForm({
    title: '',
    date: '',
    location: '',
    description: '',
    type:'',
    address:'',
  });

   const getMinDate = () => new Date().toISOString().split('T')[0];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('events.store'));
  };

  return (
    <Layout>
      <h1 className="text-2xl font-semibold mb-4">Add New Event</h1>
      <form onSubmit={handleSubmit} className="event-form">
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
          {errors.title && <div className="error">{errors.title}</div>}
        </div>

        <div>
          <label htmlFor="date">Date</label>
          <input
            id="date"
            name="date"
            type="date"
            value={data.date}
            min={getMinDate()}
            onChange={handleChange}
            required
            
          />
          {errors.date && <div className="error">{errors.date}</div>}
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
          {errors.location && <div className="error">{errors.location}</div>}
        </div>

        <div>
          <label htmlFor="address">Address</label>
          <input
            id="address"
            name="address"
            type="text"
            value={data.address}
            onChange={handleChange}
            required
          />
          {errors.location && <div className="error">{errors.location}</div>}
        </div>

        <div>
          <label htmlFor="type">Type</label>
          <select
            id="type"
            name="type"
            value={data.type}
            onChange={handleChange}
            required
          >
          <option value="" disabled>Select a Type</option>
          <option value="music">Music</option>
          <option value="art">Art</option>
          <option value="culture">Culture</option>
          <option value="kids">Kids</option>
          <option value="sport">Sport</option>
          <option value="food">Food</option>
          <option value="dance">Dance</option>
          <option value="general">General</option>
          </select>
        {errors.type && <div className="error">{errors.type}</div>}
        </div>

        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={data.description}
            onChange={handleChange}
          />
          {errors.description && <div className="error">{errors.description}</div>}
        </div>

        <button type="submit" disabled={processing}>
          Add Event
        </button>
      </form>
    </Layout>
  );
}

