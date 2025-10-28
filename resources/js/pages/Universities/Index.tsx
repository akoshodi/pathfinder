import { Head, Link, router, usePage } from '@inertiajs/react';
import { type ReactNode, useState } from 'react';
import { type SharedData } from '@/types';
import PublicLayout from '@/layouts/public-layout';
import { Grid, List, MapPin, Users, DollarSign, GraduationCap, ExternalLink, ChevronDown, Search } from 'lucide-react';

interface University {
    id: number;
    name: string;
    slug: string;
    logo: string | null;
    location: string;
    city: string;
    state: string;
    type: 'Public' | 'Private';
    ranking: number | null;
    acceptance_rate: string | null;
    students_count: number | null;
    tuition: string | null;
    is_partner: boolean;
    is_featured: boolean;
    graduation_rate?: number | null;
    programs?: Array<{
        id: number;
        name: string;
        slug: string;
        category: string;
    }>;
}

interface SponsoredAd {
    id: number;
    university_id: number;
    tagline: string;
    university: University;
}

interface Props {
    universities: {
        data: University[];
        links: any[];
        meta: any;
    };
    sponsoredAds?: SponsoredAd[];
    filters: {
        search?: string;
        type?: string;
        cost?: string;
        programs?: string | string[];
        location?: string;
        online_campus?: string;
        tab?: string;
    };
}

export default function UniversitiesIndex({ universities, sponsoredAds = [], filters }: Props) {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
    const [showFilters, setShowFilters] = useState(false);
    const [showMoreDropdown, setShowMoreDropdown] = useState(false);
    const activeTab = filters.tab || 'best-colleges';

    const tabs = [
        { id: 'best-colleges', label: 'Best Colleges', count: 2850 },
        { id: 'direct-admissions', label: 'Direct Admissions', count: 152 },
        { id: 'college-quiz', label: 'College Quiz', count: null },
        { id: 'best-value', label: 'Best Value & Most Affordable', count: 985 },
        { id: 'student-life', label: 'Best Student Life', count: 742 },
        { id: 'career-prospects', label: 'Career Prospects', count: 1230 },
    ];

    const moreOptions = [
        { id: 'diversity', label: 'Most Diverse Colleges', count: 568 },
        { id: 'athletics', label: 'Best Athletics', count: 421 },
        { id: 'party-schools', label: 'Top Party Schools', count: 215 },
        { id: 'greek-life', label: 'Best Greek Life', count: 312 },
        { id: 'stem', label: 'Best for STEM', count: 654 },
    ];

    const from = universities?.meta?.from ?? (universities.data.length > 0 ? 1 : 0);
    const to = universities?.meta?.to ?? universities.data.length;
    const total = universities?.meta?.total ?? universities.data.length;

    const handleFilterChange = (key: string, value: any) => {
        router.get('/universities', { ...filters, [key]: value }, {
            preserveState: true,
            replace: true,
        });
    };

    const handleTabChange = (tabId: string) => {
        router.get('/universities', { ...filters, tab: tabId }, {
            preserveState: true,
            replace: true,
        });
        setShowMoreDropdown(false);
    };

    const clearFilters = () => {
        router.get('/universities', {}, { replace: true });
    };

    const { auth } = usePage<SharedData>().props;

    const SponsoredCard = ({ ad }: { ad: SponsoredAd }) => {
        const uni = ad.university;
        return (
            <div className={`relative bg-gradient-to-br from-amber-50 to-yellow-50 border-2 border-amber-300 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow ${viewMode === 'list' ? 'p-6' : 'p-4 md:col-span-2'}`}>
                <div className="absolute top-2 right-2 bg-amber-400 text-amber-900 text-xs font-bold px-2 py-1 rounded">SPONSORED</div>
                {viewMode === 'list' ? (
                    <div className="flex gap-6">
                        {uni.logo && (
                            <img src={uni.logo} alt={uni.name} className="h-20 w-20 rounded-lg object-cover" />
                        )}
                        <div className="flex-1">
                            <h3 className="text-xl font-bold text-gray-900 mb-1">
                                <Link href={`/universities/${uni.slug}`} className="hover:text-emerald-700">{uni.name}</Link>
                            </h3>
                            <p className="text-sm text-gray-700 mb-3">{ad.tagline}</p>
                            <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                                <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{uni.city}, {uni.state}</span>
                                {uni.students_count && <span className="flex items-center gap-1"><Users className="h-4 w-4" />{uni.students_count.toLocaleString()} students</span>}
                                {uni.tuition && <span className="flex items-center gap-1"><DollarSign className="h-4 w-4" />{uni.tuition}</span>}
                            </div>
                            <Link href={`/universities/${uni.slug}`} className="inline-flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 text-sm font-medium">
                                Learn More <ExternalLink className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="flex gap-6 items-center">
                        {uni.logo && <img src={uni.logo} alt={uni.name} className="h-16 w-16 rounded-lg object-cover" />}
                        <div className="flex-1">
                            <h3 className="text-lg font-bold text-gray-900 mb-1">{uni.name}</h3>
                            <p className="text-xs text-gray-700 mb-2">{ad.tagline}</p>
                            <div className="flex gap-4 text-xs text-gray-600">
                                <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{uni.city}, {uni.state}</span>
                                {uni.tuition && <span className="flex items-center gap-1"><DollarSign className="h-3 w-3" />{uni.tuition}</span>}
                            </div>
                        </div>
                        <Link href={`/universities/${uni.slug}`} className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 text-sm font-medium whitespace-nowrap">
                            View Details
                        </Link>
                    </div>
                )}
            </div>
        );
    };

    const UniversityCard = ({ uni, index }: { uni: University; index: number }) => {
        const onCompareClick = () => {
            if (auth.user) {
                router.post('/comparison', {
                    comparable_type: 'App\\Models\\University',
                    comparable_id: uni.id,
                }, {
                    onSuccess: () => router.get('/compare'),
                    preserveScroll: true,
                });
            } else {
                router.get(`/compare`, { universities: uni.slug }, { replace: false });
            }
        };
        return (
            <div className={`bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow ${viewMode === 'list' ? 'p-6' : 'p-4'}`}>
                {viewMode === 'list' ? (
                    <div className="flex gap-6">
                        <div className="flex-shrink-0">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-2xl font-bold text-emerald-700">#{uni.ranking || index + 1}</span>
                            </div>
                            {uni.logo ? (
                                <img src={uni.logo} alt={uni.name} className="h-20 w-20 rounded-lg object-cover" />
                            ) : (
                                <div className="h-20 w-20 rounded-lg bg-gray-100 flex items-center justify-center">
                                    <GraduationCap className="h-10 w-10 text-gray-400" />
                                </div>
                            )}
                        </div>
                        <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                                        <Link href={`/universities/${uni.slug}`} className="hover:text-emerald-700">{uni.name}</Link>
                                    </h3>
                                    <p className="text-sm text-gray-600 flex items-center gap-1">
                                        <MapPin className="h-4 w-4" />
                                        {uni.city}, {uni.state}
                                    </p>
                                </div>
                                {uni.is_featured && (
                                    <span className="bg-emerald-100 text-emerald-800 text-xs font-medium px-2 py-1 rounded">Featured</span>
                                )}
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                                {uni.acceptance_rate && (
                                    <div>
                                        <p className="text-xs text-gray-500">Acceptance Rate</p>
                                        <p className="text-sm font-semibold text-gray-900">{uni.acceptance_rate}</p>
                                    </div>
                                )}
                                {uni.students_count && (
                                    <div>
                                        <p className="text-xs text-gray-500">Students</p>
                                        <p className="text-sm font-semibold text-gray-900">{uni.students_count.toLocaleString()}</p>
                                    </div>
                                )}
                                {uni.tuition && (
                                    <div>
                                        <p className="text-xs text-gray-500">Tuition</p>
                                        <p className="text-sm font-semibold text-gray-900">{uni.tuition}</p>
                                    </div>
                                )}
                                {uni.graduation_rate && (
                                    <div>
                                        <p className="text-xs text-gray-500">Graduation Rate</p>
                                        <p className="text-sm font-semibold text-gray-900">{uni.graduation_rate}%</p>
                                    </div>
                                )}
                            </div>
                            <div className="flex gap-2">
                                <Link href={`/universities/${uni.slug}`} className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 text-sm font-medium">
                                    View Profile
                                </Link>
                                <button onClick={onCompareClick} className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 text-sm font-medium">
                                    Compare
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div>
                        <div className="flex items-start justify-between mb-3">
                            <span className="text-lg font-bold text-emerald-700">#{uni.ranking || index + 1}</span>
                            {uni.is_featured && (
                                <span className="bg-emerald-100 text-emerald-800 text-xs font-medium px-2 py-1 rounded">Featured</span>
                            )}
                        </div>
                        {uni.logo ? (
                            <img src={uni.logo} alt={uni.name} className="h-16 w-16 mx-auto rounded-lg object-cover mb-3" />
                        ) : (
                            <div className="h-16 w-16 mx-auto rounded-lg bg-gray-100 flex items-center justify-center mb-3">
                                <GraduationCap className="h-8 w-8 text-gray-400" />
                            </div>
                        )}
                        <h3 className="text-lg font-bold text-gray-900 mb-1 text-center line-clamp-2">{uni.name}</h3>
                        <p className="text-xs text-gray-600 mb-3 text-center">{uni.city}, {uni.state}</p>
                        <div className="space-y-2 mb-4 text-xs">
                            {uni.tuition && (
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Tuition:</span>
                                    <span className="font-semibold">{uni.tuition}</span>
                                </div>
                            )}
                            {uni.acceptance_rate && (
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Accept Rate:</span>
                                    <span className="font-semibold">{uni.acceptance_rate}</span>
                                </div>
                            )}
                        </div>
                        <Link href={`/universities/${uni.slug}`} className="block text-center bg-emerald-600 text-white px-3 py-2 rounded-md hover:bg-emerald-700 text-sm font-medium">
                            View Profile
                        </Link>
                    </div>
                )}
            </div>
        );
    };

    const mixedResults: Array<{ type: 'sponsored' | 'university'; data: any; index: number }> = [];
    universities.data.forEach((uni, idx) => {
        if (idx > 0 && idx % 5 === 0 && sponsoredAds[Math.floor(idx / 5) - 1]) {
            mixedResults.push({ type: 'sponsored', data: sponsoredAds[Math.floor(idx / 5) - 1], index: idx });
        }
        mixedResults.push({ type: 'university', data: uni, index: idx });
    });

    return (
        <>
            <Head title="Best Colleges in America - 2025 Rankings" />

            <section className="relative bg-gradient-to-r from-emerald-800 to-teal-700 px-6 py-12">
                <div className="mx-auto max-w-7xl">
                    <div className="flex items-center gap-6">
                        <div className="flex-shrink-0">
                            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-lg">
                                <div className="text-center">
                                    <div className="text-xs font-bold text-emerald-800">2025</div>
                                    <div className="text-xs font-bold text-emerald-800">BEST</div>
                                    <div className="text-xs font-bold text-emerald-800">COLLEGES</div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h1 className="mb-2 text-3xl font-bold text-white md:text-4xl">Best Colleges in America</h1>
                            <p className="max-w-4xl text-lg text-emerald-100">
                                Find the right college for you. Search college reviews, rankings, and statistics.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Tabs Section (scrolls with page). "More" panel renders inline below to push content down. */}
            <section className="relative z-40 bg-white border-b border-gray-200 shadow-sm">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="flex items-center gap-1 overflow-x-auto overflow-y-visible scrollbar-hide">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => handleTabChange(tab.id)}
                                className={`whitespace-nowrap px-4 py-4 text-sm font-medium border-b-2 transition-colors ${
                                    activeTab === tab.id
                                        ? 'border-emerald-600 text-emerald-600'
                                        : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                                }`}
                            >
                                {tab.label}
                                {tab.count && <span className="ml-1.5 text-xs text-gray-500">({tab.count.toLocaleString()})</span>}
                            </button>
                        ))}
                        <div className="relative">
                            <button
                                aria-expanded={showMoreDropdown}
                                onClick={() => setShowMoreDropdown(!showMoreDropdown)}
                                className={`whitespace-nowrap px-4 py-4 text-sm font-medium border-b-2 transition-colors flex items-center gap-1 ${
                                    showMoreDropdown
                                        ? 'border-emerald-600 text-emerald-600'
                                        : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                                }`}
                            >
                                More <ChevronDown className={`h-4 w-4 transition-transform ${showMoreDropdown ? 'rotate-180' : ''}`} />
                            </button>
                            {showMoreDropdown && (
                                <div className="absolute top-full right-0 mt-1 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                                    {moreOptions.map((option) => (
                                        <button
                                            key={option.id}
                                            onClick={() => handleTabChange(option.id)}
                                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center justify-between"
                                        >
                                            <span>{option.label}</span>
                                            {option.count && <span className="text-xs text-gray-500">{option.count.toLocaleString()}</span>}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    
                </div>
            </section>

            <main className="bg-gray-50 px-6 py-8">
                <div className="mx-auto max-w-7xl">
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
                        <aside className={`lg:col-span-1 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                            <div className="bg-white rounded-lg border border-gray-200 p-4 sticky top-4">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-lg font-bold">Filters</h2>
                                    <button onClick={clearFilters} className="text-sm text-emerald-600 hover:text-emerald-700">Clear all</button>
                                </div>

                                <div className="mb-6">
                                    <h3 className="text-sm font-semibold mb-2 flex items-center gap-2"><DollarSign className="h-4 w-4" />Cost</h3>
                                    <select
                                        value={filters.cost || ''}
                                        onChange={(e) => handleFilterChange('cost', e.target.value)}
                                        className="w-full rounded border-gray-300 text-sm"
                                    >
                                        <option value="">Any Cost</option>
                                        <option value="under-10k">Under $10,000</option>
                                        <option value="10k-30k">$10,000 - $30,000</option>
                                        <option value="30k-50k">$30,000 - $50,000</option>
                                        <option value="over-50k">Over $50,000</option>
                                    </select>
                                </div>

                                <div className="mb-6">
                                    <h3 className="text-sm font-semibold mb-2 flex items-center gap-2"><GraduationCap className="h-4 w-4" />Programs</h3>
                                    <input
                                        type="text"
                                        placeholder="e.g., Engineering, Business"
                                        value={filters.programs || ''}
                                        onChange={(e) => handleFilterChange('programs', e.target.value)}
                                        className="w-full rounded border-gray-300 text-sm"
                                    />
                                </div>

                                <div className="mb-6">
                                    <h3 className="text-sm font-semibold mb-2 flex items-center gap-2"><MapPin className="h-4 w-4" />Location</h3>
                                    <input
                                        type="text"
                                        placeholder="State (e.g., CA, NY)"
                                        value={filters.location || ''}
                                        onChange={(e) => handleFilterChange('location', e.target.value)}
                                        className="w-full rounded border-gray-300 text-sm"
                                    />
                                </div>

                                <div className="mb-6">
                                    <h3 className="text-sm font-semibold mb-2">Format</h3>
                                    <select
                                        value={filters.online_campus || ''}
                                        onChange={(e) => handleFilterChange('online_campus', e.target.value)}
                                        className="w-full rounded border-gray-300 text-sm"
                                    >
                                        <option value="">Any Format</option>
                                        <option value="campus">On Campus</option>
                                        <option value="online">Online</option>
                                    </select>
                                </div>

                                <div className="mb-6">
                                    <h3 className="text-sm font-semibold mb-2">Type</h3>
                                    <select
                                        value={filters.type || ''}
                                        onChange={(e) => handleFilterChange('type', e.target.value)}
                                        className="w-full rounded border-gray-300 text-sm"
                                    >
                                        <option value="">All Types</option>
                                        <option value="Public">Public</option>
                                        <option value="Private">Private</option>
                                    </select>
                                </div>
                            </div>
                        </aside>

                        <section className="lg:col-span-3">
                            <div className="mb-6">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="relative flex-1">
                                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                        <input
                                            type="text"
                                            placeholder="Search universities by name, location, or program..."
                                            defaultValue={filters.search || ''}
                                            autoComplete="off"
                                            onBlur={(e) => handleFilterChange('search', e.target.value)}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    handleFilterChange('search', (e.target as HTMLInputElement).value);
                                                }
                                            }}
                                            className="w-full pl-12 pr-4 py-4 rounded-xl border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 text-base"
                                        />
                                    </div>
                                    <button onClick={() => setShowFilters(!showFilters)} className="lg:hidden bg-white border border-gray-300 px-4 py-3 rounded-lg text-sm font-medium">
                                        Filters
                                    </button>
                                </div>

                                <div className="flex items-center justify-between">
                                    <p className="text-sm text-gray-600">{from}-{to} of {total} results</p>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-medium text-gray-700">View:</span>
                                        <div className="flex rounded-lg border border-gray-200 bg-white p-1">
                                            <button
                                                onClick={() => setViewMode('grid')}
                                                className={`rounded px-3 py-1.5 text-sm flex items-center gap-1 ${viewMode === 'grid' ? 'bg-emerald-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                                            >
                                                <Grid className="h-4 w-4" /> Grid
                                            </button>
                                            <button
                                                onClick={() => setViewMode('list')}
                                                className={`rounded px-3 py-1.5 text-sm flex items-center gap-1 ${viewMode === 'list' ? 'bg-emerald-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                                            >
                                                <List className="h-4 w-4" /> List
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-4' : 'space-y-4'}>
                                {mixedResults.map((item, idx) => (
                                    item.type === 'sponsored' ? (
                                        <SponsoredCard key={`sponsored-${item.data.id}`} ad={item.data} />
                                    ) : (
                                        <UniversityCard key={item.data.id} uni={item.data} index={item.index} />
                                    )
                                ))}
                            </div>

                            {universities.links && universities.links.length > 3 && (
                                <div className="mt-8 flex justify-center gap-2 flex-wrap">
                                    {universities.links.map((link: any, index: number) => (
                                        <Link
                                            key={index}
                                            href={link.url || '#'}
                                            className={`rounded px-4 py-2 border ${link.active ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'} ${!link.url && 'opacity-50 pointer-events-none'}`}
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

UniversitiesIndex.layout = (page: ReactNode) => <PublicLayout>{page}</PublicLayout>;
