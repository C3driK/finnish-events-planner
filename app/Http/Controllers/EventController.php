<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class EventController extends Controller
{
    /**
     * Display a listing of the resource.
     * 
     */

    public function index(Request $request)
    {
        $user = Auth::user();

        $search = $request->input('search');
        $type = $request->input('type');
        $date = $request->input('date');
        $query = Event::query();


        // Only show UPCOMING eventsMore actions
        $query->where('date', '>=', now());

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('location', 'like', "%{$search}%");
            });
        }

        if ($type) {
            $query->where('type', $type);
        }
        if ($date) {
            $query->where('date', $date);
        }

        //Filter: Show only favorite events
        /** @var \App\Models\User $user */
        if ($request->boolean('showFavorite') && $user) {
            $query->whereHas('favorites', function ($q) use ($user) {
                $q->where('user_id', $user->id);
            });
        }


        $events = $query->orderBy('date', 'asc')->paginate(10)->withQueryString();

        // Map over each event to add 'is_favorite'
        /** @var \App\Models\User $user */
        $events->getCollection()->transform(function ($event) use ($user) {
            $event->is_favorite = $user
                ? $user->favoriteEvents()->where('event_id', $event->id)->exists()
                : false;
            return $event;
        });


        return Inertia::render('Events/EventList', [
            'events' => $events,
            'filters' => [
                'search' => $search,
                'type' => $type,
                'date' => $date,
                'showFavorite' => $request->boolean('showFavorite'),
            ],
        ]);
    }



    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Events/AddEvent');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'date' => 'required|date',
            'location' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'type' => 'required|string|max:100',
            'description' => 'nullable|string',
        ]);

        $event = new Event($validated);
        $event->user_id = Auth::id();
        $event->save();

        return Redirect::route('events.index')->with('success', 'Event created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Event $event)
    {

        /** @var \App\Models\User $user */

        $user = Auth::user();
        $isFavorite = $user
            ? $user->favoriteEvents()->where('event_id', $event->id)->exists()
            : false;

        return Inertia::render('Events/EventDetails', [
            'event' => $event,
            'isFavorite' => $isFavorite,
            'auth' => [
                'user' => $user,
            ],
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Event $event)
    {
        return Inertia::render('Events/Edit', ['event' => $event]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Event $event)
    {
        $request->validate([
            'title' => 'required',
            'date' => 'required',
            'location' => 'required',
            'address' => 'required',
            'type' => 'required',
        ]);
        $event->title = $request->title;
        $event->date = $request->date;
        $event->location = $request->location;
        $event->address = $request->address;
        $event->type = $request->type;
        $event->save();

        return Redirect::route('events.index')->with('success', 'Event updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Event $event)
    {
        $event->delete();
        return Redirect::route('events.index')->with('success', 'Event deleted successfully.');
    }

    public function calendar()
    {
        $events = Event::orderBy('date')->get();

        return Inertia::render('Events/CalendarView', [
            'events' => $events,
        ]);
    }

    public function myEvents()
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        $events = $user->events()->orderBy('date')->get();

        $events->transform(function ($event) use ($user) {
            $event->is_favorite = $user->favoriteEvents()->where('event_id', $event->id)->exists();
            return $event;
        });

        return Inertia::render('MyEvents', [
            'events' => $events,
        ]);
    }

    public function favoriteEvents()
    {

        /** @var \App\Models\User $user */
        $user = Auth::user();
        $events = $user->favoriteEvents()->with('user')->get();

        return Inertia::render('Events/FavoriteEvents', [
            'events' => $events,
        ]);
    }

    public function toggleFavorite(Event $event)
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();
        $user->favoriteEvents()->toggle($event->id);

        return back()->with('success', 'Favorite status updated.');
    }
}
