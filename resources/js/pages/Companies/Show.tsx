import { Head, Link } from '@inertiajs/react';
import { type ReactNode } from 'react';
import PublicLayout from '@/layouts/public-layout';

interface Career {
    id: number;
    title: string;
    slug: string;
    type: string;
    description: string;
    location: string;
    experience_level: string;
    is_remote: boolean;
    posted_at: string;
}

interface Company {
    id: number;
    name: string;
    slug: string;
    description: string;
    logo: string | null;
    category: string;
    location: string;
    city: string;
    state: string;
    country: string;
    employees: string;
    founded_year: number | null;
    website: string | null;
    benefits: string[] | null;
    values: string[] | null;
    internships_count: number;
    jobs_count: number;
    is_partner: boolean;
    is_featured: boolean;
}

interface Props {
    company: Company;
    careers: Career[];
}

export default function CompaniesShow({ company, careers }: Props) {
    return (
        <>
            <Head title={company.name} />

            {/* Hero Section */}
            <section className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-start gap-6">
                        {company.logo ? (
                            <img
                                src={company.logo}
                                alt={company.name}
                                className="w-24 h-24 object-cover rounded-lg bg-white p-2"
                            />
                        ) : (
                            <div className="w-24 h-24 bg-white rounded-lg flex items-center justify-center text-4xl text-emerald-600 font-bold">
                                {company.name.charAt(0)}
                            </div>
                        )}
                        <div className="flex-1">
                            <h1 className="text-4xl font-bold mb-2">{company.name}</h1>
                            <p className="text-lg text-emerald-100 mb-4">{company.category}</p>
                            <div className="flex flex-wrap gap-4 text-sm">
                                <div className="flex items-center">
                                    <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            fillRule="evenodd"
                                            d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    {company.city}, {company.state}, {company.country}
                                </div>
                                <div className="flex items-center">
                                    <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                                    </svg>
                                    {company.employees} employees
                                </div>
                                {company.founded_year && (
                                    <div className="flex items-center">
                                        <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path
                                                fillRule="evenodd"
                                                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        Founded {company.founded_year}
                                    </div>
                                )}
                            </div>
                            {company.is_partner && (
                                <div className="mt-4">
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white text-emerald-700">
                                        ✓ PathFinder Partner
                                    </span>
                                </div>
                            )}
                        </div>
                        {company.website && (
                            <a
                                href={company.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-6 py-3 bg-white text-emerald-600 rounded-lg hover:bg-emerald-50 transition-colors font-semibold"
                            >
                                Visit Website
                            </a>
                        )}
                    </div>
                </div>
            </section>

            <main className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* About Section */}
                        <section className="bg-white rounded-lg shadow p-6">
                            <h2 className="text-2xl font-bold mb-4 text-gray-900">About {company.name}</h2>
                            <p className="text-gray-700 whitespace-pre-line">{company.description}</p>
                        </section>

                        {/* Company Values */}
                        {company.values && company.values.length > 0 && (
                            <section className="bg-white rounded-lg shadow p-6">
                                <h2 className="text-2xl font-bold mb-4 text-gray-900">Our Values</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {company.values.map((value, index) => (
                                        <div key={index} className="flex items-start">
                                            <svg
                                                className="h-6 w-6 text-emerald-600 mr-3 flex-shrink-0"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            <span className="text-gray-700">{value}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Benefits */}
                        {company.benefits && company.benefits.length > 0 && (
                            <section className="bg-white rounded-lg shadow p-6">
                                <h2 className="text-2xl font-bold mb-4 text-gray-900">Benefits & Perks</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {company.benefits.map((benefit, index) => (
                                        <div key={index} className="flex items-start">
                                            <svg
                                                className="h-5 w-5 text-emerald-600 mr-2 flex-shrink-0 mt-0.5"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            <span className="text-gray-700 text-sm">{benefit}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Open Positions */}
                        <section className="bg-white rounded-lg shadow p-6">
                            <h2 className="text-2xl font-bold mb-4 text-gray-900">Open Positions</h2>
                            {careers.length > 0 ? (
                                <div className="space-y-4">
                                    {careers.map((career) => (
                                        <Link
                                            key={career.id}
                                            href={`/careers/${career.slug}`}
                                            className="block p-4 border border-gray-200 rounded-lg hover:border-emerald-500 hover:shadow-md transition-all"
                                        >
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <h3 className="font-semibold text-lg text-gray-900 mb-1">
                                                        {career.title}
                                                    </h3>
                                                    <div className="flex flex-wrap gap-2 mb-2">
                                                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                                                            {career.type}
                                                        </span>
                                                        <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">
                                                            {career.experience_level}
                                                        </span>
                                                        {career.is_remote && (
                                                            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                                                                Remote
                                                            </span>
                                                        )}
                                                    </div>
                                                    <p className="text-sm text-gray-600 line-clamp-2">
                                                        {career.description}
                                                    </p>
                                                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                                                        <span className="flex items-center">
                                                            <svg
                                                                className="h-4 w-4 mr-1"
                                                                fill="currentColor"
                                                                viewBox="0 0 20 20"
                                                            >
                                                                <path
                                                                    fillRule="evenodd"
                                                                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                                                    clipRule="evenodd"
                                                                />
                                                            </svg>
                                                            {career.location}
                                                        </span>
                                                        <span>Posted {career.posted_at}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-600">No open positions at this time.</p>
                            )}
                        </section>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Quick Stats */}
                        <div className="bg-white rounded-lg shadow p-6">
                            <h3 className="font-bold text-lg mb-4 text-gray-900">Quick Stats</h3>
                            <div className="space-y-4">
                                <div>
                                    <div className="text-2xl font-bold text-emerald-600">{company.jobs_count}</div>
                                    <div className="text-sm text-gray-600">Open Jobs</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-emerald-600">
                                        {company.internships_count}
                                    </div>
                                    <div className="text-sm text-gray-600">Internships</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-emerald-600">{company.employees}</div>
                                    <div className="text-sm text-gray-600">Employees</div>
                                </div>
                            </div>
                        </div>

                        {/* Location */}
                        <div className="bg-white rounded-lg shadow p-6">
                            <h3 className="font-bold text-lg mb-4 text-gray-900">Location</h3>
                            <div className="space-y-2 text-sm text-gray-700">
                                <p>{company.location}</p>
                                <p>
                                    {company.city}, {company.state}
                                </p>
                                <p>{company.country}</p>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="bg-white rounded-lg shadow p-6">
                            <h3 className="font-bold text-lg mb-4 text-gray-900">Actions</h3>
                            <div className="space-y-3">
                                <Link
                                    href="/careers"
                                    className="block w-full px-4 py-2 bg-emerald-600 text-white text-center rounded-lg hover:bg-emerald-700 transition-colors"
                                >
                                    View All Jobs
                                </Link>
                                <Link
                                    href="/companies"
                                    className="block w-full px-4 py-2 bg-gray-200 text-gray-800 text-center rounded-lg hover:bg-gray-300 transition-colors"
                                >
                                    Browse Companies
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

// Use the public layout (no admin sidebar) for this public-facing page
CompaniesShow.layout = (page: ReactNode) => <PublicLayout>{page}</PublicLayout>;
