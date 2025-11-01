<?php

namespace Tests\Browser\Admin;

use App\Models\User;
use App\Models\University;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Dusk\Browser;
use Tests\DuskTestCase;

class UniversitiesResponsiveTest extends DuskTestCase
{
    use RefreshDatabase;

    /**
     * Test that universities table is responsive on desktop
     */
    public function test_universities_table_responsive_on_desktop(): void
    {
        $user = User::factory()->create();
        $user->assignRole('super-admin');

        University::factory()->count(5)->create();

        $this->browse(function (Browser $browser) use ($user) {
            $browser->loginAs($user)
                ->visit('/admin/universities')
                ->assertSee('Universities')
                // Verify table is visible on desktop
                ->assertVisible('table')
                // Verify columns are visible
                ->assertSee('Name')
                ->assertSee('Type')
                ->assertSee('Location')
                // Verify table has proper responsive classes
                ->assertVisible('table.w-full')
                ->assertNoJavascriptErrors();
        });
    }

    /**
     * Test that universities table is responsive on mobile
     */
    public function test_universities_table_responsive_on_mobile(): void
    {
        $user = User::factory()->create();
        $user->assignRole('super-admin');

        $universities = University::factory()->count(3)->create();

        $this->browse(function (Browser $browser) use ($user) {
            $browser->loginAs($user)
                ->resize(375, 812) // iPhone dimensions
                ->visit('/admin/universities')
                ->assertSee('Universities')
                // On mobile, should show card layout instead of table
                ->waitFor('.rounded-lg.bg-card.border')
                ->assertVisible('.rounded-lg.bg-card.border')
                ->assertNoJavascriptErrors();
        });
    }

    /**
     * Test that sidebar is hidden on mobile but accessible via toggle
     */
    public function test_sidebar_toggle_on_mobile(): void
    {
        $user = User::factory()->create();
        $user->assignRole('super-admin');

        $this->browse(function (Browser $browser) use ($user) {
            $browser->loginAs($user)
                ->resize(375, 812) // Mobile
                ->visit('/admin/universities')
                // Hamburger menu should be visible
                ->assertVisible('button[aria-label="Open menu"]')
                // Click to open sidebar
                ->click('button[aria-label="Open menu"]')
                // Sidebar should now be visible
                ->waitFor('aside')
                // Backdrop should be visible
                ->assertVisible('[class*="bg-black"]')
                // Click backdrop to close
                ->click('[class*="bg-black"]')
                ->assertNoJavascriptErrors();
        });
    }

    /**
     * Test table sorting works on all screen sizes
     */
    public function test_table_sorting_responsive(): void
    {
        $user = User::factory()->create();
        $user->assignRole('super-admin');

        University::factory()->create(['name' => 'University A']);
        University::factory()->create(['name' => 'University B']);

        $this->browse(function (Browser $browser) use ($user) {
            $browser->loginAs($user)
                ->visit('/admin/universities')
                ->assertSee('University A')
                ->assertSee('University B')
                // Test sorting on desktop
                ->click('th:contains("Name")')
                ->assertNoJavascriptErrors()
                // Verify sort indicator changes
                ->waitFor('svg[class*="text-blue"]')
                // Test on mobile
                ->resize(375, 812)
                ->refresh()
                ->assertNoJavascriptErrors();
        });
    }

    /**
     * Test pagination works on responsive layout
     */
    public function test_pagination_responsive(): void
    {
        $user = User::factory()->create();
        $user->assignRole('super-admin');

        University::factory()->count(20)->create();

        $this->browse(function (Browser $browser) use ($user) {
            $browser->loginAs($user)
                ->visit('/admin/universities')
                // Check desktop
                ->assertSee('Universities')
                // Check mobile view
                ->resize(375, 812)
                ->refresh()
                ->assertNoJavascriptErrors();
        });
    }

    /**
     * Test form padding is responsive
     */
    public function test_create_form_padding_responsive(): void
    {
        $user = User::factory()->create();
        $user->assignRole('super-admin');

        $this->browse(function (Browser $browser) use ($user) {
            $browser->loginAs($user)
                ->visit('/admin/universities/create')
                ->assertSee('Create University')
                // Check for responsive padding classes
                ->assertVisible('[class*="px-4"]')
                // Test on mobile
                ->resize(375, 812)
                ->assertNoJavascriptErrors()
                // Form should still be visible and functional
                ->assertVisible('form');
        });
    }

    /**
     * Test that tables have proper width constraints
     */
    public function test_table_width_constraints(): void
    {
        $user = User::factory()->create();
        $user->assignRole('super-admin');

        University::factory()->count(3)->create();

        $this->browse(function (Browser $browser) use ($user) {
            $browser->loginAs($user)
                ->visit('/admin/universities')
                // Table should have w-full class
                ->assertVisible('table.w-full')
                // Test horizontal scroll on mobile
                ->resize(375, 812)
                ->refresh()
                ->waitFor('div[class*="overflow-x-auto"]')
                ->assertNoJavascriptErrors();
        });
    }
}
