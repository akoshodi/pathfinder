import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { type ReactNode } from 'react';
import PublicLayout from '@/layouts/public-layout';

interface User {
    id: number;
    name: string;
    avatar: string | null;
    current_position: string | null;
    company: string | null;
    university: string | null;
    major: string | null;
    graduation_year: number | null;
    location: string | null;
    bio: string | null;
}

interface Props {
    alumni: User[];
    filters: {
        search?: string;
        university?: string;
        major?: string;
        company?: string;
    };
}

export default function AlumniNetwork({ alumni, filters }: Props) {
    const [search, setSearch] = useState(filters.search || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/alumni/network', { search }, { preserveState: true });
    };

    return (
        <>
            <Head title="Alumni Network" />

            {/* Hero Section */}
            <section className="bg-gradient-to-r from-amber-600 to-amber-700 text-white py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-4xl font-bold mb-4">Alumni Network</h1>
                    <p className="text-lg text-amber-100">
                        Connect with fellow alumni, expand your professional network, and discover opportunities
                    </p>
                </div>
            </section>

            {/* Quick Links */}
            <section className="bg-white border-b border-gray-200 py-6 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto flex flex-wrap gap-4 justify-center">
                    <Link
                        href="/alumni"
                        className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
                    >
                        Alumni Associations
                    </Link>
                    <Link
                        href="/alumni/mentorship"
                        className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
                    >
                        Mentorship Program
                    </Link>
                </div>
            </section>

            {/* Search Section */}
            <section className="bg-white border-b border-gray-200 py-6 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <form onSubmit={handleSearch}>
                        <div className="relative">
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search alumni by name, company, university, or major..."
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
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
                </div>
            </section>

            {/* Alumni Grid */}
            <main className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-6 text-sm text-gray-600">
                        Showing {alumni.length} alumni members
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {alumni.map((person) => (
                            <div key={person.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6">
                                {/* Profile Header */}
                                <div className="flex items-start gap-4 mb-4">
                                    {person.avatar ? (
                                        <img
                                            src={person.avatar}
                                            alt={person.name}
                                            className="w-16 h-16 rounded-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center text-2xl text-amber-600 font-bold">
                                            {person.name.charAt(0)}
                                        </div>
                                    )}
                                    <div className="flex-1">
                                        <h3 className="font-bold text-lg text-gray-900">{person.name}</h3>
                                        {person.current_position && (
                                            <p className="text-sm text-gray-600">{person.current_position}</p>
                                        )}
                                        {person.company && (
                                            <p className="text-sm text-amber-600 font-medium">{person.company}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Education Info */}
                                {person.university && (
                                    <div className="mb-4 pb-4 border-b border-gray-200">
                                        <div className="text-sm text-gray-600 mb-1">
                                            <span className="font-semibold text-gray-900">{person.university}</span>
                                        </div>
                                        {person.major && (
                                            <div className="text-sm text-gray-600">
                                                {person.major}
                                                {person.graduation_year && ` • Class of ${person.graduation_year}`}
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Location */}
                                {person.location && (
                                    <div className="flex items-center text-sm text-gray-600 mb-4">
                                        <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path
                                                fillRule="evenodd"
                                                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        {person.location}
                                    </div>
                                )}

                                {/* Bio */}
                                {person.bio && (
                                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">{person.bio}</p>
                                )}

                                {/* Action Button */}
                                <button className="w-full px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors font-medium text-sm">
                                    Connect
                                </button>
                            </div>
                        ))}
                    </div>

                    {alumni.length === 0 && (
                        <div className="text-center py-12">
                            <svg
                                className="mx-auto h-12 w-12 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                />
                            </svg>
                            <h3 className="mt-2 text-sm font-medium text-gray-900">No alumni found</h3>
                            <p className="mt-1 text-sm text-gray-500">Try adjusting your search criteria.</p>
                        </div>
                    )}
                </div>
            </main>
        </>
    );
}

// Use the public layout (no admin sidebar) for this public-facing page
AlumniNetwork.layout = (page: ReactNode) => <PublicLayout>{page}</PublicLayout>;
