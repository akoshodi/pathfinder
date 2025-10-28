<?php

namespace App\Http\Controllers;

use App\Models\Resource;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ResourceController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Resource::with('author')
            ->where('is_active', true)
            ->latest();

        // Filter by type
        if ($request->has('type') && $request->type !== '') {
            $query->where('type', $request->type);
        }

        // Filter by category
        if ($request->has('category') && $request->category !== '') {
            $query->whereJsonContains('categories', $request->category);
        }

        // Search by title or description
        if ($request->has('search') && $request->search !== '') {
            $query->where(function ($q) use ($request) {
                $q->where('title', 'like', '%'.$request->search.'%')
                    ->orWhere('description', 'like', '%'.$request->search.'%');
            });
        }

        $resources = $query->paginate(12)->withQueryString();

        return Inertia::render('Resources/Index', [
            'resources' => $resources,
            'filters' => $request->only(['type', 'category', 'search']),
        ]);
    }

    public function show(Resource $resource): Response
    {
        $resource->load('author');
        $resource->increment('views_count');

        $relatedResources = Resource::where('is_active', true)
            ->where('id', '!=', $resource->id)
            ->where('type', $resource->type)
            ->limit(4)
            ->get();

        return Inertia::render('Resources/Show', [
            'resource' => $resource,
            'relatedResources' => $relatedResources,
        ]);
    }
}
