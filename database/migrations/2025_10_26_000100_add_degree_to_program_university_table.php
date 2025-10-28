<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('program_university', function (Blueprint $table): void {
            $table->string('degree')->nullable()->after('college');
            $table->index('degree');
        });
    }

    public function down(): void
    {
        Schema::table('program_university', function (Blueprint $table): void {
            $table->dropIndex(['degree']);
            $table->dropColumn('degree');
        });
    }
};
