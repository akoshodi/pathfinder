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
        Schema::create('universities', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->string('logo')->nullable();
            $table->string('cover_image')->nullable();
            $table->string('location');
            $table->string('city')->nullable();
            $table->string('state')->nullable();
            $table->string('country')->default('USA');
            $table->enum('type', ['Public', 'Private'])->default('Public');
            $table->integer('ranking')->nullable();
            $table->string('acceptance_rate')->nullable();
            $table->integer('students_count')->nullable();
            $table->string('tuition')->nullable();
            $table->decimal('graduation_rate', 5, 2)->nullable();
            $table->decimal('retention_rate', 5, 2)->nullable();
            $table->text('campus_setting')->nullable();
            $table->json('programs')->nullable();
            $table->json('majors')->nullable();
            $table->json('facilities')->nullable();
            $table->json('athletics')->nullable();
            $table->json('stats')->nullable();
            $table->string('website')->nullable();
            $table->string('phone')->nullable();
            $table->boolean('is_partner')->default(false);
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
            $table->softDeletes();

            $table->index('slug');
            $table->index('type');
            $table->index('ranking');
            $table->index('is_featured');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('universities');
    }
};
