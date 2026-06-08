<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class JobResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'company_id' => $this->company_id,
            'title' => $this->title,
            'slug' => $this->slug,
            'description' => $this->description,
            'requirements' => $this->requirements,
            'responsibilities' => $this->responsibilities,
            'location' => $this->location,
            'type' => $this->type,
            'category' => $this->category,
            'salary_min' => $this->salary_min,
            'salary_max' => $this->salary_max,
            'currency' => $this->currency,
            'is_active' => $this->is_active,
            'expires_at' => $this->expires_at,
            'company' => new CompanyResource($this->whenLoaded('company')),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
