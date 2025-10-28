import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HelpCircle, Mail, MessageSquare, BookOpen } from 'lucide-react';

export default function Help() {
    return (
        <>
            <Head title="Help Center - Pathfinder" />
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                <section className="bg-gradient-to-r from-emerald-700 to-teal-600 py-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Help Center</h1>
                        <p className="text-emerald-50 text-lg">Find answers to your questions</p>
                    </div>
                </section>

                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <HelpCircle className="h-5 w-5 text-emerald-600" />
                                    Getting Started
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                                    <li><Link href="#" className="hover:text-emerald-600">Creating your account</Link></li>
                                    <li><Link href="#" className="hover:text-emerald-600">Taking assessments</Link></li>
                                    <li><Link href="#" className="hover:text-emerald-600">Understanding recommendations</Link></li>
                                </ul>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <BookOpen className="h-5 w-5 text-emerald-600" />
                                    Using Pathfinder
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                                    <li><Link href="#" className="hover:text-emerald-600">Searching universities</Link></li>
                                    <li><Link href="#" className="hover:text-emerald-600">Exploring careers</Link></li>
                                    <li><Link href="#" className="hover:text-emerald-600">Comparing options</Link></li>
                                </ul>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <MessageSquare className="h-5 w-5 text-emerald-600" />
                                    Contact Support
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                                    Can't find what you're looking for? Our support team is here to help.
                                </p>
                                <a href="mailto:support@pathfinder.com" className="inline-flex items-center gap-2 text-emerald-600 hover:underline">
                                    <Mail className="h-4 w-4" />
                                    support@pathfinder.com
                                </a>
                            </CardContent>
                        </Card>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Frequently Asked Questions</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div>
                                <h3 className="font-semibold mb-2">How do I take an assessment?</h3>
                                <p className="text-gray-600 dark:text-gray-400">Navigate to the Assessments page and click "Start Assessment". Follow the prompts to complete the questionnaire.</p>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-2">Are recommendations personalized?</h3>
                                <p className="text-gray-600 dark:text-gray-400">Yes! All recommendations are based on your assessment results, interests, and goals.</p>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-2">Is Pathfinder free to use?</h3>
                                <p className="text-gray-600 dark:text-gray-400">Core features are free. Premium features may require a subscription.</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}
