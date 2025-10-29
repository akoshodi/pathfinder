<?php

use App\Models\AlumniAssociation;
use App\Models\BlogPost;
use App\Models\Career;
use App\Models\Company;
use App\Models\Competition;
use App\Models\Course;
use App\Models\Link;
use App\Models\Location;
use App\Models\MarketplaceItem;
use App\Models\OnetOccupation;
use App\Models\Program;
use App\Models\Resource;
use App\Models\University;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\Models\Role;

beforeEach(function () {
    // Create necessary test data for pages that need it
    $this->university = University::factory()->create();
    $this->career = Career::factory()->create();
    $this->course = Course::factory()->create();
    $this->company = Company::factory()->create();
    $this->blogPost = BlogPost::factory()->create();
    $this->link = Link::factory()->create();
    $this->location = Location::factory()->create();
    $this->marketplaceItem = MarketplaceItem::factory()->create();
    $this->competition = Competition::factory()->create();
    $this->resource = Resource::factory()->create();
    $this->program = Program::factory()->create();
    
    // Create occupation
    $this->occupation = OnetOccupation::factory()->create([
        'slug' => 'software-developers',
    ]);
});

describe('Public Pages', function () {
    it('can visit home page', function () {
        $response = $this->get('/');
        $response->assertSuccessful();
    });

    it('can visit about page', function () {
        $response = $this->get('/about');
        $response->assertSuccessful();
    });

    it('can visit about careers page', function () {
        $response = $this->get('/about/careers');
        $response->assertSuccessful();
    });

    it('can visit about contact page', function () {
        $response = $this->get('/about/contact');
        $response->assertSuccessful();
    });

    it('can visit about data page', function () {
        $response = $this->get('/about/data');
        $response->assertSuccessful();
    });

    it('can visit about partnerships page', function () {
        $response = $this->get('/about/partnerships');
        $response->assertSuccessful();
    });

    it('can visit about press page', function () {
        $response = $this->get('/about/press');
        $response->assertSuccessful();
    });

    it('can visit about team page', function () {
        $response = $this->get('/about/team');
        $response->assertSuccessful();
    });

    it('can visit accessibility page', function () {
        $response = $this->get('/accessibility');
        $response->assertSuccessful();
    });

    it('can visit alumni index page', function () {
        $response = $this->get('/alumni');
        $response->assertSuccessful();
    });

    it('can visit privacy page', function () {
        $response = $this->get('/privacy');
        $response->assertSuccessful();
    });

    it('can visit terms page', function () {
        $response = $this->get('/terms');
        $response->assertSuccessful();
    });

    it('can visit help page', function () {
        $response = $this->get('/help');
        $response->assertSuccessful();
    });

    it('can visit sitemap page', function () {
        $response = $this->get('/sitemap');
        $response->assertSuccessful();
    });

    it('can visit claim school page', function () {
        $response = $this->get('/claim-school');
        $response->assertSuccessful();
    });

    it('can visit course eligibility page', function () {
        $response = $this->get('/course-eligibility');
        $response->assertSuccessful();
    });

    it('can visit recommendations page', function () {
        $response = $this->get('/recommendations');
        $response->assertSuccessful();
    });
});

describe('Universities Pages', function () {
    it('can visit universities index', function () {
        $response = $this->get('/universities');
        $response->assertSuccessful();
    });

    it('can visit university show page', function () {
        $response = $this->get("/universities/{$this->university->slug}");
        $response->assertSuccessful();
    });
});

describe('Careers Pages', function () {
    it('can visit careers index', function () {
        $response = $this->get('/careers');
        $response->assertSuccessful();
    });

    it('can visit career show page', function () {
        $response = $this->get("/careers/{$this->career->slug}");
        $response->assertSuccessful();
    });
});

describe('Courses Pages', function () {
    it('can visit courses index', function () {
        $response = $this->get('/courses');
        $response->assertSuccessful();
    });

    it('can visit course show page', function () {
        $response = $this->get("/courses/{$this->course->slug}");
        $response->assertSuccessful();
    });
});

describe('Companies Pages', function () {
    it('can visit companies index', function () {
        $response = $this->get('/companies');
        $response->assertSuccessful();
    });

    it('can visit company show page', function () {
        $response = $this->get("/companies/{$this->company->slug}");
        $response->assertSuccessful();
    });
});

describe('Blog Pages', function () {
    it('can visit blog index', function () {
        $response = $this->get('/blog');
        $response->assertSuccessful();
    });

    it('can visit blog post show page', function () {
        $response = $this->get("/blog/{$this->blogPost->slug}");
        $response->assertSuccessful();
    });
});

describe('Links Pages', function () {
    it('can visit links index', function () {
        $response = $this->get('/links');
        $response->assertSuccessful();
    });

    it('can visit link show page', function () {
        $response = $this->get("/links/{$this->link->slug}");
        $response->assertSuccessful();
    });
});

describe('Locations Pages', function () {
    it('can visit locations index', function () {
        $response = $this->get('/locations');
        $response->assertSuccessful();
    });

    it('can visit location show page', function () {
        $response = $this->get("/locations/{$this->location->slug}");
        $response->assertSuccessful();
    });
});

describe('Marketplace Pages', function () {
    it('can visit marketplace index', function () {
        $response = $this->get('/marketplace');
        $response->assertSuccessful();
    });

    it('can visit marketplace item show page', function () {
        $response = $this->get("/marketplace/{$this->marketplaceItem->slug}");
        $response->assertSuccessful();
    });
});

describe('Competitions Pages', function () {
    it('can visit competitions index', function () {
        $response = $this->get('/competitions');
        $response->assertSuccessful();
    });

    it('can visit competition show page', function () {
        $response = $this->get("/competitions/{$this->competition->slug}");
        $response->assertSuccessful();
    });
});

describe('Resources Pages', function () {
    it('can visit resources index', function () {
        $response = $this->get('/resources');
        $response->assertSuccessful();
    });

    it('can visit resource show page', function () {
        $response = $this->get("/resources/{$this->resource->slug}");
        $response->assertSuccessful();
    });
});

describe('Occupations Pages', function () {
    it('can visit occupations index', function () {
        $response = $this->get('/occupations');
        $response->assertSuccessful();
    });

    it('can visit occupation show page', function () {
        $response = $this->get("/occupations/{$this->occupation->slug}");
        $response->assertSuccessful();
    });
});

describe('Programs Pages', function () {
    it('can visit program show page', function () {
        $response = $this->get("/programs/{$this->program->slug}");
        $response->assertSuccessful();
    });
});

describe('Assessments Pages', function () {
    it('can visit assessments index', function () {
        $response = $this->get('/assessments');
        $response->assertSuccessful();
    });
});

describe('Comparison Pages', function () {
    it('can visit compare page', function () {
        $response = $this->get('/compare');
        $response->assertSuccessful();
    });
});

describe('Authenticated User Pages', function () {
    beforeEach(function () {
        $this->user = User::factory()->create();
    });

    it('can visit dashboard', function () {
        $response = $this->actingAs($this->user)->get('/dashboard');
        $response->assertSuccessful();
    });

    it('can visit saved items page', function () {
        $response = $this->actingAs($this->user)->get('/my-saved-items');
        $response->assertSuccessful();
    });

    it('can visit profile settings', function () {
        $response = $this->actingAs($this->user)->get('/settings/profile');
        $response->assertSuccessful();
    });

    it('can visit password settings', function () {
        $response = $this->actingAs($this->user)->get('/settings/password');
        $response->assertSuccessful();
    });

    it('can visit two-factor settings', function () {
        $response = $this->actingAs($this->user)->get('/settings/two-factor');
        $response->assertStatus(200)->or()->assertStatus(302); // May require password confirmation
    });

    it('can visit appearance settings', function () {
        $response = $this->actingAs($this->user)->get('/settings/appearance');
        $response->assertSuccessful();
    });
});

describe('Alumni Restricted Pages', function () {
    beforeEach(function () {
        $this->alumniUser = User::factory()->create();
        $role = Role::firstOrCreate(['name' => 'alumni']);
        $this->alumniUser->roles()->attach($role->id);
    });

    it('can visit alumni network page as alumni', function () {
        $response = $this->actingAs($this->alumniUser)->get('/alumni/network');
        $response->assertSuccessful();
    });

    it('can visit alumni mentorship page as alumni', function () {
        $response = $this->actingAs($this->alumniUser)->get('/alumni/mentorship');
        $response->assertSuccessful();
    });

    it('cannot visit alumni network page as non-alumni', function () {
        $user = User::factory()->create();
        $response = $this->actingAs($user)->get('/alumni/network');
        $response->assertForbidden();
    });

    it('cannot visit alumni mentorship page as non-alumni', function () {
        $user = User::factory()->create();
        $response = $this->actingAs($user)->get('/alumni/mentorship');
        $response->assertForbidden();
    });
});
