import { Link } from '@inertiajs/react';

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
    universities: University[];
    viewMode: 'grid' | 'list';
}

export function UniversityGrid({ universities, viewMode }: Props) {
    return viewMode === 'grid' ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {universities.map((university) => (
                <Link
                    key={university.id}
                    href={`/universities/${university.slug}`}
                    className="overflow-hidden rounded-lg bg-white shadow transition-shadow hover:shadow-lg"
                >
                    <div className="p-6">
                        <div className="mb-4 flex items-start gap-4">
                            {university.logo && (
                                <img
                                    src={university.logo}
                                    alt={university.name}
                                    className="h-16 w-16 rounded object-cover"
                                />
                            )}
                            <div className="flex-1">
                                <h3 className="text-lg font-bold text-gray-900">
                                    {university.name}
                                </h3>
                                <p className="text-sm text-gray-600">
                                    {university.city}, {university.state}
                                </p>
                            </div>
                        </div>

                        <div className="space-y-2 text-sm">
                            {university.ranking && (
                                <div className="flex justify-between">
                                    <span className="text-gray-600">
                                        Ranking:
                                    </span>
                                    <span className="font-semibold">
                                        #{university.ranking}
                                    </span>
                                </div>
                            )}
                            {university.type && (
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Type:</span>
                                    <span className="font-semibold">
                                        {university.type}
                                    </span>
                                </div>
                            )}
                            {university.students_count && (
                                <div className="flex justify-between">
                                    <span className="text-gray-600">
                                        Students:
                                    </span>
                                    <span className="font-semibold">
                                        {university.students_count.toLocaleString()}
                                    </span>
                                </div>
                            )}
                        </div>

                        {university.is_partner && (
                            <div className="mt-4">
                                <span className="inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-800">
                                    Partner School
                                </span>
                            </div>
                        )}
                    </div>
                </Link>
            ))}
        </div>
    ) : (
        <div className="space-y-4">
            {universities.map((university) => (
                <Link
                    key={university.id}
                    href={`/universities/${university.slug}`}
                    className="overflow-hidden rounded-lg border border-gray-200 bg-white transition-colors hover:border-emerald-200"
                >
                    <div className="flex items-start gap-4 p-6">
                        {university.logo && (
                            <img
                                src={university.logo}
                                alt={university.name}
                                className="h-16 w-16 rounded object-cover"
                            />
                        )}
                        <div className="flex-1">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        {university.name}
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        {university.city}, {university.state} •{' '}
                                        {university.type}
                                    </p>
                                </div>
                                {university.ranking && (
                                    <div className="text-sm text-gray-700">
                                        Ranking:{' '}
                                        <span className="font-semibold">
                                            #{university.ranking}
                                        </span>
                                    </div>
                                )}
                            </div>

                            <div className="mt-3 grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">
                                {university.students_count && (
                                    <div className="text-gray-700">
                                        Students:{' '}
                                        <span className="font-semibold">
                                            {university.students_count.toLocaleString()}
                                        </span>
                                    </div>
                                )}
                                {university.acceptance_rate && (
                                    <div className="text-gray-700">
                                        Acceptance:{' '}
                                        <span className="font-semibold">
                                            {university.acceptance_rate}
                                        </span>
                                    </div>
                                )}
                                {university.tuition && (
                                    <div className="text-gray-700">
                                        Tuition:{' '}
                                        <span className="font-semibold">
                                            {university.tuition}
                                        </span>
                                    </div>
                                )}
                            </div>

                            {university.is_partner && (
                                <div className="mt-3">
                                    <span className="inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-800">
                                        Partner School
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}
