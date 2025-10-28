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
        Schema::create('university_user', function (Blueprint $table) {
            $table->id();
            $table->foreignId('university_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->enum('relationship', ['student', 'alumni', 'staff', 'follower'])->default('follower');
            $table->string('student_id')->nullable();
            $table->string('major')->nullable();
            $table->integer('graduation_year')->nullable();
            $table->timestamps();

            $table->unique(['university_id', 'user_id', 'relationship']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('university_user');
    }
};
