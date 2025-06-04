import React from 'react';

export default function EventCard({ event, onDelete }) {
  return (
    <div>
      <h2>{event.title}</h2>
      <p>{new Date(event.date).toLocaleString()}</p>
      <p>{event.location}</p>
      <div>{event.tags?.join(' ')}</div>
      {event.image_url && <img src={event.image_url} alt="Event" />}
      <p>{event.description}</p>
      <button onClick={() => onDelete(event.id)}>Delete</button>
    </div>
  );
}
