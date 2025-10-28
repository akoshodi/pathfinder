import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

interface Assessment {
    id: number;
    type: string;
    completed_at: string;
    results: any;
}

interface Props {
    assessments: Assessment[];
}

export default function AssessmentsIndex({ assessments }: Props) {
    const assessmentTypes = [
        {
            type: 'Interest',
            title: 'Career Interest Assessment',
            description: 'Discover careers that align with your interests and passions',
            icon: '🎯',
            color: 'bg-blue-500',
        },
        {
            type: 'Skills',
            title: 'Skills Assessment',
            description: 'Evaluate your current skills and identify areas for growth',
            icon: '⚡',
            color: 'bg-purple-500',
        },
        {
            type: 'Career Fit',
            title: 'Career Fit Analysis',
            description: 'Find careers that match your personality and work style',
            icon: '🎓',
            color: 'bg-green-500',
        },
        {
            type: 'Personality',
            title: 'Personality Assessment',
            description: 'Understand your personality traits and how they impact your career',
            icon: '🧠',
            color: 'bg-amber-500',
        },
    ];

    const handleStartAssessment = (type: string) => {
        router.post('/assessments', { type });
    };

    const getCompletedAssessment = (type: string) => {
        return assessments.find((a) => a.type === type);
    };

    return (
        <AppLayout>
            <Head title="Career Assessments" />

            {/* Hero Section */}
            <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-4xl font-bold mb-4">Career Assessments</h1>
                    <p className="text-lg text-indigo-100">
                        Take personalized assessments to discover your strengths and find the right career path
                    </p>
                </div>
            </section>

            {/* Assessments Overview */}
            <main className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    {/* Your Assessments */}
                    {assessments.length > 0 && (
                        <div className="mb-12">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Completed Assessments</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {assessments.map((assessment) => (
                                    <Link
                                        key={assessment.id}
                                        href={`/assessments/${assessment.id}`}
                                        className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6"
                                    >
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="font-bold text-lg text-gray-900">{assessment.type} Assessment</h3>
                                            <span className="text-2xl">
                                                {
                                                    assessmentTypes.find((t) => t.type === assessment.type)
                                                        ?.icon
                                                }
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-600 mb-4">
                                            Completed on {assessment.completed_at}
                                        </p>
                                        <div className="flex items-center text-indigo-600 text-sm font-medium">
                                            View Results
                                            <svg
                                                className="h-4 w-4 ml-1"
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
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Assessments</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {assessmentTypes.map((assessmentType) => {
                                const completed = getCompletedAssessment(assessmentType.type);
                                return (
                                    <div
                                        key={assessmentType.type}
                                        className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden"
                                    >
                                        <div className={`${assessmentType.color} h-2`}></div>
                                        <div className="p-6">
                                            <div className="flex items-start gap-4 mb-4">
                                                <div className="text-4xl">{assessmentType.icon}</div>
                                                <div className="flex-1">
                                                    <h3 className="font-bold text-xl text-gray-900 mb-2">
                                                        {assessmentType.title}
                                                    </h3>
                                                    <p className="text-gray-600">{assessmentType.description}</p>
                                                </div>
                                            </div>

                                            {completed ? (
                                                <div className="space-y-2">
                                                    <div className="flex items-center text-sm text-green-600 mb-3">
                                                        <svg
                                                            className="h-5 w-5 mr-2"
                                                            fill="currentColor"
                                                            viewBox="0 0 20 20"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>
                                                        Completed on {completed.completed_at}
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <Link
                                                            href={`/assessments/${completed.id}`}
                                                            className="flex-1 px-4 py-2 bg-indigo-600 text-white text-center rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                                                        >
                                                            View Results
                                                        </Link>
                                                        <button
                                                            onClick={() => handleStartAssessment(assessmentType.type)}
                                                            className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 text-center rounded-lg hover:bg-gray-300 transition-colors font-medium"
                                                        >
                                                            Retake
                                                        </button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <button
                                                    onClick={() => handleStartAssessment(assessmentType.type)}
                                                    className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
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
                    <div className="mt-12 bg-white rounded-lg shadow p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Take Career Assessments?</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="flex items-start">
                                <div className="flex-shrink-0 w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mr-4">
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
                                    <h3 className="font-semibold text-gray-900 mb-2">Self-Discovery</h3>
                                    <p className="text-sm text-gray-600">
                                        Gain insights into your strengths, interests, and career preferences
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="flex-shrink-0 w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mr-4">
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
                                    <h3 className="font-semibold text-gray-900 mb-2">Career Guidance</h3>
                                    <p className="text-sm text-gray-600">
                                        Get personalized recommendations for careers that match your profile
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="flex-shrink-0 w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mr-4">
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
                                    <h3 className="font-semibold text-gray-900 mb-2">Skill Development</h3>
                                    <p className="text-sm text-gray-600">
                                        Identify skill gaps and create a plan for professional growth
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
