import { Head, Link } from "@inertiajs/react";
import React, { useState } from "react";

export default function Welcome({ auth, events }) {
    const [showEvents, setShowEvents] = useState(false);

    const handleImageError = () => {
        document.getElementById("screenshot-container")?.classList.add("!hidden");
        document.getElementById("docs-card")?.classList.add("!row-span-1");
        document.getElementById("docs-card-content")?.classList.add("!flex-row");
        document.getElementById("background")?.classList.add("!hidden");
    };

    return (
        <>
            {/* <Head title="Welcome" /> */}
             <Head>
                    <title>SHOC Events</title>
                    <link rel="icon" type="image/x-icon" href="/favicon.png" />
            </Head>
            <div
                className="min-h-screen text-white relative overflow-hidden"
                style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url('https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundAttachment: "fixed",
                    animation: "backgroundPulse 8s ease-in-out infinite",
                }}
            >
                <style>{`
                    @keyframes backgroundPulse {
                        0%,
                        100% {
                            background-size: 100% 100%;
                            filter: brightness(1);
                        }
                        50% {
                            background-size: 110% 110%;
                            filter: brightness(1.1);
                        }
                    }

                    @keyframes logoGlow {
                        0%,
                        100% {
                            text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
                            transform: scale(1);
                        }
                        50% {
                            text-shadow: 0 0 20px rgba(255, 255, 255, 0.6),
                                0 0 30px rgba(255, 196, 0, 0.4);
                            transform: scale(1.05);
                        }
                    }

                    .logo-animate {
                        animation: logoGlow 3s ease-in-out infinite;
                    }
                `}</style>

                <div className="relative flex min-h-screen flex-col">
                    {/* Header */}
                    <header className="flex justify-between items-center p-6 lg:px-10">
                        <div className="flex items-center">
                            <h1 className="text-3xl lg:text-4xl font-bold text-white tracking-wider logo-animate">
                                SHOC EVENTS
                            </h1>
                        </div>
                        <nav className="flex items-center space-x-4">
                            {auth.user ? (
                                <Link
                                    href={route("dashboard")}
                                    className="bg-white/30 backdrop-blur-sm rounded-lg px-6 py-3 text-white font-medium hover:bg-white/50 transition-all duration-300 border-2 border-white/40 shadow-lg"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <button
                                        onClick={() => setShowEvents(prev => !prev)}
                                        className="rounded-lg px-6 py-3 text-white font-medium ring-2 ring-white/50 transition-all duration-300 hover:bg-white/30 hover:ring-white/70 backdrop-blur-sm shadow-lg"
                                    >
                                        {showEvents ? "Hide Events" : "Events"}
                                    </button>
                                    <Link
                                        href={route("login")}
                                        className="rounded-lg px-6 py-3 text-white font-medium ring-2 ring-white/50 transition-all duration-300 hover:bg-white/30 hover:ring-white/70 backdrop-blur-sm shadow-lg"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href={route("register")}
                                        className="rounded-lg px-6 py-3 bg-white/30 text-white font-medium transition-all duration-300 hover:bg-white/50 backdrop-blur-sm border-2 border-white/40 shadow-lg"
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                        </nav>
                    </header>

                    {/* Hero Content - hide when showEvents is true */}
                    {!showEvents && (
                         <main className="flex-1 flex flex-col items-center justify-center px-6 text-center max-w-4xl mx-auto">
                            <h2 className="text-5xl lg:text-7xl font-bold mb-6 text-white leading-tight">
                                Create Unforgettable{" "}
                                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                                    Events
                                </span>
                            </h2>
                            <p className="text-xl lg:text-2xl text-white/90 mb-8 leading-relaxed">
                                Plan, organize, and manage your events with ease. From intimate
                                gatherings to grand celebrations, we make every moment count.
                            </p>
                        <   div className="flex flex-col sm:flex-row gap-4 justify-center">
                                {!auth.user ? (
                                <>
                                    <Link
                                        href={route("register")}
                                        className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold px-8 py-4 rounded-lg text-lg hover:scale-105 transition-transform duration-300 shadow-2xl hover:shadow-yellow-500/25"
                                        >
                                        Get Started
                                    </Link>
                                    <Link
                                        href={route("login")}
                                        className="bg-white/30 backdrop-blur-sm text-white font-bold px-8 py-4 rounded-lg text-lg hover:bg-white/50 transition-all duration-300 border-2 border-white/50 shadow-xl"
                                        >
                                        Sign In
                                    </Link>
                                </>
                                ) : (
                                <Link
                                    href={route("dashboard")}
                                    className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold px-8 py-4 rounded-lg text-lg hover:scale-105 transition-transform duration-300 shadow-2xl hover:shadow-yellow-500/25"
                                    >
                                    Go to Dashboard
                                </Link>
                                ) }
                            </div>
                        </main>
                    )}

                    {/* Upcoming Events Section (Toggle) */}
                    {showEvents && (
                        <section className="max-w-5xl mx-auto mt-20 px-6">
                            <h3 className="text-3xl font-bold mb-6">Upcoming Events</h3>
                            {events && events.length > 0 ? (
                                <ul className="space-y-4">
                                    {events.map((event) => (
                                        <li
                                            key={event.id}
                                            className="p-4 bg-white/10 rounded-lg backdrop-blur-md shadow-md"
                                        >
                                            <h4 className="text-xl font-semibold text-yellow-300">
                                                {event.title}
                                            </h4>
                                            <p className="text-white/80 text-sm">
                                                {new Date(event.date).toLocaleDateString()} |{" "}
                                                {event.location}
                                            </p>
                                            <Link
                                                href={route("events.show", event.id)}
                                                className="text-yellow-400 hover:underline mt-1 inline-block"
                                            >
                                                View Details
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-white/80">No upcoming events at this time.</p>
                            )}
                        </section>
                    )}

                    {/* Footer */}
                    <footer className="py-6 text-center text-sm text-white/90 mt-20 bg-black/40 backdrop-blur-sm border-t-2 border-white/20 shadow-lg">
                        <div className="container mx-auto px-6">
                            <p className="mt-2 font-medium">
                                © 2025 SHOC Events. All rights reserved.
                            </p>
                        </div>
                    </footer>
                </div>
            </div>
        </>
    );
}