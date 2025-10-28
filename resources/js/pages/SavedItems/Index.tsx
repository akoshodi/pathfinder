import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

interface SavedItem {
    id: number;
    saveable_type: string;
    saveable_id: number;
    created_at: string;
    saveable: {
        id: number;
        name?: string;
        title?: string;
        slug: string;
        description?: string;
        excerpt?: string;
        logo?: string | null;
        featured_image?: string | null;
        location?: string;
        type?: string;
        category?: string;
    };
}

interface Props {
    savedItems: SavedItem[];
}

export default function SavedItemsIndex({ savedItems }: Props) {
    const handleRemove = (itemId: number) => {
        if (confirm('Remove this item from your saved list?')) {
            router.delete(`/saved-items/${itemId}`);
        }
    };

    const getItemType = (type: string) => {
        return type.split('\\').pop() || type;
    };

    const getItemUrl = (item: SavedItem) => {
        const type = getItemType(item.saveable_type).toLowerCase();
        if (type === 'blogpost') return `/blog/${item.saveable.slug}`;
        if (type === 'career') return `/careers/${item.saveable.slug}`;
        return `/${type}s/${item.saveable.slug}`;
    };

    const getItemName = (item: SavedItem) => {
        return item.saveable.name || item.saveable.title || 'Untitled';
    };

    const groupedItems = savedItems.reduce((acc, item) => {
        const type = getItemType(item.saveable_type);
        if (!acc[type]) acc[type] = [];
        acc[type].push(item);
        return acc;
    }, {} as Record<string, SavedItem[]>);

    const typeIcons: Record<string, string> = {
        University: '🎓',
        Course: '📚',
        Company: '🏢',
        Career: '💼',
        BlogPost: '📝',
    };

    const typeColors: Record<string, string> = {
        University: 'from-blue-600 to-blue-700',
        Course: 'from-green-600 to-green-700',
        Company: 'from-emerald-600 to-emerald-700',
        Career: 'from-purple-600 to-purple-700',
        BlogPost: 'from-indigo-600 to-indigo-700',
    };

    return (
        <AppLayout>
            <Head title="Saved Items" />

            {/* Hero Section */}
            <section className="bg-gradient-to-r from-pink-600 to-pink-700 text-white py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-4xl font-bold mb-4">Saved Items</h1>
                    <p className="text-lg text-pink-100">
                        Your collection of universities, courses, companies, and careers for easy reference
                    </p>
                </div>
            </section>

            <main className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    {savedItems.length === 0 ? (
                        <div className="bg-white rounded-lg shadow p-12 text-center">
                            <svg
                                className="mx-auto h-16 w-16 text-gray-400 mb-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                                />
                            </svg>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">No saved items yet</h3>
                            <p className="text-gray-600 mb-6">
                                Start exploring and save universities, courses, companies, or careers for later
                            </p>
                            <div className="flex flex-wrap gap-3 justify-center">
                                <Link
                                    href="/universities"
                                    className="px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
                                >
                                    Browse Universities
                                </Link>
                                <Link
                                    href="/courses"
                                    className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                                >
                                    Browse Courses
                                </Link>
                                <Link
                                    href="/careers"
                                    className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                                >
                                    Browse Careers
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-8">
                            {/* Summary Stats */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {Object.entries(groupedItems).map(([type, items]) => (
                                    <div key={type} className="bg-white rounded-lg shadow p-4">
                                        <div className="text-3xl mb-2">{typeIcons[type] || '📌'}</div>
                                        <div className="text-2xl font-bold text-gray-900">{items.length}</div>
                                        <div className="text-sm text-gray-600">{type}s</div>
                                    </div>
                                ))}
                            </div>

                            {/* Grouped Items */}
                            {Object.entries(groupedItems).map(([type, items]) => (
                                <section key={type} className="bg-white rounded-lg shadow p-6">
                                    <div className="flex items-center gap-3 mb-6">
                                        <span className="text-3xl">{typeIcons[type] || '📌'}</span>
                                        <h2 className="text-2xl font-bold text-gray-900">
                                            {type}s ({items.length})
                                        </h2>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {items.map((item) => (
                                            <div
                                                key={item.id}
                                                className="border border-gray-200 rounded-lg p-4 hover:border-pink-500 hover:shadow-md transition-all"
                                            >
                                                <div className="flex items-start gap-3 mb-3">
                                                    {(item.saveable.logo || item.saveable.featured_image) ? (
                                                        <img
                                                            src={(item.saveable.logo || item.saveable.featured_image) as string}
                                                            alt={getItemName(item)}
                                                            className="w-12 h-12 object-cover rounded"
                                                        />
                                                    ) : (
                                                        <div className="w-12 h-12 bg-pink-100 rounded flex items-center justify-center text-lg">
                                                            {typeIcons[type]}
                                                        </div>
                                                    )}
                                                    <div className="flex-1 min-w-0">
                                                        <Link
                                                            href={getItemUrl(item)}
                                                            className="font-semibold text-gray-900 hover:text-pink-600 line-clamp-2"
                                                        >
                                                            {getItemName(item)}
                                                        </Link>
                                                        {item.saveable.location && (
                                                            <p className="text-xs text-gray-600 mt-1">
                                                                {item.saveable.location}
                                                            </p>
                                                        )}
                                                        {item.saveable.type && (
                                                            <span className="inline-block mt-1 px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded">
                                                                {item.saveable.type}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>

                                                {(item.saveable.description || item.saveable.excerpt) && (
                                                    <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                                                        {item.saveable.description || item.saveable.excerpt}
                                                    </p>
                                                )}

                                                <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                                                    <span className="text-xs text-gray-500">
                                                        Saved {item.created_at}
                                                    </span>
                                                    <button
                                                        onClick={() => handleRemove(item.id)}
                                                        className="text-red-600 hover:text-red-700 text-sm font-medium"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </AppLayout>
    );
}
