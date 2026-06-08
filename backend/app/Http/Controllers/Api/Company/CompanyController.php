<?php

namespace App\Http\Controllers\Api\Company;

use App\Http\Controllers\Controller;
use App\Http\Requests\Company\StoreCompanyRequest;
use App\Http\Requests\Company\UpdateCompanyRequest;
use App\Http\Resources\ApiResponse;
use App\Http\Resources\CompanyResource;
use App\Repositories\CompanyRepository;

class CompanyController extends Controller
{
    public function __construct(
        private readonly CompanyRepository $companyRepository
    ) {}

    public function index(): ApiResponse
    {
        $companies = $this->companyRepository->all();

        return ApiResponse::success(CompanyResource::collection($companies));
    }

    public function store(StoreCompanyRequest $request): ApiResponse
    {
        $company = $this->companyRepository->create($request->validated());

        return ApiResponse::success(new CompanyResource($company), 'Company created', 201);
    }

    public function show(int $id): ApiResponse
    {
        $company = $this->companyRepository->find($id);

        if (!$company) {
            return ApiResponse::error('Company not found', 404);
        }

        return ApiResponse::success(new CompanyResource($company));
    }

    public function update(UpdateCompanyRequest $request, int $id): ApiResponse
    {
        $company = $this->companyRepository->update($id, $request->validated());

        if (!$company) {
            return ApiResponse::error('Company not found', 404);
        }

        return ApiResponse::success(new CompanyResource($company), 'Company updated');
    }

    public function destroy(int $id): ApiResponse
    {
        $deleted = $this->companyRepository->delete($id);

        if (!$deleted) {
            return ApiResponse::error('Company not found', 404);
        }

        return ApiResponse::success(null, 'Company deleted');
    }
}
