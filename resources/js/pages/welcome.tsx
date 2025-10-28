import { dashboard, login, register } from '@/routes';
import { type ReactNode } from 'react';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Sparkles, ArrowRight, GraduationCap, Briefcase, BarChart3, MapPin, Clock, Star, CheckCircle, Users, Award, TrendingUp } from 'lucide-react';

export default function Welcome({
    canRegister = true,
}: {
    canRegister?: boolean;
}) {
    const { auth } = usePage<SharedData>().props;

    const features = [
        {
            icon: GraduationCap,
            title: "University Discovery",
            description:
                "Explore thousands of universities with detailed profiles, admission requirements, and campus insights.",
            color: "text-emerald-600",
            bgColor: "bg-emerald-50",
            borderColor: "border-emerald-200",
        },
        {
            icon: Briefcase,
            title: "Career Exploration",
            description:
                "Discover career paths with salary data, growth outlook, and required skills based on real market data.",
            color: "text-teal-600",
            bgColor: "bg-teal-50",
            borderColor: "border-teal-200",
        },
        {
            icon: BarChart3,
            title: "Data-Driven Insights",
            description: "Compare universities and careers with comprehensive data on outcomes, costs, and ROI.",
            color: "text-indigo-600",
            bgColor: "bg-indigo-50",
            borderColor: "border-indigo-200",
        },
        {
            icon: MapPin,
            title: "Personalized Mapping",
            description: "Create visual pathways connecting your interests to specific majors and career opportunities.",
            color: "text-emerald-600",
            bgColor: "bg-emerald-50",
            borderColor: "border-emerald-200",
        },
        {
            icon: Clock,
            title: "Multi-Year Planning",
            description: "Build detailed timelines with milestones, courses, internships, and skill development goals.",
            color: "text-teal-600",
            bgColor: "bg-teal-50",
            borderColor: "border-teal-200",
        },
        {
            icon: Star,
            title: "Smart Recommendations",
            description: "Get personalized suggestions based on your assessment results, interests, and career goals.",
            color: "text-indigo-600",
            bgColor: "bg-indigo-50",
            borderColor: "border-indigo-200",
        },
    ];

    const benefits = [
        "Personalized university and career recommendations",
        "Access to comprehensive data and insights",
        "Visual pathway mapping and planning tools",
        "Regular updates and progress tracking",
    ];

    const testimonials = [
        {
            name: "Sarah Chen",
            role: "Class of 2024",
            text: "Pathfinder helped me find the perfect university and career path. The data-driven insights were invaluable!",
            initials: "SC",
        },
        {
            name: "Marcus Johnson",
            role: "Career Changer",
            text: "As a career changer, I needed guidance. Pathfinder's assessment and recommendations were spot-on.",
            initials: "MJ",
        },
        {
            name: "Emma Rodriguez",
            role: "Class of 2025",
            text: "The comparison tools helped me make an informed decision. Highly recommend to all students!",
            initials: "ER",
        },
    ];

    return (
        <>
            <Head title="PathFinder - Navigate Your Future with Confidence" />
            <div className="min-h-screen bg-white dark:bg-gray-900">
                {/* Hero Section */}
                <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 opacity-60 -z-10"></div>
                    <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-100 dark:bg-emerald-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse -z-10"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-100 dark:bg-teal-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse -z-10"></div>

                    <div className="relative max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            {/* Left Content */}
                            <div className="space-y-8">
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 dark:bg-emerald-900 rounded-full">
                                    <Sparkles className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                                    <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">Trusted by 50,000+ students</span>
                                </div>

                                <div className="space-y-4">
                                    <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                                        Navigate Your Future with <span className="text-emerald-600 dark:text-emerald-400">Confidence</span>
                                    </h1>
                                    <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                                        Discover the perfect university programs and career paths tailored to your interests, skills, and goals.
                                        Make informed decisions with data-driven insights and personalized recommendations.
                                    </p>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Link
                                        href={auth.user ? dashboard() : register()}
                                        className="inline-flex items-center justify-center text-lg px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all font-semibold"
                                    >
                                        Start Your Journey
                                        <ArrowRight className="ml-2 h-5 w-5" />
                                    </Link>
                                    <Link
                                        href="/assessments"
                                        className="inline-flex items-center justify-center text-lg px-8 py-3 border-2 border-emerald-600 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950 rounded-lg transition-all font-semibold"
                                    >
                                        Take Free Assessment
                                    </Link>
                                </div>

                                {/* Trust Indicators */}
                                <div className="flex items-center gap-8 pt-4">
                                    <div>
                                        <div className="text-2xl font-bold text-gray-900 dark:text-white">95%</div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Success Rate</p>
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-gray-900 dark:text-white">2,500+</div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Universities</p>
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-gray-900 dark:text-white">50K+</div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Students Guided</p>
                                    </div>
                                </div>
                            </div>

                            {/* Right Visual */}
                            <div className="relative hidden lg:block">
                                <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-8 shadow-2xl">
                                    <div className="space-y-6">
                                        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                                            <div className="flex items-center justify-between mb-4">
                                                <span className="text-white font-semibold">Your Path</span>
                                                <div className="w-3 h-3 bg-emerald-300 rounded-full"></div>
                                            </div>
                                            <div className="space-y-3">
                                                <div className="h-2 bg-white/20 rounded-full w-full"></div>
                                                <div className="h-2 bg-white/20 rounded-full w-4/5"></div>
                                                <div className="h-2 bg-emerald-300 rounded-full w-3/5"></div>
                                            </div>
                                        </div>
                                        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                                            <div className="flex items-center gap-3 mb-4">
                                                <div className="w-10 h-10 bg-emerald-300 rounded-lg"></div>
                                                <div className="flex-1">
                                                    <div className="h-2 bg-white/20 rounded w-24"></div>
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <div className="h-2 bg-white/20 rounded-full"></div>
                                                <div className="h-2 bg-white/20 rounded-full w-4/5"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16 space-y-4">
                            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">Everything You Need</h2>
                            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                                From university selection to career planning, we provide comprehensive tools and insights to help you make
                                informed decisions about your future.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {features.map((feature, index) => (
                                <div
                                    key={index}
                                        className={`p-8 rounded-xl hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 ${feature.borderColor} ${feature.bgColor} dark:bg-gray-700 dark:border-gray-600`}
                                >
                                    <div className="flex items-start gap-4">
                                            <div className={`p-3 rounded-lg bg-white dark:bg-gray-800 flex-shrink-0 shadow-md`}>
                                                <feature.icon className={`h-6 w-6 ${feature.color}`} />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">{feature.title}</h3>
                                            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{feature.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="text-center mt-16">
                            <Link
                                href="/universities"
                                className="inline-flex items-center text-lg px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg shadow-lg font-semibold transition-all"
                            >
                                Explore All Features
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
                    <div className="max-w-7xl mx-auto">
                        {/* Main CTA Card */}
                        <div className="p-12 md:p-16 text-center bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl shadow-2xl mb-16">
                            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">Ready to Shape Your Future?</h2>
                            <p className="text-xl text-emerald-50 mb-8 max-w-2xl mx-auto">
                                Join thousands of students who have successfully navigated their educational and career journeys with
                                Pathfinder's guidance.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12 text-left max-w-2xl mx-auto">
                                {benefits.map((benefit, index) => (
                                    <div key={index} className="flex items-center gap-3">
                                        <CheckCircle className="h-5 w-5 text-emerald-200 flex-shrink-0" />
                                        <span className="text-white">{benefit}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    href={auth.user ? "/assessments" : register()}
                                    className="inline-flex items-center justify-center text-lg px-8 py-3 bg-white text-emerald-600 hover:bg-emerald-50 font-semibold rounded-lg shadow-lg transition-all"
                                >
                                    Start Free Assessment
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                                <Link
                                    href="/universities"
                                    className="inline-flex items-center justify-center text-lg px-8 py-3 bg-transparent border-2 border-white text-white hover:bg-white/10 rounded-lg transition-all"
                                >
                                    Learn More
                                </Link>
                            </div>
                        </div>

                        {/* Social Proof Section */}
                        <div className="space-y-8">
                            <div className="text-center">
                                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Trusted by Students Worldwide</h3>
                                <div className="flex flex-wrap justify-center gap-8 md:gap-16">
                                    <div className="text-center">
                                        <div className="flex items-center justify-center gap-2 mb-2">
                                            <Users className="h-5 w-5 text-emerald-600" />
                                            <span className="text-3xl font-bold text-gray-900 dark:text-white">50K+</span>
                                        </div>
                                        <p className="text-gray-600 dark:text-gray-400">Students Guided</p>
                                    </div>
                                    <div className="text-center">
                                        <div className="flex items-center justify-center gap-2 mb-2">
                                            <Award className="h-5 w-5 text-emerald-600" />
                                            <span className="text-3xl font-bold text-gray-900 dark:text-white">95%</span>
                                        </div>
                                        <p className="text-gray-600 dark:text-gray-400">Success Rate</p>
                                    </div>
                                    <div className="text-center">
                                        <div className="flex items-center justify-center gap-2 mb-2">
                                            <TrendingUp className="h-5 w-5 text-emerald-600" />
                                            <span className="text-3xl font-bold text-gray-900 dark:text-white">2,500+</span>
                                        </div>
                                        <p className="text-gray-600 dark:text-gray-400">Universities</p>
                                    </div>
                                </div>
                            </div>

                            {/* Testimonials */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {testimonials.map((testimonial, index) => (
                                    <div key={index} className="p-6 border-2 border-emerald-100 dark:border-emerald-900 rounded-xl hover:shadow-lg transition-all bg-white dark:bg-gray-800">
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold">
                                                {testimonial.initials}
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</p>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</p>
                                            </div>
                                        </div>
                                        <p className="text-gray-700 dark:text-gray-300 italic">"{testimonial.text}"</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}

// Ensure the landing page uses the public layout (no admin sidebar)
import PublicLayout from '@/layouts/public-layout';
Welcome.layout = (page: ReactNode) => <PublicLayout>{page}</PublicLayout>;
