import React from 'react';

export default function SearchInput({ search, setSearch, type, setType, date, setDate, minDate }) {
  const eventsType = ['All', 'Music', 'Art', 'Culture', 'General', 'Kids', 'Sport', 'Food', 'Dance'];

  return (
    <div className="flex flex-col gap-4 mb-6 max-w-3xl">
      {/* Search box with icon */}
      <div className="relative w-full max-w-md">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z" />
        </svg>

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by title or location"
          className="w-full border border-gray-300 rounded-md py-2 pl-10 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Type dropdown */}
      {/* <select
        name="type"
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="border p-2 rounded w-40"
      >
        <option value="">All Types</option>
        <option value="music">Music</option>
        <option value="art">Art</option>
        <option value="culture">Culture</option>
        <option value="general">General</option>
      </select> */}

      {/* Filter buttons */}
      <div className="flex flex-wrap gap-2">
        {eventsType.map((eventType) => {
          const value = eventType === 'All' ? '' : eventType;
          return (
            <button
              key={eventType}
              onClick={() => setType(value)}
              className={`px-3 py-1 rounded-full text-sm border transition ${
                type === value
                  ? 'bg-blue-100 text-blue-700 border-blue-300'
                  : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
              }`}
            >
              {eventType}
            </button>
          );
        })}
      </div>

      {/* Date picker */}
      <input
        type="date"
        name="date"
        value={date}
        min={minDate}
        onChange={(e) => setDate(e.target.value)}
        className="border p-2 rounded w-fit"
      />
    </div>
  );
}
