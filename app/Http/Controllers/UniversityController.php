<?php

namespace App\Http\Controllers;

use App\Models\SponsoredAd;
use App\Models\University;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class UniversityController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        $query = University::query()->where('is_active', true);

        // Tab filtering (dummy content for each tab)
        if ($request->tab) {
            switch ($request->tab) {
                case 'direct-admissions':
                    $query->where('acceptance_rate', 'like', '%100%')
                        ->orWhere('acceptance_rate', 'like', '%9%');
                    break;
                case 'best-value':
                    $query->whereRaw("CAST(REPLACE(REPLACE(tuition, '$', ''), ',', '') AS INTEGER) < 30000");
                    break;
                case 'student-life':
                    $query->where('is_featured', true);
                    break;
                case 'career-prospects':
                    $query->where('graduation_rate', '>=', 80);
                    break;
                case 'diversity':
                case 'athletics':
                case 'party-schools':
                case 'greek-life':
                case 'stem':
                    // These would have specific filtering logic in production
                    break;
                default:
                    // best-colleges - show all
                    break;
            }
        }

        // Search
        if ($request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('location', 'like', "%{$search}%")
                    ->orWhere('city', 'like', "%{$search}%");
            });
        }

        // Type filter
        if ($request->type) {
            $query->where('type', $request->type);
        }

        // Featured filter
        if ($request->is_featured) {
            $query->where('is_featured', true);
        }

        // Cost filter (tuition ranges)
        if ($request->cost) {
            $costRange = $request->cost;
            if ($costRange === 'under-10k') {
                $query->whereRaw("CAST(REPLACE(REPLACE(tuition, '$', ''), ',', '') AS INTEGER) < 10000");
            } elseif ($costRange === '10k-30k') {
                $query->whereRaw("CAST(REPLACE(REPLACE(tuition, '$', ''), ',', '') AS INTEGER) BETWEEN 10000 AND 30000");
            } elseif ($costRange === '30k-50k') {
                $query->whereRaw("CAST(REPLACE(REPLACE(tuition, '$', ''), ',', '') AS INTEGER) BETWEEN 30000 AND 50000");
            } elseif ($costRange === 'over-50k') {
                $query->whereRaw("CAST(REPLACE(REPLACE(tuition, '$', ''), ',', '') AS INTEGER) > 50000");
            }
        }

        // Programs filter (search in relationship)
        if ($request->programs) {
            $programSearch = trim($request->programs);
            if (! empty($programSearch)) {
                // Split by comma if multiple programs are entered
                $programs = array_map('trim', explode(',', $programSearch));

                $query->whereHas('programsRelation', function ($q) use ($programs) {
                    $q->where(function ($subQ) use ($programs) {
                        foreach ($programs as $program) {
                            if (! empty($program)) {
                                $subQ->orWhere('programs.name', 'like', "%{$program}%");
                            }
                        }
                    });
                });
            }
        }

        // Location filter (state)
        if ($request->location) {
            $query->where('state', $request->location);
        }

        // Online/on-campus filter (campus_setting)
        if ($request->online_campus) {
            $setting = $request->online_campus;
            if ($setting === 'online') {
                $query->where('campus_setting', 'like', '%online%');
            } elseif ($setting === 'campus') {
                $query->where('campus_setting', 'not like', '%online%');
            }
        }

        $universities = $query->orderBy('ranking', 'asc')
            ->with('programsRelation')
            ->paginate(20)
            ->withQueryString()
            ->through(fn ($university) => [
                'id' => $university->id,
                'name' => $university->name,
                'slug' => $university->slug,
                'logo' => $university->logo,
                'location' => $university->location,
                'city' => $university->city,
                'state' => $university->state,
                'type' => $university->type,
                'ranking' => $university->ranking,
                'acceptance_rate' => $university->acceptance_rate,
                'students_count' => $university->students_count,
                'tuition' => $university->tuition,
                'is_partner' => $university->is_partner,
                'is_featured' => $university->is_featured,
                'graduation_rate' => $university->graduation_rate,
                'programs' => $university->programsRelation->map(fn ($program) => [
                    'id' => $program->id,
                    'name' => $program->name,
                    'slug' => $program->slug,
                    'category' => $program->category,
                ]),
            ]);

        // Get active sponsored ads
        $sponsoredAds = SponsoredAd::active()
            ->with('university')
            ->get()
            ->map(fn ($ad) => [
                'id' => $ad->id,
                'university_id' => $ad->university_id,
                'tagline' => $ad->tagline,
                'university' => [
                    'id' => $ad->university->id,
                    'name' => $ad->university->name,
                    'slug' => $ad->university->slug,
                    'logo' => $ad->university->logo,
                    'location' => $ad->university->location,
                    'city' => $ad->university->city,
                    'state' => $ad->university->state,
                    'type' => $ad->university->type,
                    'ranking' => $ad->university->ranking,
                    'acceptance_rate' => $ad->university->acceptance_rate,
                    'students_count' => $ad->university->students_count,
                    'tuition' => $ad->university->tuition,
                    'is_partner' => $ad->university->is_partner,
                    'is_featured' => $ad->university->is_featured,
                ],
            ]);

        return Inertia::render('PublicPage', [
            'component' => 'Universities/Index',
            'props' => [
                'universities' => $universities,
                'sponsoredAds' => $sponsoredAds,
                'filters' => $request->only(['search', 'type', 'is_featured', 'cost', 'programs', 'location', 'online_campus', 'tab']),
            ],
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(University $university): Response
    {
        $university->load(['alumniAssociations', 'courses' => function ($query) {
            $query->limit(10);
        }, 'programsRelation', 'notableAlumni']);

        // Group programs by college/school using the pivot attribute
        $programsByCollege = $university->programsRelation
            ->groupBy(fn ($program) => $program->pivot->college ?? 'Other')
            ->map(function ($group, $college) {
                return [
                    'college' => $college,
                    'programs' => $group->map(function ($program) {
                        return [
                            'id' => $program->id,
                            'name' => $program->name,
                            'slug' => $program->slug,
                            'category' => $program->category,
                            'degree' => $program->pivot->degree,
                        ];
                    })->values(),
                ];
            })->values();

        // Canonical category grouping for programs (Engineering, Arts, Sciences, Business)
        $programsByCategory = [
            'Engineering' => [],
            'Arts' => [],
            'Sciences' => [],
            'Business' => [],
        ];

        foreach ($university->programsRelation as $program) {
            $college = strtolower((string) ($program->pivot->college ?? ''));
            $name = strtolower($program->name);
            $category = strtolower((string) $program->category);

            $bucket = 'Sciences';
            if (str_contains($college, 'engineering') || str_contains($name, 'engineering')) {
                $bucket = 'Engineering';
            } elseif (
                str_contains($college, 'business') ||
                $category === 'business' ||
                str_contains($name, 'business') ||
                str_contains($name, 'accounting') ||
                str_contains($name, 'finance') ||
                str_contains($name, 'marketing') ||
                str_contains($name, 'economics')
            ) {
                $bucket = 'Business';
            } elseif (
                str_contains($college, 'arts') ||
                $category === 'arts & humanities' ||
                $category === 'liberal arts' ||
                $category === 'design' ||
                str_contains($name, 'art') ||
                str_contains($name, 'music') ||
                str_contains($name, 'theater') ||
                str_contains($name, 'communications') ||
                str_contains($name, 'english') ||
                str_contains($name, 'history') ||
                str_contains($name, 'philosophy')
            ) {
                $bucket = 'Arts';
            } else {
                // STEM, Health Sciences, Education, Law -> Sciences by default
                $bucket = 'Sciences';
            }

            $programsByCategory[$bucket][] = [
                'id' => $program->id,
                'name' => $program->name,
                'slug' => $program->slug,
                'category' => $program->category,
                'degree' => $program->pivot->degree,
                'college' => $program->pivot->college,
            ];
        }

        // Simple heuristic for similar colleges (same state and type)
        $similarColleges = University::query()
            ->where('is_active', true)
            ->where('id', '!=', $university->id)
            ->when($university->state, fn ($q) => $q->where('state', $university->state))
            ->when($university->type, fn ($q) => $q->where('type', $university->type))
            ->orderBy('ranking')
            ->limit(6)
            ->get(['id', 'name', 'slug', 'city', 'state', 'type', 'ranking', 'logo'])
            ->map(fn ($u) => [
                'id' => $u->id,
                'name' => $u->name,
                'slug' => $u->slug,
                'city' => $u->city,
                'state' => $u->state,
                'type' => $u->type,
                'ranking' => $u->ranking,
                'logo' => $u->logo,
            ]);

        // Dummy Report Card grades (could be computed from stats later)
        $reportCard = [
            ['label' => 'Academics', 'grade' => 'A'],
            ['label' => 'Value', 'grade' => 'B+'],
            ['label' => 'Diversity', 'grade' => 'B'],
            ['label' => 'Professors', 'grade' => 'A-'],
            ['label' => 'Athletics', 'grade' => 'B'],
            ['label' => 'Party Scene', 'grade' => 'B-'],
            ['label' => 'Location', 'grade' => 'A'],
        ];

        // Notable alumni from DB
        $notableAlumni = $university->notableAlumni
            ->map(fn ($a) => [
                'id' => $a->id,
                'name' => $a->name,
                'title' => $a->title,
                'image' => $a->image,
            ])->values();

        return Inertia::render('PublicPage', [
            'component' => 'Universities/Show',
            'props' => [
                'university' => [
                    'id' => $university->id,
                    'name' => $university->name,
                    'slug' => $university->slug,
                    'description' => $university->description,
                    'logo' => $university->logo,
                    'cover_image' => $university->cover_image,
                    'location' => $university->location,
                    'city' => $university->city,
                    'state' => $university->state,
                    'country' => $university->country,
                    'type' => $university->type,
                    'ranking' => $university->ranking,
                    'acceptance_rate' => $university->acceptance_rate,
                    'students_count' => $university->students_count,
                    'tuition' => $university->tuition,
                    'graduation_rate' => $university->graduation_rate,
                    'retention_rate' => $university->retention_rate,
                    'campus_setting' => $university->campus_setting,
                    // Keep legacy string array if it exists
                    'programs' => $university->programs,
                    // New structured programs grouped by college/school
                    'programs_by_college' => $programsByCollege,
                    'programs_by_category' => $programsByCategory,
                    'majors' => $university->majors,
                    'facilities' => $university->facilities,
                    'athletics' => $university->athletics,
                    'stats' => $university->stats,
                    'cost' => [
                        'net_price' => data_get($university->stats, 'net_price') ?? data_get($university->stats, 'average_net_price'),
                        'financial_aid' => data_get($university->stats, 'financial_aid_percent') ?? data_get($university->stats, 'financial_aid'),
                    ],
                    'website' => $university->website,
                    'phone' => $university->phone,
                    'is_partner' => $university->is_partner,
                    'alumni_associations' => $university->alumniAssociations,
                    'courses' => $university->courses,
                    'programs_by_college' => $programsByCollege,
                    'programs_by_category' => $programsByCategory,
                    'similar_colleges' => $similarColleges,
                    'report_card' => $reportCard,
                    'notable_alumni' => $notableAlumni,
                ],
            ],
        ]);
    }
}
