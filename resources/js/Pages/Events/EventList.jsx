import React from 'react';
import '../../../css/eventlist.css'; // keep your CSS import
import { usePage } from '@inertiajs/react';
import EventCard from '@/Components/EventCard';
import Layout from '@/Layouts/Layout';  // import your Layout component

export default function EventList() {
  const { events, flash } = usePage().props;

  if (!events || events.length === 0) {
    return (
      <Layout>
        <p>No events available.</p>
      </Layout>
    );
  }

  return (
    <Layout>
      {flash.success && <div className="alert">{flash.success}</div>}
      <h1>Event Details</h1>
      <div className="event-list-container">
        {events.map(event => (
          <EventCard key={event.id} {...event} />
        ))}
      </div>
    </Layout>
  );
}

