<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Assessment Types table - defines different assessment categories
        Schema::create('assessment_types', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // RIASEC, Skills, Personality, Career Fit
            $table->string('slug')->unique();
            $table->text('description');
            $table->string('category')->nullable(); // career_interest, skills, personality, career_fit
            $table->text('instructions')->nullable();
            $table->string('icon')->nullable();
            $table->integer('duration_minutes')->default(15);
            $table->integer('question_count')->default(0);
            $table->json('scoring_config')->nullable(); // Stores scoring rules
            $table->boolean('is_active')->default(true);
            $table->integer('order')->default(0);
            $table->timestamps();
        });

        // Questions table - stores all assessment questions
        Schema::create('assessment_questions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('assessment_type_id')->constrained('assessment_types')->onDelete('cascade');
            $table->text('question_text');
            $table->enum('question_type', ['multiple_choice', 'rating_scale', 'scenario', 'skill_rating'])->default('multiple_choice');
            $table->json('options')->nullable(); // For multiple choice options
            $table->integer('min_value')->nullable(); // For rating scales
            $table->integer('max_value')->nullable(); // For rating scales
            $table->string('scale_label_min')->nullable(); // e.g., "Strongly Disagree"
            $table->string('scale_label_max')->nullable(); // e.g., "Strongly Agree"
            $table->json('scoring_map')->nullable(); // Maps answers to RIASEC codes, skill domains, etc.
            $table->string('category')->nullable(); // e.g., "Realistic", "Investigative"
            $table->integer('order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // User Assessment Attempts table - tracks each assessment attempt
        Schema::create('user_assessment_attempts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('cascade');
            $table->foreignId('assessment_type_id')->constrained('assessment_types')->onDelete('cascade');
            $table->string('session_id')->nullable(); // For anonymous users
            $table->timestamp('started_at')->nullable();
            $table->timestamp('completed_at')->nullable();
            $table->integer('progress_percentage')->default(0);
            $table->json('raw_scores')->nullable(); // Raw computed scores
            $table->json('normalized_scores')->nullable(); // Normalized/weighted scores
            $table->json('metadata')->nullable(); // Additional context
            $table->timestamps();

            $table->index(['user_id', 'assessment_type_id']);
            $table->index('session_id');
        });

        // User Responses table - stores individual question answers
        Schema::create('user_assessment_responses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('attempt_id')->constrained('user_assessment_attempts')->onDelete('cascade');
            // Use a loose reference for question_id to simplify tests and allow historical data
            $table->unsignedBigInteger('question_id')->index();
            $table->text('response_value'); // The actual answer (numeric/string)
            $table->text('response_text')->nullable(); // Optional free-text response
            $table->string('question_category')->nullable(); // e.g., Realistic, Technical, Openness
            $table->integer('response_score')->nullable(); // Computed score for this response
            $table->integer('time_spent_seconds')->nullable();
            $table->timestamps();

            $table->index(['attempt_id', 'question_id']);
        });

        // Assessment Reports table - generated summaries and insights
        Schema::create('new_assessment_reports', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('cascade');
            $table->foreignId('attempt_id')->constrained('user_assessment_attempts')->onDelete('cascade');
            $table->string('report_type'); // interest, skills, personality, career_fit, comprehensive
            $table->string('title');
            $table->text('summary')->nullable();
            $table->json('top_traits')->nullable(); // Top 3 RIASEC codes, personality dimensions, etc.
            $table->json('strengths')->nullable();
            $table->json('growth_areas')->nullable();
            $table->json('visualization_data')->nullable(); // For charts: radar, bar, etc.
            $table->string('pdf_path')->nullable(); // Path to generated PDF
            $table->timestamp('generated_at');
            $table->timestamps();

            $table->index(['user_id', 'report_type']);
        });

        // Career Recommendations table - links reports to ONET occupations
        Schema::create('career_recommendations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('report_id')->constrained('new_assessment_reports')->onDelete('cascade');
            $table->string('onetsoc_code', 10);
            $table->decimal('match_score', 5, 2); // 0-100 percentage
            $table->json('match_reasons')->nullable(); // Why this career was recommended
            $table->json('skill_gaps')->nullable(); // Skills user needs to develop
            $table->json('education_requirements')->nullable();
            $table->json('learning_paths')->nullable(); // Suggested courses, certifications
            $table->integer('rank')->default(1); // 1 = top match
            $table->timestamps();

            // In some environments (tests/CI), ONET tables may not be present; add FK only when available
            if (\Illuminate\Support\Facades\Schema::hasTable('onet_occupation_data')) {
                $table->foreign('onetsoc_code')->references('onetsoc_code')->on('onet_occupation_data');
            }
            $table->index(['report_id', 'rank']);
        });

        // RIASEC Scores table - stores Holland Code results
        Schema::create('riasec_scores', function (Blueprint $table) {
            $table->id();
            $table->foreignId('attempt_id')->constrained('user_assessment_attempts')->onDelete('cascade');
            $table->integer('realistic_score')->default(0);
            $table->integer('investigative_score')->default(0);
            $table->integer('artistic_score')->default(0);
            $table->integer('social_score')->default(0);
            $table->integer('enterprising_score')->default(0);
            $table->integer('conventional_score')->default(0);
            $table->string('primary_code', 1); // Top code: R, I, A, S, E, or C
            $table->string('secondary_code', 1)->nullable();
            $table->string('tertiary_code', 1)->nullable();
            $table->string('holland_code', 3)->nullable(); // e.g., "RIA"
            $table->timestamps();

            $table->unique('attempt_id');
        });

        // Skill Proficiency table - stores skill assessment results
        Schema::create('skill_proficiencies', function (Blueprint $table) {
            $table->id();
            $table->foreignId('attempt_id')->constrained('user_assessment_attempts')->onDelete('cascade');
            $table->string('skill_domain'); // Cognitive, Technical, Social, Management, Creative
            $table->string('skill_name');
            $table->integer('proficiency_level'); // 1-5 or 1-10
            $table->integer('max_level')->default(5);
            $table->string('proficiency_label')->nullable(); // Beginner, Intermediate, Advanced, Expert
            $table->timestamps();

            $table->index(['attempt_id', 'skill_domain']);
        });

        // Personality Traits table - stores Big Five or MBTI results
        Schema::create('personality_traits', function (Blueprint $table) {
            $table->id();
            $table->foreignId('attempt_id')->constrained('user_assessment_attempts')->onDelete('cascade');
            $table->integer('openness_score')->nullable();
            $table->integer('conscientiousness_score')->nullable();
            $table->integer('extraversion_score')->nullable();
            $table->integer('agreeableness_score')->nullable();
            $table->integer('emotional_stability_score')->nullable();
            $table->string('mbti_type', 4)->nullable(); // e.g., "INTJ"
            $table->json('work_style_preferences')->nullable(); // Collaborative, Independent, etc.
            $table->timestamps();

            $table->unique('attempt_id');
        });

        // Assessment Analytics table - tracks aggregate stats for admin dashboard
        Schema::create('assessment_analytics', function (Blueprint $table) {
            $table->id();
            $table->foreignId('assessment_type_id')->constrained('assessment_types')->onDelete('cascade');
            $table->date('date');
            $table->integer('attempts_started')->default(0);
            $table->integer('attempts_completed')->default(0);
            $table->decimal('completion_rate', 5, 2)->default(0);
            $table->decimal('average_score', 5, 2)->nullable();
            $table->integer('average_duration_seconds')->nullable();
            $table->json('popular_careers')->nullable(); // Top recommended careers
            $table->json('common_skill_gaps')->nullable();
            $table->timestamps();

            $table->unique(['assessment_type_id', 'date']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('assessment_analytics');
        Schema::dropIfExists('personality_traits');
        Schema::dropIfExists('skill_proficiencies');
        Schema::dropIfExists('riasec_scores');
        Schema::dropIfExists('career_recommendations');
        Schema::dropIfExists('new_assessment_reports');
        Schema::dropIfExists('user_assessment_responses');
        Schema::dropIfExists('user_assessment_attempts');
        Schema::dropIfExists('assessment_questions');
        Schema::dropIfExists('assessment_types');
    }
};
