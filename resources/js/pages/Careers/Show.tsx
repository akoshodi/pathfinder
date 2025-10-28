import { Head, Link } from '@inertiajs/react';
import { type ReactNode } from 'react';
import PublicLayout from '@/layouts/public-layout';

interface Company {
    id: number;
    name: string;
    slug: string;
    logo: string | null;
    location: string;
    city: string;
    state: string;
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
    requirements: string[] | null;
    responsibilities: string[] | null;
    benefits: string[] | null;
    skills_required: string[] | null;
    application_url: string | null;
    is_remote: boolean;
    deadline: string | null;
    posted_at: string;
    company: Company;
}

interface Props {
    career: Career;
}

export default function CareersShow({ career }: Props) {
    return (
        <>
            <Head title={career.title} />

            {/* Hero Section */}
            <section className="bg-gradient-to-r from-purple-600 to-purple-700 text-white py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-start gap-6">
                        {career.company.logo ? (
                            <img
                                src={career.company.logo}
                                alt={career.company.name}
                                className="w-20 h-20 object-cover rounded-lg bg-white p-2"
                            />
                        ) : (
                            <div className="w-20 h-20 bg-white rounded-lg flex items-center justify-center text-3xl text-purple-600 font-bold">
                                {career.company.name.charAt(0)}
                            </div>
                        )}
                        <div className="flex-1">
                            <h1 className="text-4xl font-bold mb-2">{career.title}</h1>
                            <Link
                                href={`/companies/${career.company.slug}`}
                                className="text-lg text-purple-100 hover:text-white mb-4 inline-block"
                            >
                                {career.company.name} →
                            </Link>
                            <div className="flex flex-wrap gap-3 mt-4">
                                <span className="px-3 py-1 bg-white/20 rounded-full text-sm">{career.type}</span>
                                <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
                                    {career.experience_level}
                                </span>
                                {career.is_remote && (
                                    <span className="px-3 py-1 bg-white/20 rounded-full text-sm">Remote</span>
                                )}
                                <span className="px-3 py-1 bg-white/20 rounded-full text-sm flex items-center">
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
                        </div>
                        {career.application_url && (
                            <a
                                href={career.application_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-8 py-3 bg-white text-purple-600 rounded-lg hover:bg-purple-50 transition-colors font-semibold text-lg"
                            >
                                Apply Now
                            </a>
                        )}
                    </div>
                </div>
            </section>

            <main className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Job Description */}
                        <section className="bg-white rounded-lg shadow p-6">
                            <h2 className="text-2xl font-bold mb-4 text-gray-900">Job Description</h2>
                            <p className="text-gray-700 whitespace-pre-line">{career.description}</p>
                        </section>

                        {/* Responsibilities */}
                        {career.responsibilities && career.responsibilities.length > 0 && (
                            <section className="bg-white rounded-lg shadow p-6">
                                <h2 className="text-2xl font-bold mb-4 text-gray-900">Responsibilities</h2>
                                <ul className="space-y-3">
                                    {career.responsibilities.map((responsibility, index) => (
                                        <li key={index} className="flex items-start">
                                            <svg
                                                className="h-6 w-6 text-purple-600 mr-3 flex-shrink-0"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M9 5l7 7-7 7"
                                                />
                                            </svg>
                                            <span className="text-gray-700">{responsibility}</span>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        )}

                        {/* Requirements */}
                        {career.requirements && career.requirements.length > 0 && (
                            <section className="bg-white rounded-lg shadow p-6">
                                <h2 className="text-2xl font-bold mb-4 text-gray-900">Requirements</h2>
                                <ul className="space-y-3">
                                    {career.requirements.map((requirement, index) => (
                                        <li key={index} className="flex items-start">
                                            <svg
                                                className="h-6 w-6 text-purple-600 mr-3 flex-shrink-0"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            <span className="text-gray-700">{requirement}</span>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        )}

                        {/* Skills Required */}
                        {career.skills_required && career.skills_required.length > 0 && (
                            <section className="bg-white rounded-lg shadow p-6">
                                <h2 className="text-2xl font-bold mb-4 text-gray-900">Required Skills</h2>
                                <div className="flex flex-wrap gap-2">
                                    {career.skills_required.map((skill, index) => (
                                        <span
                                            key={index}
                                            className="px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Benefits */}
                        {career.benefits && career.benefits.length > 0 && (
                            <section className="bg-white rounded-lg shadow p-6">
                                <h2 className="text-2xl font-bold mb-4 text-gray-900">Benefits & Perks</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {career.benefits.map((benefit, index) => (
                                        <div key={index} className="flex items-start">
                                            <svg
                                                className="h-5 w-5 text-purple-600 mr-2 flex-shrink-0 mt-0.5"
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
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Job Details */}
                        <div className="bg-white rounded-lg shadow p-6">
                            <h3 className="font-bold text-lg mb-4 text-gray-900">Job Details</h3>
                            <div className="space-y-4 text-sm">
                                {career.salary_range && (
                                    <div>
                                        <div className="text-gray-600 mb-1">Salary Range</div>
                                        <div className="font-semibold text-purple-600">{career.salary_range}</div>
                                    </div>
                                )}
                                <div>
                                    <div className="text-gray-600 mb-1">Job Type</div>
                                    <div className="font-semibold">{career.type}</div>
                                </div>
                                <div>
                                    <div className="text-gray-600 mb-1">Experience Level</div>
                                    <div className="font-semibold">{career.experience_level}</div>
                                </div>
                                <div>
                                    <div className="text-gray-600 mb-1">Location</div>
                                    <div className="font-semibold">{career.location}</div>
                                </div>
                                {career.deadline && (
                                    <div>
                                        <div className="text-gray-600 mb-1">Application Deadline</div>
                                        <div className="font-semibold text-red-600">{career.deadline}</div>
                                    </div>
                                )}
                                <div>
                                    <div className="text-gray-600 mb-1">Posted</div>
                                    <div className="font-semibold">{career.posted_at}</div>
                                </div>
                            </div>
                        </div>

                        {/* Company Info */}
                        <div className="bg-white rounded-lg shadow p-6">
                            <h3 className="font-bold text-lg mb-4 text-gray-900">About the Company</h3>
                            <div className="space-y-3">
                                <Link
                                    href={`/companies/${career.company.slug}`}
                                    className="text-purple-600 hover:text-purple-700 font-semibold"
                                >
                                    {career.company.name} →
                                </Link>
                                <div className="text-sm text-gray-600">
                                    <div className="flex items-center mb-2">
                                        <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path
                                                fillRule="evenodd"
                                                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        {career.company.city}, {career.company.state}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Apply Button */}
                        {career.application_url && (
                            <div className="bg-white rounded-lg shadow p-6">
                                <a
                                    href={career.application_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block w-full px-6 py-3 bg-purple-600 text-white text-center rounded-lg hover:bg-purple-700 transition-colors font-semibold"
                                >
                                    Apply Now
                                </a>
                                <p className="mt-3 text-xs text-gray-500 text-center">
                                    You'll be redirected to the company's application page
                                </p>
                            </div>
                        )}

                        {/* Actions */}
                        <div className="bg-white rounded-lg shadow p-6">
                            <h3 className="font-bold text-lg mb-4 text-gray-900">More Actions</h3>
                            <div className="space-y-3">
                                <Link
                                    href="/careers"
                                    className="block w-full px-4 py-2 bg-gray-200 text-gray-800 text-center rounded-lg hover:bg-gray-300 transition-colors"
                                >
                                    Browse All Jobs
                                </Link>
                                <Link
                                    href={`/companies/${career.company.slug}`}
                                    className="block w-full px-4 py-2 bg-gray-200 text-gray-800 text-center rounded-lg hover:bg-gray-300 transition-colors"
                                >
                                    View Company Profile
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
CareersShow.layout = (page: ReactNode) => <PublicLayout>{page}</PublicLayout>;
