import { Head, Link } from '@inertiajs/react';
import { type ReactNode } from 'react';
import PublicLayout from '@/layouts/public-layout';

interface Course {
    id: number;
    title: string;
    slug: string;
    description: string;
    provider: string;
    duration: string | null;
    level: string;
    category: string;
    students_count: number;
    instructor: string | null;
    rating: number | null;
    reviews_count: number;
    thumbnail: string | null;
    video_url: string | null;
    external_url: string | null;
    price: number | null;
    is_free: boolean;
    learning_outcomes: string[] | null;
    prerequisites: string[] | null;
    syllabus: any[] | null;
    is_featured: boolean;
    universities: any[];
}

interface Props {
    course: Course;
}

export default function CourseShow({ course }: Props) {
    return (
        <>
            <Head title={course.title} />

            {/* Hero Section */}
            <section className="bg-gradient-to-r from-emerald-700 to-teal-700 text-white py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2">
                            <div className="flex items-center gap-2 mb-4">
                                <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-semibold">
                                    {course.level}
                                </span>
                                <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-semibold">
                                    {course.category}
                                </span>
                            </div>

                            <h1 className="text-4xl md:text-5xl font-bold mb-4">{course.title}</h1>
                            <p className="text-xl text-emerald-100 mb-6">{course.description}</p>

                            <div className="flex flex-wrap gap-4 text-sm">
                                <div>
                                    <span className="text-emerald-200">Provider:</span>
                                    <span className="ml-2 font-semibold">{course.provider}</span>
                                </div>
                                {course.instructor && (
                                    <div>
                                        <span className="text-emerald-200">Instructor:</span>
                                        <span className="ml-2 font-semibold">{course.instructor}</span>
                                    </div>
                                )}
                                {course.duration && (
                                    <div>
                                        <span className="text-emerald-200">Duration:</span>
                                        <span className="ml-2 font-semibold">{course.duration}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-xl p-6 text-gray-900">
                            {course.thumbnail && (
                                <img
                                    src={course.thumbnail}
                                    alt={course.title}
                                    className="w-full h-48 object-cover rounded-lg mb-4"
                                />
                            )}

                            <div className="space-y-4">
                                {course.rating && (
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-600">Rating:</span>
                                        <div className="flex items-center">
                                            <span className="text-yellow-400 text-xl">★</span>
                                            <span className="ml-1 font-bold">{course.rating}</span>
                                            <span className="ml-1 text-sm text-gray-500">
                                                ({course.reviews_count} reviews)
                                            </span>
                                        </div>
                                    </div>
                                )}

                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">Students:</span>
                                    <span className="font-semibold">{course.students_count.toLocaleString()}</span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">Price:</span>
                                    <span className="font-bold text-lg">
                                        {course.is_free ? (
                                            <span className="text-green-600">Free</span>
                                        ) : (
                                            `$${course.price}`
                                        )}
                                    </span>
                                </div>

                                {course.external_url && (
                                    <a
                                        href={course.external_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block w-full bg-emerald-600 hover:bg-emerald-700 text-white text-center font-semibold py-3 rounded-lg transition-colors"
                                    >
                                        Enroll Now
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Course Details */}
            <main className="py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-8">
                            {/* Learning Outcomes */}
                            {course.learning_outcomes && course.learning_outcomes.length > 0 && (
                                <div className="bg-white rounded-lg shadow p-6">
                                    <h2 className="text-2xl font-bold mb-4">What You'll Learn</h2>
                                    <ul className="space-y-2">
                                        {course.learning_outcomes.map((outcome, index) => (
                                            <li key={index} className="flex items-start">
                                                <svg
                                                    className="h-5 w-5 text-emerald-600 mr-2 mt-0.5"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                                <span>{outcome}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Prerequisites */}
                            {course.prerequisites && course.prerequisites.length > 0 && (
                                <div className="bg-white rounded-lg shadow p-6">
                                    <h2 className="text-2xl font-bold mb-4">Prerequisites</h2>
                                    <ul className="space-y-2">
                                        {course.prerequisites.map((prereq, index) => (
                                            <li key={index} className="flex items-start">
                                                <span className="text-emerald-600 mr-2">•</span>
                                                <span>{prereq}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Syllabus */}
                            {course.syllabus && course.syllabus.length > 0 && (
                                <div className="bg-white rounded-lg shadow p-6">
                                    <h2 className="text-2xl font-bold mb-4">Syllabus</h2>
                                    <div className="space-y-4">
                                        {course.syllabus.map((section, index) => (
                                            <div key={index} className="border-l-4 border-emerald-600 pl-4">
                                                <h3 className="font-semibold text-lg">{section.title}</h3>
                                                {section.description && (
                                                    <p className="text-gray-600 mt-1">{section.description}</p>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Associated Universities */}
                            {course.universities && course.universities.length > 0 && (
                                <div className="bg-white rounded-lg shadow p-6">
                                    <h3 className="text-lg font-bold mb-4">Offered By</h3>
                                    <div className="space-y-3">
                                        {course.universities.map((university) => (
                                            <Link
                                                key={university.id}
                                                href={`/universities/${university.slug}`}
                                                className="flex items-center gap-3 hover:bg-gray-50 p-2 rounded"
                                            >
                                                {university.logo && (
                                                    <img
                                                        src={university.logo}
                                                        alt={university.name}
                                                        className="w-12 h-12 object-cover rounded"
                                                    />
                                                )}
                                                <span className="font-medium">{university.name}</span>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
    </>
    );
}

// Use the public layout (no admin sidebar) for this public-facing page
CourseShow.layout = (page: ReactNode) => <PublicLayout>{page}</PublicLayout>;
