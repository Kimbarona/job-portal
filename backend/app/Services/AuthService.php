<?php

namespace App\Services;

use App\Models\User;
use App\Repositories\UserRepository;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;

class AuthService
{
    public function __construct(
        private readonly UserRepository $userRepository
    ) {}

    public function register(array $data): array
    {
        $data['password'] = Hash::make($data['password']);
        $data['is_active'] = true;

        $user = $this->userRepository->create($data);
        $token = $user->createToken('auth-token')->plainTextToken;

        return [
            'user' => $user,
            'token' => $token,
        ];
    }

    public function login(array $data): ?array
    {
        $user = $this->userRepository->findByEmail($data['email']);

        if (!$user || !Hash::check($data['password'], $user->password)) {
            return null;
        }

        $token = $user->createToken('auth-token')->plainTextToken;

        return [
            'user' => $user,
            'token' => $token,
        ];
    }

    public function sendResetLink(array $data): string
    {
        return Password::sendResetLink($data);
    }

    public function resetPassword(array $data): string
    {
        return Password::reset($data, function ($user, $password) {
            $user->password = Hash::make($password);
            $user->save();
        });
    }
}
