<?php

namespace App\Http\Controllers\Api\Employer;

use App\Http\Controllers\Controller;
use App\Http\Requests\Employer\StoreEmployerRequest;
use App\Http\Requests\Employer\UpdateEmployerRequest;
use App\Http\Resources\ApiResponse;
use App\Http\Resources\EmployerResource;
use App\Repositories\EmployerRepository;

class EmployerController extends Controller
{
    public function __construct(
        private readonly EmployerRepository $employerRepository
    ) {}

    public function index(): ApiResponse
    {
        $employers = $this->employerRepository->all();

        return ApiResponse::success(EmployerResource::collection($employers));
    }

    public function store(StoreEmployerRequest $request): ApiResponse
    {
        $employer = $this->employerRepository->create($request->validated());

        return ApiResponse::success(new EmployerResource($employer), 'Employer created', 201);
    }

    public function show(int $id): ApiResponse
    {
        $employer = $this->employerRepository->find($id);

        if (!$employer) {
            return ApiResponse::error('Employer not found', 404);
        }

        return ApiResponse::success(new EmployerResource($employer));
    }

    public function update(UpdateEmployerRequest $request, int $id): ApiResponse
    {
        $employer = $this->employerRepository->update($id, $request->validated());

        if (!$employer) {
            return ApiResponse::error('Employer not found', 404);
        }

        return ApiResponse::success(new EmployerResource($employer), 'Employer updated');
    }

    public function destroy(int $id): ApiResponse
    {
        $deleted = $this->employerRepository->delete($id);

        if (!$deleted) {
            return ApiResponse::error('Employer not found', 404);
        }

        return ApiResponse::success(null, 'Employer deleted');
    }
}
