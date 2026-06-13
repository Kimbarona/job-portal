<?php

use App\Http\Controllers\Api\Admin\AdminController;
use App\Http\Controllers\Api\Auth\AuthController;
use App\Http\Controllers\Api\Auth\ForgotPasswordController;
use App\Http\Controllers\Api\Candidate\CandidateController;
use App\Http\Controllers\Api\Company\CompanyController;
use App\Http\Controllers\Api\Dashboard\DashboardController;
use App\Http\Controllers\Api\Employer\EmployerController;
use App\Http\Controllers\Api\HealthController;
use App\Http\Controllers\Api\Job\JobController;
use App\Http\Controllers\Api\Survey\SurveyResponseController;
use Illuminate\Support\Facades\Route;

Route::get('/health', HealthController::class);
Route::post('/survey-responses', [SurveyResponseController::class, 'store'])
    ->middleware('throttle:10,1');

Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/forgot-password', [ForgotPasswordController::class, 'sendResetLink']);
    Route::post('/reset-password', [ForgotPasswordController::class, 'reset']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/me', [AuthController::class, 'me']);
    });
});

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index']);

    Route::prefix('companies')->group(function () {
        Route::get('/', [CompanyController::class, 'index']);
        Route::post('/', [CompanyController::class, 'store']);
        Route::get('/{id}', [CompanyController::class, 'show']);
        Route::put('/{id}', [CompanyController::class, 'update']);
        Route::delete('/{id}', [CompanyController::class, 'destroy']);
    });

    Route::prefix('jobs')->group(function () {
        Route::get('/', [JobController::class, 'index']);
        Route::post('/', [JobController::class, 'store']);
        Route::get('/{id}', [JobController::class, 'show']);
        Route::put('/{id}', [JobController::class, 'update']);
        Route::delete('/{id}', [JobController::class, 'destroy']);
    });

    Route::prefix('candidates')->group(function () {
        Route::get('/', [CandidateController::class, 'index']);
        Route::post('/', [CandidateController::class, 'store']);
        Route::get('/{id}', [CandidateController::class, 'show']);
        Route::put('/{id}', [CandidateController::class, 'update']);
        Route::delete('/{id}', [CandidateController::class, 'destroy']);
    });

    Route::prefix('employers')->group(function () {
        Route::get('/', [EmployerController::class, 'index']);
        Route::post('/', [EmployerController::class, 'store']);
        Route::get('/{id}', [EmployerController::class, 'show']);
        Route::put('/{id}', [EmployerController::class, 'update']);
        Route::delete('/{id}', [EmployerController::class, 'destroy']);
    });

    Route::prefix('admin')->middleware('role:admin')->group(function () {
        Route::get('/users', [AdminController::class, 'users']);
        Route::get('/stats', [AdminController::class, 'stats']);
    });
});
