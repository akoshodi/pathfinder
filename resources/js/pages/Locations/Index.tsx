import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { MapPin, GraduationCap, Building2, Search, Globe } from 'lucide-react';

interface Location {
    id: number;
    name: string;
    slug: string;
    city: string;
    state?: string;
    country: string;
    universities_count: number;
    companies_count: number;
    highlights: string[];
    is_featured: boolean;
}

interface Props {
    locations: {
        data: Location[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    filters: {
        search?: string;
        country?: string;
    };
    countries: string[];
}

export default function LocationsIndex({ locations, filters, countries }: Props) {
    const [searchQuery, setSearchQuery] = useState(filters.search || '');
    const [selectedCountry, setSelectedCountry] = useState(filters.country || 'all');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/locations', {
            search: searchQuery || undefined,
            country: selectedCountry === 'all' ? undefined : selectedCountry,
        }, { preserveState: true });
    };

    const handleCountryChange = (country: string) => {
        setSelectedCountry(country);
        router.get('/locations', {
            search: searchQuery || undefined,
            country: country === 'all' ? undefined : country,
        }, { preserveState: true });
    };

    return (
        <>
            <Head title="Explore Locations - Pathfinder" />
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                <section className="bg-gradient-to-r from-emerald-700 to-teal-600 py-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex items-center gap-2 mb-2">
                            <Globe className="h-8 w-8 text-white" />
                            <h1 className="text-3xl md:text-4xl font-bold text-white">Explore Locations</h1>
                        </div>
                        <p className="text-emerald-50 text-lg">Discover universities and career opportunities by location</p>
                    </div>
                </section>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    {/* Search and Filters */}
                    <div className="mb-8 space-y-4">
                        <form onSubmit={handleSearch}>
                            <div className="relative max-w-xl">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search by city, state, or country..."
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                />
                            </div>
                        </form>

                        {/* Country Filter */}
                        {countries.length > 0 && (
                            <div className="flex gap-2 flex-wrap">
                                <button
                                    onClick={() => handleCountryChange('all')}
                                    className={`px-4 py-2 rounded-lg transition-colors ${
                                        selectedCountry === 'all'
                                            ? 'bg-emerald-600 text-white'
                                            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                    }`}
                                >
                                    All Countries
                                </button>
                                {countries.map((country) => (
                                    <button
                                        key={country}
                                        onClick={() => handleCountryChange(country)}
                                        className={`px-4 py-2 rounded-lg transition-colors ${
                                            selectedCountry === country
                                                ? 'bg-emerald-600 text-white'
                                                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                        }`}
                                    >
                                        {country}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Locations Grid */}
                    {locations.data.length > 0 ? (
                        <>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                                {locations.data.map((location) => (
                                    <Link key={location.id} href={`/locations/${location.slug}`}>
                                        <Card className="h-full hover:shadow-lg transition-shadow">
                                            <CardHeader>
                                                {location.is_featured && (
                                                    <span className="inline-block px-2 py-1 bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 text-xs font-semibold rounded mb-2">
                                                        Featured
                                                    </span>
                                                )}
                                                <CardTitle className="flex items-start gap-2">
                                                    <MapPin className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                                                    <span>{location.name}</span>
                                                </CardTitle>
                                                <CardDescription>
                                                    {location.city}
                                                    {location.state && `, ${location.state}`}
                                                    {', '}
                                                    {location.country}
                                                </CardDescription>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="space-y-2 mb-4">
                                                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                                        <GraduationCap className="h-4 w-4" />
                                                        <span>{location.universities_count} universities</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                                        <Building2 className="h-4 w-4" />
                                                        <span>{location.companies_count} companies</span>
                                                    </div>
                                                </div>
                                                {location.highlights.length > 0 && (
                                                    <div>
                                                        <p className="text-xs text-gray-500 dark:text-gray-500 mb-1">Highlights:</p>
                                                        <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
                                                            {location.highlights.join(', ')}
                                                        </p>
                                                    </div>
                                                )}
                                            </CardContent>
                                        </Card>
                                    </Link>
                                ))}
                            </div>

                            {/* Pagination */}
                            {locations.last_page > 1 && (
                                <div className="flex justify-center gap-2">
                                    {Array.from({ length: locations.last_page }, (_, i) => i + 1).map((page) => (
                                        <Link
                                            key={page}
                                            href={`/locations?page=${page}&search=${searchQuery}&country=${selectedCountry}`}
                                            className={`px-4 py-2 rounded-lg ${
                                                page === locations.current_page
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
                                <p className="text-gray-600 dark:text-gray-400">No locations found. Try adjusting your filters.</p>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </>
    );
}
