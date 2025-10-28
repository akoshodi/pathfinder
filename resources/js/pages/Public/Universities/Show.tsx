import { Head, Link } from '@inertiajs/react';

interface UniversityProps {
    university: {
        id: number;
        name: string;
        slug: string;
        description?: string | null;
        logo?: string | null;
        cover_image?: string | null;
        location?: string | null;
        city?: string | null;
        state?: string | null;
        country?: string | null;
        type?: string | null;
        ranking?: number | null;
        acceptance_rate?: string | null;
        students_count?: number | null;
        tuition?: string | null;
        graduation_rate?: number | null;
        retention_rate?: number | null;
        campus_setting?: string | null;
        programs?: string[] | null;
        majors?: string[] | null;
        facilities?: string[] | null;
        athletics?: string[] | null;
        stats?: Record<string, any> | null;
        website?: string | null;
        phone?: string | null;
        is_partner?: boolean;
        alumni_associations?: any[];
        courses?: any[];
    };
}

export default function UniversityShow({ university }: UniversityProps) {
    return (
        <>
            <Head title={university.name} />

            <section className="relative bg-gradient-to-r from-emerald-800 to-teal-700 py-10">
                <div className="mx-auto max-w-7xl px-4 text-white sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold md:text-4xl">
                        {university.name}
                    </h1>
                    <p className="mt-1 text-emerald-100">
                        {university.city}
                        {university.state ? `, ${university.state}` : ''}{' '}
                        {university.country ? `• ${university.country}` : ''}
                    </p>
                </div>
            </section>

            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    <div className="space-y-6 lg:col-span-2">
                        {university.description && (
                            <div className="rounded-lg border border-gray-200 bg-white p-6">
                                <h2 className="mb-2 text-lg font-semibold">
                                    About
                                </h2>
                                <p className="leading-relaxed text-gray-700">
                                    {university.description}
                                </p>
                            </div>
                        )}

                        <div className="rounded-lg border border-gray-200 bg-white p-6">
                            <h2 className="mb-4 text-lg font-semibold">
                                At a glance
                            </h2>
                            <dl className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
                                {university.ranking != null && (
                                    <div className="flex justify-between">
                                        <dt className="text-gray-600">
                                            Ranking
                                        </dt>
                                        <dd className="font-medium">
                                            #{university.ranking}
                                        </dd>
                                    </div>
                                )}
                                {university.type && (
                                    <div className="flex justify-between">
                                        <dt className="text-gray-600">Type</dt>
                                        <dd className="font-medium">
                                            {university.type}
                                        </dd>
                                    </div>
                                )}
                                {university.students_count != null && (
                                    <div className="flex justify-between">
                                        <dt className="text-gray-600">
                                            Students
                                        </dt>
                                        <dd className="font-medium">
                                            {university.students_count.toLocaleString()}
                                        </dd>
                                    </div>
                                )}
                                {university.acceptance_rate && (
                                    <div className="flex justify-between">
                                        <dt className="text-gray-600">
                                            Acceptance
                                        </dt>
                                        <dd className="font-medium">
                                            {university.acceptance_rate}
                                        </dd>
                                    </div>
                                )}
                                {university.tuition && (
                                    <div className="flex justify-between">
                                        <dt className="text-gray-600">
                                            Tuition
                                        </dt>
                                        <dd className="font-medium">
                                            {university.tuition}
                                        </dd>
                                    </div>
                                )}
                            </dl>
                        </div>
                    </div>
                    <aside className="space-y-6">
                        <div className="rounded-lg border border-gray-200 bg-white p-6">
                            <h3 className="mb-3 text-sm font-semibold text-gray-800">
                                Quick links
                            </h3>
                            <ul className="space-y-2 text-sm">
                                <li>
                                    <a
                                        href={university.website ?? '#'}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-emerald-700 hover:underline"
                                    >
                                        Official website
                                    </a>
                                </li>
                                <li>
                                    <Link
                                        href="/universities"
                                        className="text-emerald-700 hover:underline"
                                    >
                                        Back to list
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </aside>
                </div>
            </main>
        </>
    );
}
