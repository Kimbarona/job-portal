<?php

namespace Tests\Feature;

use App\Models\User;
use Filament\Facades\Filament;
use Filament\Panel;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Route;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class FilamentAdminPanelTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_role_can_access_admin_panel(): void
    {
        $user = User::factory()->admin()->make();

        $this->assertTrue($user->canAccessPanel($this->adminPanel()));
    }

    public function test_candidate_role_cannot_access_admin_panel(): void
    {
        $user = User::factory()->candidate()->make();

        $this->assertFalse($user->canAccessPanel($this->adminPanel()));
    }

    public function test_employer_role_cannot_access_admin_panel(): void
    {
        $user = User::factory()->employer()->make();

        $this->assertFalse($user->canAccessPanel($this->adminPanel()));
    }

    public function test_empty_role_cannot_access_admin_panel(): void
    {
        $user = User::factory()->make(['role' => '']);

        $this->assertFalse($user->canAccessPanel($this->adminPanel()));
    }

    public function test_unexpected_role_cannot_access_admin_panel(): void
    {
        $user = User::factory()->make(['role' => 'super-admin']);

        $this->assertFalse($user->canAccessPanel($this->adminPanel()));
    }

    public function test_null_role_cannot_access_admin_panel(): void
    {
        $user = new User(['role' => null]);

        $this->assertFalse($user->canAccessPanel($this->adminPanel()));
    }

    public function test_admin_role_cannot_access_non_admin_panel(): void
    {
        $user = User::factory()->admin()->make();

        $this->assertFalse($user->canAccessPanel((new Panel)->id('worker')));
    }

    public function test_guest_can_view_filament_login_page(): void
    {
        $this->get('/admin/login')
            ->assertOk()
            ->assertSee('Email')
            ->assertSee('Password');
    }

    public function test_guest_visiting_admin_dashboard_is_redirected_to_filament_login(): void
    {
        $this->get('/admin')
            ->assertRedirect('/admin/login');
    }

    public function test_guest_cannot_see_authenticated_filament_dashboard_content(): void
    {
        $this->get('/admin')
            ->assertDontSee('Dashboard')
            ->assertRedirect('/admin/login');
    }

    public function test_authenticated_admin_can_access_filament_dashboard(): void
    {
        $admin = User::factory()->admin()->create();

        $this->actingAs($admin)
            ->get('/admin')
            ->assertOk()
            ->assertSee('Dashboard');
    }

    public function test_authenticated_candidate_is_denied_filament_dashboard(): void
    {
        $candidate = User::factory()->candidate()->create();

        $this->actingAs($candidate)
            ->get('/admin')
            ->assertForbidden()
            ->assertDontSee('Dashboard');
    }

    public function test_authenticated_employer_is_denied_filament_dashboard(): void
    {
        $employer = User::factory()->employer()->create();

        $this->actingAs($employer)
            ->get('/admin')
            ->assertForbidden()
            ->assertDontSee('Dashboard');
    }

    public function test_authenticated_invalid_role_is_denied_filament_dashboard(): void
    {
        $user = User::factory()->create(['role' => 'invalid']);

        $this->actingAs($user)
            ->get('/admin')
            ->assertForbidden()
            ->assertDontSee('Dashboard');
    }

    public function test_panel_configuration_is_registered(): void
    {
        $panel = $this->adminPanel();

        $this->assertSame('admin', $panel->getId());
        $this->assertSame('admin', $panel->getPath());
        $this->assertTrue($panel->hasLogin());
        $this->assertArrayHasKey('admin', Filament::getPanels());
    }

    public function test_filament_routes_are_registered(): void
    {
        $this->assertNotNull(route('filament.admin.auth.login', absolute: false));
        $this->assertSame('/admin/login', route('filament.admin.auth.login', absolute: false));
        $this->assertSame('/admin', route('filament.admin.pages.dashboard', absolute: false));
    }

    public function test_filament_artisan_commands_are_registered(): void
    {
        $commands = array_keys($this->app->make('Illuminate\Contracts\Console\Kernel')->all());

        $this->assertContains('filament:install', $commands);
        $this->assertContains('make:filament-resource', $commands);
        $this->assertContains('make:filament-user', $commands);
    }

    public function test_existing_api_admin_routes_remain_registered(): void
    {
        $routes = collect(Route::getRoutes())->map(fn ($route): string => implode('|', $route->methods()).' '.$route->uri());

        $this->assertContains('GET|HEAD api/admin/users', $routes);
        $this->assertContains('GET|HEAD api/admin/stats', $routes);
    }

    public function test_existing_api_admin_routes_remain_protected_for_guests(): void
    {
        $this->getJson('/api/admin/users')
            ->assertUnauthorized();

        $this->getJson('/api/admin/stats')
            ->assertUnauthorized();
    }

    public function test_non_admin_sanctum_user_remains_blocked_from_api_admin_routes(): void
    {
        Sanctum::actingAs(User::factory()->candidate()->create());

        $this->getJson('/api/admin/users')
            ->assertForbidden()
            ->assertJsonPath('success', false);

        $this->getJson('/api/admin/stats')
            ->assertForbidden()
            ->assertJsonPath('success', false);
    }

    public function test_admin_sanctum_user_remains_allowed_for_api_admin_routes(): void
    {
        Sanctum::actingAs(User::factory()->admin()->create());

        $this->getJson('/api/admin/users')
            ->assertOk()
            ->assertJsonPath('success', true);

        $this->getJson('/api/admin/stats')
            ->assertOk()
            ->assertJsonPath('success', true);
    }

    private function adminPanel(): Panel
    {
        $panel = Filament::getPanel('admin');

        $this->assertInstanceOf(Panel::class, $panel);

        return $panel;
    }
}
