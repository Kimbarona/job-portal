<?php

namespace App\Http\Controllers\Api\Candidate;

use App\Http\Controllers\Controller;
use App\Http\Requests\Candidate\StoreCandidateRequest;
use App\Http\Requests\Candidate\UpdateCandidateRequest;
use App\Http\Resources\ApiResponse;
use App\Http\Resources\CandidateResource;
use App\Repositories\CandidateRepository;

class CandidateController extends Controller
{
    public function __construct(
        private readonly CandidateRepository $candidateRepository
    ) {}

    public function index(): ApiResponse
    {
        $candidates = $this->candidateRepository->all();

        return ApiResponse::success(CandidateResource::collection($candidates));
    }

    public function store(StoreCandidateRequest $request): ApiResponse
    {
        $candidate = $this->candidateRepository->create($request->validated());

        return ApiResponse::success(new CandidateResource($candidate), 'Candidate created', 201);
    }

    public function show(int $id): ApiResponse
    {
        $candidate = $this->candidateRepository->find($id);

        if (!$candidate) {
            return ApiResponse::error('Candidate not found', 404);
        }

        return ApiResponse::success(new CandidateResource($candidate));
    }

    public function update(UpdateCandidateRequest $request, int $id): ApiResponse
    {
        $candidate = $this->candidateRepository->update($id, $request->validated());

        if (!$candidate) {
            return ApiResponse::error('Candidate not found', 404);
        }

        return ApiResponse::success(new CandidateResource($candidate), 'Candidate updated');
    }

    public function destroy(int $id): ApiResponse
    {
        $deleted = $this->candidateRepository->delete($id);

        if (!$deleted) {
            return ApiResponse::error('Candidate not found', 404);
        }

        return ApiResponse::success(null, 'Candidate deleted');
    }
}
