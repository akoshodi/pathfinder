import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Trophy, Search, Calendar, DollarSign, MapPin, Users } from 'lucide-react';

interface Competition {
    id: number;
    title: string;
    slug: string;
    description?: string;
    category: string;
    organizer: string;
    prize_amount?: number;
    prize_description?: string;
    registration_start?: string;
    registration_end?: string;
    competition_date?: string;
    location?: string;
    format: 'online' | 'in-person' | 'hybrid';
    participants_count: number;
    is_featured: boolean;
}

interface Props {
    competitions: {
        data: Competition[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    filters: {
        category?: string;
        format?: string;
        search?: string;
    };
}

export default function CompetitionsIndex({ competitions, filters }: Props) {
    const [searchQuery, setSearchQuery] = useState(filters.search || '');
    const [selectedCategory, setSelectedCategory] = useState(filters.category || 'all');
    const [selectedFormat, setSelectedFormat] = useState(filters.format || 'all');

    const categories = [
        { id: 'all', label: 'All Categories' },
        { id: 'academic', label: 'Academic' },
        { id: 'stem', label: 'STEM' },
        { id: 'business', label: 'Business' },
        { id: 'arts', label: 'Arts & Design' },
        { id: 'sports', label: 'Sports' },
        { id: 'hackathon', label: 'Hackathon' },
    ];

    const formats = [
        { id: 'all', label: 'All Formats' },
        { id: 'online', label: 'Online' },
        { id: 'in-person', label: 'In-Person' },
        { id: 'hybrid', label: 'Hybrid' },
    ];

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/competitions', {
            category: selectedCategory === 'all' ? undefined : selectedCategory,
            format: selectedFormat === 'all' ? undefined : selectedFormat,
            search: searchQuery || undefined,
        }, { preserveState: true });
    };

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
        router.get('/competitions', {
            category: category === 'all' ? undefined : category,
            format: selectedFormat === 'all' ? undefined : selectedFormat,
            search: searchQuery || undefined,
        }, { preserveState: true });
    };

    const handleFormatChange = (format: string) => {
        setSelectedFormat(format);
        router.get('/competitions', {
            category: selectedCategory === 'all' ? undefined : selectedCategory,
            format: format === 'all' ? undefined : format,
            search: searchQuery || undefined,
        }, { preserveState: true });
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0,
        }).format(price);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
    };

    return (
        <>
            <Head title="Competitions - Pathfinder" />
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                <section className="bg-gradient-to-r from-emerald-700 to-teal-600 py-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex items-center gap-2 mb-2">
                            <Trophy className="h-8 w-8 text-white" />
                            <h1 className="text-3xl md:text-4xl font-bold text-white">Student Competitions</h1>
                        </div>
                        <p className="text-emerald-50 text-lg">Discover and participate in competitions to showcase your talents</p>
                    </div>
                </section>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    {/* Category Tabs */}
                    <div className="flex flex-wrap gap-2 mb-6">
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

                    {/* Search and Format Filter */}
                    <form onSubmit={handleSearch} className="mb-8 space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search competitions..."
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                />
                            </div>
                            <div className="flex gap-2">
                                {formats.map((format) => (
                                    <button
                                        key={format.id}
                                        type="button"
                                        onClick={() => handleFormatChange(format.id)}
                                        className={`px-4 py-2 rounded-lg transition-colors flex-1 ${
                                            selectedFormat === format.id
                                                ? 'bg-emerald-600 text-white'
                                                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                        }`}
                                    >
                                        {format.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </form>

                    {/* Competitions Grid */}
                    {competitions.data.length > 0 ? (
                        <>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                                {competitions.data.map((competition) => (
                                    <Link key={competition.id} href={`/competitions/${competition.slug}`}>
                                        <Card className="h-full hover:shadow-lg transition-shadow">
                                            <CardHeader>
                                                {competition.is_featured && (
                                                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-xs font-semibold rounded mb-2 w-fit">
                                                        <Trophy className="h-3 w-3" />
                                                        Featured
                                                    </span>
                                                )}
                                                <CardTitle className="line-clamp-2">{competition.title}</CardTitle>
                                                <CardDescription className="capitalize">{competition.organizer}</CardDescription>
                                            </CardHeader>
                                            <CardContent className="space-y-3">
                                                {competition.description && (
                                                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                                                        {competition.description}
                                                    </p>
                                                )}
                                                <div className="space-y-2 text-sm">
                                                    {competition.prize_amount && (
                                                        <div className="flex items-center gap-2 text-emerald-600">
                                                            <DollarSign className="h-4 w-4" />
                                                            <span className="font-semibold">{formatPrice(competition.prize_amount)} Prize</span>
                                                        </div>
                                                    )}
                                                    {competition.competition_date && (
                                                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                                            <Calendar className="h-4 w-4" />
                                                            <span>{formatDate(competition.competition_date)}</span>
                                                        </div>
                                                    )}
                                                    {competition.location && (
                                                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                                            <MapPin className="h-4 w-4" />
                                                            <span>{competition.location}</span>
                                                        </div>
                                                    )}
                                                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                                        <Users className="h-4 w-4" />
                                                        <span>{competition.participants_count} participants</span>
                                                    </div>
                                                    <div>
                                                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded text-xs capitalize">
                                                            {competition.format.replace('-', ' ')}
                                                        </span>
                                                        <span className="ml-2 px-2 py-1 bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 rounded text-xs capitalize">
                                                            {competition.category}
                                                        </span>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                ))}
                            </div>

                            {/* Pagination */}
                            {competitions.last_page > 1 && (
                                <div className="flex justify-center gap-2">
                                    {Array.from({ length: competitions.last_page }, (_, i) => i + 1).map((page) => (
                                        <Link
                                            key={page}
                                            href={`/competitions?page=${page}&category=${selectedCategory}&format=${selectedFormat}&search=${searchQuery}`}
                                            className={`px-4 py-2 rounded-lg ${
                                                page === competitions.current_page
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
                                <Trophy className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                <p className="text-gray-600 dark:text-gray-400">No competitions found. Try adjusting your filters.</p>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </>
    );
}
