<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FavoriteController extends Controller
{
    public function toggle(Event $event)
    {

        Auth::user()->favoriteEvents()->toggle($event->id);

        return back()->with('success', 'Favorite toggled!');
    }

    public function destroy(Event $event)
    {

        Auth::user()->favoriteEvents()->detach($event->id);
        return back()->with('success', 'Favorite removed!');
    }
}
