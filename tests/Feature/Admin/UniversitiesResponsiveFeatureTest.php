<?php

namespace Tests\Feature\Admin;

use App\Models\University;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UniversitiesResponsiveFeatureTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create();
        $this->user->assignRole('super-admin');
    }

    /**
     * Test universities index page loads successfully
     */
    public function test_universities_index_page_loads(): void
    {
        University::factory()->count(5)->create();

        $response = $this->actingAs($this->user)->get('/admin/universities');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('Admin/Universities/Index')
            ->has('universities.data', 5)
        );
    }

    /**
     * Test universities index has pagination
     */
    public function test_universities_index_has_pagination(): void
    {
        University::factory()->count(30)->create();

        $response = $this->actingAs($this->user)->get('/admin/universities');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('Admin/Universities/Index')
            ->has('universities.data', 15)
            ->where('universities.total', 30)
            ->where('universities.per_page', 15)
        );
    }

    /**
     * Test universities can be filtered by location
     */
    public function test_universities_filter_by_location(): void
    {
        University::factory()->create(['location' => 'New York']);
        University::factory()->create(['location' => 'California']);
        University::factory()->count(3)->create(['location' => 'Texas']);

        $response = $this->actingAs($this->user)
            ->get('/admin/universities?location=Texas');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('Admin/Universities/Index')
            ->where('universities.total', 3)
        );
    }

    /**
     * Test universities can be sorted by name
     */
    public function test_universities_sort_by_name(): void
    {
        University::factory()->create(['name' => 'Harvard University']);
        University::factory()->create(['name' => 'MIT']);
        University::factory()->create(['name' => 'Stanford University']);

        $response = $this->actingAs($this->user)
            ->get('/admin/universities?sort=name&direction=asc');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('Admin/Universities/Index')
            ->has('universities.data')
        );
    }

    /**
     * Test universities create page loads with proper props
     */
    public function test_universities_create_page_loads(): void
    {
        $response = $this->actingAs($this->user)->get('/admin/universities/create');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('Admin/Universities/Create')
        );
    }

    /**
     * Test university can be created with valid data
     */
    public function test_university_can_be_created(): void
    {
        $data = [
            'name' => 'New University',
            'slug' => 'new-university',
            'description' => 'A test university',
            'location' => 'Boston',
            'type' => 'university',
            'website' => 'https://newuniversity.edu',
        ];

        $response = $this->actingAs($this->user)->post('/admin/universities', $data);

        $response->assertRedirect('/admin/universities');
        $this->assertDatabaseHas('universities', [
            'name' => 'New University',
            'location' => 'Boston',
        ]);
    }

    /**
     * Test university creation validates required fields
     */
    public function test_university_creation_validates_required_fields(): void
    {
        $response = $this->actingAs($this->user)->post('/admin/universities', []);

        $response->assertSessionHasErrors(['name', 'type']);
    }

    /**
     * Test university can be updated with location as string
     */
    public function test_university_can_be_updated_with_location_string(): void
    {
        $university = University::factory()->create([
            'location' => 'Old Location',
            'type' => 'university',
        ]);

        $data = [
            'name' => $university->name,
            'slug' => $university->slug,
            'description' => $university->description,
            'location' => 'New Location',
            'type' => 'university',
        ];

        $response = $this->actingAs($this->user)
            ->put("/admin/universities/{$university->id}", $data);

        $response->assertRedirect('/admin/universities');
        $this->assertDatabaseHas('universities', [
            'id' => $university->id,
            'location' => 'New Location',
        ]);
    }

    /**
     * Test university can be deleted
     */
    public function test_university_can_be_deleted(): void
    {
        $university = University::factory()->create();

        $response = $this->actingAs($this->user)
            ->delete("/admin/universities/{$university->id}");

        $response->assertRedirect('/admin/universities');
        $this->assertSoftDeleted('universities', [
            'id' => $university->id,
        ]);
    }

    /**
     * Test university show page displays data
     */
    public function test_university_show_page_displays_data(): void
    {
        $university = University::factory()->create();

        $response = $this->actingAs($this->user)
            ->get("/admin/universities/{$university->id}");

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('Admin/Universities/Show')
            ->where('university.id', $university->id)
            ->where('university.name', $university->name)
        );
    }

    /**
     * Test unauthorized users cannot access admin pages
     */
    public function test_unauthorized_users_cannot_access_universities(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->get('/admin/universities');

        $response->assertForbidden();
    }

    /**
     * Test edit page loads with university data
     */
    public function test_university_edit_page_loads_with_data(): void
    {
        $university = University::factory()->create();

        $response = $this->actingAs($this->user)
            ->get("/admin/universities/{$university->id}/edit");

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('Admin/Universities/Edit')
            ->where('university.id', $university->id)
            ->where('university.name', $university->name)
        );
    }

    /**
     * Test table renders with responsive data structure
     */
    public function test_index_provides_responsive_data_structure(): void
    {
        University::factory()->count(5)->create();

        $response = $this->actingAs($this->user)->get('/admin/universities');

        $response->assertInertia(fn ($page) => $page
            ->has('universities.data', 5)
            ->has('universities.current_page')
            ->has('universities.last_page')
            ->has('universities.per_page')
            ->has('universities.total')
        );
    }
}
