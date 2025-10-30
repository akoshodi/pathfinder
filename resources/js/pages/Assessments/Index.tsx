import PublicLayout from '@/layouts/public-layout';
import { Head, Link, router } from '@inertiajs/react';
import {
    CheckCircle,
    Clock,
    Lightbulb,
    Play,
    Target,
    TrendingUp,
} from 'lucide-react';

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

    const getBorderColorForCategory = (category: string) => {
        const colors: { [key: string]: string } = {
            career_interest: 'border-blue-500',
            skills: 'border-purple-500',
            personality: 'border-amber-500',
            career_fit: 'border-green-500',
        };
        return colors[category] || 'border-indigo-500';
    };

    const handleStartAssessment = (slug: string) => {
        router.post(`/assessments/${slug}/start`);
    };

    const completedAttempts = recentAttempts.filter(
        (a) => a.status === 'completed',
    );
    const inProgressAttempts = recentAttempts.filter(
        (a) => a.status === 'in_progress',
    );

    return (
        <PublicLayout>
            <Head title="Career Assessments" />

            {/* Hero Section */}
            <section className="bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-16 text-white sm:px-6 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    <h1 className="mb-4 text-4xl font-bold md:text-5xl">
                        Discover Your Perfect Career Path
                    </h1>
                    <p className="max-w-3xl text-lg text-indigo-100 md:text-xl">
                        Take science-backed assessments to understand your
                        interests, skills, and personality traits. Get
                        personalized career recommendations matched to your
                        unique profile.
                    </p>
                </div>
            </section>

            <main className="bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-7xl space-y-12">
                    {/* In Progress Assessments */}
                    {inProgressAttempts.length > 0 && (
                        <div>
                            <h2 className="mb-6 text-2xl font-bold text-gray-900">
                                Continue Your Assessment
                            </h2>
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                {inProgressAttempts.map((attempt) => {
                                    const assessment = assessments.find(
                                        (a) =>
                                            a.slug ===
                                            attempt.assessment_type.slug,
                                    );
                                    if (!assessment) return null;

                                    return (
                                        <Link
                                            key={attempt.id}
                                            href={`/assessments/${attempt.id}/take`}
                                            className="rounded-lg border-l-4 border-yellow-500 bg-white p-6 shadow transition-shadow hover:shadow-lg"
                                        >
                                            <div className="mb-4 flex items-start justify-between">
                                                <div className="flex items-center gap-3">
                                                    <span className="text-3xl">
                                                        {getIconForCategory(
                                                            assessment.category,
                                                        )}
                                                    </span>
                                                    <div>
                                                        <h3 className="text-lg font-bold text-gray-900">
                                                            {assessment.name}
                                                        </h3>
                                                        <p className="text-sm text-gray-600">
                                                            In Progress
                                                        </p>
                                                    </div>
                                                </div>
                                                <Play className="h-5 w-5 text-yellow-600" />
                                            </div>
                                            <p className="mb-4 text-sm text-gray-600">
                                                Started{' '}
                                                {new Date(
                                                    attempt.started_at,
                                                ).toLocaleDateString()}
                                            </p>
                                            <div className="flex items-center text-sm font-medium text-yellow-600">
                                                Continue Assessment
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
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Completed Assessments */}
                    {completedAttempts.length > 0 && (
                        <div>
                            <h2 className="mb-6 text-2xl font-bold text-gray-900">
                                Your Completed Assessments
                            </h2>
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                                {completedAttempts
                                    .slice(0, 3)
                                    .map((attempt) => {
                                        const assessment = assessments.find(
                                            (a) =>
                                                a.slug ===
                                                attempt.assessment_type.slug,
                                        );
                                        if (!assessment) return null;

                                        return (
                                            <Link
                                                key={attempt.id}
                                                href={`/assessments/${attempt.id}/results`}
                                                className="rounded-lg bg-white p-6 shadow transition-shadow hover:shadow-lg"
                                            >
                                                <div className="mb-4 flex items-center justify-between">
                                                    <span className="text-3xl">
                                                        {getIconForCategory(
                                                            assessment.category,
                                                        )}
                                                    </span>
                                                    <CheckCircle className="h-5 w-5 text-green-600" />
                                                </div>
                                                <h3 className="mb-2 text-lg font-bold text-gray-900">
                                                    {assessment.name}
                                                </h3>
                                                <p className="mb-4 text-sm text-gray-600">
                                                    Completed{' '}
                                                    {new Date(
                                                        attempt.completed_at!,
                                                    ).toLocaleDateString()}
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
                                        );
                                    })}
                            </div>
                        </div>
                    )}

                    {/* Available Assessments */}
                    <div>
                        <h2 className="mb-6 text-2xl font-bold text-gray-900">
                            Available Assessments
                        </h2>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            {assessments.map((assessment) => {
                                const hasCompleted = completedAttempts.some(
                                    (a) =>
                                        a.assessment_type.slug ===
                                        assessment.slug,
                                );

                                return (
                                    <div
                                        key={assessment.id}
                                        className={`overflow-hidden rounded-lg border-t-4 bg-white shadow transition-shadow hover:shadow-lg ${getBorderColorForCategory(
                                            assessment.category,
                                        )}`}
                                    >
                                        <div className="p-6">
                                            <div className="mb-4 flex items-start gap-4">
                                                <div className="text-4xl">
                                                    {getIconForCategory(
                                                        assessment.category,
                                                    )}
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="mb-2 text-xl font-bold text-gray-900">
                                                        {assessment.name}
                                                    </h3>
                                                    <p className="mb-3 text-gray-600">
                                                        {assessment.description}
                                                    </p>
                                                    <div className="flex items-center gap-4 text-sm text-gray-500">
                                                        <div className="flex items-center gap-1">
                                                            <Clock className="h-4 w-4" />
                                                            <span>
                                                                {
                                                                    assessment.estimated_duration
                                                                }{' '}
                                                                min
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <span>
                                                                {
                                                                    assessment.question_count
                                                                }{' '}
                                                                questions
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {hasCompleted ? (
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() =>
                                                            handleStartAssessment(
                                                                assessment.slug,
                                                            )
                                                        }
                                                        className="flex-1 rounded-lg bg-gray-200 px-4 py-2 text-center font-medium text-gray-800 transition-colors hover:bg-gray-300"
                                                    >
                                                        Retake Assessment
                                                    </button>
                                                </div>
                                            ) : (
                                                <button
                                                    onClick={() =>
                                                        handleStartAssessment(
                                                            assessment.slug,
                                                        )
                                                    }
                                                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-3 font-medium text-white transition-colors hover:from-indigo-700 hover:to-purple-700"
                                                >
                                                    <Play className="h-4 w-4" />
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
                    <div className="rounded-lg bg-white p-8 shadow">
                        <h2 className="mb-6 text-2xl font-bold text-gray-900">
                            Why Take Career Assessments?
                        </h2>
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                            <div className="flex flex-col items-center text-center">
                                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100">
                                    <Lightbulb className="h-8 w-8 text-indigo-600" />
                                </div>
                                <h3 className="mb-2 font-semibold text-gray-900">
                                    Self-Discovery
                                </h3>
                                <p className="text-sm text-gray-600">
                                    Gain deep insights into your interests,
                                    strengths, and career preferences through
                                    validated assessments
                                </p>
                            </div>
                            <div className="flex flex-col items-center text-center">
                                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100">
                                    <Target className="h-8 w-8 text-purple-600" />
                                </div>
                                <h3 className="mb-2 font-semibold text-gray-900">
                                    Career Guidance
                                </h3>
                                <p className="text-sm text-gray-600">
                                    Get personalized recommendations for careers
                                    that match your unique profile and
                                    aspirations
                                </p>
                            </div>
                            <div className="flex flex-col items-center text-center">
                                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                                    <TrendingUp className="h-8 w-8 text-green-600" />
                                </div>
                                <h3 className="mb-2 font-semibold text-gray-900">
                                    Skill Development
                                </h3>
                                <p className="text-sm text-gray-600">
                                    Identify skill gaps and create a
                                    personalized roadmap for professional growth
                                    and success
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* How It Works Section */}
                    <div className="rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 p-8">
                        <h2 className="mb-6 text-center text-2xl font-bold text-gray-900">
                            How It Works
                        </h2>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
                            <div className="text-center">
                                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 text-lg font-bold text-white">
                                    1
                                </div>
                                <h4 className="mb-2 font-semibold text-gray-900">
                                    Choose Assessment
                                </h4>
                                <p className="text-sm text-gray-600">
                                    Select an assessment that interests you
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 text-lg font-bold text-white">
                                    2
                                </div>
                                <h4 className="mb-2 font-semibold text-gray-900">
                                    Answer Questions
                                </h4>
                                <p className="text-sm text-gray-600">
                                    Respond honestly to all questions at your
                                    own pace
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 text-lg font-bold text-white">
                                    3
                                </div>
                                <h4 className="mb-2 font-semibold text-gray-900">
                                    Get Results
                                </h4>
                                <p className="text-sm text-gray-600">
                                    Receive detailed analysis and insights
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 text-lg font-bold text-white">
                                    4
                                </div>
                                <h4 className="mb-2 font-semibold text-gray-900">
                                    Explore Careers
                                </h4>
                                <p className="text-sm text-gray-600">
                                    Discover careers matched to your profile
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </PublicLayout>
    );
}
