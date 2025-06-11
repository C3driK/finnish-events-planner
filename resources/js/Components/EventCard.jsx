import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import Weather from '@/Components/Weather';

export default function EventCard({ title, date, description, location, type, id, canManage }) {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleSeeMore = () => {
    router.visit(route('events.show', id));
  };

  return (
    <div className="relative max-w-md bg-white dark:bg-gray-800 rounded-2xl border border-gray-300 dark:border-gray-700 shadow-lg shadow-gray-400/20 dark:shadow-black/40 backdrop-blur-sm p-6 m-4 hover:shadow-xl transition duration-200 text-gray-900 dark:text-gray-100">
      
      {/* Heart icon */}
      <div
        onClick={() => setIsFavorite(!isFavorite)}
        className="absolute top-4 left-4 cursor-pointer text-4xl select-none"
      >
        {isFavorite ? '❤️' : '🩶'}
      </div>

      <img
        src="https://images.unsplash.com/photo-1591243315780-978fd00ff9db?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29ja3RhaWwlMjBwYXJ0eXxlbnwwfHwwfHx8MA%3D%3D"
        alt={title}
        className="w-full h-48 object-cover rounded-lg mb-4"
      />

      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="text-sm text-gray-600 dark:text-gray-200 mb-1">{new Date(date).toLocaleDateString()}</p>

      <p className="text-sm text-gray-700 dark:text-gray-200 mb-1">
        <strong>Location:</strong> {location}
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-600 underline"
        >
          📍
        </a>
      </p>

      <p className="text-sm text-gray-700 dark:text-gray-200 mb-1 capitalize">
        <strong>Type:</strong> {type}
      </p>

      <p className="text-sm text-gray-700 dark:text-gray-200 mb-3">
        <strong>Description:</strong> {description}
      </p>

      <Weather location={location} />

      <button
        onClick={handleSeeMore}
        className="mt-4 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-4 py-2 rounded-md transition"
      >
        See More
      </button>
    </div>
  );
}


