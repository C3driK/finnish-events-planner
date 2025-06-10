import React from "react";
import { Link, Head } from "@inertiajs/react";

export default function Layout({ children }) {
    return (
        <div className="min-h-screen flex flex-col relative overflow-hidden">
            <Head>
                <title>SHOC Events</title>
                <link rel="icon" type="image/x-icon" href="/favicon.png" />
            </Head>

            <style>{`
                @keyframes logoGlow {
                    0%, 100% {
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
                .nav-link {
                    position: relative;
                    overflow: hidden;
                }
                .nav-link::before {
                    content: "";
                    position: absolute;
                    bottom: 0;
                    left: -100%;
                    width: 100%;
                    height: 2px;
                    background: linear-gradient(90deg, #fbbf24, #f59e0b);
                    transition: left 0.3s ease;
                }
                .nav-link:hover::before {
                    left: 0;
                }
            `}</style>

            {/* Background */}
            <div
                className="fixed inset-0 -z-10"
                style={{
                    backgroundImage: `linear-gradient(135deg, rgba(17, 24, 39, 0.95), rgba(31, 41, 55, 0.95)), 
                    radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.1), transparent 50%), 
                    radial-gradient(circle at 80% 20%, rgba(234, 179, 8, 0.1), transparent 50%),
                    url('data:image/svg+xml,<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><g fill="%23ffffff" fill-opacity="0.03"><circle cx="30" cy="30" r="1"/></g></svg>')`,
                    backgroundSize: "cover, cover, cover, 60px 60px",
                }}
            />

            {/* Header */}
            <header className="relative bg-black/40 backdrop-blur-lg text-white border-b border-white/10 shadow-2xl">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    {/* Logo */}
                    <Link href="/" className="flex items-center">
                        <h1 className="text-2xl lg:text-3xl font-bold text-white tracking-wider logo-animate hover:text-yellow-400 transition-colors duration-300">
                            SHOC EVENTS
                        </h1>
                    </Link>

                    {/* Navigation */}
                    <nav className="flex items-center space-x-6">
                        <Link
                            href="/"
                            className="nav-link px-4 py-2 text-white/90 hover:text-white font-medium transition-all duration-300 hover:bg-white/10 rounded-lg backdrop-blur-sm"
                        >
                            Home
                        </Link>
                        <Link
                            href="/events"
                            className="nav-link px-4 py-2 text-white/90 hover:text-white font-medium transition-all duration-300 hover:bg-white/10 rounded-lg backdrop-blur-sm"
                        >
                            Events
                        </Link>
                        <Link
                            href={route("events.create")}
                            className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold px-6 py-2 rounded-lg hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-yellow-500/25"
                        >
                            Add Event
                        </Link>
                        <Link
                            href={route("events.calendar")}
                            className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold px-6 py-2 rounded-lg hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-yellow-500/25"
                        >
                            Calendar
                        </Link>
                    </nav>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow relative">
                <div className="container mx-auto px-6 py-8">
                    <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 min-h-[70vh] p-8">
                        {children}
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="relative bg-black/40 backdrop-blur-lg text-white/90 border-t border-white/10 shadow-2xl">
                <div className="container mx-auto px-6 py-6">
                    <div className="flex flex-col items-center space-y-4 text-center">
                        <div>
                            <p className="font-medium">
                                © {new Date().getFullYear()} SHOC Events. All rights reserved.
                            </p>
                            <p className="text-sm text-white/70 mt-1">
                                Creating unforgettable experiences
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
