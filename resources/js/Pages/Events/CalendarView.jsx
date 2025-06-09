import React, { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';

export default function CalendarView() {
  const { events } = usePage().props;

  const [calenderView, setCalenderView] = useState({});

  useEffect(() => {

    if (!events || events.length === 0) {
      console.log('No events found.');
      return;
    }

    // Group events by date (YYYY-MM-DD)
    const grouped = {};
    events.forEach(event => {
      const getDate = event.date.split(' ')[0]; // Extract date part
      if (!grouped[getDate]) {
        grouped[getDate] = [];
      }
      console.log('Grouped events:', grouped); 
      grouped[getDate].push(event);
    });
    setCalenderView(grouped);
    console.log('Calenderview', calenderView);
    
  }, [events]);

  const displayEvents = (date) => {
    const dayEvents = calenderView[date] || [];
    console.log(`Events for ${date}:`, dayEvents);
    return dayEvents.map(event => (
      <div key={event.id} className="p-2 bg-white border rounded shadow-sm mb-1">
        <strong>{event.title}</strong><br />
        <span className="text-sm text-gray-600">{event.location}</span>
      </div>
    ));
  };

  const generateCalendar = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth(); // 0-indexed
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();

    const calendarDays = [];
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      const getDate = date.toISOString().split('T')[0];
      calendarDays.push({ date: getDate, day: i });
    }

    return calendarDays;
  };

  const calendar = generateCalendar();

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Event Calendar - {new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}</h1>

      <div className="grid grid-cols-7 gap-4">
        {calendar.map(day => (
          <div key={day.date} className="border p-2 rounded bg-gray-50 min-h-[120px]">
            <div className="font-bold text-sm mb-2">{day.day}</div>
            {displayEvents(day.date)}
          </div>
        ))}
      </div>
      <button
                onClick={()=>window.history.back()}
                className="w-28 bg-gray-400 text-gray-800 px-4 py-2 rounded hover:bg-gray-500"
              >
                Back
              </button>
    </Layout>
  );
}