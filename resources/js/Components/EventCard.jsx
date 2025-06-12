import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import Weather from '@/Components/Weather';

const eventTypeImages = {
  music: '/images/Music event .avif',
  art: '/images/Art event.jpeg',
  general: '/images/general event.jpg',
  dance: '/images/Dance event.jpg',
  kids: '/images/kids event.webp',
  sport: '/images/sport event.png',
  culture: '/images/cultural-event.jpg',
  food: '/images/food event.jpg',
};

export default function EventCard({ title, date, description, location, type, id, is_favorite }) {
  const [isFavorite, setIsFavorite] = useState(is_favorite);

  const handleSeeMore = () => {
    router.visit(route('events.show', id));
  };

  const toggleFavorite = () => {
    router.post(route('favorites.toggle', id), {}, {
      preserveScroll: true,
      onSuccess: () => setIsFavorite(!isFavorite),
    });
  
}

  const imageUrl = eventTypeImages[type?.toLowerCase()] || eventTypeImages.default;

  return (
    <div className="relative max-w-md bg-white dark:bg-gray-800 rounded-2xl border border-gray-300 dark:border-gray-700 shadow-lg shadow-gray-400/20 dark:shadow-black/40 backdrop-blur-sm p-6 m-4 hover:shadow-xl transition duration-200 text-gray-900 dark:text-gray-100">
      
      {/* Heart icon */}
      <div
        onClick={toggleFavorite}
        className="absolute top-4 left-4 cursor-pointer text-4xl select-none"
      >
        {isFavorite ? '❤️' : '🩶'}
      </div>

      <img
        src={imageUrl}
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



