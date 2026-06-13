<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SurveyResponse extends Model
{
    protected $fillable = [
        'name',
        'email',
        'mobile',
        'location',
        'user_type',
        'needed_services',
        'finding_worker_pain_point',
        'workbridge_likelihood',
        'important_feature',
        'offered_service_skill',
        'years_experience',
        'service_area',
        'online_profile_interest',
        'inquiries_bookings_interest',
        'trust_concerns_feedback',
        'desired_features_feedback',
        'concerns_suggestions',
        'source',
        'metadata',
    ];

    protected function casts(): array
    {
        return [
            'metadata' => 'array',
            'needed_services' => 'array',
            'workbridge_likelihood' => 'integer',
            'years_experience' => 'integer',
        ];
    }
}
