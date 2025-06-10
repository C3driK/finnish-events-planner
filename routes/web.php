<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\EventController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\Event;


Route::get('/events', [EventController::class, 'index'])->name('events.index');
Route::get('/events/create', [EventController::class, 'create'])->name('events.create');
Route::post('/events', [EventController::class, 'store'])->name('events.store');
Route::get('/events/calendar', [EventController::class, 'calendar'])->name('events.calendar');
Route::get('/events/{event}', [EventController::class, 'show'])->name('events.details');

Route::resource('events', EventController::class)
    ->only(['index', 'create', 'store', 'show', 'edit', 'update', 'destroy'])
    ->names('events');

Route::resource('events', EventController::class);


Route::get('/', function () {
    $events = Event::orderBy('date', 'asc')->take(10)->get();
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'events' =>  $events,
    ]);

    return Inertia::render('App');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

//Add Event controller
Route::middleware(['auth'])->group(function () {
    Route::resource('events', EventController::class)
        ->names('events');
});

Route::resource('events', EventController::class)->only(['index', 'show'])->names('events');

Route::middleware(['auth'])->group(function () {
    Route::resource('events', EventController::class)->except(['index', 'show'])->names('events');
});



Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});



require __DIR__ . '/auth.php';
