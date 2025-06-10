import React, { useState } from 'react';
import Layout from '@/Layouts/Layout';
import { useForm, router} from '@inertiajs/react';

export default function EventDetails({ event, auth }) {
  const [isEditing, setIsEditing] = useState(false);

  const isOwner = auth?.user?.id === event.user_id;

  const { data, setData, put, processing, errors, reset } = useForm({
    title: event.title,
    date: event.date,
    location: event.location,
    address: event.address,
    type: event.type,
    description: event.description,
  });
  

  const handleCancel = () => {
    reset({
      title: event.title,
      date: event.date,
      location: event.location,
      address: event.address,
      type: event.type,
      description: event.description,
    });
    setIsEditing(false);
  };

  const handleSave = (e) => {
    e.preventDefault();
    put(route('events.update', event.id), {
      onSuccess: () => setIsEditing(false),
    });
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this event?')) {
      router.delete(route('events.destroy', event.id));
    }
  };


  const handleChange = (e) => {
    setData(e.target.name, e.target.value);
  };

  // Get current datetime for min attribute
  const getMinDate = () => new Date().toISOString().split('T')[0];

  return (
    <Layout>
      <div className="event-details max-w-xl mx-auto p-4">
        {isEditing ? (
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block font-semibold">Title</label>
              <input
                type="text"
                name="title"
                value={data.title}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded"
              />
              {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
            </div>

            <div>
              <label className="block font-semibold">Date</label>
              <input
                type="date"
                name="date"
                value={data.date}
                min={getMinDate()}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded"
              />
              {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
            </div>

            <div>
              <label className="block font-semibold">Location</label>
              <input
                type="text"
                name="location"
                value={data.location}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded"
              />
              {errors.location && <p className="text-red-500 text-sm">{errors.location}</p>}
            </div>


            <div>
              <label className="block font-semibold">Address</label>
              <input
                type="text"
                name="address"
                value={data.address}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded"
              />
              {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
            </div>

            <div>
              <label htmlFor="type" className="block font-semibold">Type</label>
              <select
                id="type"
                name="type"
                value={data.type}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 p-2 rounded"
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
              {errors.type && <p className="text-red-500 text-sm">{errors.type}</p>}
            </div>

            <div>
              <label className="block font-semibold">Description</label>
              <textarea
                name="description"
                value={data.description}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded"
              />
              {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={processing}
                className="w-28 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Save
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="w-28 bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <>
            <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
            <p><strong>Date:</strong> {new Date(event.date).toLocaleString()}</p>
            <p>
              <strong>Location:</strong> {event.location}{' '}
              {/* <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.location)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline ml-1"
              >
                📍
              </a> */}
            </p>
            <p><strong>Type:</strong> {event.type}</p>
            <p><strong>Description:</strong></p>
            <p className="mb-6 whitespace-pre-line">{event.description}</p>

            {isOwner && (

            <div className="flex flex-wrap gap-4 mb-4">
              <button
                onClick={() => setIsEditing(true)}
                disabled={!auth?.user}
                className={`w-28 px-4 py-2 rounded ${
                  auth?.user
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-green-200 text-white cursor-not-allowed'
                }`}
              >
                Edit
              </button>

              <button
                onClick={handleDelete}
                disabled={!auth?.user}
                className={`w-28 px-4 py-2 rounded ${
                  auth?.user
                    ? 'bg-red-600 text-white hover:bg-red-700'
                    : 'bg-red-200 text-white cursor-not-allowed'
                }`}
              >
                Delete
              </button>
              </div>
            )}

              <button
                onClick={()=>window.history.back()}
                className="w-28 bg-gray-400 text-gray-800 px-4 py-2 rounded hover:bg-gray-500"
              >
                Back
              </button>
            
          </>
        )}
      </div>

      <div className="mt-8">
        <iframe
          title="Event Location Map"
          width="100%"
          height="300"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://maps.google.com/maps?q=${encodeURIComponent(event.address||event.location)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
        ></iframe>
      </div>
    </Layout>
  );
}