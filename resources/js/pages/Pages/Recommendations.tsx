import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Sparkles, GraduationCap, Briefcase, ArrowRight } from 'lucide-react';

export default function Recommendations() {
    return (
        <>
            <Head title="Your Recommendations - Pathfinder" />
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                <section className="bg-gradient-to-r from-emerald-700 to-teal-600 py-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex items-center gap-2 mb-2">
                            <Sparkles className="h-8 w-8 text-white" />
                            <h1 className="text-3xl md:text-4xl font-bold text-white">Your Personalized Recommendations</h1>
                        </div>
                        <p className="text-emerald-50 text-lg">Based on your assessments and profile</p>
                    </div>
                </section>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="mb-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
                        <p className="text-blue-900 dark:text-blue-100">
                            Complete your <Link href="/assessments" className="font-semibold underline">career assessment</Link> to receive personalized recommendations tailored to your interests, skills, and goals.
                        </p>
                    </div>

                    <div className="space-y-8">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <GraduationCap className="h-6 w-6 text-emerald-600" />
                                Recommended Universities
                            </h2>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Complete Assessment</CardTitle>
                                        <CardDescription>Take our career assessment to get personalized university recommendations</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <Link href="/assessments" className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium">
                                            Get Started <ArrowRight className="ml-2 h-4 w-4" />
                                        </Link>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <Briefcase className="h-6 w-6 text-emerald-600" />
                                Recommended Career Paths
                            </h2>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Complete Assessment</CardTitle>
                                        <CardDescription>Discover career paths that align with your strengths and interests</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <Link href="/assessments" className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium">
                                            Get Started <ArrowRight className="ml-2 h-4 w-4" />
                                        </Link>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
