import { Head, Link, router } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Trophy, GraduationCap, DollarSign, Users, Award } from 'lucide-react';

interface ComparisonItem {
    id: number;
    comparable_type: string;
    comparable_id: number;
    position: number;
    comparable: {
        id: number;
        name?: string;
        slug: string;
        description?: string;
        logo?: string | null;
        location?: string;
        type?: string;
        [key: string]: any;
    };
}

interface Props {
    comparisonItems: ComparisonItem[];
    isPublic?: boolean;
}

export default function ComparisonIndex({ comparisonItems, isPublic = false }: Props) {
    const [selectedType, setSelectedType] = useState<string | null>(null);

    const handleRemove = (itemId: number) => {
        if (confirm('Remove this item from comparison?')) {
            router.delete(`/comparison/${itemId}`);
        }
    };

    const getItemType = (type: string) => {
        return (type || '').split('\\').pop() || type;
    };

    const groupedItems = comparisonItems.reduce((acc, item) => {
        const type = getItemType(item.comparable_type);
        if (!acc[type]) acc[type] = [];
        acc[type].push(item);
        return acc;
    }, {} as Record<string, ComparisonItem[]>);

    const itemTypes = Object.keys(groupedItems);
    const activeType = selectedType || itemTypes[0];
    const activeItems = activeType ? groupedItems[activeType] || [] : [];

    // Comparison attributes based on type
    const sections = useMemo(() => {
        if (activeType === 'University') {
            return [
                {
                    title: 'Overview',
                    rows: [
                        { label: 'Location', key: 'location' },
                        { label: 'Type', key: 'type' },
                        { label: 'Ranking', key: 'ranking' },
                    ],
                },
                {
                    title: 'Admissions',
                    rows: [
                        { label: 'Acceptance Rate', key: 'acceptance_rate' },
                        { label: 'Graduation Rate', key: 'graduation_rate' },
                        { label: 'Retention Rate', key: 'retention_rate' },
                    ],
                },
                {
                    title: 'Cost',
                    rows: [
                        { label: 'Tuition', key: 'tuition' },
                    ],
                },
                {
                    title: 'Student Body',
                    rows: [
                        { label: 'Total Students', key: 'students_count' },
                        { label: 'Campus Setting', key: 'campus_setting' },
                    ],
                },
            ];
        }
        if (activeType === 'Company') {
            return [
                {
                    title: 'Overview',
                    rows: [
                        { label: 'Location', key: 'location' },
                        { label: 'Category', key: 'category' },
                    ],
                },
                {
                    title: 'Workforce',
                    rows: [
                        { label: 'Employees', key: 'employees' },
                        { label: 'Open Jobs', key: 'jobs_count' },
                        { label: 'Internships', key: 'internships_count' },
                    ],
                },
            ];
        }
        return [];
    }, [activeType]);

    // Resolve correct base path for comparable types (handle irregular plurals)
    const pathForType = (type: string): string => {
        const t = (type || '').toLowerCase();
        if (t === 'university') {
            return 'universities';
        }
        if (t === 'company') {
            return 'companies';
        }
        return `${t}s`;
    };

    return (
        <AppLayout>
            <Head title="Compare" />

            {/* Hero Section */}
            <section className="bg-gradient-to-r from-teal-600 to-teal-700 text-white py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-4xl font-bold mb-4">Compare</h1>
                    <p className="text-lg text-teal-100">
                        Side-by-side comparison of universities and companies to make informed decisions
                    </p>
                </div>
            </section>

            <main className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    {comparisonItems.length === 0 ? (
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
                                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                />
                            </svg>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">No items to compare</h3>
                            <p className="text-gray-600 mb-6">
                                Add universities or companies to compare them side-by-side
                            </p>
                            <div className="flex flex-wrap gap-3 justify-center">
                                <Link
                                    href="/universities"
                                    className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                                >
                                    Browse Universities
                                </Link>
                                <Link
                                    href="/companies"
                                    className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                                >
                                    Browse Companies
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {/* Type Selector */}
                            {itemTypes.length > 1 && (
                                <div className="bg-white rounded-lg shadow p-4">
                                    <div className="flex flex-wrap gap-2">
                                        {itemTypes.map((type) => (
                                            <button
                                                key={type}
                                                onClick={() => setSelectedType(type)}
                                                className={`px-6 py-2 rounded-lg transition-colors font-semibold ${
                                                    activeType === type
                                                        ? 'bg-teal-600 text-white'
                                                        : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                                                }`}
                                            >
                                                Compare {type}s ({groupedItems[type].length})
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Summary Cards */}
                            {activeItems.length > 0 && (
                                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                    {activeItems.map((item) => (
                                        <div key={item.id} className="rounded-lg border bg-white p-4 shadow-sm">
                                            <div className="flex items-center gap-3">
                                                {item.comparable.logo ? (
                                                    <img src={item.comparable.logo} alt={item.comparable.name} className="h-10 w-10 rounded object-cover" />
                                                ) : (
                                                    <div className="flex h-10 w-10 items-center justify-center rounded bg-gray-100 text-lg font-semibold">
                                                        {item.comparable.name?.charAt(0)}
                                                    </div>
                                                )}
                                                <div className="min-w-0">
                                                    <div className="truncate font-semibold text-gray-900">{item.comparable.name}</div>
                                                    {activeType === 'University' && (
                                                        <div className="text-xs text-gray-600">Rank #{item.comparable.ranking ?? '—'}</div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="mt-3 grid grid-cols-3 gap-3 text-sm">
                                                {activeType === 'University' && (
                                                    <>
                                                        <div className="rounded bg-gray-50 p-2">
                                                            <div className="flex items-center gap-1 text-gray-500"><Award className="h-3 w-3" /> Acceptance</div>
                                                            <div className="font-medium">{item.comparable.acceptance_rate ?? '—'}</div>
                                                        </div>
                                                        <div className="rounded bg-gray-50 p-2">
                                                            <div className="flex items-center gap-1 text-gray-500"><DollarSign className="h-3 w-3" /> Tuition</div>
                                                            <div className="font-medium">{item.comparable.tuition ?? '—'}</div>
                                                        </div>
                                                        <div className="rounded bg-gray-50 p-2">
                                                            <div className="flex items-center gap-1 text-gray-500"><Users className="h-3 w-3" /> Students</div>
                                                            <div className="font-medium">{item.comparable.students_count ?? '—'}</div>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Comparison Table */}
                            <div className="bg-white rounded-lg shadow overflow-hidden mt-6">
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead className="bg-teal-600 text-white">
                                            <tr>
                                                <th className="px-6 py-4 text-left font-semibold">Attribute</th>
                                                {activeItems.map((item) => (
                                                    <th key={item.id} className="px-6 py-4 text-left font-semibold min-w-[250px]">
                                                        <div className="flex items-center gap-3">
                                                            {item.comparable.logo ? (
                                                                <img
                                                                    src={item.comparable.logo}
                                                                    alt={item.comparable.name}
                                                                    className="w-10 h-10 object-cover rounded"
                                                                />
                                                            ) : (
                                                                <div className="w-10 h-10 bg-white/20 rounded flex items-center justify-center text-lg">
                                                                    {item.comparable.name?.charAt(0)}
                                                                </div>
                                                            )}
                                                            <div>
                                                                <div className="font-semibold">{item.comparable.name}</div>
                                                                {!isPublic && (
                                                                    <button
                                                                        onClick={() => handleRemove(item.id)}
                                                                        className="text-xs text-white/80 hover:text-white"
                                                                    >
                                                                        Remove
                                                                    </button>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            {sections.map((section, si) => (
                                                <>
                                                    <tr key={`section-${si}`} className="bg-gray-100">
                                                        <td colSpan={1 + activeItems.length} className="px-6 py-3 text-sm font-semibold text-gray-700">
                                                            {section.title}
                                                        </td>
                                                    </tr>
                                                    {section.rows.map((row, ri) => (
                                                        <tr key={`${section.title}-${row.key}`} className={ri % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                                            <td className="px-6 py-4 font-semibold text-gray-900">{row.label}</td>
                                                            {activeItems.map((item) => (
                                                                <td key={item.id} className="px-6 py-4 text-gray-700">
                                                                    {item.comparable[row.key] ?? 'N/A'}
                                                                </td>
                                                            ))}
                                                        </tr>
                                                    ))}
                                                </>
                                            ))}
                                            <tr className="bg-white">
                                                <td className="px-6 py-4 font-semibold text-gray-900">Description</td>
                                                {activeItems.map((item) => (
                                                    <td key={item.id} className="px-6 py-4 text-gray-700 text-sm">
                                                        {item.comparable.description || 'No description available'}
                                                    </td>
                                                ))}
                                            </tr>
                                            <tr className="bg-gray-50">
                                                <td className="px-6 py-4 font-semibold text-gray-900">View Details</td>
                                                {activeItems.map((item) => (
                                                    <td key={item.id} className="px-6 py-4">
                                                        <Link
                                                            href={`/${pathForType(activeType)}/${item.comparable.slug}`}
                                                            className="text-teal-600 hover:text-teal-700 font-semibold"
                                                        >
                                                            View Full Profile →
                                                        </Link>
                                                    </td>
                                                ))}
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Add More */}
                            <div className="bg-white rounded-lg shadow p-6 text-center">
                                <p className="text-gray-600 mb-4">Want to add more {activeType}s to compare?</p>
                                <Link
                                    href={`/${pathForType(activeType)}`}
                                    className="inline-block px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-semibold"
                                >
                                    Browse {activeType}s
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </AppLayout>
    );
}
