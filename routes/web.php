<?php

use App\Http\Controllers\AlumniController;
use App\Http\Controllers\AssessmentController;
use App\Http\Controllers\BlogPostController;
use App\Http\Controllers\CareerController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\ComparisonController;
use App\Http\Controllers\CompetitionController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\LinkController;
use App\Http\Controllers\LocationController;
use App\Http\Controllers\MarketplaceItemController;
use App\Http\Controllers\OccupationController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\ProgramController;
use App\Http\Controllers\ResourceController;
use App\Http\Controllers\SavedItemController;
use App\Http\Controllers\UniversityController;
use App\Models\University;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

// Lightweight university autosuggest endpoint for claim-school page
Route::get('/api/suggest/universities', function (Request $request) {
    $search = (string) $request->get('search', '');
    $limit = (int) $request->get('limit', 8);

    $results = University::query()
        ->when($search !== '', function ($q) use ($search) {
            $q->where('name', 'like', "%{$search}%")
                ->orWhere('city', 'like', "%{$search}%")
                ->orWhere('state', 'like', "%{$search}%");
        })
        ->orderBy('ranking')
        ->limit($limit)
        ->get(['id', 'name', 'slug', 'city', 'state']);

    return response()->json($results);
})->name('api.suggest.universities');

// Convenience redirects for expected paths from the React app
Route::redirect('/assessment', '/assessments');
Route::redirect('/news', '/blog');

Route::get('/universities', [UniversityController::class, 'index'])->name('universities.index');
Route::get('/universities/{university:slug}', [UniversityController::class, 'show'])->name('universities.show');

// Programs
Route::get('/programs/{program:slug}', [ProgramController::class, 'show'])->name('programs.show');

Route::middleware(['auth'])->group(function () {
    Route::resource('universities', UniversityController::class)->except(['index', 'show']);
});

Route::get('/courses', [CourseController::class, 'index'])->name('courses.index');
Route::get('/courses/{course:slug}', [CourseController::class, 'show'])->name('courses.show');

Route::get('/companies', [CompanyController::class, 'index'])->name('companies.index');
Route::get('/companies/{company:slug}', [CompanyController::class, 'show'])->name('companies.show');

// New O*NET Occupations (replacing old careers)
Route::get('/occupations', [OccupationController::class, 'index'])->name('occupations.index');
Route::get('/occupations/{slug}', [OccupationController::class, 'show'])->name('occupations.show');
// Occupations autosuggest API (for search typeahead)
Route::get('/api/suggest/occupations', [OccupationController::class, 'suggest'])->name('api.suggest.occupations');

// Legacy career job postings (keep for now)
Route::get('/careers', [CareerController::class, 'index'])->name('careers.index');
Route::get('/careers/{career:slug}', [CareerController::class, 'show'])->name('careers.show');

Route::get('/blog', [BlogPostController::class, 'index'])->name('blog.index');
Route::get('/blog/{blogPost:slug}', [BlogPostController::class, 'show'])->name('blog.show');

Route::get('/alumni', [AlumniController::class, 'index'])->name('alumni.index');

// Link Aggregator
Route::get('/links', [LinkController::class, 'index'])->name('links.index');
Route::get('/links/{link}', [LinkController::class, 'show'])->name('links.show');
Route::middleware(['auth'])->group(function () {
    Route::post('/links', [LinkController::class, 'store'])->name('links.store');
    Route::post('/links/{link}/vote', [LinkController::class, 'vote'])->name('links.vote');
    Route::post('/links/{link}/comments', [LinkController::class, 'comment'])->name('links.comment');
});

// Resources
Route::get('/resources', [ResourceController::class, 'index'])->name('resources.index');
Route::get('/resources/{resource:slug}', [ResourceController::class, 'show'])->name('resources.show');

// Locations
Route::get('/locations', [LocationController::class, 'index'])->name('locations.index');
Route::get('/locations/{location:slug}', [LocationController::class, 'show'])->name('locations.show');

// Marketplace
Route::get('/marketplace', [MarketplaceItemController::class, 'index'])->name('marketplace.index');
Route::get('/marketplace/{marketplaceItem:slug}', [MarketplaceItemController::class, 'show'])->name('marketplace.show');

// Competitions
Route::get('/competitions', [CompetitionController::class, 'index'])->name('competitions.index');
Route::get('/competitions/{competition:slug}', [CompetitionController::class, 'show'])->name('competitions.show');

// Static/Info Pages
Route::get('/about', [PageController::class, 'about'])->name('about');
Route::get('/about/team', [PageController::class, 'aboutTeam'])->name('about.team');
Route::get('/about/careers', [PageController::class, 'aboutCareers'])->name('about.careers');
Route::get('/about/press', [PageController::class, 'aboutPress'])->name('about.press');
Route::get('/about/data', [PageController::class, 'aboutData'])->name('about.data');
Route::get('/about/partnerships', [PageController::class, 'aboutPartnerships'])->name('about.partnerships');
Route::get('/about/contact', [PageController::class, 'aboutContact'])->name('about.contact');
Route::get('/help', [PageController::class, 'help'])->name('help');
Route::get('/terms', [PageController::class, 'terms'])->name('terms');
Route::get('/privacy', [PageController::class, 'privacy'])->name('privacy');
Route::get('/accessibility', [PageController::class, 'accessibility'])->name('accessibility');
Route::get('/sitemap', [PageController::class, 'sitemap'])->name('sitemap');
Route::get('/recommendations', [PageController::class, 'recommendations'])->name('recommendations');
Route::get('/course-eligibility', [PageController::class, 'courseEligibility'])->name('course-eligibility');
Route::get('/claim-school', [PageController::class, 'claimSchool'])->name('claim-school');

// Assessments (public)
Route::get('/assessments', [AssessmentController::class, 'index'])->name('assessments.index');
Route::post('/assessments/{slug}/start', [AssessmentController::class, 'start'])->name('assessments.start');
Route::get('/assessments/{attempt}/take', [AssessmentController::class, 'take'])->name('assessments.take');
Route::post('/assessments/{attempt}/answer', [AssessmentController::class, 'answer'])->name('assessments.answer');
Route::post('/assessments/{attempt}/complete', [AssessmentController::class, 'complete'])->name('assessments.complete');
Route::get('/assessments/{attempt}/results', [AssessmentController::class, 'results'])->name('assessments.results');

// Authenticated routes
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        $user = auth()->user();

        return Inertia::render('dashboard', [
            'user' => [
                'name' => $user->name,
                'university' => null, // Could be fetched from profile
                'major' => null,
                'graduation_year' => null,
            ],
            'stats' => [
                'saved_items' => $user->savedItems()->count(),
                'assessments_completed' => \App\Models\UserAssessmentAttempt::where('user_id', $user->id)->where('status', 'completed')->count(),
                'comparison_items' => $user->comparisonItems()->count(),
            ],
        ]);
    })->name('dashboard');

    // Saved items
    Route::post('/saved-items', [SavedItemController::class, 'store'])->name('saved-items.store');
    Route::delete('/saved-items/{savedItem}', [SavedItemController::class, 'destroy'])->name('saved-items.destroy');
    Route::get('/my-saved-items', [SavedItemController::class, 'index'])->name('saved-items.index');

    // Comparison (mutations require auth)
    Route::post('/comparison', [ComparisonController::class, 'store'])->name('comparison.store');
    Route::delete('/comparison/{comparisonItem}', [ComparisonController::class, 'destroy'])->name('comparison.destroy');

    // Assessment routes now handle both authenticated and anonymous users

    // Alumni features (requires alumni role)
    Route::middleware(['role:alumni'])->group(function () {
        Route::get('/alumni/network', [AlumniController::class, 'network'])->name('alumni.network');
        Route::get('/alumni/mentorship', [AlumniController::class, 'mentorship'])->name('alumni.mentorship');
    });
});

require __DIR__.'/settings.php';

// Public compare (read-only): supports URL params like ?universities=slug-one-vs-slug-two
Route::get('/compare', [ComparisonController::class, 'index'])->name('comparison.index');
