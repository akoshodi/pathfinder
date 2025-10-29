import { Head, Link, router } from '@inertiajs/react';
import { type ReactNode, useState } from 'react';
import PublicLayout from '@/layouts/public-layout';

interface Company {
    id: number;
    name: string;
    slug: string;
    logo: string | null;
}

interface Career {
    id: number;
    title: string;
    slug: string;
    type: string;
    description: string;
    location: string;
    experience_level: string;
    salary_range: string | null;
    is_remote: boolean;
    posted_at: string;
    company: Company;
}

interface Props {
    careers: {
        data: Career[];
        links: any[];
        meta: any;
    };
    filters: {
        search?: string;
        type?: string;
        experience_level?: string;
        is_remote?: boolean;
    };
}

export default function CareersIndex({ careers, filters }: Props) {
    const [search, setSearch] = useState(filters.search || '');
    const [selectedType, setSelectedType] = useState(filters.type || 'all');
    const [selectedLevel, setSelectedLevel] = useState(filters.experience_level || 'all');
    const [remoteOnly, setRemoteOnly] = useState(filters.is_remote || false);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        applyFilters();
    };

    const applyFilters = () => {
        router.get(
            '/careers',
            {
                search,
                type: selectedType !== 'all' ? selectedType : undefined,
                experience_level: selectedLevel !== 'all' ? selectedLevel : undefined,
                is_remote: remoteOnly || undefined,
            },
            { preserveState: true }
        );
    };

    const types = ['all', 'Full-time', 'Part-time', 'Internship', 'Co-op', 'Contract'];
    const levels = ['all', 'Entry Level', 'Mid Level', 'Senior Level', 'Lead', 'Executive'];

    return (
        <>
            <Head title="Careers" />

            {/* Hero Section */}
            <section className="bg-gradient-to-r from-emerald-800 to-teal-700 text-white py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-4xl font-bold mb-4">Career Opportunities</h1>
                    <p className="text-lg text-emerald-100">
                        Discover your next career move with leading companies
                    </p>
                </div>
            </section>

            {/* Search and Filter Section */}
            <section className="bg-white border-b border-gray-200 py-6 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto space-y-4">
                    <form onSubmit={handleSearch}>
                        <div className="relative">
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search by job title, skills, or company..."
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

                    <div className="space-y-3">
                        <div>
                            <span className="text-sm font-semibold text-gray-700 block mb-2">Job Type:</span>
                            <div className="flex flex-wrap gap-2">
                                {types.map((type) => (
                                    <button
                                        key={type}
                                        onClick={() => {
                                            setSelectedType(type);
                                            setTimeout(applyFilters, 0);
                                        }}
                                        className={`px-4 py-2 rounded-lg transition-colors ${
                                            selectedType === type
                                                ? 'bg-emerald-600 text-white'
                                                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                                        }`}
                                    >
                                        {type.charAt(0).toUpperCase() + type.slice(1)}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <span className="text-sm font-semibold text-gray-700 block mb-2">Experience Level:</span>
                            <div className="flex flex-wrap gap-2">
                                {levels.map((level) => (
                                    <button
                                        key={level}
                                        onClick={() => {
                                            setSelectedLevel(level);
                                            setTimeout(applyFilters, 0);
                                        }}
                                        className={`px-4 py-2 rounded-lg transition-colors ${
                                            selectedLevel === level
                                                ? 'bg-emerald-600 text-white'
                                                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                                        }`}
                                    >
                                        {level.charAt(0).toUpperCase() + level.slice(1)}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={remoteOnly}
                                    onChange={(e) => {
                                        setRemoteOnly(e.target.checked);
                                        setTimeout(applyFilters, 0);
                                    }}
                                    className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                                />
                                <span className="ml-2 text-sm font-medium text-gray-700">Remote positions only</span>
                            </label>
                        </div>
                    </div>
                </div>
            </section>

            {/* Jobs List */}
            <main className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-4 text-sm text-gray-600">
                        Showing {careers.data.length} of {careers.meta?.total || 0} opportunities
                    </div>

                    <div className="space-y-4">
                        {careers.data.map((career) => (
                            <Link
                                key={career.id}
                                href={`/careers/${career.slug}`}
                                className="block bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6"
                            >
                                <div className="flex items-start gap-4">
                                    {/* Company Logo */}
                                    <div className="flex-shrink-0">
                                        {career.company.logo ? (
                                            <img
                                                src={career.company.logo}
                                                alt={career.company.name}
                                                className="w-16 h-16 object-cover rounded"
                                            />
                                        ) : (
                                            <div className="w-16 h-16 bg-emerald-100 rounded flex items-center justify-center text-xl text-emerald-700 font-bold">
                                                {career.company.name.charAt(0)}
                                            </div>
                                        )}
                                    </div>

                                    {/* Job Details */}
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-xl font-bold text-gray-900 mb-1">{career.title}</h3>
                                        <p className="text-gray-600 mb-3">{career.company.name}</p>

                                        <div className="flex flex-wrap gap-2 mb-3">
                                            <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-sm rounded-full">
                                                {career.type}
                                            </span>
                                            <span className="px-3 py-1 bg-emerald-50 text-emerald-800 text-sm rounded-full">
                                                {career.experience_level}
                                            </span>
                                            {career.is_remote && (
                                                <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                                                    Remote
                                                </span>
                                            )}
                                            <span className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full flex items-center">
                                                <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                                {career.location}
                                            </span>
                                        </div>

                                        <p className="text-gray-700 line-clamp-2 mb-3">{career.description}</p>

                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-gray-500">Posted {career.posted_at}</span>
                                            {career.salary_range && (
                                                <span className="font-semibold text-emerald-700">
                                                    {career.salary_range}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Pagination */}
                    {careers.links && (
                        <div className="mt-8 flex justify-center gap-2">
                            {careers.links.map((link: any, index: number) => (
                                <Link
                                    key={index}
                                    href={link.url || '#'}
                                    className={`px-4 py-2 rounded ${
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
CareersIndex.layout = (page: ReactNode) => <PublicLayout>{page}</PublicLayout>;
