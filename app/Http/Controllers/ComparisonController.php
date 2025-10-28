<?php

namespace App\Http\Controllers;

use App\Models\ComparisonItem;
use App\Models\University;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ComparisonController extends Controller
{
    /**
     * Display comparison page with items.
     */
    public function index(Request $request): Response
    {
        // Public compare via URL query, e.g. /compare?universities=slug-one-vs-slug-two
        $query = (string) ($request->query('universities') ?? $request->query('colleges') ?? '');

        if ($query !== '') {
            $slugs = collect(preg_split('/-vs-|,/', $query))
                ->filter()
                ->values();

            $universities = University::query()
                ->whereIn('slug', $slugs)
                ->get()
                ->sortBy(function (University $u) use ($slugs) {
                    return $slugs->search($u->slug);
                })
                ->values();

            $items = $universities->values()->map(function (University $u, int $idx) {
                return [
                    'id' => $u->id, // synthetic id for public compare
                    'comparable_type' => University::class,
                    'comparable_id' => $u->id,
                    'position' => $idx + 1,
                    'comparable' => $u->only([
                        'id', 'name', 'slug', 'description', 'logo', 'location', 'type', 'ranking',
                        'acceptance_rate', 'tuition', 'students_count', 'campus_setting',
                    ]),
                ];
            });

            return Inertia::render('Comparison/Index', [
                'comparisonItems' => $items,
                'isPublic' => true,
            ]);
        }

        // Authenticated user's saved comparison items
        $comparisonItems = ComparisonItem::query()
            ->with('comparable')
            ->where('user_id', auth()->id())
            ->orderBy('position')
            ->get()
            ->map(function ($item) {
                return [
                    'id' => $item->id,
                    'comparable_type' => $item->comparable_type,
                    'comparable_id' => $item->comparable_id,
                    'position' => $item->position,
                    'comparable' => $item->comparable,
                ];
            });

        return Inertia::render('Comparison/Index', [
            'comparisonItems' => $comparisonItems,
            'isPublic' => false,
        ]);
    }

    /**
     * Add item to comparison.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'comparable_type' => ['required', 'string'],
            'comparable_id' => ['required', 'integer'],
        ]);

        $maxPosition = ComparisonItem::where('user_id', auth()->id())->max('position') ?? 0;

        ComparisonItem::create([
            'user_id' => auth()->id(),
            'comparable_type' => $validated['comparable_type'],
            'comparable_id' => $validated['comparable_id'],
            'position' => $maxPosition + 1,
        ]);

        return back()->with('success', 'Item added to comparison!');
    }

    /**
     * Remove item from comparison.
     */
    public function destroy(ComparisonItem $comparisonItem)
    {
        $this->authorize('delete', $comparisonItem);

        $comparisonItem->delete();

        return back()->with('success', 'Item removed from comparison.');
    }
}
