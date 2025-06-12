import React, { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';

export default function CalendarView() {
  const { events } = usePage().props;
  const [eventsByDate, setEventsByDate] = useState({});

  useEffect(() => {
    if (!events || events.length === 0) return;

    const grouped = {};
    events.forEach(event => {
      const dateOnly = event.date.split(' ')[0];
      if (!grouped[dateOnly]) grouped[dateOnly] = [];
      grouped[dateOnly].push(event);
    });

    setEventsByDate(grouped);
  }, [events]);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const generateCalendar = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const firstDayIndex = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days = [];

    for (let i = 0; i < firstDayIndex; i++) {
      days.push(null);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      days.push({ date: formatDate(date), day: i });
    }

    return days;
  };

  const displayEvents = (date) => {
    if (!eventsByDate[date]) return null;
    return eventsByDate[date].map(event => (
      <div key={event.id} className="p-2 bg-white border rounded shadow-sm mb-1">
      <strong>{event.title}</strong><br />
      <span className="text-sm text-gray-600">{event.location}</span>
    </div>
    
    ));
  };

  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const calendarDays = generateCalendar();

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4 text-white/90">
        Event Calendar - {new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}
      </h1>
  
      <div className="grid grid-cols-7 gap-x-2 gap-y-6 sm:gap-x-4 sm:gap-y-8" style={{ marginBottom: '1.5rem' }}>
  {weekdays.map(day => (
    <div
      key={day}
      className="bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100 border border-blue-300 dark:border-blue-700 p-2 rounded-lg text-center font-semibold text-lg min-h-[60px] uppercase"
      style={{ userSelect: 'none' }}
    >
      {day}
    </div>
  ))}
</div>

      <div className="grid grid-cols-7 gap-4">
        {calendarDays.map((day, idx) => (
          day ? (
            <div key={day.date} className="border p-2 rounded text-black bg-gray-50 min-h-[120px]">

              <div className="font-bold text-sm mb-2">{day.day}</div>
              {displayEvents(day.date)}
            </div>
          ) : (
            <div key={`empty-${idx}`} className="border p-2 rounded text-black bg-gray-50 min-h-[120px]" />
          )
        ))}
      </div>
  
      <button
          onClick={() => window.history.back()}
          className="w-28 
             bg-gray-200 text-black 
             dark:bg-blue-800 dark:text-white 
             px-4 py-2 rounded 
             hover:bg-gray-300 dark:hover:bg-blue-700 
             transition duration-300"
          style={{ marginTop: '1.5rem' }}
      >
        Back
      </button>
    </Layout>
  );
}

