import { Head, Link } from '@inertiajs/react';
import { type ReactNode } from 'react';
import PublicLayout from '@/layouts/public-layout';

interface Author {
    id: number;
    name: string;
    avatar: string | null;
    bio: string | null;
}

interface BlogPost {
    id: number;
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    featured_image: string | null;
    tags: string[] | null;
    categories: string[] | null;
    views_count: number;
    published_at: string;
    author: Author;
}

interface Props {
    post: BlogPost;
}

export default function BlogShow({ post }: Props) {
    return (
        <>
            <Head title={post.title} />

            {/* Hero Section with Featured Image */}
            <section className="relative bg-gray-900 text-white">
                {post.featured_image ? (
                    <>
                        <div className="absolute inset-0">
                            <img
                                src={post.featured_image}
                                alt={post.title}
                                className="w-full h-full object-cover opacity-40"
                            />
                        </div>
                        <div className="relative py-20 px-4 sm:px-6 lg:px-8">
                            <div className="max-w-4xl mx-auto">
                                {/* Categories */}
                                {post.categories && post.categories.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {post.categories.map((category, index) => (
                                            <span
                                                key={index}
                                                className="px-3 py-1 bg-emerald-600 rounded-full text-sm"
                                            >
                                                {category}
                                            </span>
                                        ))}
                                    </div>
                                )}
                                <h1 className="text-5xl font-bold mb-6">{post.title}</h1>
                                <div className="flex items-center gap-4">
                                    {post.author.avatar ? (
                                        <img
                                            src={post.author.avatar}
                                            alt={post.author.name}
                                            className="w-12 h-12 rounded-full"
                                        />
                                    ) : (
                                        <div className="w-12 h-12 rounded-full bg-emerald-600 flex items-center justify-center text-lg font-semibold">
                                            {post.author.name.charAt(0)}
                                        </div>
                                    )}
                                    <div>
                                        <div className="font-semibold">{post.author.name}</div>
                                        <div className="text-sm text-gray-300">
                                            {post.published_at} · {post.views_count} views
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="bg-gradient-to-r from-emerald-800 to-teal-700 py-20 px-4 sm:px-6 lg:px-8">
                        <div className="max-w-4xl mx-auto">
                            {/* Categories */}
                            {post.categories && post.categories.length > 0 && (
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {post.categories.map((category, index) => (
                                        <span key={index} className="px-3 py-1 bg-white/20 rounded-full text-sm">
                                            {category}
                                        </span>
                                    ))}
                                </div>
                            )}
                            <h1 className="text-5xl font-bold mb-6">{post.title}</h1>
                            <div className="flex items-center gap-4">
                                {post.author.avatar ? (
                                    <img
                                        src={post.author.avatar}
                                        alt={post.author.name}
                                        className="w-12 h-12 rounded-full"
                                    />
                                ) : (
                                    <div className="w-12 h-12 rounded-full bg-white text-emerald-700 flex items-center justify-center text-lg font-semibold">
                                        {post.author.name.charAt(0)}
                                    </div>
                                )}
                                <div>
                                    <div className="font-semibold">{post.author.name}</div>
                                    <div className="text-sm text-indigo-100">
                                        {post.published_at} · {post.views_count} views
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </section>

            <main className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-lg shadow-lg p-8 lg:p-12">
                        {/* Content */}
                        <article className="prose prose-lg max-w-none">
                            <div className="text-xl text-gray-600 mb-8 italic border-l-4 border-emerald-600 pl-6">
                                {post.excerpt}
                            </div>
                            <div
                                className="text-gray-800 whitespace-pre-line leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: post.content }}
                            />
                        </article>

                        {/* Tags */}
                        {post.tags && post.tags.length > 0 && (
                            <div className="mt-12 pt-8 border-t border-gray-200">
                                <h3 className="text-sm font-semibold text-gray-900 mb-3">Tags:</h3>
                                <div className="flex flex-wrap gap-2">
                                    {post.tags.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
                                        >
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Author Bio */}
                        <div className="mt-12 pt-8 border-t border-gray-200">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">About the Author</h3>
                            <div className="flex items-start gap-4">
                                {post.author.avatar ? (
                                    <img
                                        src={post.author.avatar}
                                        alt={post.author.name}
                                        className="w-16 h-16 rounded-full"
                                    />
                                ) : (
                                    <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-2xl text-emerald-600 font-semibold">
                                        {post.author.name.charAt(0)}
                                    </div>
                                )}
                                <div className="flex-1">
                                    <h4 className="font-semibold text-lg text-gray-900">{post.author.name}</h4>
                                    {post.author.bio && <p className="text-gray-600 mt-2">{post.author.bio}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Share & Actions */}
                        <div className="mt-8 pt-8 border-t border-gray-200 flex items-center justify-between">
                            <Link
                                href="/blog"
                                className="flex items-center text-emerald-600 hover:text-emerald-700 font-semibold"
                            >
                                <svg
                                    className="h-5 w-5 mr-2"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                                    />
                                </svg>
                                Back to Blog
                            </Link>
                            <div className="flex items-center gap-3">
                                <span className="text-sm text-gray-600">Share:</span>
                                <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                                    <svg className="h-5 w-5 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                    </svg>
                                </button>
                                <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                                    <svg className="h-5 w-5 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                                    </svg>
                                </button>
                                <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                                    <svg className="h-5 w-5 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
    </>
    );
}

// Use the public layout (no admin sidebar) for this public-facing page
BlogShow.layout = (page: ReactNode) => <PublicLayout>{page}</PublicLayout>;
