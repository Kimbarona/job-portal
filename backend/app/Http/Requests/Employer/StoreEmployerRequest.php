<?php

namespace App\Http\Requests\Employer;

use Illuminate\Foundation\Http\FormRequest;

class StoreEmployerRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'user_id' => ['required', 'exists:users,id'],
            'company_id' => ['required', 'exists:companies,id'],
            'position' => ['nullable', 'string', 'max:255'],
        ];
    }
}
