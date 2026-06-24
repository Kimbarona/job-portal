<?php

namespace App\Filament\Resources\UserResource\Schemas;

use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Schema;

class UserInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->schema([
                TextEntry::make('id'),
                TextEntry::make('name'),
                TextEntry::make('email'),
                TextEntry::make('role')
                    ->badge(),
                TextEntry::make('created_at')
                    ->dateTime(),
                TextEntry::make('updated_at')
                    ->dateTime(),
            ]);
    }
}
