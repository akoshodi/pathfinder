import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ShoppingBag, Search, MapPin, DollarSign, Tag } from 'lucide-react';

interface MarketplaceItem {
    id: number;
    title: string;
    slug: string;
    description?: string;
    category: string;
    price: number;
    condition: 'new' | 'like_new' | 'good' | 'fair' | 'poor';
    images: string[];
    location: string;
    views_count: number;
    created_at: string;
}

interface Props {
    items: {
        data: MarketplaceItem[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    filters: {
        category?: string;
        location?: string;
        search?: string;
    };
}

export default function MarketplaceIndex({ items, filters }: Props) {
    const [searchQuery, setSearchQuery] = useState(filters.search || '');
    const [selectedCategory, setSelectedCategory] = useState(filters.category || 'all');
    const [selectedLocation, setSelectedLocation] = useState(filters.location || '');

    const categories = [
        { id: 'all', label: 'All Items' },
        { id: 'textbooks', label: 'Textbooks' },
        { id: 'electronics', label: 'Electronics' },
        { id: 'furniture', label: 'Furniture' },
        { id: 'clothing', label: 'Clothing' },
        { id: 'other', label: 'Other' },
    ];

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/marketplace', {
            category: selectedCategory === 'all' ? undefined : selectedCategory,
            location: selectedLocation || undefined,
            search: searchQuery || undefined,
        }, { preserveState: true });
    };

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
        router.get('/marketplace', {
            category: category === 'all' ? undefined : category,
            location: selectedLocation || undefined,
            search: searchQuery || undefined,
        }, { preserveState: true });
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(price);
    };

    return (
        <>
            <Head title="Marketplace - Pathfinder" />
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                <section className="bg-gradient-to-r from-emerald-700 to-teal-600 py-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex items-center gap-2 mb-2">
                            <ShoppingBag className="h-8 w-8 text-white" />
                            <h1 className="text-3xl md:text-4xl font-bold text-white">Student Marketplace</h1>
                        </div>
                        <p className="text-emerald-50 text-lg">Buy and sell textbooks, electronics, and more with fellow students</p>
                    </div>
                </section>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    {/* Category Tabs */}
                    <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-200 dark:border-gray-700 pb-4">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => handleCategoryChange(category.id)}
                                className={`px-4 py-2 rounded-lg transition-colors ${
                                    selectedCategory === category.id
                                        ? 'bg-emerald-600 text-white'
                                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                }`}
                            >
                                {category.label}
                            </button>
                        ))}
                    </div>

                    {/* Search and Location Filter */}
                    <form onSubmit={handleSearch} className="mb-8 space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search items..."
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                />
                            </div>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input
                                    type="text"
                                    value={selectedLocation}
                                    onChange={(e) => setSelectedLocation(e.target.value)}
                                    placeholder="Filter by location..."
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                />
                            </div>
                        </div>
                    </form>

                    {/* Items Grid */}
                    {items.data.length > 0 ? (
                        <>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                                {items.data.map((item) => (
                                    <Link key={item.id} href={`/marketplace/${item.slug}`}>
                                        <Card className="h-full hover:shadow-lg transition-shadow overflow-hidden">
                                            {/* Image */}
                                            <div className="aspect-square bg-gray-200 dark:bg-gray-700 relative">
                                                {item.images.length > 0 ? (
                                                    <img
                                                        src={item.images[0]}
                                                        alt={item.title}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center">
                                                        <ShoppingBag className="h-12 w-12 text-gray-400" />
                                                    </div>
                                                )}
                                            </div>
                                            <CardHeader className="pb-3">
                                                <div className="flex items-start justify-between gap-2 mb-2">
                                                    <CardTitle className="text-base line-clamp-2 flex-1">{item.title}</CardTitle>
                                                    <span className="text-lg font-bold text-emerald-600 flex-shrink-0">
                                                        {formatPrice(item.price)}
                                                    </span>
                                                </div>
                                                <CardDescription className="capitalize text-xs">
                                                    {item.condition.replace('_', ' ')} • {item.category}
                                                </CardDescription>
                                            </CardHeader>
                                            <CardContent className="pt-0">
                                                <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
                                                    <span className="flex items-center gap-1">
                                                        <MapPin className="h-3 w-3" />
                                                        {item.location}
                                                    </span>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                ))}
                            </div>

                            {/* Pagination */}
                            {items.last_page > 1 && (
                                <div className="flex justify-center gap-2">
                                    {Array.from({ length: items.last_page }, (_, i) => i + 1).map((page) => (
                                        <Link
                                            key={page}
                                            href={`/marketplace?page=${page}&category=${selectedCategory}&location=${selectedLocation}&search=${searchQuery}`}
                                            className={`px-4 py-2 rounded-lg ${
                                                page === items.current_page
                                                    ? 'bg-emerald-600 text-white'
                                                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                            }`}
                                        >
                                            {page}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </>
                    ) : (
                        <Card>
                            <CardContent className="py-12 text-center">
                                <ShoppingBag className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                <p className="text-gray-600 dark:text-gray-400">No items found. Try adjusting your filters.</p>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </>
    );
}
