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
        Schema::table('users', function (Blueprint $table) {
            $table->string('avatar')->nullable()->after('email_verified_at');
            $table->string('phone')->nullable()->after('avatar');
            $table->text('bio')->nullable()->after('phone');
            $table->string('location')->nullable()->after('bio');
            $table->string('university')->nullable()->after('location');
            $table->string('major')->nullable()->after('university');
            $table->string('graduation_year')->nullable()->after('major');
            $table->string('current_position')->nullable()->after('graduation_year');
            $table->string('company')->nullable()->after('current_position');
            $table->json('interests')->nullable()->after('company');
            $table->json('skills')->nullable()->after('interests');
            $table->boolean('is_alumni')->default(false)->after('skills');
            $table->boolean('is_active')->default(true)->after('is_alumni');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'avatar',
                'phone',
                'bio',
                'location',
                'university',
                'major',
                'graduation_year',
                'current_position',
                'company',
                'interests',
                'skills',
                'is_alumni',
                'is_active',
            ]);
        });
    }
};
