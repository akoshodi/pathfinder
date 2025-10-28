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
        Schema::create('competitions', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('description');
            $table->string('category');
            $table->string('organizer');
            $table->string('website_url')->nullable();
            $table->decimal('prize_amount', 10, 2)->nullable();
            $table->string('prize_description')->nullable();
            $table->json('eligibility_requirements')->nullable();
            $table->timestamp('registration_start')->nullable();
            $table->timestamp('registration_end')->nullable();
            $table->timestamp('competition_date')->nullable();
            $table->string('location')->nullable();
            $table->string('format')->nullable(); // online, in-person, hybrid
            $table->string('image')->nullable();
            $table->integer('participants_count')->default(0);
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
            $table->softDeletes();

            $table->index(['category', 'is_active']);
            $table->index('competition_date');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('competitions');
    }
};
