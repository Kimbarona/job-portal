<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SurveyResponseTest extends TestCase
{
    use RefreshDatabase;

    public function test_client_survey_response_can_be_submitted(): void
    {
        $response = $this->postJson('/api/survey-responses', [
            'name' => 'Maria Santos',
            'email' => 'maria@example.com',
            'location' => 'Quezon City',
            'user_type' => 'client',
            'needed_services' => ['Plumber', 'Electrician'],
            'finding_worker_pain_point' => 'Hard to know who is reliable.',
            'workbridge_likelihood' => 5,
            'important_feature' => 'Ratings and reviews',
            'desired_features_feedback' => 'Verified profiles would help.',
            'source' => 'landing_page',
        ]);

        $response->assertCreated()
            ->assertJson([
                'success' => true,
                'message' => 'Survey response submitted',
                'data' => [
                    'user_type' => 'client',
                ],
            ])
            ->assertJsonStructure([
                'data' => ['id', 'user_type', 'submitted_at'],
            ]);

        $this->assertDatabaseHas('survey_responses', [
            'email' => 'maria@example.com',
            'location' => 'Quezon City',
            'user_type' => 'client',
            'source' => 'landing_page',
        ]);
    }

    public function test_skilled_worker_survey_response_can_be_submitted(): void
    {
        $response = $this->postJson('/api/survey-responses', [
            'name' => 'Juan Dela Cruz',
            'mobile' => '09171234567',
            'location' => 'Makati',
            'user_type' => 'skilled_worker',
            'offered_service_skill' => 'Aircon Technician',
            'years_experience' => 8,
            'service_area' => 'Metro Manila',
            'online_profile_interest' => 'yes',
            'inquiries_bookings_interest' => 'yes',
            'trust_concerns_feedback' => 'I want fair customer screening.',
            'source' => 'landing_page',
        ]);

        $response->assertCreated()
            ->assertJsonPath('data.user_type', 'skilled_worker');

        $this->assertDatabaseHas('survey_responses', [
            'mobile' => '09171234567',
            'user_type' => 'skilled_worker',
            'offered_service_skill' => 'Aircon Technician',
        ]);
    }

    public function test_contact_method_is_required(): void
    {
        $response = $this->postJson('/api/survey-responses', [
            'name' => 'No Contact',
            'location' => 'Manila',
            'user_type' => 'client',
            'needed_services' => ['Cleaner'],
        ]);

        $response->assertUnprocessable()
            ->assertJsonValidationErrors(['email', 'mobile']);
    }

    public function test_client_response_requires_needed_services(): void
    {
        $response = $this->postJson('/api/survey-responses', [
            'name' => 'Client User',
            'email' => 'client@example.com',
            'location' => 'Cebu',
            'user_type' => 'client',
        ]);

        $response->assertUnprocessable()
            ->assertJsonValidationErrors(['needed_services']);
    }

    public function test_skilled_worker_response_requires_offered_service_skill(): void
    {
        $response = $this->postJson('/api/survey-responses', [
            'name' => 'Worker User',
            'mobile' => '09170000000',
            'location' => 'Davao',
            'user_type' => 'skilled_worker',
        ]);

        $response->assertUnprocessable()
            ->assertJsonValidationErrors(['offered_service_skill']);
    }

    public function test_honeypot_field_rejects_bot_submissions(): void
    {
        $response = $this->postJson('/api/survey-responses', [
            'name' => 'Bot User',
            'email' => 'bot@example.com',
            'location' => 'Spam City',
            'user_type' => 'client',
            'needed_services' => ['Other Skilled Services'],
            'website' => 'https://spam.example.com',
        ]);

        $response->assertUnprocessable()
            ->assertJsonValidationErrors(['website']);

        $this->assertDatabaseCount('survey_responses', 0);
    }
}
