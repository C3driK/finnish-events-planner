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
      router.get(route('events.index'), { search, type, date, page: 1 }, {
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
  <h1 className="event-list-title">Event List</h1>

  {flash.success && (
    <div className="alert-success">
      {flash.success}
    </div>
  )}

  <SearchInput
    search={search}
    setSearch={setSearch}
    type={type}
    setType={setType}
    date={date}
    setDate={setDate}
    minDate={getMinDate()}
  />

  {events.data.length === 0 ? (
    <p className="no-events">No events found.</p>
  ) : (
    <div className="event-cards-container">
      {events.data.map((event) => (
        <EventCard key={event.id} {...event} />
      ))}
    </div>
  )}

  <div className="pagination">
    <button
      disabled={events.current_page === 1}
      onClick={() => changePage(events.current_page - 1)}
      className="page-btn"
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
          className={`page-btn${isActive ? ' active' : ''}`}
        >
          {pageNum}
        </button>
      );
    })}

    <button
      disabled={events.current_page === events.last_page}
      onClick={() => changePage(events.current_page + 1)}
      className="page-btn"
    >
      Next
    </button>
  </div>
</Layout>

  );
}
