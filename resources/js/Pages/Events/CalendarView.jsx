import React, { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';

export default function CalendarView() {
  const { events } = usePage().props;
  const [eventsByDate, setEventsByDate] = useState({});

  // Group events by their date (YYYY-MM-DD)
  useEffect(() => {
    if (!events || events.length === 0) return;

    const grouped = {};
    events.forEach(event => {
      // Extract only the date part (ignore time)
      const dateOnly = event.date.split(' ')[0];
      if (!grouped[dateOnly]) grouped[dateOnly] = [];
      grouped[dateOnly].push(event);
    });

    setEventsByDate(grouped);
  }, [events]);

  // Format a Date object as 'YYYY-MM-DD'
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Generate calendar cells for current month, including padding days for alignment
  const generateCalendar = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();

    const firstDayIndex = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const days = [];

    // Padding empty days before first day of month
    for (let i = 0; i < firstDayIndex; i++) {
      days.push(null);
    }

    // Actual days with date info
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      days.push({ date: formatDate(date), day: i });
    }

    return days;
  };

  // Render events for a given date
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
  
      {/* Weekdays header */}
      <div className="grid grid-cols-7 gap-4">
        {weekdays.map(day => (
          <div
            key={day}
            className="border p-2 rounded text-black bg-gray-50 min-h-[120px]"
            style={{ userSelect: 'none' }}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar days grid */}
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
        className="w-28 bg-gray-400 text-gray-800 px-4 py-2 rounded hover:bg-gray-500"
      >
        Back
      </button>
    </Layout>
  );
}

