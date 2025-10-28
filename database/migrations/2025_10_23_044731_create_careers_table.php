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
        Schema::create('careers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('company_id')->nullable()->constrained()->onDelete('cascade');
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('description');
            $table->enum('type', ['full-time', 'part-time', 'internship', 'contract'])->default('full-time');
            $table->string('location');
            $table->boolean('is_remote')->default(false);
            $table->string('salary_range')->nullable();
            $table->enum('experience_level', ['entry', 'mid', 'senior', 'lead'])->default('entry');
            $table->json('requirements')->nullable();
            $table->json('responsibilities')->nullable();
            $table->json('benefits')->nullable();
            $table->json('skills_required')->nullable();
            $table->string('application_url')->nullable();
            $table->date('deadline')->nullable();
            $table->boolean('is_active')->default(true);
            $table->boolean('is_featured')->default(false);
            $table->integer('applications_count')->default(0);
            $table->timestamps();
            $table->softDeletes();

            $table->index('slug');
            $table->index('type');
            $table->index('experience_level');
            $table->index('is_active');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('careers');
    }
};
