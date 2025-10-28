<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class OnetDatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Configure a temporary SQLite connection to the source ONET database file
        $sourcePath = '/home/akoshodi/data/sqlitedbs/onetdb30.db';
        if (! file_exists($sourcePath)) {
            $this->command?->error("Source ONET SQLite DB not found at: {$sourcePath}");
            return;
        }

        Config::set('database.connections.onet_source', [
            'driver' => 'sqlite',
            'database' => $sourcePath,
            'foreign_key_constraints' => false,
        ]);

        $src = DB::connection('onet_source');
        $dst = DB::connection(); // default

        // Disable FKs on destination to allow out-of-order inserts safely
        Schema::disableForeignKeyConstraints();
        try {
            // Map source->destination table names where they differ
            $tableMap = [
                'associations' => 'professional_associations',
            ];

            $tablesInOrder = [
                // Reference tables
                'onet_scales_reference',
                'onet_content_model_reference',
                'onet_occupation_data',
                'onet_job_zone_reference',
                'onet_unspsc_reference',

                // IWA/DWA
                'onet_iwa_reference',
                'onet_dwa_reference',

                // Tasks and categories
                'onet_task_statements',
                'onet_task_categories',
                'onet_ete_categories',
                'onet_work_context_categories',

                // Occupation attributes
                'onet_abilities',
                'onet_skills',
                'onet_knowledge',
                'onet_work_activities',
                'onet_work_context',
                'onet_work_styles',
                'onet_work_values',
                'onet_interests',
                'onet_education_training_experience',
                'onet_job_zones',
                'onet_task_ratings',

                // Titles and metadata
                'onet_alternate_titles',
                'onet_sample_of_reported_titles',
                'onet_occupation_level_metadata',

                // Relationships, tech, tools
                'onet_related_occupations',
                'onet_technology_skills',
                'onet_tools_used',
                'onet_emerging_tasks',
                'onet_tasks_to_dwas',

                // Mapping tables
                'onet_abilities_to_work_activities',
                'onet_abilities_to_work_context',
                'onet_skills_to_work_activities',
                'onet_skills_to_work_context',
                'onet_basic_interests_to_riasec',

                // Interests + keywords
                'onet_interests_illus_activities',
                'onet_interests_illus_occupations',
                'onet_riasec_keywords',

                // Survey + anchors
                'onet_survey_booklet_locations',
                'onet_level_scale_anchors',

                // Associations (external ref)
                'associations',
            ];

            $chunkSize = 1000;
            foreach ($tablesInOrder as $sourceTable) {
                $destTable = $tableMap[$sourceTable] ?? $sourceTable;

                if (! Schema::hasTable($destTable)) {
                    $this->command?->warn("Skipping missing destination table: {$destTable}");
                    continue;
                }

                // Source table may not exist in some dumps; skip gracefully
                $srcHas = $src->select("SELECT name FROM sqlite_master WHERE type='table' AND name = ?", [$sourceTable]);
                if (empty($srcHas)) {
                    $this->command?->warn("Skipping missing source table: {$sourceTable}");
                    continue;
                }

                $this->command?->info("Importing {$sourceTable} -> {$destTable}...");

                // Clear destination table to make import idempotent
                try {
                    $dst->table($destTable)->delete();
                } catch (\Throwable $e) {
                    // Fallback raw delete for SQLite or edge cases
                    $dst->statement('DELETE FROM "'.$destTable.'"');
                }

                // Destination column whitelist (exclude auto-increment id if present)
                $destColumns = collect(Schema::getColumnListing($destTable))
                    ->reject(fn ($col) => $col === 'id')
                    ->values();

                $total = (int) ($src->table($sourceTable)->count());
                if ($total === 0) {
                    continue;
                }

                for ($offset = 0; $offset < $total; $offset += $chunkSize) {
                    $rows = $src->table($sourceTable)
                        ->limit($chunkSize)
                        ->offset($offset)
                        ->get();

                    if ($rows->isEmpty()) {
                        break;
                    }

                    $payload = [];
                    foreach ($rows as $row) {
                        $arr = (array) $row;

                        // Per-table column normalization / mapping
                        if ($destTable === 'professional_associations') {
                            // Source uses onet_code; destination expects onetsoc_code
                            if (array_key_exists('onet_code', $arr) && ! array_key_exists('onetsoc_code', $arr)) {
                                $arr['onetsoc_code'] = $arr['onet_code'];
                                unset($arr['onet_code']);
                            }
                        }
                        // Filter to destination columns only
                        $payload[] = collect($arr)
                            ->only($destColumns)
                            ->map(function ($val) {
                                // Normalize UTF-8 strings (SQLite export often uses TEXT)
                                if (is_string($val)) {
                                    return mb_convert_encoding($val, 'UTF-8', 'UTF-8');
                                }
                                return $val;
                            })
                            ->all();
                    }

                    // Insert chunk
                    if (! empty($payload)) {
                        $dst->table($destTable)->insert($payload);
                    }
                }
            }

            $this->command?->info('ONET import completed successfully.');
        } finally {
            Schema::enableForeignKeyConstraints();
            // Close the temporary source connection
            $src->disconnect();
        }
    }
}
