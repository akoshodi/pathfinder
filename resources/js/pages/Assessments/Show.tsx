import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

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
            <section className={`bg-gradient-to-r ${getColorForType(assessment.type)} text-white py-12 px-4 sm:px-6 lg:px-8`}>
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center gap-4 mb-4">
                        <span className="text-6xl">{getIconForType(assessment.type)}</span>
                        <div>
                            <h1 className="text-4xl font-bold mb-2">{assessment.type} Assessment</h1>
                            <p className="text-lg opacity-90">Completed on {assessment.completed_at}</p>
                        </div>
                    </div>
                </div>
            </section>

            <main className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Results Overview */}
                            <section className="bg-white rounded-lg shadow p-6">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Results</h2>
                                
                                {assessment.results && typeof assessment.results === 'object' && (
                                    <div className="space-y-6">
                                        {Object.entries(assessment.results).map(([key, value], index) => (
                                            <div key={index}>
                                                <div className="flex items-center justify-between mb-2">
                                                    <h3 className="font-semibold text-gray-900 capitalize">
                                                        {key.replace(/_/g, ' ')}
                                                    </h3>
                                                    {typeof value === 'number' && (
                                                        <span className="font-bold text-indigo-600">{value}%</span>
                                                    )}
                                                </div>
                                                {typeof value === 'number' && (
                                                    <div className="w-full bg-gray-200 rounded-full h-3">
                                                        <div
                                                            className="bg-indigo-600 h-3 rounded-full transition-all"
                                                            style={{ width: `${value}%` }}
                                                        ></div>
                                                    </div>
                                                )}
                                                {typeof value === 'string' && (
                                                    <p className="text-gray-700">{value}</p>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {!assessment.results && (
                                    <p className="text-gray-600">Results are being processed...</p>
                                )}
                            </section>

                            {/* Recommendations */}
                            {assessment.recommendations && assessment.recommendations.length > 0 && (
                                <section className="bg-white rounded-lg shadow p-6">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Recommendations</h2>
                                    <div className="space-y-4">
                                        {assessment.recommendations.map((recommendation: any, index: number) => (
                                            <div
                                                key={index}
                                                className="p-4 bg-indigo-50 rounded-lg border-l-4 border-indigo-600"
                                            >
                                                {typeof recommendation === 'string' ? (
                                                    <p className="text-gray-800">{recommendation}</p>
                                                ) : (
                                                    <>
                                                        {recommendation.title && (
                                                            <h3 className="font-semibold text-gray-900 mb-2">
                                                                {recommendation.title}
                                                            </h3>
                                                        )}
                                                        {recommendation.description && (
                                                            <p className="text-gray-700 text-sm">
                                                                {recommendation.description}
                                                            </p>
                                                        )}
                                                    </>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* Your Answers */}
                            <section className="bg-white rounded-lg shadow p-6">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Answers</h2>
                                <div className="space-y-6">
                                    {assessment.questions && assessment.answers && assessment.questions.map((question: any, index: number) => (
                                        <div key={index} className="pb-6 border-b border-gray-200 last:border-b-0">
                                            <h3 className="font-semibold text-gray-900 mb-2">
                                                {index + 1}. {typeof question === 'string' ? question : question.text}
                                            </h3>
                                            <p className="text-gray-700 pl-6">
                                                {typeof assessment.answers[index] === 'string'
                                                    ? assessment.answers[index]
                                                    : JSON.stringify(assessment.answers[index])}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Quick Stats */}
                            <div className="bg-white rounded-lg shadow p-6">
                                <h3 className="font-bold text-lg mb-4 text-gray-900">Assessment Details</h3>
                                <div className="space-y-4 text-sm">
                                    <div>
                                        <div className="text-gray-600 mb-1">Type</div>
                                        <div className="font-semibold">{assessment.type}</div>
                                    </div>
                                    <div>
                                        <div className="text-gray-600 mb-1">Completed</div>
                                        <div className="font-semibold">{assessment.completed_at}</div>
                                    </div>
                                    <div>
                                        <div className="text-gray-600 mb-1">Questions</div>
                                        <div className="font-semibold">{assessment.questions?.length || 0}</div>
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="bg-white rounded-lg shadow p-6">
                                <h3 className="font-bold text-lg mb-4 text-gray-900">Next Steps</h3>
                                <div className="space-y-3">
                                    <Link
                                        href="/assessments"
                                        className="block w-full px-4 py-2 bg-indigo-600 text-white text-center rounded-lg hover:bg-indigo-700 transition-colors"
                                    >
                                        Take Another Assessment
                                    </Link>
                                    <Link
                                        href="/careers"
                                        className="block w-full px-4 py-2 bg-gray-200 text-gray-800 text-center rounded-lg hover:bg-gray-300 transition-colors"
                                    >
                                        Explore Careers
                                    </Link>
                                    <Link
                                        href="/courses"
                                        className="block w-full px-4 py-2 bg-gray-200 text-gray-800 text-center rounded-lg hover:bg-gray-300 transition-colors"
                                    >
                                        Browse Courses
                                    </Link>
                                </div>
                            </div>

                            {/* Share */}
                            <div className="bg-white rounded-lg shadow p-6">
                                <h3 className="font-bold text-lg mb-4 text-gray-900">Share Results</h3>
                                <p className="text-sm text-gray-600 mb-4">
                                    Share your assessment results with mentors or career advisors
                                </p>
                                <button className="w-full px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors">
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
