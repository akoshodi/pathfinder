import { Head, Link, router } from '@inertiajs/react';

interface AssessmentType {
    id: number;
    name: string;
    slug: string;
    description: string;
    category: string;
    question_count: number;
    estimated_duration: number;
    instructions: string;
}

interface RecentAttempt {
    id: number;
    status: string;
    started_at: string;
    completed_at: string | null;
    assessment_type: {
        name: string;
        slug: string;
    };
}

interface Props {
    assessments: AssessmentType[];
    recentAttempts?: RecentAttempt[];
}

export default function AssessmentsIndex({
    assessments,
    recentAttempts = [],
}: Props) {
    const getIconForCategory = (category: string) => {
        const icons: { [key: string]: string } = {
            career_interest: '🎯',
            skills: '⚡',
            personality: '🧠',
            career_fit: '🎓',
        };
        return icons[category] || '📊';
    };

    const getColorForCategory = (category: string) => {
        const colors: { [key: string]: string } = {
            career_interest: 'from-blue-600 to-blue-700',
            skills: 'from-purple-600 to-purple-700',
            personality: 'from-amber-600 to-amber-700',
            career_fit: 'from-green-600 to-green-700',
        };
        return colors[category] || 'from-indigo-600 to-indigo-700';
    };

    const handleStartAssessment = (slug: string) => {
        router.post(`/assessments/${slug}/start`);
    };

    const getCompletedAssessment = (type: string) => {
        return assessments.find((a) => a.type === type);
    };

    return (
        <AppLayout>
            <Head title="Career Assessments" />

            {/* Hero Section */}
            <section className="bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-12 text-white sm:px-6 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    <h1 className="mb-4 text-4xl font-bold">
                        Career Assessments
                    </h1>
                    <p className="text-lg text-indigo-100">
                        Take personalized assessments to discover your strengths
                        and find the right career path
                    </p>
                </div>
            </section>

            {/* Assessments Overview */}
            <main className="bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    {/* Your Assessments */}
                    {assessments.length > 0 && (
                        <div className="mb-12">
                            <h2 className="mb-6 text-2xl font-bold text-gray-900">
                                Your Completed Assessments
                            </h2>
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {assessments.map((assessment) => (
                                    <Link
                                        key={assessment.id}
                                        href={`/assessments/${assessment.id}`}
                                        className="rounded-lg bg-white p-6 shadow transition-shadow hover:shadow-lg"
                                    >
                                        <div className="mb-4 flex items-center justify-between">
                                            <h3 className="text-lg font-bold text-gray-900">
                                                {assessment.type} Assessment
                                            </h3>
                                            <span className="text-2xl">
                                                {
                                                    assessmentTypes.find(
                                                        (t) =>
                                                            t.type ===
                                                            assessment.type,
                                                    )?.icon
                                                }
                                            </span>
                                        </div>
                                        <p className="mb-4 text-sm text-gray-600">
                                            Completed on{' '}
                                            {assessment.completed_at}
                                        </p>
                                        <div className="flex items-center text-sm font-medium text-indigo-600">
                                            View Results
                                            <svg
                                                className="ml-1 h-4 w-4"
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
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Available Assessments */}
                    <div>
                        <h2 className="mb-6 text-2xl font-bold text-gray-900">
                            Available Assessments
                        </h2>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            {assessmentTypes.map((assessmentType) => {
                                const completed = getCompletedAssessment(
                                    assessmentType.type,
                                );
                                return (
                                    <div
                                        key={assessmentType.type}
                                        className="overflow-hidden rounded-lg bg-white shadow transition-shadow hover:shadow-lg"
                                    >
                                        <div
                                            className={`${assessmentType.color} h-2`}
                                        ></div>
                                        <div className="p-6">
                                            <div className="mb-4 flex items-start gap-4">
                                                <div className="text-4xl">
                                                    {assessmentType.icon}
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="mb-2 text-xl font-bold text-gray-900">
                                                        {assessmentType.title}
                                                    </h3>
                                                    <p className="text-gray-600">
                                                        {
                                                            assessmentType.description
                                                        }
                                                    </p>
                                                </div>
                                            </div>

                                            {completed ? (
                                                <div className="space-y-2">
                                                    <div className="mb-3 flex items-center text-sm text-green-600">
                                                        <svg
                                                            className="mr-2 h-5 w-5"
                                                            fill="currentColor"
                                                            viewBox="0 0 20 20"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>
                                                        Completed on{' '}
                                                        {completed.completed_at}
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <Link
                                                            href={`/assessments/${completed.id}`}
                                                            className="flex-1 rounded-lg bg-indigo-600 px-4 py-2 text-center font-medium text-white transition-colors hover:bg-indigo-700"
                                                        >
                                                            View Results
                                                        </Link>
                                                        <button
                                                            onClick={() =>
                                                                handleStartAssessment(
                                                                    assessmentType.type,
                                                                )
                                                            }
                                                            className="flex-1 rounded-lg bg-gray-200 px-4 py-2 text-center font-medium text-gray-800 transition-colors hover:bg-gray-300"
                                                        >
                                                            Retake
                                                        </button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <button
                                                    onClick={() =>
                                                        handleStartAssessment(
                                                            assessmentType.type,
                                                        )
                                                    }
                                                    className="w-full rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white transition-colors hover:bg-indigo-700"
                                                >
                                                    Start Assessment
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Benefits Section */}
                    <div className="mt-12 rounded-lg bg-white p-8 shadow">
                        <h2 className="mb-6 text-2xl font-bold text-gray-900">
                            Why Take Career Assessments?
                        </h2>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                            <div className="flex items-start">
                                <div className="mr-4 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-indigo-100">
                                    <svg
                                        className="h-6 w-6 text-indigo-600"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="mb-2 font-semibold text-gray-900">
                                        Self-Discovery
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        Gain insights into your strengths,
                                        interests, and career preferences
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="mr-4 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-indigo-100">
                                    <svg
                                        className="h-6 w-6 text-indigo-600"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="mb-2 font-semibold text-gray-900">
                                        Career Guidance
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        Get personalized recommendations for
                                        careers that match your profile
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="mr-4 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-indigo-100">
                                    <svg
                                        className="h-6 w-6 text-indigo-600"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="mb-2 font-semibold text-gray-900">
                                        Skill Development
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        Identify skill gaps and create a plan
                                        for professional growth
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </AppLayout>
    );
}
