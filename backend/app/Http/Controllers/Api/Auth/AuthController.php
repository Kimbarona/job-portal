<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Http\Resources\ApiResponse;
use App\Http\Resources\UserResource;
use App\Services\AuthService;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function __construct(
        private readonly AuthService $authService
    ) {}

    public function register(RegisterRequest $request): ApiResponse
    {
        $result = $this->authService->register($request->validated());

        return ApiResponse::success($result, 'Registration successful', 201);
    }

    public function login(LoginRequest $request): ApiResponse
    {
        $result = $this->authService->login($request->validated());

        if (!$result) {
            return ApiResponse::error('Invalid credentials', 401);
        }

        return ApiResponse::success($result, 'Login successful');
    }

    public function logout(Request $request): ApiResponse
    {
        $request->user()->currentAccessToken()->delete();

        return ApiResponse::success(null, 'Logged out successfully');
    }

    public function me(Request $request): ApiResponse
    {
        return ApiResponse::success(
            new UserResource($request->user()),
            'User retrieved successfully'
        );
    }
}
