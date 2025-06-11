import React from "react";
import Layout from "@/Layouts/Layout";
import { Link } from "@inertiajs/react";
import EventCard from "@/Components/EventCard";

const MyEvents = ({events}) =>{
    return(
        <Layout >
             <h2 className="text-2xl font-bold mb-6">My Events</h2>

            {events.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-300">You haven't created any events yet.</p>
            ) : (
                <div className="event-list-container">
                    {events.map((event) => (
                        <EventCard key={event.id} {...event} />
                    ))}
                </div>

            )}
        </Layout>
    )

}

export default MyEvents;