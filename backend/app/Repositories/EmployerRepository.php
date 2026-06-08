<?php

namespace App\Repositories;

use App\Models\Employer;

class EmployerRepository
{
    public function all(): iterable
    {
        return Employer::with(['user', 'company'])->get();
    }

    public function find(int $id): ?Employer
    {
        return Employer::with(['user', 'company'])->find($id);
    }

    public function create(array $data): Employer
    {
        return Employer::create($data);
    }

    public function update(int $id, array $data): ?Employer
    {
        $employer = $this->find($id);

        if (!$employer) {
            return null;
        }

        $employer->update($data);

        return $employer;
    }

    public function delete(int $id): bool
    {
        $employer = $this->find($id);

        if (!$employer) {
            return false;
        }

        return $employer->delete();
    }
}
