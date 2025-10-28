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
        // Reference tables (no foreign keys dependencies)
        Schema::create('onet_scales_reference', function (Blueprint $table) {
            $table->string('scale_id', 3)->primary();
            $table->string('scale_name', 50);
            $table->decimal('minimum', 2, 1);
            $table->decimal('maximum', 4, 1);
        });

        Schema::create('onet_content_model_reference', function (Blueprint $table) {
            $table->string('element_id', 20)->primary();
            $table->string('element_name', 150);
            $table->string('description', 1500);
        });

        Schema::create('onet_occupation_data', function (Blueprint $table) {
            $table->string('onetsoc_code', 10)->primary();
            $table->string('title', 150);
            $table->string('description', 1000);

            $table->index('onetsoc_code');
        });

        Schema::create('onet_job_zone_reference', function (Blueprint $table) {
            $table->decimal('job_zone', 2, 1)->primary();
            $table->string('name', 50);
            $table->string('experience', 300);
            $table->string('education', 500);
            $table->string('job_training', 300);
            $table->string('examples', 500);
            $table->string('svp_range', 25);
        });

        Schema::create('onet_unspsc_reference', function (Blueprint $table) {
            $table->decimal('commodity_code', 10, 0)->primary();
            $table->string('commodity_title', 150);
            $table->decimal('class_code', 10, 0);
            $table->string('class_title', 150);
            $table->decimal('family_code', 10, 0);
            $table->string('family_title', 150);
            $table->decimal('segment_code', 10, 0);
            $table->string('segment_title', 150);
        });

        // IWA and DWA references
        Schema::create('onet_iwa_reference', function (Blueprint $table) {
            $table->string('iwa_id', 20)->primary();
            $table->string('element_id', 20);
            $table->string('iwa_title', 150);

            $table->foreign('element_id')->references('element_id')->on('onet_content_model_reference');
        });

        Schema::create('onet_dwa_reference', function (Blueprint $table) {
            $table->string('dwa_id', 20)->primary();
            $table->string('element_id', 20);
            $table->string('iwa_id', 20);
            $table->string('dwa_title', 150);

            $table->foreign('element_id')->references('element_id')->on('onet_content_model_reference');
            $table->foreign('iwa_id')->references('iwa_id')->on('onet_iwa_reference');
        });

        // Task-related tables
        Schema::create('onet_task_statements', function (Blueprint $table) {
            $table->decimal('task_id', 10, 0)->primary();
            $table->string('onetsoc_code', 10);
            $table->string('task', 1000);
            $table->string('task_type', 12)->nullable();
            $table->decimal('incumbents_responding', 5, 0)->nullable();
            $table->string('date_updated');
            $table->string('domain_source', 30);

            $table->foreign('onetsoc_code')->references('onetsoc_code')->on('onet_occupation_data');
            $table->index('onetsoc_code');
        });

        Schema::create('onet_task_categories', function (Blueprint $table) {
            $table->string('scale_id', 3);
            $table->decimal('category', 4, 0);
            $table->string('category_description', 1000);

            $table->primary(['scale_id', 'category']);
            $table->foreign('scale_id')->references('scale_id')->on('onet_scales_reference');
        });

        Schema::create('onet_ete_categories', function (Blueprint $table) {
            $table->string('element_id', 20);
            $table->string('scale_id', 3);
            $table->decimal('category', 4, 0);
            $table->string('category_description', 1000);

            $table->primary(['element_id', 'scale_id', 'category']);
            $table->foreign('element_id')->references('element_id')->on('onet_content_model_reference');
            $table->foreign('scale_id')->references('scale_id')->on('onet_scales_reference');
        });

        Schema::create('onet_work_context_categories', function (Blueprint $table) {
            $table->string('element_id', 20);
            $table->string('scale_id', 3);
            $table->decimal('category', 4, 0);
            $table->string('category_description', 1000);

            $table->primary(['element_id', 'scale_id', 'category']);
            $table->foreign('element_id')->references('element_id')->on('onet_content_model_reference');
            $table->foreign('scale_id')->references('scale_id')->on('onet_scales_reference');
        });

        // Occupation-related data tables
        Schema::create('onet_abilities', function (Blueprint $table) {
            $table->id();
            $table->string('onetsoc_code', 10);
            $table->string('element_id', 20);
            $table->string('scale_id', 3);
            $table->decimal('data_value', 7, 2);
            $table->decimal('n', 5, 0)->nullable();
            $table->decimal('standard_error', 11, 4)->nullable();
            $table->decimal('lower_ci_bound', 11, 4)->nullable();
            $table->decimal('upper_ci_bound', 11, 4)->nullable();
            $table->string('recommend_suppress', 1)->nullable();
            $table->string('not_relevant', 1)->nullable();
            $table->string('date_updated');
            $table->string('domain_source', 30);

            $table->foreign('onetsoc_code')->references('onetsoc_code')->on('onet_occupation_data');
            $table->foreign('element_id')->references('element_id')->on('onet_content_model_reference');
            $table->foreign('scale_id')->references('scale_id')->on('onet_scales_reference');
            $table->index('onetsoc_code');
        });

        Schema::create('onet_skills', function (Blueprint $table) {
            $table->id();
            $table->string('onetsoc_code', 10);
            $table->string('element_id', 20);
            $table->string('scale_id', 3);
            $table->decimal('data_value', 7, 2);
            $table->decimal('n', 5, 0)->nullable();
            $table->decimal('standard_error', 11, 4)->nullable();
            $table->decimal('lower_ci_bound', 11, 4)->nullable();
            $table->decimal('upper_ci_bound', 11, 4)->nullable();
            $table->string('recommend_suppress', 1)->nullable();
            $table->string('not_relevant', 1)->nullable();
            $table->string('date_updated');
            $table->string('domain_source', 30);

            $table->foreign('onetsoc_code')->references('onetsoc_code')->on('onet_occupation_data');
            $table->foreign('element_id')->references('element_id')->on('onet_content_model_reference');
            $table->foreign('scale_id')->references('scale_id')->on('onet_scales_reference');
            $table->index('onetsoc_code');
        });

        Schema::create('onet_knowledge', function (Blueprint $table) {
            $table->id();
            $table->string('onetsoc_code', 10);
            $table->string('element_id', 20);
            $table->string('scale_id', 3);
            $table->decimal('data_value', 7, 2);
            $table->decimal('n', 5, 0)->nullable();
            $table->decimal('standard_error', 11, 4)->nullable();
            $table->decimal('lower_ci_bound', 11, 4)->nullable();
            $table->decimal('upper_ci_bound', 11, 4)->nullable();
            $table->string('recommend_suppress', 1)->nullable();
            $table->string('not_relevant', 1)->nullable();
            $table->string('date_updated');
            $table->string('domain_source', 30);

            $table->foreign('onetsoc_code')->references('onetsoc_code')->on('onet_occupation_data');
            $table->foreign('element_id')->references('element_id')->on('onet_content_model_reference');
            $table->foreign('scale_id')->references('scale_id')->on('onet_scales_reference');
            $table->index('onetsoc_code');
        });

        Schema::create('onet_work_activities', function (Blueprint $table) {
            $table->id();
            $table->string('onetsoc_code', 10);
            $table->string('element_id', 20);
            $table->string('scale_id', 3);
            $table->decimal('data_value', 7, 2);
            $table->decimal('n', 5, 0)->nullable();
            $table->decimal('standard_error', 11, 4)->nullable();
            $table->decimal('lower_ci_bound', 11, 4)->nullable();
            $table->decimal('upper_ci_bound', 11, 4)->nullable();
            $table->string('recommend_suppress', 1)->nullable();
            $table->string('not_relevant', 1)->nullable();
            $table->string('date_updated');
            $table->string('domain_source', 30);

            $table->foreign('onetsoc_code')->references('onetsoc_code')->on('onet_occupation_data');
            $table->foreign('element_id')->references('element_id')->on('onet_content_model_reference');
            $table->foreign('scale_id')->references('scale_id')->on('onet_scales_reference');
            $table->index('onetsoc_code');
        });

        Schema::create('onet_work_context', function (Blueprint $table) {
            $table->id();
            $table->string('onetsoc_code', 10);
            $table->string('element_id', 20);
            $table->string('scale_id', 3);
            $table->decimal('category', 4, 0)->nullable();
            $table->decimal('data_value', 7, 2);
            $table->decimal('n', 5, 0)->nullable();
            $table->decimal('standard_error', 11, 4)->nullable();
            $table->decimal('lower_ci_bound', 11, 4)->nullable();
            $table->decimal('upper_ci_bound', 11, 4)->nullable();
            $table->string('recommend_suppress', 1)->nullable();
            $table->string('not_relevant', 1)->nullable();
            $table->string('date_updated');
            $table->string('domain_source', 30);

            $table->foreign('onetsoc_code')->references('onetsoc_code')->on('onet_occupation_data');
            $table->foreign('element_id')->references('element_id')->on('onet_content_model_reference');
            $table->foreign('scale_id')->references('scale_id')->on('onet_scales_reference');
            $table->index('onetsoc_code');
        });

        Schema::create('onet_work_styles', function (Blueprint $table) {
            $table->id();
            $table->string('onetsoc_code', 10);
            $table->string('element_id', 20);
            $table->string('scale_id', 3);
            $table->decimal('data_value', 7, 2);
            $table->decimal('n', 5, 0)->nullable();
            $table->decimal('standard_error', 11, 4)->nullable();
            $table->decimal('lower_ci_bound', 11, 4)->nullable();
            $table->decimal('upper_ci_bound', 11, 4)->nullable();
            $table->string('recommend_suppress', 1)->nullable();
            $table->string('date_updated');
            $table->string('domain_source', 30);

            $table->foreign('onetsoc_code')->references('onetsoc_code')->on('onet_occupation_data');
            $table->foreign('element_id')->references('element_id')->on('onet_content_model_reference');
            $table->foreign('scale_id')->references('scale_id')->on('onet_scales_reference');
            $table->index('onetsoc_code');
        });

        Schema::create('onet_work_values', function (Blueprint $table) {
            $table->id();
            $table->string('onetsoc_code', 10);
            $table->string('element_id', 20);
            $table->string('scale_id', 3);
            $table->decimal('data_value', 7, 2);
            $table->string('date_updated');
            $table->string('domain_source', 30);

            $table->foreign('onetsoc_code')->references('onetsoc_code')->on('onet_occupation_data');
            $table->foreign('element_id')->references('element_id')->on('onet_content_model_reference');
            $table->foreign('scale_id')->references('scale_id')->on('onet_scales_reference');
            $table->index('onetsoc_code');
        });

        Schema::create('onet_interests', function (Blueprint $table) {
            $table->id();
            $table->string('onetsoc_code', 10);
            $table->string('element_id', 20);
            $table->string('scale_id', 3);
            $table->decimal('data_value', 7, 2);
            $table->string('date_updated');
            $table->string('domain_source', 30);

            $table->foreign('onetsoc_code')->references('onetsoc_code')->on('onet_occupation_data');
            $table->foreign('element_id')->references('element_id')->on('onet_content_model_reference');
            $table->foreign('scale_id')->references('scale_id')->on('onet_scales_reference');
            $table->index('onetsoc_code');
        });

        Schema::create('onet_education_training_experience', function (Blueprint $table) {
            $table->id();
            $table->string('onetsoc_code', 10);
            $table->string('element_id', 20);
            $table->string('scale_id', 3);
            $table->decimal('category', 4, 0)->nullable();
            $table->decimal('data_value', 7, 2);
            $table->decimal('n', 5, 0)->nullable();
            $table->decimal('standard_error', 11, 4)->nullable();
            $table->decimal('lower_ci_bound', 11, 4)->nullable();
            $table->decimal('upper_ci_bound', 11, 4)->nullable();
            $table->string('recommend_suppress', 1)->nullable();
            $table->string('date_updated');
            $table->string('domain_source', 30);

            $table->foreign('onetsoc_code')->references('onetsoc_code')->on('onet_occupation_data');
            $table->foreign('element_id')->references('element_id')->on('onet_content_model_reference');
            $table->foreign('scale_id')->references('scale_id')->on('onet_scales_reference');
            $table->index('onetsoc_code');
        });

        Schema::create('onet_job_zones', function (Blueprint $table) {
            $table->id();
            $table->string('onetsoc_code', 10);
            $table->decimal('job_zone', 2, 1);
            $table->string('date_updated');
            $table->string('domain_source', 30);

            $table->foreign('onetsoc_code')->references('onetsoc_code')->on('onet_occupation_data');
            $table->foreign('job_zone')->references('job_zone')->on('onet_job_zone_reference');
            $table->index('onetsoc_code');
        });

        Schema::create('onet_task_ratings', function (Blueprint $table) {
            $table->id();
            $table->string('onetsoc_code', 10);
            $table->decimal('task_id', 10, 0);
            $table->string('scale_id', 3);
            $table->decimal('category', 4, 0)->nullable();
            $table->decimal('data_value', 7, 2);
            $table->decimal('n', 5, 0)->nullable();
            $table->decimal('standard_error', 11, 4)->nullable();
            $table->decimal('lower_ci_bound', 11, 4)->nullable();
            $table->decimal('upper_ci_bound', 11, 4)->nullable();
            $table->string('recommend_suppress', 1)->nullable();
            $table->string('date_updated');
            $table->string('domain_source', 30);

            $table->foreign('onetsoc_code')->references('onetsoc_code')->on('onet_occupation_data');
            $table->foreign('task_id')->references('task_id')->on('onet_task_statements');
            $table->foreign('scale_id')->references('scale_id')->on('onet_scales_reference');
            $table->index('onetsoc_code');
            $table->index('task_id');
        });

        // Title and metadata tables
        Schema::create('onet_alternate_titles', function (Blueprint $table) {
            $table->id();
            $table->string('onetsoc_code', 10);
            $table->string('alternate_title', 250);
            $table->string('short_title', 150)->nullable();
            $table->string('sources', 50);

            $table->foreign('onetsoc_code')->references('onetsoc_code')->on('onet_occupation_data');
            $table->index('onetsoc_code');
        });

        Schema::create('onet_sample_of_reported_titles', function (Blueprint $table) {
            $table->id();
            $table->string('onetsoc_code', 10);
            $table->string('reported_job_title', 150);
            $table->string('shown_in_my_next_move', 1);

            $table->foreign('onetsoc_code')->references('onetsoc_code')->on('onet_occupation_data');
            $table->index('onetsoc_code');
        });

        Schema::create('onet_occupation_level_metadata', function (Blueprint $table) {
            $table->id();
            $table->string('onetsoc_code', 10);
            $table->string('item', 150);
            $table->string('response', 75)->nullable();
            $table->decimal('n', 5, 0)->nullable();
            $table->decimal('percent', 5, 1)->nullable();
            $table->string('date_updated');

            $table->foreign('onetsoc_code')->references('onetsoc_code')->on('onet_occupation_data');
            $table->index('onetsoc_code');
        });

        // Related occupations
        Schema::create('onet_related_occupations', function (Blueprint $table) {
            $table->id();
            $table->string('onetsoc_code', 10);
            $table->string('related_onetsoc_code', 10);
            $table->string('relatedness_tier', 50);
            $table->decimal('related_index', 4, 0);

            $table->foreign('onetsoc_code')->references('onetsoc_code')->on('onet_occupation_data');
            $table->foreign('related_onetsoc_code')->references('onetsoc_code')->on('onet_occupation_data');
            $table->index('onetsoc_code');
            $table->index('related_onetsoc_code');
        });

        // Technology and tools
        Schema::create('onet_technology_skills', function (Blueprint $table) {
            $table->id();
            $table->string('onetsoc_code', 10);
            $table->string('example', 150);
            $table->decimal('commodity_code', 10, 0);
            $table->string('hot_technology', 1);
            $table->string('in_demand', 1);

            $table->foreign('onetsoc_code')->references('onetsoc_code')->on('onet_occupation_data');
            $table->foreign('commodity_code')->references('commodity_code')->on('onet_unspsc_reference');
            $table->index('onetsoc_code');
        });

        Schema::create('onet_tools_used', function (Blueprint $table) {
            $table->id();
            $table->string('onetsoc_code', 10);
            $table->string('example', 150);
            $table->decimal('commodity_code', 10, 0);

            $table->foreign('onetsoc_code')->references('onetsoc_code')->on('onet_occupation_data');
            $table->foreign('commodity_code')->references('commodity_code')->on('onet_unspsc_reference');
            $table->index('onetsoc_code');
        });

        // Emerging tasks
        Schema::create('onet_emerging_tasks', function (Blueprint $table) {
            $table->id();
            $table->string('onetsoc_code', 10);
            $table->string('task', 1000);
            $table->string('category', 8);
            $table->decimal('original_task_id', 10, 0)->nullable();
            $table->string('date_updated');
            $table->string('domain_source', 30);

            $table->foreign('onetsoc_code')->references('onetsoc_code')->on('onet_occupation_data');
            $table->foreign('original_task_id')->references('task_id')->on('onet_task_statements');
            $table->index('onetsoc_code');
        });

        // Task to DWA mapping
        Schema::create('onet_tasks_to_dwas', function (Blueprint $table) {
            $table->id();
            $table->string('onetsoc_code', 10);
            $table->decimal('task_id', 10, 0);
            $table->string('dwa_id', 20);
            $table->string('date_updated');
            $table->string('domain_source', 30);

            $table->foreign('onetsoc_code')->references('onetsoc_code')->on('onet_occupation_data');
            $table->foreign('task_id')->references('task_id')->on('onet_task_statements');
            $table->foreign('dwa_id')->references('dwa_id')->on('onet_dwa_reference');
            $table->index('onetsoc_code');
            $table->index('task_id');
        });

        // Mapping tables between abilities/skills and work activities/context
        Schema::create('onet_abilities_to_work_activities', function (Blueprint $table) {
            $table->id();
            $table->string('abilities_element_id', 20);
            $table->string('work_activities_element_id', 20);

            $table->foreign('abilities_element_id')->references('element_id')->on('onet_content_model_reference');
            $table->foreign('work_activities_element_id')->references('element_id')->on('onet_content_model_reference');
        });

        Schema::create('onet_abilities_to_work_context', function (Blueprint $table) {
            $table->id();
            $table->string('abilities_element_id', 20);
            $table->string('work_context_element_id', 20);

            $table->foreign('abilities_element_id')->references('element_id')->on('onet_content_model_reference');
            $table->foreign('work_context_element_id')->references('element_id')->on('onet_content_model_reference');
        });

        Schema::create('onet_skills_to_work_activities', function (Blueprint $table) {
            $table->id();
            $table->string('skills_element_id', 20);
            $table->string('work_activities_element_id', 20);

            $table->foreign('skills_element_id')->references('element_id')->on('onet_content_model_reference');
            $table->foreign('work_activities_element_id')->references('element_id')->on('onet_content_model_reference');
        });

        Schema::create('onet_skills_to_work_context', function (Blueprint $table) {
            $table->id();
            $table->string('skills_element_id', 20);
            $table->string('work_context_element_id', 20);

            $table->foreign('skills_element_id')->references('element_id')->on('onet_content_model_reference');
            $table->foreign('work_context_element_id')->references('element_id')->on('onet_content_model_reference');
        });

        Schema::create('onet_basic_interests_to_riasec', function (Blueprint $table) {
            $table->id();
            $table->string('basic_interests_element_id', 20);
            $table->string('riasec_element_id', 20);

            $table->foreign('basic_interests_element_id')->references('element_id')->on('onet_content_model_reference');
            $table->foreign('riasec_element_id')->references('element_id')->on('onet_content_model_reference');
        });

        // Interests illustrative data
        Schema::create('onet_interests_illus_activities', function (Blueprint $table) {
            $table->id();
            $table->string('element_id', 20);
            $table->string('interest_type', 20);
            $table->string('activity', 150);

            $table->foreign('element_id')->references('element_id')->on('onet_content_model_reference');
        });

        Schema::create('onet_interests_illus_occupations', function (Blueprint $table) {
            $table->id();
            $table->string('element_id', 20);
            $table->string('interest_type', 20);
            $table->string('onetsoc_code', 10);

            $table->foreign('element_id')->references('element_id')->on('onet_content_model_reference');
            $table->foreign('onetsoc_code')->references('onetsoc_code')->on('onet_occupation_data');
        });

        // RIASEC keywords
        Schema::create('onet_riasec_keywords', function (Blueprint $table) {
            $table->id();
            $table->string('element_id', 20);
            $table->string('keyword', 150);
            $table->string('keyword_type', 20);

            $table->foreign('element_id')->references('element_id')->on('onet_content_model_reference');
        });

        // Survey and scale anchors
        Schema::create('onet_survey_booklet_locations', function (Blueprint $table) {
            $table->id();
            $table->string('element_id', 20);
            $table->string('survey_item_number', 5);
            $table->string('scale_id', 3);

            $table->foreign('element_id')->references('element_id')->on('onet_content_model_reference');
            $table->foreign('scale_id')->references('scale_id')->on('onet_scales_reference');
        });

        Schema::create('onet_level_scale_anchors', function (Blueprint $table) {
            $table->id();
            $table->string('element_id', 20);
            $table->string('scale_id', 3);
            $table->decimal('anchor_value', 4, 0);
            $table->string('anchor_description', 1000);

            $table->foreign('element_id')->references('element_id')->on('onet_content_model_reference');
            $table->foreign('scale_id')->references('scale_id')->on('onet_scales_reference');
        });

        // Associations (external data, no foreign key to occupation_data)
        Schema::create('professional_associations', function (Blueprint $table) {
            $table->id();
            $table->string('name', 255)->nullable();
            $table->string('url', 255)->nullable();
            $table->string('certification', 255)->nullable();
            $table->string('career_center_url', 255)->nullable();
            $table->integer('naics_code')->nullable();
            $table->string('onetsoc_code', 255)->nullable();

            $table->foreign('onetsoc_code')->references('onetsoc_code')->on('onet_occupation_data');
            $table->index('onetsoc_code');
            $table->index('naics_code');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('professional_associations');
        Schema::dropIfExists('onet_level_scale_anchors');
        Schema::dropIfExists('onet_survey_booklet_locations');
        Schema::dropIfExists('onet_riasec_keywords');
        Schema::dropIfExists('onet_interests_illus_occupations');
        Schema::dropIfExists('onet_interests_illus_activities');
        Schema::dropIfExists('onet_basic_interests_to_riasec');
        Schema::dropIfExists('onet_skills_to_work_context');
        Schema::dropIfExists('onet_skills_to_work_activities');
        Schema::dropIfExists('onet_abilities_to_work_context');
        Schema::dropIfExists('onet_abilities_to_work_activities');
        Schema::dropIfExists('onet_tasks_to_dwas');
        Schema::dropIfExists('onet_emerging_tasks');
        Schema::dropIfExists('onet_tools_used');
        Schema::dropIfExists('onet_technology_skills');
        Schema::dropIfExists('onet_related_occupations');
        Schema::dropIfExists('onet_occupation_level_metadata');
        Schema::dropIfExists('onet_sample_of_reported_titles');
        Schema::dropIfExists('onet_alternate_titles');
        Schema::dropIfExists('onet_task_ratings');
        Schema::dropIfExists('onet_job_zones');
        Schema::dropIfExists('onet_education_training_experience');
        Schema::dropIfExists('onet_interests');
        Schema::dropIfExists('onet_work_values');
        Schema::dropIfExists('onet_work_styles');
        Schema::dropIfExists('onet_work_context');
        Schema::dropIfExists('onet_work_activities');
        Schema::dropIfExists('onet_knowledge');
        Schema::dropIfExists('onet_skills');
        Schema::dropIfExists('onet_abilities');
        Schema::dropIfExists('onet_work_context_categories');
        Schema::dropIfExists('onet_ete_categories');
        Schema::dropIfExists('onet_task_categories');
        Schema::dropIfExists('onet_task_statements');
        Schema::dropIfExists('onet_dwa_reference');
        Schema::dropIfExists('onet_iwa_reference');
        Schema::dropIfExists('onet_unspsc_reference');
        Schema::dropIfExists('onet_job_zone_reference');
        Schema::dropIfExists('onet_occupation_data');
        Schema::dropIfExists('onet_content_model_reference');
        Schema::dropIfExists('onet_scales_reference');
    }
};
