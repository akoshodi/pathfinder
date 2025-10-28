import { Head } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Shield } from 'lucide-react';

export default function Terms() {
    return (
        <>
            <Head title="Terms of Service - Pathfinder" />
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                <section className="bg-gradient-to-r from-emerald-700 to-teal-600 py-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Terms of Service</h1>
                        <p className="text-emerald-50 text-lg">Last updated: October 23, 2025</p>
                    </div>
                </section>

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <FileText className="h-5 w-5 text-emerald-600" />
                                1. Acceptance of Terms
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            <p>
                                By accessing and using Pathfinder's services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>2. Use License</CardTitle>
                        </CardHeader>
                        <CardContent className="text-gray-600 dark:text-gray-300 leading-relaxed space-y-4">
                            <p>
                                Permission is granted to temporarily access the materials on Pathfinder's platform for personal, non-commercial transitory viewing only.
                            </p>
                            <p className="font-semibold">This is the grant of a license, not a transfer of title, and under this license you may not:</p>
                            <ul className="list-disc ml-6 space-y-2">
                                <li>modify or copy the materials;</li>
                                <li>use the materials for any commercial purpose or for any public display;</li>
                                <li>attempt to reverse engineer any software contained on Pathfinder's platform;</li>
                                <li>remove any copyright or other proprietary notations from the materials;</li>
                            </ul>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>3. User Accounts</CardTitle>
                        </CardHeader>
                        <CardContent className="text-gray-600 dark:text-gray-300 leading-relaxed space-y-4">
                            <p>
                                When you create an account with us, you must provide accurate, complete, and current information at all times. Failure to do so constitutes a breach of the Terms.
                            </p>
                            <p>
                                You are responsible for safeguarding the password that you use to access the service and for any activities or actions under your password.
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Shield className="h-5 w-5 text-emerald-600" />
                                4. Disclaimer
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            <p>
                                The materials on Pathfinder's platform are provided on an 'as is' basis. Pathfinder makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property.
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>5. Contact Us</CardTitle>
                        </CardHeader>
                        <CardContent className="text-gray-600 dark:text-gray-300">
                            <p>If you have any questions about these Terms, please contact us at:</p>
                            <p className="mt-2">Email: <a href="mailto:legal@pathfinder.com" className="text-emerald-600 hover:underline">legal@pathfinder.com</a></p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}
