<?php

namespace App\Http\Controllers;

use App\Models\BlogPost;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BlogPostController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth')->except(['index', 'show']);
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        $posts = BlogPost::query()
            ->with('author:id,name,avatar')
            ->when($request->search, function ($query, $search) {
                $query->where('title', 'like', "%{$search}%")
                    ->orWhere('excerpt', 'like', "%{$search}%");
            })
            ->when($request->category, function ($query, $category) {
                $query->whereJsonContains('categories', $category);
            })
            ->where('status', 'published')
            ->latest('published_at')
            ->paginate(12)
            ->withQueryString()
            ->through(fn ($post) => [
                'id' => $post->id,
                'title' => $post->title,
                'slug' => $post->slug,
                'excerpt' => $post->excerpt,
                'featured_image' => $post->featured_image,
                'published_at' => $post->published_at?->format('M d, Y'),
                'views_count' => $post->views_count,
                'tags' => $post->tags,
                'author' => $post->author,
            ]);

        return Inertia::render('Blog/Index', [
            'posts' => $posts,
            'filters' => $request->only(['search', 'category']),
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(BlogPost $blogPost): Response
    {
        $blogPost->load('author');
        $blogPost->increment('views_count');

        return Inertia::render('Blog/Show', [
            'post' => [
                'id' => $blogPost->id,
                'title' => $blogPost->title,
                'slug' => $blogPost->slug,
                'content' => $blogPost->content,
                'excerpt' => $blogPost->excerpt,
                'featured_image' => $blogPost->featured_image,
                'published_at' => $blogPost->published_at?->format('M d, Y'),
                'views_count' => $blogPost->views_count,
                'tags' => $blogPost->tags,
                'categories' => $blogPost->categories,
                'author' => $blogPost->author,
            ],
        ]);
    }
}
