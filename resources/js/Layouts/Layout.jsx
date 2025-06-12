import React, { useState } from "react";
import { Link, Head } from "@inertiajs/react";
import DarkModeToggle from "../Components/DarkModeToggle";

export default function Layout({ children }) {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

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

            <header className="relative bg-black/40 backdrop-blur-lg text-white border-b border-white/10 shadow-2xl">
                <div className="container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
                    <Link href="/" className="flex items-center">
                        <h1 className="text-2xl lg:text-3xl font-bold text-white tracking-wider logo-animate hover:text-yellow-400 transition-colors duration-300">
                            SHOC EVENTS
                        </h1>
                    </Link>

                    <div className="md:hidden">
                        <button
                            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
                            className="text-white focus:outline-none"
                        >
                            {isMobileMenuOpen ? "✖" : "☰"}
                        </button>
                    </div>

                    <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
                        {["/", "/events", route("events.create"), route("events.calendar"), route("events.my"), route("contact.form")].map((url, i) => (
                            <Link
                                key={url}
                                href={url}
                                className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold px-4 py-2 rounded-lg hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-yellow-500/25"
                            >
                                {["Home", "Events", "Add Event", "Calendar", "My Event", "Contact"][i]}
                            </Link>
                        ))}
                    </nav>

                    <div className="hidden md:flex justify-end">
                        <DarkModeToggle />
                    </div>
                </div>

                {isMobileMenuOpen && (
                    <div className="md:hidden px-4 pb-4 space-y-2 bg-black/60">
                        {["/", "/events", route("events.create"), route("events.calendar"), route("events.my"), route("contact.form")].map((url, i) => (
                        <Link
                            key={url}
                            href={url}
                            className="block w-full md:w-auto text-center bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold px-4 py-2 rounded-lg transition-transform duration-300 hover:scale-105 shadow-lg hover:shadow-yellow-500/25"
                        >
                        {["Home", "Events", "Add Event", "Calendar", "My Event", "Contact"][i]}
                        </Link>
                        ))}

                        <div className="flex justify-center mt-2">
                            <DarkModeToggle />
                        </div>
                    </div>
                )}
            </header>

            <main className="flex-grow relative">
                <div className="container mx-auto px-4 sm:px-6 py-8">
                    <div className="bg-slate-500/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/50 min-h-[80vh] p-6 sm:p-8 dark:border-white/10 dark:bg-white/5">
                        {children}
                    </div>
                </div>
            </main>

            <footer className="relative bg-black/40 backdrop-blur-lg text-white/90 border-t border-white/10 shadow-2xl">
                <div className="container mx-auto px-4 sm:px-6 py-6">
                    <div className="flex flex-col items-center text-center">
                        <p className="font-medium">
                            © {new Date().getFullYear()} SHOC Events. All rights reserved.
                        </p>
                        <p className="text-sm text-white/70 mt-1">
                            Creating unforgettable experiences
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
