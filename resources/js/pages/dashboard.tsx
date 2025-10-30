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

interface AdminAssessmentSummary {
    id: number;
    name: string;
    slug: string;
    category?: string | null;
    attempts: number;
    completed: number;
    completion_rate: number;
}

interface AdminRecentAttempt {
    id: number;
    assessment: { name?: string | null; slug?: string | null };
    user: { id: number; name: string; email: string } | null;
    started_at: string | null;
    completed_at: string | null;
}

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
    isAdmin?: boolean;
    admin?: {
        totals: {
            users: number;
            assessment_attempts: number;
            assessments_completed: number;
            reports: number;
            occupations: number;
        };
        assessments: AdminAssessmentSummary[];
        recentAttempts: AdminRecentAttempt[];
    } | null;
    recent?: {
        attempt: { id: number; progress: number; started_at: string | null };
        assessment: { name?: string | null; slug?: string | null };
    } | null;
    recentResult?: {
        attempt: { id: number; completed_at: string | null };
        assessment: { name?: string | null; slug?: string | null };
        summary?: string | null;
    } | null;
}

export default function Dashboard({ user, stats, isAdmin = false, admin = null, recent = null, recentResult = null }: Props) {
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

                {/* Admin Panel */}
                {isAdmin && admin && (
                    <div className="grid grid-cols-1 gap-6">
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Admin Overview</h2>
                            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                                <AdminStatCard label="Users" value={admin.totals.users} emoji="👥" />
                                <AdminStatCard label="Attempts" value={admin.totals.assessment_attempts} emoji="📝" />
                                <AdminStatCard label="Completed" value={admin.totals.assessments_completed} emoji="✅" />
                                <AdminStatCard label="Reports" value={admin.totals.reports} emoji="📄" />
                                <AdminStatCard label="Occupations" value={admin.totals.occupations} emoji="🏷️" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Assessments summary */}
                            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Assessments</h3>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full text-sm">
                                        <thead>
                                            <tr className="text-left text-gray-600 dark:text-gray-400">
                                                <th className="py-2 pr-4">Name</th>
                                                <th className="py-2 pr-4">Category</th>
                                                <th className="py-2 pr-4">Attempts</th>
                                                <th className="py-2 pr-4">Completed</th>
                                                <th className="py-2 pr-4">Completion Rate</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                            {admin.assessments.map((a) => (
                                                <tr key={a.id} className="text-gray-900 dark:text-white">
                                                    <td className="py-2 pr-4 font-medium">{a.name}</td>
                                                    <td className="py-2 pr-4">{a.category ?? '-'}</td>
                                                    <td className="py-2 pr-4">{a.attempts}</td>
                                                    <td className="py-2 pr-4">{a.completed}</td>
                                                    <td className="py-2 pr-4">{a.completion_rate}%</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Recent attempts */}
                            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Recent Attempts</h3>
                                <div className="space-y-3">
                                    {admin.recentAttempts.map((ra) => (
                                        <div key={ra.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
                                            <div>
                                                <div className="font-medium text-gray-900 dark:text-white">
                                                    {ra.assessment.name ?? 'Unknown'}
                                                </div>
                                                <div className="text-xs text-gray-600 dark:text-gray-400">
                                                    {ra.user ? `${ra.user.name} · ${ra.user.email}` : 'Anonymous'}
                                                </div>
                                            </div>
                                            <div className="text-xs text-gray-600 dark:text-gray-400">
                                                {ra.completed_at ? 'Completed' : 'In Progress'}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-4 flex flex-wrap gap-2 text-sm">
                                    <Link href="/assessments" className="text-indigo-600 hover:text-indigo-700">Manage Assessments</Link>
                                    <span className="text-gray-300">|</span>
                                    <Link href="/occupations" className="text-indigo-600 hover:text-indigo-700">Browse Occupations</Link>
                                    <span className="text-gray-300">|</span>
                                    <Link href="/blog" className="text-indigo-600 hover:text-indigo-700">Manage Blog</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Recent Activity / Recommendations */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Resume Recent Attempt / Recent Result */}
                    {!isAdmin && (
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Your Recent Activity</h3>
                            <div className="space-y-4">
                                {recent && (
                                    <Link
                                        href={`/assessments/${recent.attempt.id}/take`}
                                        className="flex items-center justify-between p-4 rounded-lg bg-indigo-50 dark:bg-indigo-900/40 border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 dark:hover:bg-indigo-900 transition-colors"
                                    >
                                        <div>
                                            <div className="text-sm text-indigo-700 dark:text-indigo-300">Resume Assessment</div>
                                            <div className="font-semibold text-indigo-900 dark:text-indigo-100">{recent.assessment.name ?? 'Assessment'}</div>
                                        </div>
                                        <div className="text-sm text-indigo-800 dark:text-indigo-200">{recent.attempt.progress}%</div>
                                    </Link>
                                )}

                                {recentResult && (
                                    <Link
                                        href={`/assessments/${recentResult.attempt.id}/results`}
                                        className="flex items-center justify-between p-4 rounded-lg bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 hover:bg-green-100 dark:hover:bg-green-900 transition-colors"
                                    >
                                        <div>
                                            <div className="text-sm text-green-700 dark:text-green-300">Recent Result</div>
                                            <div className="font-semibold text-green-900 dark:text-green-100">{recentResult.assessment.name ?? 'Assessment'}</div>
                                            {recentResult.summary && (
                                                <div className="mt-1 text-xs text-green-800/80 dark:text-green-200/80 line-clamp-2">
                                                    {recentResult.summary}
                                                </div>
                                            )}
                                        </div>
                                        <div className="text-xs text-green-800 dark:text-green-200">View</div>
                                    </Link>
                                )}

                                {!recent && !recentResult && (
                                    <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-400">
                                        No recent activity yet. Start with a career assessment to get personalized insights.
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
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

function AdminStatCard({ label, value, emoji }: { label: string; value: number; emoji: string }) {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600 dark:text-gray-400">{label}</div>
                <div className="text-xl">{emoji}</div>
            </div>
            <div className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">{value}</div>
        </div>
    );
}
