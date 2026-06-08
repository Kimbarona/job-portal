<?php

namespace App\Http\Controllers\Api\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Resources\ApiResponse;

class DashboardController extends Controller
{
    public function index(): ApiResponse
    {
        return ApiResponse::success([
            'message' => 'Dashboard data will be implemented here',
        ]);
    }
}
