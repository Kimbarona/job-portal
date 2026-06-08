<?php

namespace App\Http\Requests\Job;

use Illuminate\Foundation\Http\FormRequest;

class UpdateJobRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'company_id' => ['sometimes', 'exists:companies,id'],
            'title' => ['sometimes', 'string', 'max:255'],
            'description' => ['sometimes', 'string'],
            'requirements' => ['nullable', 'string'],
            'responsibilities' => ['nullable', 'string'],
            'location' => ['sometimes', 'string', 'max:255'],
            'type' => ['sometimes', 'string', 'in:full-time,part-time,contract,freelance,internship'],
            'category' => ['sometimes', 'string', 'max:100'],
            'salary_min' => ['nullable', 'numeric', 'min:0'],
            'salary_max' => ['nullable', 'numeric', 'min:0', 'gte:salary_min'],
            'currency' => ['nullable', 'string', 'max:10'],
            'expires_at' => ['nullable', 'date', 'after:today'],
        ];
    }
}
