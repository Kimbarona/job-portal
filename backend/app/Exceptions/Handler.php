<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpKernel\Exception\HttpExceptionInterface;
use Throwable;

class Handler extends ExceptionHandler
{
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    public function render($request, Throwable $e): JsonResponse
    {
        if ($request->expectsJson() || $request->is('api/*')) {
            $statusCode = 500;
            $message = 'Server Error';

            if ($e instanceof HttpExceptionInterface) {
                $statusCode = $e->getStatusCode();
                $message = $e->getMessage() ?: __('http.' . $statusCode);
            }

            return response()->json([
                'success' => false,
                'message' => $message,
                'data' => null,
            ], $statusCode);
        }

        return parent::render($request, $e);
    }
}
