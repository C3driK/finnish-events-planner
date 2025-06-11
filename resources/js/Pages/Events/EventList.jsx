import React, { useState, useEffect } from 'react';
import '../../../css/eventlist.css';
import { usePage, router } from '@inertiajs/react';
import EventCard from '@/Components/EventCard';
import Layout from '@/Layouts/Layout';
import SearchInput from '@/Components/SearchInput';

export default function EventList() {
  const { events, filters = {}, flash } = usePage().props;

  const [search, setSearch] = useState(filters.search || '');
  const [type, setType] = useState(filters.type || '');
  const [date, setDate] = useState(filters.date || '');

  const getMinDate = () => new Date().toISOString().split('T')[0];

  useEffect(() => {
    const timer = setTimeout(() => {
      router.get(route('events.index'), { search, type, date, page: events.current_page }, {
        preserveState: true,
        replace: true,
      });
    }, 400);

    return () => clearTimeout(timer);
  }, [search, type, date]);

  const changePage = (page) => {
    router.get(route('events.index'), { search, type, date, page }, {
      preserveState: true,
      replace: true,
    });
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
        Event List
      </h1>

      {flash.success && (
        <div className="alert bg-green-100 text-green-800 border border-green-500 rounded px-4 py-2 mb-4 dark:bg-green-900 dark:text-green-200 dark:border-green-400">
          {flash.success}
        </div>
      )}

      {/* Filters */}
      <SearchInput
        search={search}
        setSearch={setSearch}
        type={type}
        setType={setType}
        date={date}
        setDate={setDate}
        minDate={getMinDate()}
      />

      {/* Event List */}
      {events.data.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-300 italic">No events found.</p>
      ) : (
        <div className="flex flex-wrap justify-center gap-6 bg-white dark:bg-gray-800 p-4 rounded shadow-md">
        {events.data.map((event) => (
          <EventCard key={event.id} {...event} />
        ))}
      </div>
      
      )}

      {/* Pagination */}
      <div className="pagination flex gap-2 mt-6">
        <button
          disabled={events.current_page === 1}
          onClick={() => changePage(events.current_page - 1)}
          className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-black dark:text-white rounded disabled:opacity-50"
        >
          Previous
        </button>

        {Array.from({ length: events.last_page }, (_, i) => {
          const pageNum = i + 1;
          const isActive = events.current_page === pageNum;

          return (
            <button
              key={pageNum}
              onClick={() => changePage(pageNum)}
              className={`px-3 py-1 rounded ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-black dark:bg-gray-700 dark:text-white'
              }`}
            >
              {pageNum}
            </button>
          );
        })}

        <button
          disabled={events.current_page === events.last_page}
          onClick={() => changePage(events.current_page + 1)}
          className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-black dark:text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </Layout>
  );
}
