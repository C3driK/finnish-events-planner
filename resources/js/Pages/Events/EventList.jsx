import React from 'react';
import { usePage } from '@inertiajs/react';
import EventCard from '@/Components/EventCard';


export default function EventList( ) {
  const {events, flash} =usePage().props;
  if (!events || events.length === 0) {
    return <p>No events available.</p>;
  }

  return (
    <div>
       {flash.success && <div className="alert">{flash.success}</div>}
      <h1>Event Details</h1>
     
        {events.map(event => (
      <EventCard key={event.id} {...event} />))}
      
    </div>
  );
}
