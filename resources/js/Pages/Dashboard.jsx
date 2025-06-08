import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Dashboard() {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-bold text-white tracking-wide">
                        Dashboard
                    </h2>
                    <div className="text-sm text-white/80">
                        Welcome back to SHOC Events
                    </div>
                </div>
            }
        >
            <Head title="Dashboard" />

            <style jsx>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes pulse {
                    0%,
                    100% {
                        transform: scale(1);
                    }
                    50% {
                        transform: scale(1.05);
                    }
                }

                .fade-in-up {
                    animation: fadeInUp 0.6s ease-out;
                }

                .pulse-hover:hover {
                    animation: pulse 0.6s ease-in-out;
                }
            `}</style>

            <div className="py-8">
                <div className="mx-auto max-w-7xl px-6">
                    {/* Welcome Section */}
                    <div className="mb-8 fade-in-up">
                        <div className="bg-gradient-to-r from-yellow-400/20 to-orange-500/20 backdrop-blur-sm rounded-2xl p-8 border border-yellow-400/30 shadow-2xl">
                            <div className="text-center">
                                <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
                                    Welcome to{" "}
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                                        SHOC Events
                                    </span>
                                </h1>
                                <p className="text-xl text-gray-600 mb-6">
                                    You're successfully logged in! Ready to
                                    create amazing events?
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Link
                                        href="/events"
                                        className="pulse-hover bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold px-8 py-4 rounded-xl text-lg hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-yellow-500/25"
                                    >
                                        View Events Catalog
                                    </Link>
                                    <Link
                                        href="/events/create"
                                        className="pulse-hover bg-white/80 backdrop-blur-sm text-gray-800 font-bold px-8 py-4 rounded-xl text-lg hover:bg-white hover:scale-105 transition-all duration-300 border-2 border-gray-200 shadow-lg"
                                    >
                                        Create New Event
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Stats/Actions Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        {/* Events Overview */}
                        <div className="fade-in-up bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-xl font-bold text-gray-800">
                                    Your Events
                                </h3>
                                <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-600 rounded-xl flex items-center justify-center">
                                    <svg
                                        className="w-6 h-6 text-white"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                        />
                                    </svg>
                                </div>
                            </div>
                            <p className="text-gray-600 mb-4">
                                Manage and view all your created events
                            </p>
                            <Link
                                href="/events"
                                className="text-blue-600 hover:text-blue-800 font-semibold hover:underline"
                            >
                                View All Events →
                            </Link>
                        </div>

                        {/* Create Event */}
                        <div className="fade-in-up bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-xl font-bold text-gray-800">
                                    Quick Create
                                </h3>
                                <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-green-600 rounded-xl flex items-center justify-center">
                                    <svg
                                        className="w-6 h-6 text-white"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 4v16m8-8H4"
                                        />
                                    </svg>
                                </div>
                            </div>
                            <p className="text-gray-600 mb-4">
                                Start planning your next amazing event
                            </p>
                            <Link
                                href="/events/create"
                                className="text-green-600 hover:text-green-800 font-semibold hover:underline"
                            >
                                Create Event →
                            </Link>
                        </div>

                        {/* Account Settings */}
                        <div className="fade-in-up bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-xl font-bold text-gray-800">
                                    Account
                                </h3>
                                <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-purple-600 rounded-xl flex items-center justify-center">
                                    <svg
                                        className="w-6 h-6 text-white"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                        />
                                    </svg>
                                </div>
                            </div>
                            <p className="text-gray-600 mb-4">
                                Manage your profile and preferences
                            </p>
                            <Link
                                href="/profile"
                                className="text-purple-600 hover:text-purple-800 font-semibold hover:underline"
                            >
                                View Profile →
                            </Link>
                        </div>
                    </div>

                    {/* Recent Activity Section */}
                    <div className="fade-in-up bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/50">
                        <h3 className="text-2xl font-bold text-gray-800 mb-6">
                            Getting Started
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <h4 className="text-lg font-semibold text-gray-700">
                                    Quick Tips
                                </h4>
                                <ul className="space-y-2 text-gray-600">
                                    <li className="flex items-center">
                                        <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></span>
                                        Browse existing events for inspiration
                                    </li>
                                    <li className="flex items-center">
                                        <span className="w-2 h-2 bg-orange-400 rounded-full mr-3"></span>
                                        Create your first event with detailed
                                        information
                                    </li>
                                    <li className="flex items-center">
                                        <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></span>
                                        Update your profile for better event
                                        management
                                    </li>
                                </ul>
                            </div>
                            <div className="space-y-4">
                                <h4 className="text-lg font-semibold text-gray-700">
                                    Next Steps
                                </h4>
                                <div className="space-y-3">
                                    <Link
                                        href="/events"
                                        className="block p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg hover:from-blue-100 hover:to-blue-200 transition-colors duration-300"
                                    >
                                        <span className="font-semibold text-blue-800">
                                            1. Explore Events
                                        </span>
                                        <p className="text-sm text-blue-600">
                                            See what others are planning
                                        </p>
                                    </Link>
                                    <Link
                                        href="/events/create"
                                        className="block p-3 bg-gradient-to-r from-green-50 to-green-100 rounded-lg hover:from-green-100 hover:to-green-200 transition-colors duration-300"
                                    >
                                        <span className="font-semibold text-green-800">
                                            2. Create Your Event
                                        </span>
                                        <p className="text-sm text-green-600">
                                            Start planning something amazing
                                        </p>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

// import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
// import { Head } from '@inertiajs/react';

// export default function Dashboard() {
//     return (
//         <AuthenticatedLayout
//             header={
//                 <h2 className="text-xl font-semibold leading-tight text-gray-800">
//                     Dashboard
//                 </h2>
//             }
//         >
//             <Head title="Dashboard" />

//             <div className="py-12">
//                 <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
//                     <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
//                         <div className="p-6 text-gray-900">
//                             Welcome to SHOC Events, You're logged in! <br/>
//                             Click on Events to see Events catalog!!!
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </AuthenticatedLayout>
//     );
// }
