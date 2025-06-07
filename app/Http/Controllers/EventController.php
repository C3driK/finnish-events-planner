<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class EventController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function index(Request $request)
    {
        $search = $request->input('search');
        $type = $request->input('type');
        $date = $request->input('date');
        $query = Event::query();

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
        return Inertia::render('Events/AddEvent');
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
            'type' => 'required',
            'description' => 'required',
        ]);

        $event = new Event();
        $event->title = $request->title;
        $event->date = $request->date;
        $event->location = $request->location;
        $event->type = $request->type;
        $event->description = $request->description;
        $event->save();

        return Redirect::route('events.index')->with('success', 'Event created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Event $event)
    {
        return Inertia::render('Events/EventDetails', ['event' => $event]);
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
            'type' => 'required',
        ]);
        $event->title = $request->title;
        $event->date = $request->date;
        $event->location = $request->location;
        $event->type = $request->type;
        $event->save();

        return Redirect::route('events.index')->with('Success', 'Event updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Event $event)
    {
        $event->delete();
        return Redirect::route('events.index')->with('Success', 'Event deleted successfully.');
    }
}
