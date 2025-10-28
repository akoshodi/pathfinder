import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import { type ReactNode } from 'react';
import PublicLayout from '@/layouts/public-layout';

interface Mentor {
    id: number;
    name: string;
    avatar: string | null;
    current_position: string | null;
    company: string | null;
    university: string | null;
    major: string | null;
    graduation_year: number | null;
    skills: string[] | null;
    bio: string | null;
}

interface Props {
    mentors: Mentor[];
}

export default function AlumniMentorship({ mentors }: Props) {
    const [selectedCategory, setSelectedCategory] = useState('all');

    const categories = ['all', 'Career Development', 'Technical Skills', 'Leadership', 'Entrepreneurship'];

    return (
        <>
            <Head title="Mentorship Program" />

            {/* Hero Section */}
            <section className="bg-gradient-to-r from-amber-600 to-amber-700 text-white py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-4xl font-bold mb-4">Alumni Mentorship Program</h1>
                    <p className="text-lg text-amber-100">
                        Get guidance from experienced alumni mentors and accelerate your career growth
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
                        href="/alumni/network"
                        className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
                    >
                        Alumni Network
                    </Link>
                </div>
            </section>

            {/* Program Info */}
            <section className="bg-white py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="h-8 w-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Find a Mentor</h3>
                            <p className="text-gray-600">Connect with experienced alumni who can guide your career journey</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="h-8 w-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Get Advice</h3>
                            <p className="text-gray-600">Receive personalized guidance on career decisions and skill development</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="h-8 w-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Grow Your Career</h3>
                            <p className="text-gray-600">Accelerate your professional growth with expert mentorship</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Filter Section */}
            <section className="bg-gray-50 border-y border-gray-200 py-6 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-wrap gap-2">
                        <span className="text-sm font-semibold text-gray-700 self-center">Expertise:</span>
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-4 py-2 rounded-lg transition-colors ${
                                    selectedCategory === category
                                        ? 'bg-amber-600 text-white'
                                        : 'bg-white text-gray-800 hover:bg-gray-100'
                                }`}
                            >
                                {category.charAt(0).toUpperCase() + category.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mentors Grid */}
            <main className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Available Mentors</h2>
                        <p className="text-gray-600">Connect with alumni mentors who can help guide your career</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {mentors.map((mentor) => (
                            <div key={mentor.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6">
                                {/* Mentor Header */}
                                <div className="flex items-start gap-4 mb-4">
                                    {mentor.avatar ? (
                                        <img
                                            src={mentor.avatar}
                                            alt={mentor.name}
                                            className="w-20 h-20 rounded-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-20 h-20 rounded-full bg-amber-100 flex items-center justify-center text-2xl text-amber-600 font-bold">
                                            {mentor.name.charAt(0)}
                                        </div>
                                    )}
                                    <div className="flex-1">
                                        <h3 className="font-bold text-lg text-gray-900 mb-1">{mentor.name}</h3>
                                        {mentor.current_position && (
                                            <p className="text-sm text-gray-600">{mentor.current_position}</p>
                                        )}
                                        {mentor.company && (
                                            <p className="text-sm text-amber-600 font-medium">{mentor.company}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Education */}
                                {mentor.university && (
                                    <div className="mb-4 pb-4 border-b border-gray-200">
                                        <div className="text-sm">
                                            <span className="font-semibold text-gray-900">{mentor.university}</span>
                                            {mentor.major && <span className="text-gray-600"> • {mentor.major}</span>}
                                        </div>
                                        {mentor.graduation_year && (
                                            <div className="text-xs text-gray-500">Class of {mentor.graduation_year}</div>
                                        )}
                                    </div>
                                )}

                                {/* Bio */}
                                {mentor.bio && <p className="text-sm text-gray-600 mb-4 line-clamp-3">{mentor.bio}</p>}

                                {/* Skills */}
                                {mentor.skills && mentor.skills.length > 0 && (
                                    <div className="mb-4">
                                        <h4 className="text-xs font-semibold text-gray-900 mb-2">Expertise:</h4>
                                        <div className="flex flex-wrap gap-1">
                                            {mentor.skills.slice(0, 4).map((skill, index) => (
                                                <span
                                                    key={index}
                                                    className="px-2 py-1 bg-amber-100 text-amber-800 rounded text-xs"
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Action Button */}
                                <button className="w-full px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors font-medium text-sm">
                                    Request Mentorship
                                </button>
                            </div>
                        ))}
                    </div>

                    {mentors.length === 0 && (
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
                                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                                />
                            </svg>
                            <h3 className="mt-2 text-sm font-medium text-gray-900">No mentors available</h3>
                            <p className="mt-1 text-sm text-gray-500">Check back soon for new mentors.</p>
                        </div>
                    )}
                </div>
            </main>
        </>
    );
}

// Use the public layout (no admin sidebar) for this public-facing page
AlumniMentorship.layout = (page: ReactNode) => <PublicLayout>{page}</PublicLayout>;
