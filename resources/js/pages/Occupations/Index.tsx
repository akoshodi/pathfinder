import { Head, Link, router } from '@inertiajs/react';
import { useState, useMemo, useEffect } from 'react';
import PublicLayout from '@/layouts/public-layout';
import { OccupationFilters } from '@/components/OccupationFilters';

interface Occupation {
    onetsoc_code: string;
    title: string;
    description: string;
    slug: string;
}

interface CareerCluster {
    id: string;
    name: string;
    icon: string;
}

interface RiasecInterest {
    code: string;
    name: string;
    description: string;
}

interface JobZone {
    job_zone: number;
    name: string;
    education: string;
}

const DEFAULT_OCCUPATIONS: PaginatedData = {
    data: [],
    links: [],
    meta: { total: 0, current_page: 1, per_page: 24, last_page: 1 },
};

interface PaginatedData {
    data: Occupation[];
    links: any[];
    meta: {
        total: number;
        current_page: number;
        per_page: number;
        last_page: number;
        from?: number;
        to?: number;
    };
}

interface Props {
    occupations?: PaginatedData;
    careerClusters: CareerCluster[];
    riasecInterests: RiasecInterest[];
    jobZones: JobZone[];
    filters: {
        search?: string;
        interest?: string;
        job_zone?: string | number;
        cluster?: string;
    };
}

export default function OccupationsIndex({ occupations, careerClusters, riasecInterests, jobZones, filters }: Props) {
    // FIX: Use default constant to prevent undefined errors
    const [search, setSearch] = useState(filters.search || '');
    const [suggestions, setSuggestions] = useState<Array<{ title: string; slug: string }>>([]);
    const [showSuggest, setShowSuggest] = useState(false);
    // Normalize paginator shape: support both Laravel paginator (top-level keys)
    // and a { meta, links, data } shape. Always provide meta.{total,current_page,per_page,last_page}.
    const occupationsData = useMemo<PaginatedData>(() => {
        const src: any = occupations ?? {};

        const data = Array.isArray(src.data) ? src.data : [];
        const links = Array.isArray(src.links) ? src.links : [];

        const metaSrc = src.meta ?? {};
        const total = (metaSrc.total ?? src.total ?? 0) as number;
        const per_page = (metaSrc.per_page ?? src.per_page ?? 24) as number;
        const current_page = (metaSrc.current_page ?? src.current_page ?? 1) as number;
        const last_page = (metaSrc.last_page ?? src.last_page ?? (per_page ? Math.max(1, Math.ceil(total / per_page)) : 1)) as number;
        const from = (metaSrc.from ?? src.from) as number | undefined;
        const to = (metaSrc.to ?? src.to) as number | undefined;

        return {
            data,
            links,
            meta: { total, current_page, per_page, last_page, from, to },
        };
    }, [occupations]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/occupations', { search }, { preserveState: true });
    };

    const from = occupationsData.meta.from ?? (occupationsData.data.length > 0 ? 1 : 0);
    const to = occupationsData.meta.to ?? occupationsData.data.length;
    const total = occupationsData.meta.total;

    // Autosuggest effect
    useEffect(() => {
        const q = search.trim();
        if (q.length < 2) {
            setSuggestions([]);
            setShowSuggest(false);
            return;
        }
        const handle = setTimeout(async () => {
            try {
                const res = await fetch(`/api/suggest/occupations?search=${encodeURIComponent(q)}&limit=8`, {
                    headers: { 'Accept': 'application/json' },
                });
                if (res.ok) {
                    const data = await res.json();
                    setSuggestions(Array.isArray(data) ? data : []);
                    setShowSuggest(true);
                }
            } catch (_) {
                // ignore
            }
        }, 250);
        return () => clearTimeout(handle);
    }, [search]);

    return (
        <>
            <Head title="Explore Careers" />

            {/* Hero Section */}
            <section className="relative bg-gradient-to-r from-emerald-800 to-teal-700 text-white py-16 px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                            Find Your Perfect Career Path
                        </h1>
                        <p className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto">
                            Explore over 1,000 occupations with detailed insights on skills, education, salary, and job outlook powered by O*NET data
                        </p>
                    </div>

                    {/* Search Bar */}
                    <form onSubmit={handleSearch} className="max-w-3xl mx-auto">
                        <div className="relative">
                            <svg
                                className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-400"
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
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search careers by title or keyword (e.g., software, nurse, engineer)..."
                                className="w-full pl-14 pr-28 py-4 text-lg rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            />
                            {showSuggest && suggestions.length > 0 && (
                                <div className="absolute z-20 mt-2 w-full bg-white rounded-lg border border-gray-200 shadow-lg overflow-hidden">
                                    {suggestions.map((sug, idx) => (
                                        <Link
                                            key={idx}
                                            href={`/occupations/${sug.slug}`}
                                            className="block px-4 py-3 text-sm text-gray-800 hover:bg-emerald-50"
                                            onClick={() => setShowSuggest(false)}
                                        >
                                            {sug.title}
                                        </Link>
                                    ))}
                                </div>
                            )}
                            <button
                                type="submit"
                                className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md font-semibold transition-colors"
                            >
                                Search
                            </button>
                        </div>
                    </form>
                </div>
            </section>

            <main className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
                <div className="mx-auto max-w-7xl">
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
                        {/* Sidebar Filters */}
                        <aside className="lg:col-span-1">
                            <OccupationFilters 
                                filters={filters}
                                riasecInterests={riasecInterests}
                                jobZones={jobZones}
                                careerClusters={careerClusters}
                            />
                        </aside>

                        {/* Results */}
                        <section className="lg:col-span-3">
                            <div className="mb-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900">
                                            {filters.search || filters.interest || filters.job_zone ? 'Search Results' : 'All Occupations'}
                                        </h2>
                                        <p className="text-sm text-gray-600 mt-1">
                                            {from}-{to} of {total} occupations
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {occupationsData.data.map((occupation) => (
                                    <Link
                                        key={occupation.onetsoc_code}
                                        href={`/occupations/${occupation.slug}`}
                                        className="bg-white rounded-lg border border-gray-200 hover:border-emerald-400 hover:shadow-lg transition-all p-6 group"
                                    >
                                        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">{occupation.title}</h3>
                                        <p className="text-sm text-gray-600 line-clamp-3 mb-4">{occupation.description}</p>
                                        <div className="flex items-center text-sm text-emerald-600 font-medium">Explore career →</div>
                                    </Link>
                                ))}
                            </div>

                            {occupationsData.links.length > 3 && (
                                <div className="mt-8 flex justify-center gap-2">
                                    {occupationsData.links.map((link, index) => (
                                        <Link
                                            key={index}
                                            href={link.url || '#'}
                                            className={`px-4 py-2 rounded-lg border transition-colors ${
                                                link.active
                                                    ? 'bg-emerald-600 text-white border-emerald-600'
                                                    : link.url
                                                      ? 'bg-white text-gray-700 border-gray-300 hover:border-emerald-600 hover:text-emerald-600'
                                                      : 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                                            }`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                                </div>
                            )}
                        </section>
                    </div>
                </div>
            </main>
        </>
    );
}

OccupationsIndex.layout = (page: React.ReactNode) => <PublicLayout>{page}</PublicLayout>;
