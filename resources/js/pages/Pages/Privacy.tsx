import { Head } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lock, Eye, Database, UserCheck } from 'lucide-react';

export default function Privacy() {
    return (
        <>
            <Head title="Privacy Policy - Pathfinder" />
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                <section className="bg-gradient-to-r from-emerald-700 to-teal-600 py-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Privacy Policy</h1>
                        <p className="text-emerald-50 text-lg">Last updated: October 23, 2025</p>
                    </div>
                </section>

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Lock className="h-5 w-5 text-emerald-600" />
                                Information We Collect
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="text-gray-600 dark:text-gray-300 space-y-4">
                            <div>
                                <h3 className="font-semibold mb-2">Personal Information:</h3>
                                <p>When you register for an account, we collect information such as your name, email address, and educational background.</p>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-2">Usage Data:</h3>
                                <p>We collect information about how you interact with our platform, including pages visited and features used.</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Eye className="h-5 w-5 text-emerald-600" />
                                How We Use Your Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="text-gray-600 dark:text-gray-300">
                            <ul className="space-y-2 list-disc ml-6">
                                <li>To provide and maintain our service</li>
                                <li>To personalize your experience and recommendations</li>
                                <li>To communicate with you about your account</li>
                                <li>To improve and develop our services</li>
                                <li>To ensure security and prevent fraud</li>
                            </ul>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Database className="h-5 w-5 text-emerald-600" />
                                Data Security
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="text-gray-600 dark:text-gray-300">
                            <p>
                                We implement appropriate security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <UserCheck className="h-5 w-5 text-emerald-600" />
                                Your Rights
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="text-gray-600 dark:text-gray-300">
                            <p>You have the right to:</p>
                            <ul className="space-y-2 list-disc ml-6 mt-2">
                                <li>Access your personal data</li>
                                <li>Correct inaccurate data</li>
                                <li>Request deletion of your data</li>
                                <li>Object to processing of your data</li>
                                <li>Data portability</li>
                            </ul>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Contact Us</CardTitle>
                        </CardHeader>
                        <CardContent className="text-gray-600 dark:text-gray-300">
                            <p>For privacy-related questions, contact us at:</p>
                            <p className="mt-2">Email: <a href="mailto:privacy@pathfinder.com" className="text-emerald-600 hover:underline">privacy@pathfinder.com</a></p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}
