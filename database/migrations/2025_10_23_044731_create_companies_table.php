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
        Schema::create('companies', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->string('logo')->nullable();
            $table->string('cover_image')->nullable();
            $table->string('category');
            $table->string('location');
            $table->string('city')->nullable();
            $table->string('state')->nullable();
            $table->string('country')->default('USA');
            $table->string('employees')->nullable();
            $table->string('website')->nullable();
            $table->string('email')->nullable();
            $table->string('phone')->nullable();
            $table->integer('internships_count')->default(0);
            $table->integer('jobs_count')->default(0);
            $table->boolean('is_partner')->default(false);
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_active')->default(true);
            $table->json('benefits')->nullable();
            $table->json('values')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->index('slug');
            $table->index('category');
            $table->index('is_partner');
            $table->index('is_featured');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('companies');
    }
};
