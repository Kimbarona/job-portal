<?php

namespace App\Repositories;

use App\Models\Candidate;

class CandidateRepository
{
    public function all(): iterable
    {
        return Candidate::with('user')->get();
    }

    public function find(int $id): ?Candidate
    {
        return Candidate::with('user')->find($id);
    }

    public function create(array $data): Candidate
    {
        return Candidate::create($data);
    }

    public function update(int $id, array $data): ?Candidate
    {
        $candidate = $this->find($id);

        if (!$candidate) {
            return null;
        }

        $candidate->update($data);

        return $candidate;
    }

    public function delete(int $id): bool
    {
        $candidate = $this->find($id);

        if (!$candidate) {
            return false;
        }

        return $candidate->delete();
    }
}
