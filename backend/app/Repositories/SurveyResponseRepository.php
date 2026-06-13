<?php

namespace App\Repositories;

use App\Models\SurveyResponse;

class SurveyResponseRepository
{
    public function create(array $data): SurveyResponse
    {
        return SurveyResponse::create($data);
    }
}
