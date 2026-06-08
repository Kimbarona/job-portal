<?php

namespace App\Http\Requests\Job;

use Illuminate\Foundation\Http\FormRequest;

class StoreJobRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'company_id' => ['required', 'exists:companies,id'],
            'title' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'requirements' => ['nullable', 'string'],
            'responsibilities' => ['nullable', 'string'],
            'location' => ['required', 'string', 'max:255'],
            'type' => ['required', 'string', 'in:full-time,part-time,contract,freelance,internship'],
            'category' => ['required', 'string', 'max:100'],
            'salary_min' => ['nullable', 'numeric', 'min:0'],
            'salary_max' => ['nullable', 'numeric', 'min:0', 'gte:salary_min'],
            'currency' => ['nullable', 'string', 'max:10'],
            'expires_at' => ['nullable', 'date', 'after:today'],
        ];
    }
}
