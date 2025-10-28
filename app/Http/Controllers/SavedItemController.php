<?php

namespace App\Http\Controllers;

use App\Models\SavedItem;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SavedItemController extends Controller
{
    /**
     * Display a listing of saved items.
     */
    public function index(): Response
    {
        $savedItems = SavedItem::query()
            ->with('saveable')
            ->where('user_id', auth()->id())
            ->latest()
            ->get()
            ->map(function ($item) {
                return [
                    'id' => $item->id,
                    'type' => class_basename($item->saveable_type),
                    'saveable' => $item->saveable,
                    'notes' => $item->notes,
                    'created_at' => $item->created_at->format('M d, Y'),
                ];
            });

        return Inertia::render('SavedItems/Index', [
            'savedItems' => $savedItems,
        ]);
    }

    /**
     * Store a newly saved item.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'saveable_type' => ['required', 'string'],
            'saveable_id' => ['required', 'integer'],
            'notes' => ['nullable', 'string'],
        ]);

        SavedItem::create([
            'user_id' => auth()->id(),
            'saveable_type' => $validated['saveable_type'],
            'saveable_id' => $validated['saveable_id'],
            'notes' => $validated['notes'] ?? null,
        ]);

        return back()->with('success', 'Item saved successfully!');
    }

    /**
     * Remove the specified saved item.
     */
    public function destroy(SavedItem $savedItem)
    {
        $this->authorize('delete', $savedItem);

        $savedItem->delete();

        return back()->with('success', 'Item removed from saved items.');
    }
}
