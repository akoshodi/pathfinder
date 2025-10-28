import { UniversityFilters } from '@/components/UniversityFilters';
import { UniversityGrid } from '@/components/UniversityGrid';
import { UniversitySearch } from '@/components/UniversitySearch';

import { Head, Link } from '@inertiajs/react';
import { useMemo, useState } from 'react';

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
}

interface Props {
    universities: {
        data: University[];
        links: any[];
        meta: any;
    };
    filters: {
        search?: string;
        type?: string;
        is_featured?: boolean;
    };
}

export default function UniversitiesIndex({ universities, filters }: Props) {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
    const [activeTab, setActiveTab] = useState<
        | 'best-colleges'
        | 'direct-admissions'
        | 'college-quiz'
        | 'best-value'
        | 'student-life'
    >('best-colleges');

    const tabs = useMemo(
        () =>
            [
                { id: 'best-colleges', label: 'Best colleges' },
                { id: 'direct-admissions', label: 'Direct Admissions' },
                { id: 'college-quiz', label: 'College Quiz' },
                { id: 'best-value', label: 'Best Value & Most Affordable' },
                { id: 'student-life', label: 'Best student life' },
            ] as const,
        [],
    );

    const from =
        universities?.meta?.from ?? (universities.data.length > 0 ? 1 : 0);
    const to = universities?.meta?.to ?? universities.data.length;
    const total = universities?.meta?.total ?? universities.data.length;

    return (
        <>
            <Head title="Universities" />

            {/* Hero Section */}
            <section className="relative bg-gradient-to-r from-emerald-800 to-teal-700 px-4 py-12 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    <div className="flex items-center gap-6">
                        <div className="flex-shrink-0">
                            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-lg">
                                <div className="text-center">
                                    <div className="text-xs font-bold text-emerald-800">
                                        2025
                                    </div>
                                    <div className="text-xs font-bold text-emerald-800">
                                        BEST
                                    </div>
                                    <div className="text-xs font-bold text-emerald-800">
                                        COLLEGES
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h1 className="mb-2 text-3xl font-bold text-white md:text-4xl">
                                Colleges in America
                            </h1>
                            <p className="max-w-4xl text-lg leading-relaxed text-emerald-100">
                                Find the right college for you. Search college
                                reviews, rankings, and statistics. This year's
                                rankings include an Economic Mobility Index,
                                measuring change in economic status for diverse
                                students. Standardized test scores are
                                de-emphasized to reflect evolving admissions
                                practices.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Tabs */}
            <div className="overflow-x-auto border-b border-gray-200 bg-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex space-x-8">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`border-b-2 px-1 py-4 text-sm font-medium whitespace-nowrap transition-colors ${
                                    activeTab === tab.id
                                        ? 'border-emerald-500 text-emerald-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700'
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Content */}
            <main className="bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    {activeTab === 'best-colleges' ? (
                        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
                            <aside className="lg:col-span-1">
                                <UniversityFilters filters={filters} />
                            </aside>

                            <section className="lg:col-span-3">
                                <div className="mb-6">
                                    <UniversitySearch filters={filters} />

                                    <div className="flex items-center justify-between">
                                        <p className="text-sm text-gray-600">
                                            {from}-{to} of {total} results
                                        </p>
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-medium text-gray-700">
                                                View:
                                            </span>
                                            <div className="flex rounded-lg border border-gray-200 bg-white p-1">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setViewMode('grid')
                                                    }
                                                    className={`rounded px-3 py-1.5 text-sm ${
                                                        viewMode === 'grid'
                                                            ? 'bg-emerald-600 text-white'
                                                            : 'text-gray-600 hover:bg-gray-50'
                                                    }`}
                                                >
                                                    Grid
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setViewMode('list')
                                                    }
                                                    className={`rounded px-3 py-1.5 text-sm ${
                                                        viewMode === 'list'
                                                            ? 'bg-emerald-600 text-white'
                                                            : 'text-gray-600 hover:bg-gray-50'
                                                    }`}
                                                >
                                                    List
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <UniversityGrid
                                    universities={universities.data}
                                    viewMode={viewMode}
                                />

                                {/* Pagination */}
                                {universities.links && (
                                    <div className="mt-8 flex justify-center gap-2">
                                        {universities.links.map(
                                            (link: any, index: number) => (
                                                <Link
                                                    key={index}
                                                    href={link.url || '#'}
                                                    className={`rounded px-4 py-2 ${
                                                        link.active
                                                            ? 'bg-emerald-600 text-white'
                                                            : 'bg-white text-gray-700 hover:bg-gray-100'
                                                    }`}
                                                    dangerouslySetInnerHTML={{
                                                        __html: link.label,
                                                    }}
                                                />
                                            ),
                                        )}
                                    </div>
                                )}
                            </section>
                        </div>
                    ) : (
                        // Placeholder content for non-primary tabs to mirror layout
                        <div className="mx-auto max-w-4xl rounded-lg border border-gray-200 bg-white p-6 text-gray-700">
                            <h2 className="mb-2 text-xl font-semibold">
                                {tabs.find((t) => t.id === activeTab)?.label}
                            </h2>
                            <p>
                                This section is coming soon in the Inertia app.
                                In the meantime, explore "Best colleges" for
                                search, filters, and results. If you want me to
                                implement this tab now, tell me what data and
                                actions you need.
                            </p>
                        </div>
                    )}
                </div>
            </main>
        </>
    );
}
