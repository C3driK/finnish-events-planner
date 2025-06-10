<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Inertia\Inertia;

class EventController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    use AuthorizesRequests;

    public function index(Request $request)
    {
        $search = $request->input('search');
        $type = $request->input('type');
        $date = $request->input('date');
        $query = Event::query();

        // Only show UPCOMING events
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

        $events = $query->orderBy('date', 'asc')->paginate(10)->withQueryString();

        return Inertia::render('Events/EventList', [
            'events' => $events,
            'filters' => [
                'search' => $search,
                'type' => $type,
                'date' => $date,
            ],
        ]);
    }



    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return response('Event create route reached', 200);
        // dd('Event create route reached');
        // return response()->json(['message' => 'Route is working']);
        // return Inertia::render('Events/AddEvent');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'date' => 'required',
            'location' => 'required',
            'address' => 'required',
            'type' => 'required',
            'description' => 'required',
        ]);

        // $event = new Event();
        // $event->title = $request->title;
        // $event->date = $request->date;
        // $event->location = $request->location;
        // $event->address = $request->address;
        // $event->type = $request->type;
        // $event->description = $request->description;
        // $event->save();

        $event = new Event([
            'title' => $request->title,
            'date' => $request->date,
            'location' => $request->location,
            'address' => $request->address,
            'type' => $request->type,
            'description' => $request->description,
        ]);

        $event->user_id = Auth::id(); // Assign the authenticated user
        $event->save();

        return Redirect::route('events.index')->with('success', 'Event created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Event $event)
    {
        return Inertia::render('Events/EventDetails', [
            'event' => $event,
            'auth' => [
                'user' => Auth::user(),
            ],
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Event $event)
    {
        // return Inertia::render('Events/Edit', ['event' => $event]);

        $this->authorize('update', $event);
        return Inertia::render('Events/Edit', ['event' => $event]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Event $event)
    {
        $this->authorize('update', $event);

        $request->validate([
            'title' => 'required',
            'date' => 'required',
            'location' => 'required',
            'address' => 'required',
            'type' => 'required',
        ]);
        // $event->title = $request->title;
        // $event->date = $request->date;
        // $event->location = $request->location;
        // $event->address = $request->address;
        // $event->type = $request->type;
        // $event->save();

        $event->update($request->only([
            'title',
            'date',
            'location',
            'address',
            'type',
            'description'
        ]));

        return Redirect::route('events.index')->with('success', 'Event updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Event $event)
    {
        $this->authorize('delete', $event);

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
}
