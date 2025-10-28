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
        Schema::create('courses', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->string('provider');
            $table->string('duration')->nullable();
            $table->enum('level', ['Beginner', 'Intermediate', 'Advanced'])->default('Beginner');
            $table->enum('category', ['undergraduate', 'postgraduate', 'mooc', 'projects'])->default('mooc');
            $table->integer('students_count')->default(0);
            $table->string('instructor')->nullable();
            $table->decimal('rating', 3, 2)->nullable();
            $table->integer('reviews_count')->default(0);
            $table->string('thumbnail')->nullable();
            $table->string('video_url')->nullable();
            $table->string('external_url')->nullable();
            $table->decimal('price', 10, 2)->nullable();
            $table->boolean('is_free')->default(true);
            $table->json('learning_outcomes')->nullable();
            $table->json('prerequisites')->nullable();
            $table->json('syllabus')->nullable();
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
            $table->softDeletes();

            $table->index('slug');
            $table->index('category');
            $table->index('level');
            $table->index('is_featured');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('courses');
    }
};
