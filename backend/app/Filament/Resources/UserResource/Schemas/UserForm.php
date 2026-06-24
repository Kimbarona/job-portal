<?php

namespace App\Filament\Resources\UserResource\Schemas;

use App\Models\User;
use Filament\Facades\Filament;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class UserForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->schema([
                TextInput::make('name')
                    ->required()
                    ->maxLength(255),

                TextInput::make('email')
                    ->email()
                    ->required()
                    ->maxLength(255)
                    ->unique(ignoreRecord: true),

                Select::make('role')
                    ->options([
                        'admin' => 'Admin',
                        'candidate' => 'Candidate',
                        'employer' => 'Employer',
                    ])
                    ->required()
                    ->disabled(fn (?User $record): bool => $record?->is(Filament::auth()->user()) ?? false),
            ]);
    }
}
