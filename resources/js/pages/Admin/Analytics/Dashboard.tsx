import { Head } from '@inertiajs/react';
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';

interface UserStats {
    total: number;
    active_30_days: number;
    verified: number;
    verification_rate: number;
    growth_rate: number;
}

interface AssessmentTypeStats {
    name: string;
    total_attempts: number;
    completed: number;
    completion_rate: number;
    avg_time: number | null;
}

interface ActivityPeriod {
    new_users: number;
    assessments_started: number;
    assessments_completed: number;
}

interface ActivityStats {
    today: ActivityPeriod;
    this_week: ActivityPeriod;
    this_month: ActivityPeriod;
}

interface TrendData {
    user_registrations: Array<{ date: string; count: number }>;
    assessment_completions: Array<{ date: string; count: number }>;
}

interface DistributionItem {
    name: string;
    slug: string;
    count: number;
}

interface CareerItem {
    title: string;
    count: number;
}

interface Stats {
    users: UserStats;
    assessments: Record<string, AssessmentTypeStats>;
    activity: ActivityStats;
    trends: TrendData;
}

interface Props {
    stats: Stats;
    distribution: DistributionItem[];
    topCareers: CareerItem[];
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

export default function Dashboard({ stats, distribution, topCareers }: Props) {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    const getGrowthColor = (rate: number) => {
        if (rate > 0) return 'text-green-600 dark:text-green-400';
        if (rate < 0) return 'text-red-600 dark:text-red-400';
        return 'text-gray-600 dark:text-gray-400';
    };

    const getGrowthIcon = (rate: number) => {
        if (rate > 0) return '↑';
        if (rate < 0) return '↓';
        return '→';
    };

    return (
        <>
            <Head title="Analytics Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Analytics Dashboard</h1>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                            Overview of platform metrics and user engagement
                        </p>
                    </div>

                    {/* Key Metrics Cards */}
                    <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {/* Total Users */}
                        <div className="overflow-hidden rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Users</p>
                                    <p className="mt-2 text-3xl font-semibold text-gray-900 dark:text-gray-100">
                                        {stats.users.total.toLocaleString()}
                                    </p>
                                </div>
                                <div className="rounded-full bg-blue-100 p-3 dark:bg-blue-900">
                                    <svg className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                </div>
                            </div>
                            <div className="mt-4 flex items-center text-sm">
                                <span className={`font-medium ${getGrowthColor(stats.users.growth_rate)}`}>
                                    {getGrowthIcon(stats.users.growth_rate)} {Math.abs(stats.users.growth_rate)}%
                                </span>
                                <span className="ml-2 text-gray-600 dark:text-gray-400">vs last 30 days</span>
                            </div>
                        </div>

                        {/* Active Users */}
                        <div className="overflow-hidden rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Users (30d)</p>
                                    <p className="mt-2 text-3xl font-semibold text-gray-900 dark:text-gray-100">
                                        {stats.users.active_30_days.toLocaleString()}
                                    </p>
                                </div>
                                <div className="rounded-full bg-green-100 p-3 dark:bg-green-900">
                                    <svg className="h-6 w-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                            </div>
                            <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                                {stats.users.verification_rate}% verified
                            </div>
                        </div>

                        {/* Total Assessments */}
                        <div className="overflow-hidden rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Assessments Completed</p>
                                    <p className="mt-2 text-3xl font-semibold text-gray-900 dark:text-gray-100">
                                        {Object.values(stats.assessments).reduce((sum, a) => sum + a.completed, 0).toLocaleString()}
                                    </p>
                                </div>
                                <div className="rounded-full bg-purple-100 p-3 dark:bg-purple-900">
                                    <svg className="h-6 w-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                </div>
                            </div>
                            <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                                Today: {stats.activity.today.assessments_completed}
                            </div>
                        </div>

                        {/* Today's Activity */}
                        <div className="overflow-hidden rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">New Users Today</p>
                                    <p className="mt-2 text-3xl font-semibold text-gray-900 dark:text-gray-100">
                                        {stats.activity.today.new_users}
                                    </p>
                                </div>
                                <div className="rounded-full bg-yellow-100 p-3 dark:bg-yellow-900">
                                    <svg className="h-6 w-6 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                </div>
                            </div>
                            <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                                This week: {stats.activity.this_week.new_users}
                            </div>
                        </div>
                    </div>

                    {/* Charts Row 1 */}
                    <div className="mb-8 grid gap-6 lg:grid-cols-2">
                        {/* User Registrations Trend */}
                        <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                            <h3 className="mb-4 text-lg font-medium text-gray-900 dark:text-gray-100">User Registrations (30 Days)</h3>
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={stats.trends.user_registrations}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                                    <XAxis
                                        dataKey="date"
                                        tickFormatter={formatDate}
                                        stroke="#6b7280"
                                        style={{ fontSize: '12px' }}
                                    />
                                    <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: '#1f2937',
                                            border: 'none',
                                            borderRadius: '8px',
                                            color: '#fff',
                                        }}
                                        labelFormatter={formatDate}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="count"
                                        stroke="#3b82f6"
                                        strokeWidth={2}
                                        dot={{ fill: '#3b82f6' }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Assessment Completions Trend */}
                        <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                            <h3 className="mb-4 text-lg font-medium text-gray-900 dark:text-gray-100">Assessment Completions (30 Days)</h3>
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={stats.trends.assessment_completions}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                                    <XAxis
                                        dataKey="date"
                                        tickFormatter={formatDate}
                                        stroke="#6b7280"
                                        style={{ fontSize: '12px' }}
                                    />
                                    <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: '#1f2937',
                                            border: 'none',
                                            borderRadius: '8px',
                                            color: '#fff',
                                        }}
                                        labelFormatter={formatDate}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="count"
                                        stroke="#10b981"
                                        strokeWidth={2}
                                        dot={{ fill: '#10b981' }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Charts Row 2 */}
                    <div className="mb-8 grid gap-6 lg:grid-cols-2">
                        {/* Assessment Distribution */}
                        <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                            <h3 className="mb-4 text-lg font-medium text-gray-900 dark:text-gray-100">Assessment Distribution</h3>
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie
                                        data={distribution}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                        outerRadius={100}
                                        fill="#8884d8"
                                        dataKey="count"
                                    >
                                        {distribution.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Top Careers */}
                        <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                            <h3 className="mb-4 text-lg font-medium text-gray-900 dark:text-gray-100">Most Recommended Careers</h3>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={topCareers} layout="vertical">
                                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                                    <XAxis type="number" stroke="#6b7280" style={{ fontSize: '12px' }} />
                                    <YAxis
                                        type="category"
                                        dataKey="title"
                                        stroke="#6b7280"
                                        style={{ fontSize: '12px' }}
                                        width={150}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: '#1f2937',
                                            border: 'none',
                                            borderRadius: '8px',
                                            color: '#fff',
                                        }}
                                    />
                                    <Bar dataKey="count" fill="#8b5cf6" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Assessment Details Table */}
                    <div className="rounded-lg bg-white shadow dark:bg-gray-800">
                        <div className="p-6">
                            <h3 className="mb-4 text-lg font-medium text-gray-900 dark:text-gray-100">Assessment Performance</h3>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead>
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                                Assessment Type
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                                Total Attempts
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                                Completed
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                                Completion Rate
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                                Avg. Time (min)
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                        {Object.values(stats.assessments).map((assessment) => (
                                            <tr key={assessment.name}>
                                                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-100">
                                                    {assessment.name}
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                                                    {assessment.total_attempts}
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                                                    {assessment.completed}
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4 text-sm">
                                                    <div className="flex items-center">
                                                        <div className="mr-2 h-2 w-16 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                                                            <div
                                                                className="h-full bg-blue-600"
                                                                style={{ width: `${assessment.completion_rate}%` }}
                                                            />
                                                        </div>
                                                        <span className="text-gray-600 dark:text-gray-400">{assessment.completion_rate}%</span>
                                                    </div>
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                                                    {assessment.avg_time ?? 'N/A'}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
