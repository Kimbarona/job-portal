<?php

namespace App\Http\Requests\Survey;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreSurveyResponseRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['nullable', 'required_without:mobile', 'email', 'max:255'],
            'mobile' => ['nullable', 'required_without:email', 'string', 'max:30'],
            'location' => ['required', 'string', 'max:255'],
            'user_type' => ['required', 'string', Rule::in(['client', 'skilled_worker', 'both'])],
            'needed_services' => [
                Rule::excludeIf(! $this->isClientResponse()),
                'required',
                'array',
                'min:1',
            ],
            'needed_services.*' => [
                Rule::excludeIf(! $this->isClientResponse()),
                'string',
                'max:100',
            ],
            'finding_worker_pain_point' => ['nullable', 'string', 'max:2000'],
            'workbridge_likelihood' => ['nullable', 'integer', 'min:1', 'max:5'],
            'important_feature' => ['nullable', 'string', 'max:255'],
            'offered_service_skill' => [
                Rule::excludeIf(! $this->isSkilledWorkerResponse()),
                'required',
                'string',
                'max:255',
            ],
            'years_experience' => ['nullable', 'integer', 'min:0', 'max:80'],
            'service_area' => ['nullable', 'string', 'max:255'],
            'online_profile_interest' => ['nullable', 'string', Rule::in(['yes', 'maybe', 'no'])],
            'inquiries_bookings_interest' => ['nullable', 'string', Rule::in(['yes', 'maybe', 'no'])],
            'trust_concerns_feedback' => ['nullable', 'string', 'max:2000'],
            'desired_features_feedback' => ['nullable', 'string', 'max:2000'],
            'concerns_suggestions' => ['nullable', 'string', 'max:2000'],
            'source' => ['nullable', 'string', 'max:100'],
            'website' => ['prohibited'],
        ];
    }

    private function isClientResponse(): bool
    {
        return in_array($this->input('user_type'), ['client', 'both'], true);
    }

    private function isSkilledWorkerResponse(): bool
    {
        return in_array($this->input('user_type'), ['skilled_worker', 'both'], true);
    }
}
