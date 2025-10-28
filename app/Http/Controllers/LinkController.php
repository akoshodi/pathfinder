<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreLinkCommentRequest;
use App\Http\Requests\StoreLinkRequest;
use App\Models\Link;
use App\Models\LinkComment;
use App\Models\LinkVote;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Pagination\Paginator;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class LinkController extends Controller
{
    /**
     * Display a listing of links.
     */
    public function index(Request $request): InertiaResponse
    {
        $sort = $request->get('sort', 'hot'); // hot, new, top

        $query = Link::query()
            ->with('user')
            ->withCount(['voters as votes_count', 'comments as comments_count']);

        // Fetch a reasonable window for sorting
        $window = $query->take(500)->get();

        // Apply sorting
        if ($sort === 'new') {
            $ranked = $window->sortByDesc('created_at')->values();
        } elseif ($sort === 'top') {
            $ranked = $window->sortByDesc('votes_count')->values();
        } else {
            // hot (default)
            $ranked = $window->map(function (Link $link) {
                $hours = max(1, now()->diffInHours($link->created_at));
                $points = max(0, (int) $link->votes_count);
                // Hacker News style hot score: (points - 1) / (hours + 2)^1.8
                $score = ($points - 1) / (pow($hours + 2, 1.8));
                $link->hot_score = $score;

                return $link;
            })->sortByDesc('hot_score')->values();
        }

        // Manual pagination after ranking
        $perPage = 30;
        $page = Paginator::resolveCurrentPage('page');
        $total = $ranked->count();
        $items = $ranked->slice(($page - 1) * $perPage, $perPage)->values();
        $links = new LengthAwarePaginator(
            $items,
            $total,
            $perPage,
            $page,
            ['path' => $request->url(), 'query' => $request->query()]
        );

        // Transform items for the frontend
        $links->setCollection($links->getCollection()->map(function (Link $link) {
            return [
                'id' => $link->id,
                'title' => $link->title,
                'url' => $link->url,
                'description' => $link->description,
                'domain' => parse_url($link->url, PHP_URL_HOST),
                'user' => [
                    'id' => $link->user->id,
                    'name' => $link->user->name,
                ],
                'votes_count' => $link->votes_count,
                'comments_count' => $link->comments_count,
                'created_at' => $link->created_at,
            ];
        }));

        $votedIds = [];
        if ($request->user()) {
            $votedIds = LinkVote::query()
                ->where('user_id', $request->user()->id)
                ->whereIn('link_id', collect($links->items())->pluck('id'))
                ->pluck('link_id')
                ->all();
        }

        return Inertia::render('Links/Index', [
            'links' => $links,
            'voted' => $votedIds,
            'sort' => $sort,
        ]);
    }

    /**
     * Display a single link with comments.
     */
    public function show(Link $link): InertiaResponse
    {
        $link->load('user')
            ->loadCount(['voters as votes_count', 'comments as comments_count']);

        // Build a nested comment tree
        $all = LinkComment::query()
            ->with('user')
            ->where('link_id', $link->id)
            ->orderBy('created_at')
            ->get();

        $byParent = [];
        foreach ($all as $c) {
            $parentId = $c->parent_id ?? 0;
            $byParent[$parentId] = $byParent[$parentId] ?? collect();
            $byParent[$parentId]->push($c);
        }

        $makeNode = function ($comment) use (&$makeNode, &$byParent) {
            $children = collect();
            $list = $byParent[$comment->id] ?? collect();
            foreach ($list as $child) {
                $children->push($makeNode($child));
            }

            return [
                'id' => $comment->id,
                'body' => $comment->body,
                'user' => [
                    'id' => $comment->user->id,
                    'name' => $comment->user->name,
                ],
                'created_at' => $comment->created_at,
                'children' => $children,
            ];
        };

        $roots = ($byParent[0] ?? collect())->map(fn ($c) => $makeNode($c))->values();

        return Inertia::render('Links/Show', [
            'link' => [
                'id' => $link->id,
                'title' => $link->title,
                'url' => $link->url,
                'description' => $link->description,
                'domain' => parse_url($link->url, PHP_URL_HOST),
                'user' => [
                    'id' => $link->user->id,
                    'name' => $link->user->name,
                ],
                'votes_count' => $link->votes_count,
                'comments_count' => $link->comments_count,
                'created_at' => $link->created_at,
            ],
            'comments' => $roots,
        ]);
    }

    /**
     * Store a newly created link.
     */
    public function store(StoreLinkRequest $request): RedirectResponse
    {
        $data = $request->validated();

        $link = Link::create([
            'user_id' => $request->user()->id,
            'title' => $data['title'],
            'url' => $data['url'],
            'description' => $data['description'] ?? null,
        ]);

        return redirect()->route('links.show', $link);
    }

    /**
     * Toggle an upvote for the given link.
     */
    public function vote(Request $request, Link $link): RedirectResponse
    {
        $user = $request->user();
        abort_unless($user, 403);

        $existing = LinkVote::query()
            ->where('link_id', $link->id)
            ->where('user_id', $user->id)
            ->first();

        if ($existing) {
            $existing->delete();
        } else {
            LinkVote::create([
                'link_id' => $link->id,
                'user_id' => $user->id,
            ]);
        }

        return back();
    }

    /**
     * Store a comment for a link.
     */
    public function comment(StoreLinkCommentRequest $request, Link $link): RedirectResponse
    {
        $data = $request->validated();
        LinkComment::create([
            'link_id' => $link->id,
            'user_id' => $request->user()->id,
            'parent_id' => $data['parent_id'] ?? null,
            'body' => $data['body'],
        ]);

        return back();
    }
}
