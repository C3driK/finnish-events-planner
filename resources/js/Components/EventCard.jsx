import React from 'react';
import { router } from '@inertiajs/react';
import '../../css/eventcard.css';

import EventList from '@/Pages/Events/EventList';



export default function EventCard({ title, date, description, location, type, id }) {

  const handleSeeMore = () => {
    router.visit(route('events.show', id));
  };

  return (
    <>

   
    <div>
      
      <h2>{title}</h2>
      <p>{date}</p>
      <p>{location}</p>
      {/* <div>{tags?.join(' ')}</div>
      {image_url && <img src={image_url} alt="Event" />} */}
      <p>{type}</p>
      <p>{description}</p>
      <button onClick={handleSeeMore} >See More</button>
    </div>


    </>
  );
}
