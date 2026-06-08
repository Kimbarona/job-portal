<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\ForgotPasswordRequest;
use App\Http\Requests\Auth\ResetPasswordRequest;
use App\Http\Resources\ApiResponse;
use App\Services\AuthService;
use Illuminate\Support\Facades\Password;

class ForgotPasswordController extends Controller
{
    public function __construct(
        private readonly AuthService $authService
    ) {}

    public function sendResetLink(ForgotPasswordRequest $request): ApiResponse
    {
        $status = $this->authService->sendResetLink($request->validated());

        return $status === Password::RESET_LINK_SENT
            ? ApiResponse::success(null, __($status))
            : ApiResponse::error(__($status), 400);
    }

    public function reset(ResetPasswordRequest $request): ApiResponse
    {
        $status = $this->authService->resetPassword($request->validated());

        return $status === Password::PASSWORD_RESET
            ? ApiResponse::success(null, __($status))
            : ApiResponse::error(__($status), 400);
    }
}
