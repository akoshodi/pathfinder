import { Link } from '@inertiajs/react';
import { Compass, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-emerald-400">
                            <Compass className="h-6 w-6" />
                            Pathfinder
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Empowering students and career changers with data-driven insights to make informed
                            educational and professional decisions.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
                                <Facebook className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
                                <Twitter className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
                                <Instagram className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
                                <Linkedin className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    {/* Explore */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-white">Explore</h3>
                        <div className="space-y-2">
                            <Link
                                href="/universities"
                                className="block text-sm text-gray-400 hover:text-emerald-400 transition-colors"
                            >
                                Universities
                            </Link>
                            <Link
                                href="/careers"
                                className="block text-sm text-gray-400 hover:text-emerald-400 transition-colors"
                            >
                                Careers
                            </Link>
                            <Link
                                href="/locations"
                                className="block text-sm text-gray-400 hover:text-emerald-400 transition-colors"
                            >
                                Locations
                            </Link>
                            <Link
                                href="/assessments"
                                className="block text-sm text-gray-400 hover:text-emerald-400 transition-colors"
                            >
                                Take Assessment
                            </Link>
                            <Link
                                href="/recommendations"
                                className="block text-sm text-gray-400 hover:text-emerald-400 transition-colors"
                            >
                                Recommendations
                            </Link>
                        </div>
                    </div>

                    {/* Discover */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-white">Discover</h3>
                        <div className="space-y-2">
                            <Link
                                href="/courses"
                                className="block text-sm text-gray-400 hover:text-emerald-400 transition-colors"
                            >
                                Courses
                            </Link>
                            <Link
                                href="/resources"
                                className="block text-sm text-gray-400 hover:text-emerald-400 transition-colors"
                            >
                                Resources
                            </Link>
                            <Link
                                href="/alumni"
                                className="block text-sm text-gray-400 hover:text-emerald-400 transition-colors"
                            >
                                Alumni Network
                            </Link>
                            <Link
                                href="/course-eligibility"
                                className="block text-sm text-gray-400 hover:text-emerald-400 transition-colors"
                            >
                                Course Eligibility
                            </Link>
                            <Link
                                href="/compare"
                                className="block text-sm text-gray-400 hover:text-emerald-400 transition-colors"
                            >
                                Compare Options
                            </Link>
                        </div>
                    </div>

                    {/* Community */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-white">Community</h3>
                        <div className="space-y-2">
                            <Link
                                href="/companies"
                                className="block text-sm text-gray-400 hover:text-emerald-400 transition-colors"
                            >
                                Companies
                            </Link>
                            <Link
                                href="/alumni"
                                className="block text-sm text-gray-400 hover:text-emerald-400 transition-colors"
                            >
                                Alumni Network
                            </Link>
                            <Link
                                href="/competitions"
                                className="block text-sm text-gray-400 hover:text-emerald-400 transition-colors"
                            >
                                Competitions
                            </Link>
                            <Link
                                href="/blog"
                                className="block text-sm text-gray-400 hover:text-emerald-400 transition-colors"
                            >
                                News & Updates
                            </Link>
                        </div>
                    </div>

                    {/* Premium */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-white">Premium</h3>
                        <div className="space-y-2">
                            <Link
                                href="/marketplace"
                                className="block text-sm text-gray-400 hover:text-emerald-400 transition-colors"
                            >
                                Marketplace
                            </Link>
                            <Link
                                href="/dashboard"
                                className="block text-sm text-gray-400 hover:text-emerald-400 transition-colors"
                            >
                                Dashboard
                            </Link>
                            <Link
                                href="/my-saved-items"
                                className="block text-sm text-gray-400 hover:text-emerald-400 transition-colors"
                            >
                                Saved Items
                            </Link>
                        </div>
                    </div>

                    {/* Company */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-white">Company</h3>
                        <div className="space-y-2">
                            <Link
                                href="/about"
                                className="block text-sm text-gray-400 hover:text-emerald-400 transition-colors"
                            >
                                About Us
                            </Link>
                            <Link
                                href="/blog"
                                className="block text-sm text-gray-400 hover:text-emerald-400 transition-colors"
                            >
                                Blog
                            </Link>
                            <Link
                                href="/claim-school"
                                className="block text-sm text-gray-400 hover:text-emerald-400 transition-colors"
                            >
                                Claim Your School
                            </Link>
                            <Link
                                href="/help"
                                className="block text-sm text-gray-400 hover:text-emerald-400 transition-colors"
                            >
                                Help Center
                            </Link>
                            <Link
                                href="/privacy"
                                className="block text-sm text-gray-400 hover:text-emerald-400 transition-colors"
                            >
                                Privacy Policy
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-gray-400">© 2025 Pathfinder. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link
                            href="/terms"
                            className="text-sm text-gray-400 hover:text-emerald-400 transition-colors"
                        >
                            Terms of Service
                        </Link>
                        <Link
                            href="/accessibility"
                            className="text-sm text-gray-400 hover:text-emerald-400 transition-colors"
                        >
                            Accessibility
                        </Link>
                        <Link
                            href="/sitemap"
                            className="text-sm text-gray-400 hover:text-emerald-400 transition-colors"
                        >
                            Sitemap
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
