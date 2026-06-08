<?php

namespace App\Repositories;

use App\Models\User;

class UserRepository
{
    public function all(): iterable
    {
        return User::all();
    }

    public function find(int $id): ?User
    {
        return User::find($id);
    }

    public function findByEmail(string $email): ?User
    {
        return User::where('email', $email)->first();
    }

    public function create(array $data): User
    {
        return User::create($data);
    }

    public function update(int $id, array $data): ?User
    {
        $user = $this->find($id);

        if (!$user) {
            return null;
        }

        $user->update($data);

        return $user;
    }

    public function delete(int $id): bool
    {
        $user = $this->find($id);

        if (!$user) {
            return false;
        }

        return $user->delete();
    }
}
