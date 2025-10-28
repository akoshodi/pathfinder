import { Head, Link, router } from '@inertiajs/react';
import { type ReactNode, useState } from 'react';
import PublicLayout from '@/layouts/public-layout';

interface Course {
    id: number;
    title: string;
    slug: string;
    provider: string;
    duration: string | null;
    level: 'Beginner' | 'Intermediate' | 'Advanced';
    category: 'undergraduate' | 'postgraduate' | 'mooc' | 'projects';
    students_count: number;
    rating: number | null;
    thumbnail: string | null;
    is_free: boolean;
    price: number | null;
}

interface Props {
    courses: {
        data: Course[];
        links: any[];
        meta: any;
    };
    filters: {
        search?: string;
        category?: string;
        level?: string;
    };
}

export default function CoursesIndex({ courses, filters }: Props) {
    const [search, setSearch] = useState(filters.search || '');
    const [activeTab, setActiveTab] = useState(filters.category || 'undergraduate');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/courses', { search, category: activeTab }, { preserveState: true });
    };

    const handleTabChange = (category: string) => {
        setActiveTab(category);
        router.get('/courses', { category, search }, { preserveState: true });
    };

    const tabs = [
        { id: 'undergraduate', label: 'Undergraduate' },
        { id: 'postgraduate', label: 'Postgraduate' },
        { id: 'mooc', label: 'MOOCs' },
        { id: 'projects', label: 'Projects' },
    ];

    return (
        <>
            <Head title="Courses" />

            {/* Hero Section */}
            <section className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-4xl font-bold mb-4">Course Catalog</h1>
                    <p className="text-lg text-emerald-100">
                        Explore our comprehensive collection of courses, from university programs to online learning
                        opportunities.
                    </p>
                </div>
            </section>

            {/* Tabs */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex space-x-8 overflow-x-auto">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => handleTabChange(tab.id)}
                                className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                                    activeTab === tab.id
                                        ? 'border-emerald-500 text-emerald-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700'
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Search */}
            <div className="bg-white border-b border-gray-200 py-6 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <form onSubmit={handleSearch}>
                        <div className="relative">
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search courses..."
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
                </div>
            </div>

            {/* Courses Grid */}
            <main className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {courses.data.map((course) => (
                            <Link
                                key={course.id}
                                href={`/courses/${course.slug}`}
                                className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden"
                            >
                                {course.thumbnail && (
                                    <img
                                        src={course.thumbnail}
                                        alt={course.title}
                                        className="w-full h-48 object-cover"
                                    />
                                )}
                                <div className="p-6">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span
                                            className={`px-2 py-1 text-xs font-semibold rounded ${
                                                course.level === 'Beginner'
                                                    ? 'bg-green-100 text-green-800'
                                                    : course.level === 'Intermediate'
                                                      ? 'bg-yellow-100 text-yellow-800'
                                                      : 'bg-red-100 text-red-800'
                                            }`}
                                        >
                                            {course.level}
                                        </span>
                                        {course.is_free && (
                                            <span className="px-2 py-1 text-xs font-semibold rounded bg-blue-100 text-blue-800">
                                                Free
                                            </span>
                                        )}
                                    </div>

                                    <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2">
                                        {course.title}
                                    </h3>
                                    <p className="text-sm text-gray-600 mb-3">{course.provider}</p>

                                    <div className="flex items-center justify-between text-sm text-gray-500">
                                        <span>{course.duration}</span>
                                        <span>{course.students_count?.toLocaleString()} students</span>
                                    </div>

                                    {course.rating && (
                                        <div className="mt-3 flex items-center">
                                            <span className="text-yellow-400">★</span>
                                            <span className="ml-1 text-sm font-semibold">{course.rating}</span>
                                        </div>
                                    )}
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Pagination */}
                    {courses.links && (
                        <div className="mt-8 flex justify-center gap-2">
                            {courses.links.map((link: any, index: number) => (
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
CoursesIndex.layout = (page: ReactNode) => <PublicLayout>{page}</PublicLayout>;
