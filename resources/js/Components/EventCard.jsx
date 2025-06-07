import React from 'react';
import { router } from '@inertiajs/react';
import Weather from '@/Components/Weather'; // adjust path as needed

export default function EventCard({ title, date, description, location, type, id }) {
  const handleSeeMore = () => {
    router.visit(route('events.show', id));
  };

  return (
    <div className="max-w-md bg-white rounded-2xl shadow-md p-6 m-4 hover:shadow-lg transition duration-200">
      <h2 className="text-xl font-bold text-gray-800 mb-2">{title}</h2>
      <p className="text-sm text-gray-600 mb-1">{new Date(date).toLocaleDateString()}</p>

      <p className="text-sm text-gray-700 mb-1">
        <strong>Location:</strong> {location}
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-2 text-blue-600 hover:text-blue-800 underline"
        >
          📍
        </a>
      </p>

      <p className="text-sm text-gray-700 mb-1 capitalize"><strong>Type:</strong> {type}</p>
      <p className="text-sm text-gray-700 mb-3"><strong>Description:</strong> {description}</p>

      <Weather location={location} />

      <button
        onClick={handleSeeMore}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
      >
        See More
      </button>
    </div>
  );
}
