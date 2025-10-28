import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

interface Props {
    user: {
        name: string;
        university?: string;
        major?: string;
        graduation_year?: number;
    };
    stats: {
        saved_items: number;
        assessments_completed: number;
        comparison_items: number;
    };
}

export default function Dashboard({ user, stats }: Props) {
    const quickLinks = [
        {
            title: 'Browse Universities',
            description: 'Explore top universities and find your perfect match',
            icon: '🎓',
            href: '/universities',
            color: 'from-blue-500 to-blue-600',
        },
        {
            title: 'Find Courses',
            description: 'Discover courses to develop your skills',
            icon: '📚',
            href: '/courses',
            color: 'from-green-500 to-green-600',
        },
        {
            title: 'Career Opportunities',
            description: 'Browse jobs and internships',
            icon: '💼',
            href: '/careers',
            color: 'from-purple-500 to-purple-600',
        },
        {
            title: 'Partner Companies',
            description: 'Connect with leading employers',
            icon: '🏢',
            href: '/companies',
            color: 'from-emerald-500 to-emerald-600',
        },
        {
            title: 'Career Assessments',
            description: 'Take assessments to discover your path',
            icon: '🎯',
            href: '/assessments',
            color: 'from-indigo-500 to-indigo-600',
        },
        {
            title: 'Alumni Network',
            description: 'Connect with alumni and mentors',
            icon: '🤝',
            href: '/alumni',
            color: 'from-amber-500 to-amber-600',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex flex-col gap-6 p-4 md:p-6">
                {/* Welcome Section */}
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 md:p-8 text-white">
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">Welcome back, {user.name}!</h1>
                    <p className="text-lg text-indigo-100">
                        Continue your journey to finding the perfect career path
                    </p>
                    {user.university && (
                        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
                            <span className="flex items-center gap-2">
                                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                                </svg>
                                {user.university}
                            </span>
                            {user.major && <span>• {user.major}</span>}
                            {user.graduation_year && <span>• Class of {user.graduation_year}</span>}
                        </div>
                    )}
                </div>

                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Link
                        href="/saved-items"
                        className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
                    >
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Saved Items</h3>
                            <span className="text-2xl">💾</span>
                        </div>
                        <div className="text-3xl font-bold text-gray-900 dark:text-white">{stats.saved_items}</div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Universities, courses & more</p>
                    </Link>

                    <Link
                        href="/assessments"
                        className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
                    >
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Assessments</h3>
                            <span className="text-2xl">📊</span>
                        </div>
                        <div className="text-3xl font-bold text-gray-900 dark:text-white">
                            {stats.assessments_completed}
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Career assessments completed</p>
                    </Link>

                    <Link
                        href="/comparison"
                        className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
                    >
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Comparisons</h3>
                            <span className="text-2xl">⚖️</span>
                        </div>
                        <div className="text-3xl font-bold text-gray-900 dark:text-white">
                            {stats.comparison_items}
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Items in comparison</p>
                    </Link>
                </div>

                {/* Quick Actions */}
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {quickLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all group"
                            >
                                <div className={`w-12 h-12 bg-gradient-to-br ${link.color} rounded-lg flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}>
                                    {link.icon}
                                </div>
                                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                                    {link.title}
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{link.description}</p>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Recent Activity / Recommendations */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Next Steps */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Recommended Next Steps</h3>
                        <div className="space-y-4">
                            {stats.assessments_completed === 0 && (
                                <Link
                                    href="/assessments"
                                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                >
                                    <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center flex-shrink-0">
                                        🎯
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-white">
                                            Take Your First Assessment
                                        </h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Discover careers that match your interests and skills
                                        </p>
                                    </div>
                                </Link>
                            )}
                            <Link
                                href="/universities"
                                className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                            >
                                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center flex-shrink-0">
                                    🎓
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 dark:text-white">
                                        Explore Universities
                                    </h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Find universities that align with your goals
                                    </p>
                                </div>
                            </Link>
                            <Link
                                href="/blog"
                                className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                            >
                                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center flex-shrink-0">
                                    📝
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 dark:text-white">Read Career Advice</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Get insights from industry experts
                                    </p>
                                </div>
                            </Link>
                        </div>
                    </div>

                    {/* Resources */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Helpful Resources</h3>
                        <div className="space-y-3">
                            <a
                                href="#"
                                className="block p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                            >
                                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                                    Career Planning Guide
                                </h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Step-by-step guide to planning your career path
                                </p>
                            </a>
                            <a
                                href="#"
                                className="block p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                            >
                                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                                    University Application Tips
                                </h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Make your application stand out
                                </p>
                            </a>
                            <a
                                href="#"
                                className="block p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                            >
                                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                                    Interview Preparation
                                </h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Ace your next job interview
                                </p>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
