<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;
use App\Models\Event;
use App\Policies\EventPolicy;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     * @var array<class-string, class-string>
     */

    protected $policies = [
        Event::class => EventPolicy::class, // ✅ Register policy here
    ];

    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Vite::prefetch(concurrency: 3);
    }
}
