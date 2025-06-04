import React from 'react';
import EventCard from './EventCard';

export default function EventList({ events, onDelete }) {
  if (!events || events.length === 0) {
    return <p>No events available.</p>;
  }

  return (
    <div>
      {events.map(event => (
        <EventCard key={event.id} event={event} onDelete={onDelete} />
      ))}
    </div>
  );
}
