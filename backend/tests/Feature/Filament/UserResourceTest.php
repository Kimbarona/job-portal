<?php

namespace Tests\Feature\Filament;

use App\Filament\Resources\UserResource;
use App\Filament\Resources\UserResource\Pages\EditUser;
use App\Filament\Resources\UserResource\Pages\ListUsers;
use App\Models\User;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Forms\Components\Select;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Livewire\Livewire;
use Tests\TestCase;

class UserResourceTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_see_users_navigation_item_and_page(): void
    {
        $admin = User::factory()->admin()->create();

        $this->actingAs($admin)
            ->get('/admin')
            ->assertOk()
            ->assertSee('Users');

        $this->actingAs($admin)
            ->get(UserResource::getUrl('index'))
            ->assertOk()
            ->assertSee('Users');
    }

    public function test_admin_can_list_users(): void
    {
        $admin = User::factory()->admin()->create();
        $users = User::factory()->count(3)->create();

        $this->actingAs($admin);

        Livewire::test(ListUsers::class)
            ->assertCanSeeTableRecords($users);
    }

    public function test_admin_can_search_users_by_name(): void
    {
        $admin = User::factory()->admin()->create();
        $matchingUser = User::factory()->create(['name' => 'Exact Search Name']);
        $otherUser = User::factory()->create(['name' => 'Different Person']);

        $this->actingAs($admin);

        Livewire::test(ListUsers::class)
            ->searchTable('Exact Search Name')
            ->assertCanSeeTableRecords([$matchingUser])
            ->assertCanNotSeeTableRecords([$otherUser]);
    }

    public function test_admin_can_search_users_by_email(): void
    {
        $admin = User::factory()->admin()->create();
        $matchingUser = User::factory()->create(['email' => 'search-match@example.com']);
        $otherUser = User::factory()->create(['email' => 'other@example.com']);

        $this->actingAs($admin);

        Livewire::test(ListUsers::class)
            ->searchTable('search-match@example.com')
            ->assertCanSeeTableRecords([$matchingUser])
            ->assertCanNotSeeTableRecords([$otherUser]);
    }

    public function test_admin_can_filter_users_by_role(): void
    {
        $admin = User::factory()->admin()->create();
        $candidate = User::factory()->candidate()->create();
        $employer = User::factory()->employer()->create();

        $this->actingAs($admin);

        Livewire::test(ListUsers::class)
            ->filterTable('role', 'candidate')
            ->assertCanSeeTableRecords([$candidate])
            ->assertCanNotSeeTableRecords([$admin, $employer]);
    }

    public function test_admin_can_view_a_user(): void
    {
        $admin = User::factory()->admin()->create();
        $user = User::factory()->candidate()->create();

        $this->actingAs($admin)
            ->get(UserResource::getUrl('view', ['record' => $user]))
            ->assertOk()
            ->assertSee($user->name)
            ->assertSee($user->email)
            ->assertSee($user->role);
    }

    public function test_admin_can_edit_another_users_safe_fields(): void
    {
        $admin = User::factory()->admin()->create();
        $user = User::factory()->candidate()->create();

        $this->actingAs($admin);

        Livewire::test(EditUser::class, ['record' => $user->id])
            ->fillForm([
                'name' => 'Updated User Name',
                'email' => 'updated-user@example.com',
                'role' => 'employer',
            ])
            ->call('save')
            ->assertHasNoFormErrors();

        $this->assertDatabaseHas(User::class, [
            'id' => $user->id,
            'name' => 'Updated User Name',
            'email' => 'updated-user@example.com',
            'role' => 'employer',
        ]);
    }

    public function test_candidate_cannot_access_users_resource(): void
    {
        $candidate = User::factory()->candidate()->create();

        $this->actingAs($candidate)
            ->get(UserResource::getUrl('index'))
            ->assertForbidden();
    }

    public function test_employer_cannot_access_users_resource(): void
    {
        $employer = User::factory()->employer()->create();

        $this->actingAs($employer)
            ->get(UserResource::getUrl('index'))
            ->assertForbidden();
    }

    public function test_guest_cannot_access_users_resource(): void
    {
        $this->get(UserResource::getUrl('index'))
            ->assertRedirect('/admin/login');
    }

    public function test_password_hash_is_not_visible_on_list_or_view_pages(): void
    {
        $admin = User::factory()->admin()->create();
        $user = User::factory()->candidate()->create();

        $this->actingAs($admin)
            ->get(UserResource::getUrl('index'))
            ->assertOk()
            ->assertDontSee($user->password);

        $this->actingAs($admin)
            ->get(UserResource::getUrl('view', ['record' => $user]))
            ->assertOk()
            ->assertDontSee($user->password)
            ->assertDontSee('remember_token')
            ->assertDontSee('password');
    }

    public function test_admin_cannot_delete_users(): void
    {
        $admin = User::factory()->admin()->create();
        $user = User::factory()->candidate()->create();

        $this->actingAs($admin);

        $this->assertFalse(UserResource::canDelete($user));

        Livewire::test(ListUsers::class)
            ->assertTableActionDoesNotExist(DeleteAction::getDefaultName(), record: $user);

        Livewire::test(EditUser::class, ['record' => $user->id])
            ->assertActionDoesNotExist(DeleteAction::getDefaultName());
    }

    public function test_bulk_delete_is_not_available(): void
    {
        $admin = User::factory()->admin()->create();

        $this->actingAs($admin);

        $this->assertFalse(UserResource::canDeleteAny());

        Livewire::test(ListUsers::class)
            ->assertTableBulkActionDoesNotExist(DeleteBulkAction::getDefaultName());
    }

    public function test_admin_cannot_remove_their_own_admin_role(): void
    {
        $admin = User::factory()->admin()->create();

        $this->actingAs($admin);

        Livewire::test(EditUser::class, ['record' => $admin->id])
            ->fillForm([
                'name' => $admin->name,
                'email' => $admin->email,
                'role' => 'candidate',
            ])
            ->call('save')
            ->assertHasNoFormErrors();

        $this->assertDatabaseHas(User::class, [
            'id' => $admin->id,
            'role' => 'admin',
        ]);
    }

    public function test_role_options_are_limited_to_approved_roles(): void
    {
        $admin = User::factory()->admin()->create();
        $user = User::factory()->candidate()->create();

        $this->actingAs($admin);

        Livewire::test(EditUser::class, ['record' => $user->id])
            ->assertFormFieldExists('role', function (Select $field): bool {
                return $field->getOptions() === [
                    'admin' => 'Admin',
                    'candidate' => 'Candidate',
                    'employer' => 'Employer',
                ];
            });
    }
}
