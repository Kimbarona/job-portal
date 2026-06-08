<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\ApiResponse;
use App\Models\User;

class AdminController extends Controller
{
    public function users(): ApiResponse
    {
        $users = User::paginate(20);

        return ApiResponse::success($users);
    }

    public function stats(): ApiResponse
    {
        return ApiResponse::success([
            'total_users' => User::count(),
            'stats' => 'Admin statistics will be implemented here',
        ]);
    }
}
