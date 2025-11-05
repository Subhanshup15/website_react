<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;

class VerifyCsrfToken extends Middleware
{
    /**
     * Whether to use XSRF-TOKEN cookie.
     */
    protected $addHttpCookie = false;

    /**
     * URIs that should be excluded from CSRF validation.
     */
    protected $except = [
        'api/*' // ✅ This disables CSRF for API routes
    ];
}
