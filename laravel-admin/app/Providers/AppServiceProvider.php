<?php

namespace App\Providers;

use App\Models\User;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        // remove wrapping key data in API response
        JsonResource::withoutWrapping();

        // Gates
        Gate::define('view', function (User $user, $model) {
            return $user->hasAccess("view_{$model}") || $user->hasAccess("edit_{$model}");
        });

        Gate::define('edit', function (User $user, $model) {
            return $user->hasAccess("edit_{$model}");
        });
    }
}
