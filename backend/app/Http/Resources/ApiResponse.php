<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ApiResponse extends JsonResource
{
    private bool $success;
    private string $message;
    private mixed $data;
    private int $statusCode;

    public function __construct(mixed $data, string $message = 'Request successful', bool $success = true, int $statusCode = 200)
    {
        parent::__construct($data);
        $this->success = $success;
        $this->message = $message;
        $this->data = $data;
        $this->statusCode = $statusCode;
    }

    public function toArray($request): array
    {
        return [
            'success' => $this->success,
            'message' => $this->message,
            'data' => $this->data,
        ];
    }

    public function withResponse($request, $response): void
    {
        $response->setStatusCode($this->statusCode);
    }

    public static function success(mixed $data = null, string $message = 'Request successful', int $statusCode = 200): self
    {
        return new self($data, $message, true, $statusCode);
    }

    public static function error(string $message = 'Request failed', int $statusCode = 400, mixed $data = null): self
    {
        return new self($data, $message, false, $statusCode);
    }
}
