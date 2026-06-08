<?php

namespace App\Repositories;

use App\Models\Company;

class CompanyRepository
{
    public function all(): iterable
    {
        return Company::all();
    }

    public function find(int $id): ?Company
    {
        return Company::find($id);
    }

    public function create(array $data): Company
    {
        return Company::create($data);
    }

    public function update(int $id, array $data): ?Company
    {
        $company = $this->find($id);

        if (!$company) {
            return null;
        }

        $company->update($data);

        return $company;
    }

    public function delete(int $id): bool
    {
        $company = $this->find($id);

        if (!$company) {
            return false;
        }

        return $company->delete();
    }
}
