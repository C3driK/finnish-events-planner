import React from 'react';
import { createRoot } from 'react-dom/client';
import EventForm from './components/EventForm';
import EventList from './components/EventList';

function App() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">🎉 Finnish Event Planner</h1>
      <EventForm onEventCreated={() => window.location.reload()} />
      <EventList />
    </div>
  );
}

const root = createRoot(document.getElementById('app'));
root.render(<App />);
