import { Head } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accessibility as AccessibilityIcon, Eye, Keyboard, Volume2 } from 'lucide-react';

export default function Accessibility() {
    return (
        <>
            <Head title="Accessibility - Pathfinder" />
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                <section className="bg-gradient-to-r from-emerald-700 to-teal-600 py-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Accessibility</h1>
                        <p className="text-emerald-50 text-lg">Our commitment to accessibility for all users</p>
                    </div>
                </section>

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <AccessibilityIcon className="h-5 w-5 text-emerald-600" />
                                Our Commitment
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="text-gray-600 dark:text-gray-300">
                            <p>
                                Pathfinder is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards.
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Accessibility Features</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                                        <Keyboard className="h-4 w-4 text-emerald-600" />
                                        Keyboard Navigation
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Full keyboard navigation support for all interactive elements.</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                                        <Eye className="h-4 w-4 text-emerald-600" />
                                        Screen Reader Support
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Optimized for popular screen readers including NVDA and JAWS.</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                                        <Volume2 className="h-4 w-4 text-emerald-600" />
                                        Color Contrast
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">WCAG AA compliant color contrast ratios throughout the site.</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-2">Text Resize</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Content remains readable when text size is increased up to 200%.</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Feedback</CardTitle>
                        </CardHeader>
                        <CardContent className="text-gray-600 dark:text-gray-300">
                            <p>
                                We welcome your feedback on the accessibility of Pathfinder. Please contact us at:
                            </p>
                            <p className="mt-2">Email: <a href="mailto:accessibility@pathfinder.com" className="text-emerald-600 hover:underline">accessibility@pathfinder.com</a></p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}
