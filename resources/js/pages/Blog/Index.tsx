import { Head, Link, router } from '@inertiajs/react';
import { type ReactNode, useState } from 'react';
import PublicLayout from '@/layouts/public-layout';

interface Author {
    id: number;
    name: string;
    avatar: string | null;
}

interface BlogPost {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    featured_image: string | null;
    tags: string[] | null;
    categories: string[] | null;
    views_count: number;
    published_at: string;
    author: Author;
}

interface Props {
    posts: {
        data: BlogPost[];
        links: any[];
        meta: any;
    };
    filters: {
        search?: string;
        category?: string;
    };
}

export default function BlogIndex({ posts, filters }: Props) {
    const [search, setSearch] = useState(filters.search || '');
    const [selectedCategory, setSelectedCategory] = useState(filters.category || 'all');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/blog', { search, category: selectedCategory !== 'all' ? selectedCategory : undefined }, { preserveState: true });
    };

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
        router.get('/blog', { search, category: category !== 'all' ? category : undefined }, { preserveState: true });
    };

    const categories = [
        'all',
        'Career Advice',
        'Education',
        'Industry Insights',
        'Student Life',
        'Study Tips',
        'Success Stories',
    ];

    return (
        <>
            <Head title="Blog" />

            {/* Hero Section */}
            <section className="bg-gradient-to-r from-emerald-800 to-teal-700 text-white py-12 px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-7xl text-center">
                    <h1 className="text-4xl font-bold mb-4">Career Insights & Resources</h1>
                    <p className="text-lg text-emerald-100">
                        Expert advice, industry trends, and success stories to guide your career journey
                    </p>
                </div>
            </section>

            {/* Search and Filter Section */}
            <section className="bg-white border-b border-gray-200 py-6 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <form onSubmit={handleSearch} className="mb-6">
                        <div className="relative">
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search articles..."
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            />
                            <svg
                                className="absolute left-3 top-3 h-5 w-5 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </div>
                    </form>

                    <div className="flex flex-wrap gap-2">
                        <span className="text-sm font-semibold text-gray-700 self-center">Categories:</span>
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => handleCategoryChange(category)}
                                    className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                                        category === selectedCategory
                                        ? 'bg-emerald-600 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                {category.charAt(0).toUpperCase() + category.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Blog Posts Grid */}
            <main className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.data.map((post) => (
                            <Link
                                key={post.id}
                                href={`/blog/${post.slug}`}
                                className="bg-white rounded-lg shadow hover:shadow-xl transition-shadow overflow-hidden group"
                            >
                                {/* Featured Image */}
                                {post.featured_image ? (
                                    <div className="h-48 overflow-hidden">
                                        <img
                                            src={post.featured_image}
                                            alt={post.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                ) : (
                                    <div className="h-48 bg-gradient-to-br from-emerald-600 to-teal-500 flex items-center justify-center">
                                        <svg
                                            className="h-16 w-16 text-white opacity-50"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                                            />
                                        </svg>
                                    </div>
                                )}

                                <div className="p-6">
                                    {/* Categories */}
                                    {post.categories && post.categories.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mb-3">
                                            {post.categories.slice(0, 2).map((category, index) => (
                                                <span
                                                    key={index}
                                                    className="px-2 py-1 bg-emerald-100 text-emerald-800 text-xs rounded-full"
                                                >
                                                    {category}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    {/* Title */}
                                    <h3 className="font-bold text-xl text-gray-900 mb-3 line-clamp-2 group-hover:text-emerald-600 transition-colors">
                                        {post.title}
                                    </h3>

                                    {/* Excerpt */}
                                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{post.excerpt}</p>

                                    {/* Author & Meta */}
                                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                                        <div className="flex items-center">
                                            {post.author.avatar ? (
                                                <img
                                                    src={post.author.avatar}
                                                    alt={post.author.name}
                                                    className="w-8 h-8 rounded-full mr-2"
                                                />
                                            ) : (
                                                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center mr-2 text-sm text-emerald-600 font-semibold">
                                                    {post.author.name.charAt(0)}
                                                </div>
                                            )}
                                            <div className="text-sm">
                                                <div className="font-medium text-gray-900">{post.author.name}</div>
                                            </div>
                                        </div>
                                        <div className="text-xs text-gray-500">{post.views_count} views</div>
                                    </div>

                                    {/* Date */}
                                    <div className="mt-3 text-xs text-gray-500">{post.published_at}</div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Pagination */}
                    {posts.links && (
                        <div className="mt-8 flex justify-center gap-2">
                            {posts.links.map((link: any, index: number) => (
                                <Link
                                    key={index}
                                    href={link.url || '#'}
                                    className={`px-4 py-2 rounded-lg ${
                                        link.active
                                            ? 'bg-emerald-600 text-white'
                                            : 'bg-white text-gray-700 hover:bg-gray-100'
                                    }`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </main>
    </>
    );
}

// Use the public layout (no admin sidebar) for this public-facing page
BlogIndex.layout = (page: ReactNode) => <PublicLayout>{page}</PublicLayout>;
