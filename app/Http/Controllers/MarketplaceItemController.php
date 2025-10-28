<?php

namespace App\Http\Controllers;

use App\Models\MarketplaceItem;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class MarketplaceItemController extends Controller
{
    public function index(Request $request): Response
    {
        $query = MarketplaceItem::with('seller')
            ->where('is_active', true)
            ->where('is_sold', false)
            ->latest();

        // Filter by category
        if ($request->has('category') && $request->category !== '') {
            $query->where('category', $request->category);
        }

        // Filter by location
        if ($request->has('location') && $request->location !== '') {
            $query->where('location', 'like', '%'.$request->location.'%');
        }

        // Search by title or description
        if ($request->has('search') && $request->search !== '') {
            $query->where(function ($q) use ($request) {
                $q->where('title', 'like', '%'.$request->search.'%')
                    ->orWhere('description', 'like', '%'.$request->search.'%');
            });
        }

        $items = $query->paginate(12)->withQueryString();

        return Inertia::render('Marketplace/Index', [
            'items' => $items,
            'filters' => $request->only(['category', 'location', 'search']),
        ]);
    }

    public function show(MarketplaceItem $marketplaceItem): Response
    {
        $marketplaceItem->load('seller');
        $marketplaceItem->increment('views_count');

        $relatedItems = MarketplaceItem::where('is_active', true)
            ->where('is_sold', false)
            ->where('id', '!=', $marketplaceItem->id)
            ->where('category', $marketplaceItem->category)
            ->limit(4)
            ->get();

        return Inertia::render('Marketplace/Show', [
            'item' => $marketplaceItem,
            'relatedItems' => $relatedItems,
        ]);
    }
}
