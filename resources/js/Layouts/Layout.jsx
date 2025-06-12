<nav className="flex gap-4 items-center">
  {/* Dark Mode Toggle */}
  <DarkModeToggle />

  <Link
    href="/"
    className="nav-link px-4 py-2 text-white/90 hover:text-white font-medium hover:bg-white/10 transition-all duration-300 rounded-lg backdrop-blur-sm"
  >
    Home
  </Link>

  <Link
    href="/events"
    className="nav-link px-4 py-2 text-white/90 hover:text-white font-medium hover:bg-white/10 transition-all duration-300 rounded-lg backdrop-blur-sm"
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

  <Link
    href={route("events.my")}
    className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold px-6 py-2 rounded-lg hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-yellow-500/25"
  >
    My Event
  </Link>

  <Link
    href={route("contact.form")}
    className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold px-6 py-2 rounded-lg hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-yellow-500/25"
  >
    Contact
  </Link>
</nav>

