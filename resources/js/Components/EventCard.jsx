import React from 'react';
import '../../css/eventcard.css';

import EventList from '@/Pages/Events/EventList';



export default function EventCard({ title, date, description, location }) {
  return (
    <>

   
    <div>
      
      <h2>{title}</h2>
      <p>{date}</p>
      <p>{location}</p>
      {/* <div>{tags?.join(' ')}</div>
      {image_url && <img src={image_url} alt="Event" />} */}
      <p>{description}</p>
      <button >Delete</button>
    </div>


    </>
  );
}
