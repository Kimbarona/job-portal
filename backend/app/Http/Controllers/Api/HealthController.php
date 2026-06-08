<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ApiResponse;

class HealthController extends Controller
{
    public function __invoke(): ApiResponse
    {
        return ApiResponse::success(['status' => 'ok'], 'API is healthy');
    }
}
