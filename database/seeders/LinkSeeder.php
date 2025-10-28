<?php

namespace Database\Seeders;

use App\Models\Link;
use App\Models\LinkComment;
use App\Models\LinkVote;
use App\Models\User;
use Illuminate\Database\Seeder;

class LinkSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Ensure we have some users
        $users = User::query()->count() ? User::all() : User::factory()->count(5)->create();

        // Create links with comments and votes
        Link::factory()
            ->count(15)
            ->recycle($users)
            ->create()
            ->each(function (Link $link) use ($users) {
                // Comments
                LinkComment::factory()
                    ->count(fake()->numberBetween(0, 6))
                    ->recycle([$link, $users])
                    ->create();

                // Votes (unique by user)
                $voters = $users->shuffle()->take(fake()->numberBetween(0, $users->count()));
                foreach ($voters as $u) {
                    LinkVote::firstOrCreate([
                        'link_id' => $link->id,
                        'user_id' => $u->id,
                    ]);
                }
            });
    }
}
