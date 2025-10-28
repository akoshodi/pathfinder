<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('program_university', function (Blueprint $table): void {
            $table->string('college')->nullable()->after('university_id');
            $table->index('college');
        });
    }

    public function down(): void
    {
        Schema::table('program_university', function (Blueprint $table): void {
            $table->dropIndex(['college']);
            $table->dropColumn('college');
        });
    }
};
