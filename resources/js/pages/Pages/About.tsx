import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Database, Users, TrendingUp, Shield, Award, Globe, Briefcase, Handshake } from 'lucide-react';

export default function About() {
    const [activeTab, setActiveTab] = useState('overview');

    const tabs = [
        { id: 'overview', label: 'Overview', icon: Award },
        { id: 'data', label: 'Our Data', icon: Database },
        { id: 'press', label: 'Press', icon: Globe },
        { id: 'careers', label: 'Working at Pathfinder', icon: Briefcase },
        { id: 'partnerships', label: 'Partnerships', icon: Handshake },
    ];

    return (
        <>
            <Head title="About Pathfinder" />
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                <section className="bg-gradient-to-r from-emerald-700 to-teal-600 py-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex items-center gap-6">
                            <div className="flex-shrink-0">
                                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg">
                                    <div className="text-center">
                                        <div className="text-xs font-bold text-emerald-800">ABOUT</div>
                                        <div className="text-xs font-bold text-emerald-800">PATH</div>
                                        <div className="text-xs font-bold text-emerald-800">FINDER</div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">About Pathfinder</h1>
                                <p className="text-emerald-50 text-lg max-w-4xl leading-relaxed">
                                    Empowering students and career changers with comprehensive, data-driven insights to make informed
                                    educational and professional decisions.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-200 dark:border-gray-700">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-2 px-4 py-3 font-medium transition-all border-b-2 ${
                                        activeTab === tab.id
                                            ? 'border-emerald-600 text-emerald-600'
                                            : 'border-transparent text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200'
                                    }`}
                                >
                                    <Icon className="h-4 w-4" />
                                    {tab.label}
                                </button>
                            );
                        })}
                    </div>

                    {activeTab === 'overview' && (
                        <div className="space-y-8">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Award className="h-5 w-5 text-emerald-600" />
                                        Our Mission
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                        At Pathfinder, we believe that every individual deserves access to accurate, comprehensive information
                                        when making life-changing educational and career decisions. Our platform combines cutting-edge data
                                        analytics with personalized assessments to provide tailored recommendations that align with your
                                        interests, skills, and goals.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Our Vision</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                        We envision a world where every student has access to the tools and insights needed to make informed
                                        decisions about their future. By democratizing access to educational and career data, we empower
                                        individuals to take control of their destinies and achieve their full potential.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Our Values</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid md:grid-cols-3 gap-6">
                                        <div>
                                            <h3 className="font-semibold mb-2">Data-Driven</h3>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                We rely on accurate, verified data from trusted sources to provide reliable insights.
                                            </p>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold mb-2">Inclusive</h3>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                We believe everyone deserves access to quality guidance regardless of background or resources.
                                            </p>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold mb-2">Transparent</h3>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                We are open about our methodologies, data sources, and how we generate recommendations.
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )}

                    {activeTab === 'data' && (
                        <div className="space-y-8">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Database className="h-5 w-5 text-emerald-600" />
                                        Our Data Sources
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div>
                                        <h3 className="font-semibold mb-2 flex items-center gap-2">
                                            <Globe className="h-4 w-4" />
                                            University Data
                                        </h3>
                                        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400 ml-6">
                                            <li>• U.S. Department of Education's College Scorecard</li>
                                            <li>• National Center for Education Statistics (NCES)</li>
                                            <li>• Integrated Postsecondary Education Data System (IPEDS)</li>
                                            <li>• University websites and official publications</li>
                                            <li>• Student outcome surveys and alumni data</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold mb-2 flex items-center gap-2">
                                            <TrendingUp className="h-4 w-4" />
                                            Career & Labor Market Data
                                        </h3>
                                        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400 ml-6">
                                            <li>• U.S. Bureau of Labor Statistics (BLS)</li>
                                            <li>• Occupational Employment and Wage Statistics (OEWS)</li>
                                            <li>• O*NET Interest Profiler and Skills Database</li>
                                            <li>• Industry reports from leading research firms</li>
                                        </ul>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )}

                    {activeTab === 'press' && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Press Releases</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="border-l-4 border-emerald-600 pl-4">
                                    <h3 className="font-semibold mb-1">Pathfinder Launches AI-Powered Career Guidance</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">January 15, 2025</p>
                                    <p className="text-gray-600 dark:text-gray-300">
                                        Pathfinder announces the launch of its advanced AI recommendation engine.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {activeTab === 'careers' && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Join Our Team</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600 dark:text-gray-300 mb-6">
                                    We're building the future of educational and career guidance. If you're passionate about helping
                                    students succeed, we'd love to hear from you.
                                </p>
                            </CardContent>
                        </Card>
                    )}

                    {activeTab === 'partnerships' && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Handshake className="h-5 w-5 text-emerald-600" />
                                    Partner With Us
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                    We partner with universities, employers, and educational organizations to provide students with
                                    the best possible guidance and opportunities.
                                </p>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </>
    );
}
