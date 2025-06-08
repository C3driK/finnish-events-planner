// resources/js/Layouts/Layout.jsx
import React from 'react';
import { Link } from '@inertiajs/react';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-800 text-white p-4 flex justify-between">
        <div className="font-bold">Finnish Events Planner</div>
        <nav className="space-x-4">
          <Link href={route('home')} className="hover:underline">Home</Link>
          <Link href="/events" className="hover:underline">Events</Link>
          <Link href="/events/create" className="hover:underline">Add Event</Link>
          <Link href={route('events.calendar')} className="hover:underline">Calender</Link>
        </nav>
      </header>

      <main className="flex-grow container mx-auto p-4">
        {children}
      </main>

      <footer className="bg-gray-800 text-white text-center p-4">
        &copy; {new Date().getFullYear()} Finnish Events Planner
      </footer>
    </div>
  );
}
