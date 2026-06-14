<?php

namespace App\Http\Controllers\Api\Survey;

use App\Http\Controllers\Controller;
use App\Http\Requests\Survey\StoreSurveyResponseRequest;
use App\Http\Resources\ApiResponse;
use App\Http\Resources\SurveyResponseResource;
use App\Repositories\SurveyResponseRepository;

class SurveyResponseController extends Controller
{
    public function __construct(
        private readonly SurveyResponseRepository $surveyResponseRepository
    ) {}

    public function store(StoreSurveyResponseRequest $request): ApiResponse
    {
        $data = $request->validated();
        unset($data['website']);

        $surveyResponse = $this->surveyResponseRepository->create($data);

        return ApiResponse::success(
            new SurveyResponseResource($surveyResponse),
            'Survey response submitted',
            201
        );
    }
}
