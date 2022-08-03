<?php

namespace App\Providers;

// use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;
use Laravel\Passport\Passport;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        'App\Models\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        $app = $this->app;

        Passport::routes(); 
        // the routes for issue and revoke access token, clients, personal access token 
        Passport::enableImplicitGrant();
        Passport::ignoreCsrfToken();
        Passport::tokensExpireIn(now()->addSeconds(20));
        Passport::refreshTokensExpireIn(now()->addDAYS(30));
        Passport::personalAccessTokensExpireIn(now()->addMonths(6));
    }
}
