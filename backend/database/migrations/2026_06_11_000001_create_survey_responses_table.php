<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('survey_responses', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->nullable();
            $table->string('mobile', 30)->nullable();
            $table->string('location')->index();
            $table->string('user_type')->index();
            $table->json('needed_services')->nullable();
            $table->text('finding_worker_pain_point')->nullable();
            $table->unsignedTinyInteger('workbridge_likelihood')->nullable();
            $table->string('important_feature')->nullable();
            $table->string('offered_service_skill')->nullable();
            $table->unsignedSmallInteger('years_experience')->nullable();
            $table->string('service_area')->nullable();
            $table->string('online_profile_interest')->nullable();
            $table->string('inquiries_bookings_interest')->nullable();
            $table->text('trust_concerns_feedback')->nullable();
            $table->text('desired_features_feedback')->nullable();
            $table->text('concerns_suggestions')->nullable();
            $table->string('source', 100)->nullable()->default('landing_page');
            $table->json('metadata')->nullable();
            $table->timestamps();

            $table->index('created_at');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('survey_responses');
    }
};
