import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';

interface Assessment {
    id: number;
    type: string;
    questions: any[];
    answers: any[];
    results: any;
    recommendations: any[];
    completed_at: string;
}

interface Props {
    assessment: Assessment;
}

export default function AssessmentsShow({ assessment }: Props) {
    const getIconForType = (type: string) => {
        const icons: { [key: string]: string } = {
            Interest: '🎯',
            Skills: '⚡',
            'Career Fit': '🎓',
            Personality: '🧠',
        };
        return icons[type] || '📊';
    };

    const getColorForType = (type: string) => {
        const colors: { [key: string]: string } = {
            Interest: 'from-blue-600 to-blue-700',
            Skills: 'from-purple-600 to-purple-700',
            'Career Fit': 'from-green-600 to-green-700',
            Personality: 'from-amber-600 to-amber-700',
        };
        return colors[type] || 'from-indigo-600 to-indigo-700';
    };

    return (
        <AppLayout>
            <Head title={`${assessment.type} Assessment Results`} />

            {/* Hero Section */}
            <section
                className={`bg-gradient-to-r ${getColorForType(assessment.type)} px-4 py-12 text-white sm:px-6 lg:px-8`}
            >
                <div className="mx-auto max-w-7xl">
                    <div className="mb-4 flex items-center gap-4">
                        <span className="text-6xl">
                            {getIconForType(assessment.type)}
                        </span>
                        <div>
                            <h1 className="mb-2 text-4xl font-bold">
                                {assessment.type} Assessment
                            </h1>
                            <p className="text-lg opacity-90">
                                Completed on {assessment.completed_at}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <main className="bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                        {/* Main Content */}
                        <div className="space-y-8 lg:col-span-2">
                            {/* Results Overview */}
                            <section className="rounded-lg bg-white p-6 shadow">
                                <h2 className="mb-6 text-2xl font-bold text-gray-900">
                                    Your Results
                                </h2>

                                {assessment.results &&
                                    typeof assessment.results === 'object' && (
                                        <div className="space-y-6">
                                            {Object.entries(
                                                assessment.results,
                                            ).map(([key, value], index) => (
                                                <div key={index}>
                                                    <div className="mb-2 flex items-center justify-between">
                                                        <h3 className="font-semibold text-gray-900 capitalize">
                                                            {key.replace(
                                                                /_/g,
                                                                ' ',
                                                            )}
                                                        </h3>
                                                        {typeof value ===
                                                            'number' && (
                                                            <span className="font-bold text-indigo-600">
                                                                {value}%
                                                            </span>
                                                        )}
                                                    </div>
                                                    {typeof value ===
                                                        'number' && (
                                                        <div className="h-3 w-full rounded-full bg-gray-200">
                                                            <div
                                                                className="h-3 rounded-full bg-indigo-600 transition-all"
                                                                style={{
                                                                    width: `${value}%`,
                                                                }}
                                                            ></div>
                                                        </div>
                                                    )}
                                                    {typeof value ===
                                                        'string' && (
                                                        <p className="text-gray-700">
                                                            {value}
                                                        </p>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                {!assessment.results && (
                                    <p className="text-gray-600">
                                        Results are being processed...
                                    </p>
                                )}
                            </section>

                            {/* Recommendations */}
                            {assessment.recommendations &&
                                assessment.recommendations.length > 0 && (
                                    <section className="rounded-lg bg-white p-6 shadow">
                                        <h2 className="mb-6 text-2xl font-bold text-gray-900">
                                            Recommendations
                                        </h2>
                                        <div className="space-y-4">
                                            {assessment.recommendations.map(
                                                (
                                                    recommendation: any,
                                                    index: number,
                                                ) => (
                                                    <div
                                                        key={index}
                                                        className="rounded-lg border-l-4 border-indigo-600 bg-indigo-50 p-4"
                                                    >
                                                        {typeof recommendation ===
                                                        'string' ? (
                                                            <p className="text-gray-800">
                                                                {recommendation}
                                                            </p>
                                                        ) : (
                                                            <>
                                                                {recommendation.title && (
                                                                    <h3 className="mb-2 font-semibold text-gray-900">
                                                                        {
                                                                            recommendation.title
                                                                        }
                                                                    </h3>
                                                                )}
                                                                {recommendation.description && (
                                                                    <p className="text-sm text-gray-700">
                                                                        {
                                                                            recommendation.description
                                                                        }
                                                                    </p>
                                                                )}
                                                            </>
                                                        )}
                                                    </div>
                                                ),
                                            )}
                                        </div>
                                    </section>
                                )}

                            {/* Your Answers */}
                            <section className="rounded-lg bg-white p-6 shadow">
                                <h2 className="mb-6 text-2xl font-bold text-gray-900">
                                    Your Answers
                                </h2>
                                <div className="space-y-6">
                                    {assessment.questions &&
                                        assessment.answers &&
                                        assessment.questions.map(
                                            (question: any, index: number) => (
                                                <div
                                                    key={index}
                                                    className="border-b border-gray-200 pb-6 last:border-b-0"
                                                >
                                                    <h3 className="mb-2 font-semibold text-gray-900">
                                                        {index + 1}.{' '}
                                                        {typeof question ===
                                                        'string'
                                                            ? question
                                                            : question.text}
                                                    </h3>
                                                    <p className="pl-6 text-gray-700">
                                                        {typeof assessment
                                                            .answers[index] ===
                                                        'string'
                                                            ? assessment
                                                                  .answers[
                                                                  index
                                                              ]
                                                            : JSON.stringify(
                                                                  assessment
                                                                      .answers[
                                                                      index
                                                                  ],
                                                              )}
                                                    </p>
                                                </div>
                                            ),
                                        )}
                                </div>
                            </section>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Quick Stats */}
                            <div className="rounded-lg bg-white p-6 shadow">
                                <h3 className="mb-4 text-lg font-bold text-gray-900">
                                    Assessment Details
                                </h3>
                                <div className="space-y-4 text-sm">
                                    <div>
                                        <div className="mb-1 text-gray-600">
                                            Type
                                        </div>
                                        <div className="font-semibold">
                                            {assessment.type}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="mb-1 text-gray-600">
                                            Completed
                                        </div>
                                        <div className="font-semibold">
                                            {assessment.completed_at}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="mb-1 text-gray-600">
                                            Questions
                                        </div>
                                        <div className="font-semibold">
                                            {assessment.questions?.length || 0}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="rounded-lg bg-white p-6 shadow">
                                <h3 className="mb-4 text-lg font-bold text-gray-900">
                                    Next Steps
                                </h3>
                                <div className="space-y-3">
                                    <Link
                                        href="/assessments"
                                        className="block w-full rounded-lg bg-indigo-600 px-4 py-2 text-center text-white transition-colors hover:bg-indigo-700"
                                    >
                                        Take Another Assessment
                                    </Link>
                                    <Link
                                        href="/careers"
                                        className="block w-full rounded-lg bg-gray-200 px-4 py-2 text-center text-gray-800 transition-colors hover:bg-gray-300"
                                    >
                                        Explore Careers
                                    </Link>
                                    <Link
                                        href="/courses"
                                        className="block w-full rounded-lg bg-gray-200 px-4 py-2 text-center text-gray-800 transition-colors hover:bg-gray-300"
                                    >
                                        Browse Courses
                                    </Link>
                                </div>
                            </div>

                            {/* Share */}
                            <div className="rounded-lg bg-white p-6 shadow">
                                <h3 className="mb-4 text-lg font-bold text-gray-900">
                                    Share Results
                                </h3>
                                <p className="mb-4 text-sm text-gray-600">
                                    Share your assessment results with mentors
                                    or career advisors
                                </p>
                                <button className="w-full rounded-lg bg-gray-200 px-4 py-2 text-gray-800 transition-colors hover:bg-gray-300">
                                    Generate Share Link
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </AppLayout>
    );
}
