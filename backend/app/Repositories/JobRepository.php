<?php

namespace App\Repositories;

use App\Models\Job;

class JobRepository
{
    public function all(): iterable
    {
        return Job::with('company')->get();
    }

    public function find(int $id): ?Job
    {
        return Job::with('company')->find($id);
    }

    public function create(array $data): Job
    {
        return Job::create($data);
    }

    public function update(int $id, array $data): ?Job
    {
        $job = $this->find($id);

        if (!$job) {
            return null;
        }

        $job->update($data);

        return $job;
    }

    public function delete(int $id): bool
    {
        $job = $this->find($id);

        if (!$job) {
            return false;
        }

        return $job->delete();
    }
}
