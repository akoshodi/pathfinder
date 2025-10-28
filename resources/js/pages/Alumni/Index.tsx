import { Head, Link } from '@inertiajs/react';
import { type ReactNode } from 'react';
import PublicLayout from '@/layouts/public-layout';

interface University {
    id: number;
    name: string;
    slug: string;
    logo: string | null;
    location: string;
}

interface AlumniAssociation {
    id: number;
    name: string;
    description: string;
    logo: string | null;
    members_count: number;
    website: string | null;
    email: string | null;
    features: string[] | null;
    university: University;
}

interface Pagination<T> {
    data: T[];
    links?: any[];
    meta?: any;
}

interface Props {
    associations: Pagination<AlumniAssociation>;
}

export default function AlumniIndex({ associations }: Props) {
    return (
        <>
            <Head title="Alumni Associations" />

            {/* Hero Section */}
            <section className="bg-gradient-to-r from-amber-600 to-amber-700 text-white py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-4xl font-bold mb-4">Alumni Associations</h1>
                    <p className="text-lg text-amber-100">
                        Connect with alumni networks and advance your career through mentorship and networking
                    </p>
                </div>
            </section>

            {/* Quick Links */}
            <section className="bg-white border-b border-gray-200 py-6 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto flex flex-wrap gap-4 justify-center">
                    <Link
                        href="/alumni/network"
                        className="px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors font-semibold"
                    >
                        Alumni Network
                    </Link>
                    <Link
                        href="/alumni/mentorship"
                        className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
                    >
                        Mentorship Program
                    </Link>
                </div>
            </section>

            {/* Associations Grid */}
            <main className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900">Featured Alumni Associations</h2>
                        <p className="text-gray-600 mt-2">
                            Join alumni associations to stay connected with your university community
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {associations.data.map((association) => (
                            <div key={association.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
                                <div className="p-6">
                                    {/* Logo */}
                                    <div className="flex items-start gap-4 mb-4">
                                        {association.logo ? (
                                            <img
                                                src={association.logo}
                                                alt={association.name}
                                                className="w-16 h-16 object-cover rounded"
                                            />
                                        ) : (
                                            <div className="w-16 h-16 bg-amber-100 rounded flex items-center justify-center text-2xl text-amber-600 font-bold">
                                                {association.name.charAt(0)}
                                            </div>
                                        )}
                                        <div className="flex-1">
                                            <h3 className="font-bold text-lg text-gray-900 mb-1">
                                                {association.name}
                                            </h3>
                                            <Link
                                                href={`/universities/${association.university.slug}`}
                                                className="text-sm text-amber-600 hover:text-amber-700"
                                            >
                                                {association.university.name}
                                            </Link>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                                        {association.description}
                                    </p>

                                    {/* Members Count */}
                                    <div className="flex items-center text-sm text-gray-600 mb-4">
                                        <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                                        </svg>
                                        {association.members_count.toLocaleString()} members
                                    </div>

                                    {/* Features */}
                                    {association.features && association.features.length > 0 && (
                                        <div className="mb-4">
                                            <h4 className="text-sm font-semibold text-gray-900 mb-2">Benefits:</h4>
                                            <ul className="space-y-1">
                                                {association.features.slice(0, 3).map((feature, index) => (
                                                    <li key={index} className="flex items-start text-sm text-gray-600">
                                                        <svg
                                                            className="h-4 w-4 text-amber-600 mr-2 flex-shrink-0 mt-0.5"
                                                            fill="currentColor"
                                                            viewBox="0 0 20 20"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>
                                                        {feature}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {/* Contact */}
                                    <div className="pt-4 border-t border-gray-200 flex flex-wrap gap-2">
                                        {association.website && (
                                            <a
                                                href={association.website}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex-1 px-4 py-2 bg-amber-600 text-white text-center rounded-lg hover:bg-amber-700 transition-colors text-sm font-medium"
                                            >
                                                Visit Website
                                            </a>
                                        )}
                                        {association.email && (
                                            <a
                                                href={`mailto:${association.email}`}
                                                className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 text-center rounded-lg hover:bg-gray-300 transition-colors text-sm font-medium"
                                            >
                                                Contact
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </>
    );
}

// Use the public layout (no admin sidebar) for this public-facing page
AlumniIndex.layout = (page: ReactNode) => <PublicLayout>{page}</PublicLayout>;
