<?php

namespace App\Http\Controllers;

use App\Models\OnetOccupation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class OccupationController extends Controller
{
    /**
     * Display a listing of occupations.
     */
    public function index(Request $request): Response
    {
        $query = OnetOccupation::query();

        // Search
        if ($search = $request->get('search')) {
            $query->search($search);
        }

        // Filter by interest (RIASEC)
        if ($interest = $request->get('interest')) {
            $query->whereHas('interests', function ($q) use ($interest) {
                $q->whereHas('element', function ($q2) use ($interest) {
                    $q2->where('element_name', 'LIKE', "%{$interest}%");
                })->where('scale_id', 'OI')
                    ->orderBy('data_value', 'desc');
            });
        }

        // Filter by job zone (education level)
        if ($jobZone = $request->get('job_zone')) {
            $query->whereHas('jobZone', function ($q) use ($jobZone) {
                $q->where('job_zone', $jobZone);
            });
        }

        $occupations = $query
            ->select('onetsoc_code', 'title', 'description')
            ->paginate(24)
            ->withQueryString();

        // Get career clusters for filtering
        $careerClusters = $this->getCareerClusters();

        // Get RIASEC interests
        $riasecInterests = $this->getRiasecInterests();

        // Get job zones
        $jobZones = DB::table('onet_job_zone_reference')
            ->select('job_zone', 'name', 'education')
            ->get();

        return Inertia::render('Occupations/Index', [
            'occupations' => $occupations,
            'careerClusters' => $careerClusters,
            'riasecInterests' => $riasecInterests,
            'jobZones' => $jobZones,
            'filters' => $request->only(['search', 'interest', 'job_zone', 'cluster']),
        ]);
    }

    /**
     * Display the specified occupation.
     */
    public function show(string $slug): Response
    {
        // Convert slug back to SOC code (e.g., 11-1011-00 -> 11-1011.00)
        // Prefer strict pattern conversion; otherwise, replace the last dash with a dot.
        if (preg_match('/^(\d{2})-(\d{4})-(\d{2})$/', $slug, $m) === 1) {
            $socCode = sprintf('%s-%s.%s', $m[1], $m[2], $m[3]);
        } else {
            // Fallback: replace the last '-' with '.'
            $socCode = preg_replace('/-(?=[^-]*$)/', '.', $slug) ?? $slug;
        }

        $occupation = OnetOccupation::where('onetsoc_code', $socCode)
            ->firstOrFail();

        // Load top skills (importance scale)
        $skills = $occupation->skills()
            ->with('element:element_id,element_name,description')
            ->importance()
            ->orderByImportance()
            ->limit(10)
            ->get()
            ->map(fn ($skill) => [
                'name' => $skill->element->element_name,
                'description' => $skill->element->description,
                'value' => round($skill->data_value, 1),
            ]);

        // Load top abilities
        $abilities = $occupation->abilities()
            ->with('element:element_id,element_name,description')
            ->importance()
            ->orderByImportance()
            ->limit(10)
            ->get()
            ->map(fn ($ability) => [
                'name' => $ability->element->element_name,
                'description' => $ability->element->description,
                'value' => round($ability->data_value, 1),
            ]);

        // Load top knowledge areas
        $knowledge = $occupation->knowledge()
            ->with('element:element_id,element_name,description')
            ->importance()
            ->orderByImportance()
            ->limit(10)
            ->get()
            ->map(fn ($k) => [
                'name' => $k->element->element_name,
                'description' => $k->element->description,
                'value' => round($k->data_value, 1),
            ]);

        // Load tasks
        $tasks = $occupation->tasks()
            ->core()
            ->limit(15)
            ->get()
            ->pluck('task');

        // Load work activities
        $workActivities = $occupation->workActivities()
            ->with('element:element_id,element_name,description')
            ->importance()
            ->orderByImportance()
            ->limit(8)
            ->get()
            ->map(fn ($wa) => [
                'name' => $wa->element->element_name,
                'value' => round($wa->data_value, 1),
            ]);

        // Load work context
        $workContext = $occupation->workContext()
            ->with('element:element_id,element_name,description')
            ->where('scale_id', 'CX')
            ->limit(8)
            ->get()
            ->map(fn ($wc) => [
                'name' => $wc->element->element_name,
                'value' => round($wc->data_value, 1),
            ]);

        // Load work styles
        $workStyles = $occupation->workStyles()
            ->with('element:element_id,element_name,description')
            ->orderBy('data_value', 'desc')
            ->limit(8)
            ->get()
            ->map(fn ($ws) => [
                'name' => $ws->element->element_name,
                'description' => $ws->element->description,
                'value' => round($ws->data_value, 1),
            ]);

        // Load interests (RIASEC)
        $interests = $occupation->interests()
            ->with('element:element_id,element_name,description')
            ->where('scale_id', 'OI')
            ->orderByValue()
            ->get()
            ->map(fn ($interest) => [
                'name' => $interest->element->element_name,
                'value' => round($interest->data_value, 1),
            ]);

        // Load education/training
        $education = $occupation->education()
            ->with('element:element_id,element_name')
            ->where('scale_id', 'RL')
            ->orderBy('data_value', 'desc')
            ->get()
            ->map(function ($edu) {
                $categoryDesc = DB::table('onet_ete_categories')
                    ->where('element_id', $edu->element_id)
                    ->where('scale_id', $edu->scale_id)
                    ->where('category', $edu->category)
                    ->value('category_description');

                return [
                    'name' => $edu->element->element_name,
                    'category' => $categoryDesc,
                    'value' => round($edu->data_value, 1),
                ];
            });

        // Load job zone info
        $jobZoneData = $occupation->jobZone()->first();
        $jobZoneInfo = null;
        if ($jobZoneData) {
            $jobZoneInfo = DB::table('onet_job_zone_reference')
                ->where('job_zone', $jobZoneData->job_zone)
                ->first();
        }

        // Load technology skills
        $technologies = $occupation->technologySkills()
            ->limit(20)
            ->get()
            ->map(fn ($tech) => [
                'name' => $tech->example,
                'hot' => $tech->hot_technology === 'Y',
                'inDemand' => $tech->in_demand === 'Y',
            ]);

        // Load tools
        $tools = $occupation->tools()
            ->limit(15)
            ->get()
            ->pluck('example');

        // Load related occupations
        $relatedOccupations = $occupation->relatedOccupations()
            ->with('relatedOccupation:onetsoc_code,title,description')
            ->where('relatedness_tier', 1)
            ->limit(6)
            ->get()
            ->map(fn ($rel) => [
                'code' => $rel->related_onetsoc_code,
                'slug' => str_replace('.', '-', $rel->related_onetsoc_code),
                'title' => $rel->relatedOccupation->title,
                'description' => $rel->relatedOccupation->description,
            ]);

        // Load alternate titles
        $alternateTitles = $occupation->alternateTitles()
            ->limit(10)
            ->pluck('alternate_title');

        return Inertia::render('Occupations/Show', [
            'occupation' => [
                'code' => $occupation->onetsoc_code,
                'slug' => $occupation->slug,
                'title' => $occupation->title,
                'description' => $occupation->description,
                'alternateTitles' => $alternateTitles,
            ],
            'skills' => $skills,
            'abilities' => $abilities,
            'knowledge' => $knowledge,
            'tasks' => $tasks,
            'workActivities' => $workActivities,
            'workContext' => $workContext,
            'workStyles' => $workStyles,
            'interests' => $interests,
            'education' => $education,
            'jobZone' => $jobZoneInfo,
            'technologies' => $technologies,
            'tools' => $tools,
            'relatedOccupations' => $relatedOccupations,
        ]);
    }

    /**
     * Lightweight autosuggest endpoint for occupations.
     */
    public function suggest(Request $request)
    {
        $search = (string) $request->get('search', '');
        $limit = (int) $request->get('limit', 8);

        $query = OnetOccupation::query()
            ->select('onetsoc_code', 'title')
            ->when($search !== '', function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%");
            })
            ->orderBy('title')
            ->limit($limit);

        $results = $query->get()->map(fn ($occ) => [
            'title' => $occ->title,
            'slug' => str_replace('.', '-', $occ->onetsoc_code),
        ]);

        return response()->json($results);
    }

    /**
     * Get career clusters from the database.
     */
    private function getCareerClusters(): array
    {
        // O*NET doesn't have explicit career clusters, so we'll create major groupings
        // based on the first two digits of SOC codes
        return [
            ['id' => '11', 'name' => 'Management', 'icon' => '👔'],
            ['id' => '13', 'name' => 'Business & Financial', 'icon' => '💼'],
            ['id' => '15', 'name' => 'Computer & Mathematical', 'icon' => '💻'],
            ['id' => '17', 'name' => 'Architecture & Engineering', 'icon' => '🏗️'],
            ['id' => '19', 'name' => 'Life, Physical & Social Science', 'icon' => '🔬'],
            ['id' => '21', 'name' => 'Community & Social Service', 'icon' => '🤝'],
            ['id' => '23', 'name' => 'Legal', 'icon' => '⚖️'],
            ['id' => '25', 'name' => 'Educational Instruction & Library', 'icon' => '📚'],
            ['id' => '27', 'name' => 'Arts, Design, Entertainment, Sports & Media', 'icon' => '🎨'],
            ['id' => '29', 'name' => 'Healthcare Practitioners & Technical', 'icon' => '🏥'],
            ['id' => '31', 'name' => 'Healthcare Support', 'icon' => '🩺'],
            ['id' => '33', 'name' => 'Protective Service', 'icon' => '🚔'],
            ['id' => '35', 'name' => 'Food Preparation & Serving', 'icon' => '🍽️'],
            ['id' => '37', 'name' => 'Building & Grounds Cleaning & Maintenance', 'icon' => '🧹'],
            ['id' => '39', 'name' => 'Personal Care & Service', 'icon' => '💇'],
            ['id' => '41', 'name' => 'Sales', 'icon' => '🛒'],
            ['id' => '43', 'name' => 'Office & Administrative Support', 'icon' => '📋'],
            ['id' => '45', 'name' => 'Farming, Fishing & Forestry', 'icon' => '🌾'],
            ['id' => '47', 'name' => 'Construction & Extraction', 'icon' => '🔨'],
            ['id' => '49', 'name' => 'Installation, Maintenance & Repair', 'icon' => '🔧'],
            ['id' => '51', 'name' => 'Production', 'icon' => '🏭'],
            ['id' => '53', 'name' => 'Transportation & Material Moving', 'icon' => '🚛'],
        ];
    }

    /**
     * Get RIASEC interest types.
     */
    private function getRiasecInterests(): array
    {
        return [
            ['code' => 'R', 'name' => 'Realistic', 'description' => 'Practical, hands-on work with tools, machines, or outdoor activities'],
            ['code' => 'I', 'name' => 'Investigative', 'description' => 'Research, analysis, problem-solving, and scientific work'],
            ['code' => 'A', 'name' => 'Artistic', 'description' => 'Creative expression, design, writing, and performing arts'],
            ['code' => 'S', 'name' => 'Social', 'description' => 'Helping, teaching, counseling, and working with people'],
            ['code' => 'E', 'name' => 'Enterprising', 'description' => 'Leadership, persuasion, business, and entrepreneurial activities'],
            ['code' => 'C', 'name' => 'Conventional', 'description' => 'Organization, data management, and structured office work'],
        ];
    }
}
