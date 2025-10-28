import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Map, GraduationCap, Briefcase, FileText, Users } from 'lucide-react';

export default function Sitemap() {
    return (
        <>
            <Head title="Sitemap - Pathfinder" />
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                <section className="bg-gradient-to-r from-emerald-700 to-teal-600 py-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Sitemap</h1>
                        <p className="text-emerald-50 text-lg">Navigate our entire platform</p>
                    </div>
                </section>

                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Map className="h-5 w-5 text-emerald-600" />
                                    Main Pages
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2 text-sm">
                                    <li><Link href="/" className="text-emerald-600 hover:underline">Home</Link></li>
                                    <li><Link href="/dashboard" className="text-emerald-600 hover:underline">Dashboard</Link></li>
                                    <li><Link href="/about" className="text-emerald-600 hover:underline">About</Link></li>
                                    <li><Link href="/about/team" className="text-emerald-600 hover:underline">About • Team</Link></li>
                                    <li><Link href="/about/careers" className="text-emerald-600 hover:underline">About • Careers</Link></li>
                                    <li><Link href="/about/press" className="text-emerald-600 hover:underline">About • Press</Link></li>
                                    <li><Link href="/about/data" className="text-emerald-600 hover:underline">About • Our Data</Link></li>
                                    <li><Link href="/about/partnerships" className="text-emerald-600 hover:underline">About • Partnerships</Link></li>
                                    <li><Link href="/about/contact" className="text-emerald-600 hover:underline">About • Contact</Link></li>
                                </ul>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <GraduationCap className="h-5 w-5 text-emerald-600" />
                                    Explore
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2 text-sm">
                                    <li><Link href="/universities" className="text-emerald-600 hover:underline">Universities</Link></li>
                                    <li><Link href="/courses" className="text-emerald-600 hover:underline">Courses</Link></li>
                                    <li><Link href="/locations" className="text-emerald-600 hover:underline">Locations</Link></li>
                                    <li><Link href="/compare" className="text-emerald-600 hover:underline">Compare</Link></li>
                                    <li><Link href="/course-eligibility" className="text-emerald-600 hover:underline">Course Eligibility</Link></li>
                                </ul>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Briefcase className="h-5 w-5 text-emerald-600" />
                                    Careers
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2 text-sm">
                                    <li><Link href="/careers" className="text-emerald-600 hover:underline">Career Paths</Link></li>
                                    <li><Link href="/companies" className="text-emerald-600 hover:underline">Companies</Link></li>
                                    <li><Link href="/assessments" className="text-emerald-600 hover:underline">Assessments</Link></li>
                                </ul>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Users className="h-5 w-5 text-emerald-600" />
                                    Community
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2 text-sm">
                                    <li><Link href="/alumni" className="text-emerald-600 hover:underline">Alumni Network</Link></li>
                                    <li><Link href="/blog" className="text-emerald-600 hover:underline">Blog</Link></li>
                                    <li><Link href="/competitions" className="text-emerald-600 hover:underline">Competitions</Link></li>
                                </ul>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <FileText className="h-5 w-5 text-emerald-600" />
                                    Resources
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2 text-sm">
                                    <li><Link href="/resources" className="text-emerald-600 hover:underline">Resource Library</Link></li>
                                    <li><Link href="/marketplace" className="text-emerald-600 hover:underline">Marketplace</Link></li>
                                    <li><Link href="/help" className="text-emerald-600 hover:underline">Help Center</Link></li>
                                </ul>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Legal</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2 text-sm">
                                    <li><Link href="/terms" className="text-emerald-600 hover:underline">Terms of Service</Link></li>
                                    <li><Link href="/privacy" className="text-emerald-600 hover:underline">Privacy Policy</Link></li>
                                    <li><Link href="/accessibility" className="text-emerald-600 hover:underline">Accessibility</Link></li>
                                </ul>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
}
