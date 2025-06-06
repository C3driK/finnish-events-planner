import React, { useState } from 'react';
import Layout from '@/Layouts/Layout';
import { useForm, router } from '@inertiajs/react';

export default function EventDetails({ event }) {
  const [isEditing, setIsEditing] = useState(false);

  // Initialize form with event data
  const { data, setData, put, processing, errors, reset } = useForm({
    title: event.title,
    date: event.date,
    location: event.location,
    type: event.type,
    description: event.description,
  });

  // Toggle edit mode off and reset form data
  const handleCancel = () => {
    reset({
      title: event.title,
      date: event.date,
      location: event.location,
      type: event.type,
      description: event.description,
    });
    setIsEditing(false);
  };

  // Submit updated data to backend
  const handleSave = (e) => {
    e.preventDefault();
    put(route('events.update', event.id), {
      onSuccess: () => setIsEditing(false),
    });
  };

  // Delete event and redirect
  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this event?')) {
      router.delete(route('events.destroy', event.id));
    }
  };

  return (
    <Layout>
      <div className="event-details max-w-xl mx-auto p-4">
        {isEditing ? (
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block font-semibold mb-1">Title</label>
              <input
                type="text"
                value={data.title}
                onChange={e => setData('title', e.target.value)}
                className="w-full border px-3 py-2 rounded"
              />
              {errors.title && <div className="text-red-600">{errors.title}</div>}
            </div>

            <div>
              <label className="block font-semibold mb-1">Date & Time</label>
              <input
                type="datetime-local"
                value={data.date}
                onChange={e => setData('date', e.target.value)}
                className="w-full border px-3 py-2 rounded"
              />
              {errors.date && <div className="text-red-600">{errors.date}</div>}
            </div>

            <div>
              <label className="block font-semibold mb-1">Location</label>
              <input
                type="text"
                value={data.location}
                onChange={e => setData('location', e.target.value)}
                className="w-full border px-3 py-2 rounded"
              />
              {errors.location && <div className="text-red-600">{errors.location}</div>}
            </div>

            <div>
              <label className="block font-semibold mb-1">Type</label>
              <select
                value={data.type}
                onChange={e => setData('type', e.target.value)}
                className="w-full border px-3 py-2 rounded"
              >
                <option value="">Select type</option>
                <option value="music">Music</option>
                <option value="art">Art</option>
                <option value="culture">Culture</option>
                <option value="general">General</option>
              </select>
              {errors.type && <div className="text-red-600">{errors.type}</div>}
            </div>

            <div>
              <label className="block font-semibold mb-1">Description</label>
              <textarea
                value={data.description}
                onChange={e => setData('description', e.target.value)}
                className="w-full border px-3 py-2 rounded"
                rows={4}
              />
              {errors.description && <div className="text-red-600">{errors.description}</div>}
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={processing}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Save
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <>
            <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
            <p><strong>Date:</strong> {new Date(event.date).toLocaleString()}</p>
            <p><strong>Location:</strong> {event.location}</p>
            <p><strong>Type:</strong> {event.type}</p>
            <p><strong>Description:</strong></p>
            <p className="mb-6 whitespace-pre-line">{event.description}</p>

            <div className="flex space-x-4">
              <button
                onClick={() => setIsEditing(true)}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Edit
              </button>

              <button
                onClick={handleDelete}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}
