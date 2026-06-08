<?php

namespace App\Http\Controllers\Api\Job;

use App\Http\Controllers\Controller;
use App\Http\Requests\Job\StoreJobRequest;
use App\Http\Requests\Job\UpdateJobRequest;
use App\Http\Resources\ApiResponse;
use App\Http\Resources\JobResource;
use App\Repositories\JobRepository;

class JobController extends Controller
{
    public function __construct(
        private readonly JobRepository $jobRepository
    ) {}

    public function index(): ApiResponse
    {
        $jobs = $this->jobRepository->all();

        return ApiResponse::success(JobResource::collection($jobs));
    }

    public function store(StoreJobRequest $request): ApiResponse
    {
        $job = $this->jobRepository->create($request->validated());

        return ApiResponse::success(new JobResource($job), 'Job created', 201);
    }

    public function show(int $id): ApiResponse
    {
        $job = $this->jobRepository->find($id);

        if (!$job) {
            return ApiResponse::error('Job not found', 404);
        }

        return ApiResponse::success(new JobResource($job));
    }

    public function update(UpdateJobRequest $request, int $id): ApiResponse
    {
        $job = $this->jobRepository->update($id, $request->validated());

        if (!$job) {
            return ApiResponse::error('Job not found', 404);
        }

        return ApiResponse::success(new JobResource($job), 'Job updated');
    }

    public function destroy(int $id): ApiResponse
    {
        $deleted = $this->jobRepository->delete($id);

        if (!$deleted) {
            return ApiResponse::error('Job not found', 404);
        }

        return ApiResponse::success(null, 'Job deleted');
    }
}
