<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class ContactController extends Controller
{
    public function showForm()
    {
        return Inertia::render('Events/Contact');
    }

    public function send(Request $request)
    {
        $validated = $request->validate([
            'name'    => 'required|string|max:255',
            'email'   => 'required|email',
            'message' => 'required|string',
        ]);

        return Redirect::route('events.index')->with('success', 'Thank you for contacting us!');
    }
}
