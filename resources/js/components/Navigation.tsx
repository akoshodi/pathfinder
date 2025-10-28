import { useState } from 'react';
import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Menu, X, Compass, BarChart3, User, BookOpen, Award, Users, ChevronDown, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

export function Navigation() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const { theme, toggleTheme } = useTheme();

    const toggleDropdown = (name: string) => {
        setOpenDropdown(openDropdown === name ? null : name);
    };

    return (
        <nav className="sticky top-0 bg-white dark:bg-gray-900 border-b border-emerald-100 dark:border-gray-800 shadow-sm z-[100]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="flex items-center gap-2 font-bold text-xl text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 transition-colors"
                    >
                        <Compass className="h-6 w-6" />
                        Pathfinder
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-1">
                        {/* Explore Dropdown */}
                        <div className="relative group">
                            <button className="flex items-center gap-2 px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-emerald-700 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-gray-800 rounded-md transition-colors font-medium text-sm">
                                <Compass className="h-4 w-4" />
                                Explore
                                <ChevronDown className="h-4 w-4" />
                            </button>
                            <div className="absolute left-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                <Link
                                    href="/universities"
                                    className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-gray-700 hover:text-emerald-700 dark:hover:text-emerald-400"
                                >
                                    Universities
                                </Link>
                                <Link
                                    href="/occupations"
                                    className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-gray-700 hover:text-emerald-700 dark:hover:text-emerald-400"
                                >
                                    Occupations
                                </Link>
                                <Link
                                    href="/careers"
                                    className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-gray-700 hover:text-emerald-700 dark:hover:text-emerald-400"
                                >
                                    Job Postings
                                </Link>
                                <Link
                                    href="/locations"
                                    className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-gray-700 hover:text-emerald-700 dark:hover:text-emerald-400"
                                >
                                    Locations
                                </Link>
                            </div>
                        </div>

                        {/* Discover Dropdown */}
                        <div className="relative group">
                            <button className="flex items-center gap-2 px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-emerald-700 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-gray-800 rounded-md transition-colors font-medium text-sm">
                                <BookOpen className="h-4 w-4" />
                                Discover
                                <ChevronDown className="h-4 w-4" />
                            </button>
                            <div className="absolute left-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                <Link
                                    href="/courses"
                                    className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-gray-700 hover:text-emerald-700 dark:hover:text-emerald-400"
                                >
                                    Courses
                                </Link>
                                <Link
                                    href="/resources"
                                    className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-gray-700 hover:text-emerald-700 dark:hover:text-emerald-400"
                                >
                                    Resources
                                </Link>
                                <Link
                                    href="/alumni"
                                    className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-gray-700 hover:text-emerald-700 dark:hover:text-emerald-400"
                                >
                                    Alumni Network
                                </Link>
                            </div>
                        </div>

                        {/* Community Dropdown */}
                        <div className="relative group">
                            <button className="flex items-center gap-2 px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-emerald-700 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-gray-800 rounded-md transition-colors font-medium text-sm">
                                <Users className="h-4 w-4" />
                                Community
                                <ChevronDown className="h-4 w-4" />
                            </button>
                            <div className="absolute left-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                <Link
                                    href="/links"
                                    className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-gray-700 hover:text-emerald-700 dark:hover:text-emerald-400"
                                >
                                    Links
                                </Link>
                                <Link
                                    href="/companies"
                                    className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-gray-700 hover:text-emerald-700 dark:hover:text-emerald-400"
                                >
                                    Companies
                                </Link>
                                <Link
                                    href="/blog"
                                    className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-gray-700 hover:text-emerald-700 dark:hover:text-emerald-400"
                                >
                                    Blog
                                </Link>
                            </div>
                        </div>

                        {/* Premium Dropdown */}
                        <div className="relative group">
                            <button className="flex items-center gap-2 px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-emerald-700 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-gray-800 rounded-md transition-colors font-medium text-sm">
                                <Award className="h-4 w-4" />
                                Premium
                                <ChevronDown className="h-4 w-4" />
                            </button>
                            <div className="absolute left-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                <Link
                                    href="/marketplace"
                                    className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-gray-700 hover:text-emerald-700 dark:hover:text-emerald-400"
                                >
                                    Marketplace
                                </Link>
                                <Link
                                    href="/competitions"
                                    className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-gray-700 hover:text-emerald-700 dark:hover:text-emerald-400"
                                >
                                    Competitions
                                </Link>
                            </div>
                        </div>

                        <Link
                            href="/assessments"
                            className="flex items-center gap-2 px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-emerald-700 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-gray-800 rounded-md transition-colors font-medium text-sm"
                        >
                            <BarChart3 className="h-4 w-4" />
                            Assessment
                        </Link>
                    </div>

                    {/* Right Side Actions */}
                    <div className="hidden lg:flex items-center gap-3">
                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 text-gray-700 dark:text-gray-300 hover:text-emerald-700 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-gray-800 rounded-md transition-colors"
                            aria-label="Toggle theme"
                        >
                            {theme === 'light' ? (
                                <Moon className="h-5 w-5" />
                            ) : (
                                <Sun className="h-5 w-5" />
                            )}
                        </button>
                        
                        <Link
                            href="/dashboard"
                            className="flex items-center gap-2 px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-emerald-700 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-gray-800 rounded-md transition-colors font-medium text-sm"
                        >
                            <User className="h-4 w-4" />
                            My Path
                        </Link>
                        <Link href="/register">
                            <Button className="bg-emerald-600 text-white hover:bg-emerald-700 font-semibold">
                                Get Started
                            </Button>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="lg:hidden text-gray-700 dark:text-gray-300"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="lg:hidden py-4 border-t border-emerald-100 dark:border-gray-800">
                        <div className="flex flex-col gap-2">
                            {/* Mobile Explore */}
                            <button
                                onClick={() => toggleDropdown('explore')}
                                className="flex items-center justify-between px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-emerald-700 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-gray-800 rounded-md transition-colors font-medium w-full"
                            >
                                <span className="flex items-center gap-2">
                                    <Compass className="h-4 w-4" />
                                    Explore
                                </span>
                                <ChevronDown
                                    className={`h-4 w-4 transition-transform ${
                                        openDropdown === 'explore' ? 'rotate-180' : ''
                                    }`}
                                />
                            </button>
                            {openDropdown === 'explore' && (
                                <div className="pl-6 space-y-2">
                                    <Link
                                        href="/universities"
                                        className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-gray-800 rounded-md"
                                    >
                                        Universities
                                    </Link>
                                    <Link
                                        href="/careers"
                                        className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-gray-800 rounded-md"
                                    >
                                        Careers
                                    </Link>
                                    <Link
                                        href="/locations"
                                        className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-gray-800 rounded-md"
                                    >
                                        Locations
                                    </Link>
                                </div>
                            )}

                            {/* Mobile Discover */}
                            <button
                                onClick={() => toggleDropdown('discover')}
                                className="flex items-center justify-between px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-emerald-700 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-gray-800 rounded-md transition-colors font-medium w-full"
                            >
                                <span className="flex items-center gap-2">
                                    <BookOpen className="h-4 w-4" />
                                    Discover
                                </span>
                                <ChevronDown
                                    className={`h-4 w-4 transition-transform ${
                                        openDropdown === 'discover' ? 'rotate-180' : ''
                                    }`}
                                />
                            </button>
                            {openDropdown === 'discover' && (
                                <div className="pl-6 space-y-2">
                                    <Link
                                        href="/courses"
                                        className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-gray-800 rounded-md"
                                    >
                                        Courses
                                    </Link>
                                    <Link
                                        href="/resources"
                                        className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-gray-800 rounded-md"
                                    >
                                        Resources
                                    </Link>
                                    <Link
                                        href="/alumni"
                                        className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-gray-800 rounded-md"
                                    >
                                        Alumni Network
                                    </Link>
                                </div>
                            )}

                            {/* Mobile Community */}
                            <button
                                onClick={() => toggleDropdown('community')}
                                className="flex items-center justify-between px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-emerald-700 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-gray-800 rounded-md transition-colors font-medium w-full"
                            >
                                <span className="flex items-center gap-2">
                                    <Users className="h-4 w-4" />
                                    Community
                                </span>
                                <ChevronDown
                                    className={`h-4 w-4 transition-transform ${
                                        openDropdown === 'community' ? 'rotate-180' : ''
                                    }`}
                                />
                            </button>
                            {openDropdown === 'community' && (
                                <div className="pl-6 space-y-2">
                                    <Link
                                        href="/links"
                                        className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-gray-800 rounded-md"
                                    >
                                        Links
                                    </Link>
                                    <Link
                                        href="/companies"
                                        className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-gray-800 rounded-md"
                                    >
                                        Companies
                                    </Link>
                                    <Link
                                        href="/blog"
                                        className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-gray-800 rounded-md"
                                    >
                                        Blog
                                    </Link>
                                </div>
                            )}

                            {/* Mobile Premium */}
                            <button
                                onClick={() => toggleDropdown('premium')}
                                className="flex items-center justify-between px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-emerald-700 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-gray-800 rounded-md transition-colors font-medium w-full"
                            >
                                <span className="flex items-center gap-2">
                                    <Award className="h-4 w-4" />
                                    Premium
                                </span>
                                <ChevronDown
                                    className={`h-4 w-4 transition-transform ${
                                        openDropdown === 'premium' ? 'rotate-180' : ''
                                    }`}
                                />
                            </button>
                            {openDropdown === 'premium' && (
                                <div className="pl-6 space-y-2">
                                    <Link
                                        href="/marketplace"
                                        className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-gray-800 rounded-md"
                                    >
                                        Marketplace
                                    </Link>
                                    <Link
                                        href="/competitions"
                                        className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-gray-800 rounded-md"
                                    >
                                        Competitions
                                    </Link>
                                </div>
                            )}

                            <Link
                                href="/assessments"
                                className="flex items-center gap-2 px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-emerald-700 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-gray-800 rounded-md transition-colors font-medium"
                            >
                                <BarChart3 className="h-4 w-4" />
                                Assessment
                            </Link>
                            
                            {/* Theme Toggle Mobile */}
                            <button
                                onClick={toggleTheme}
                                className="flex items-center gap-2 px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-emerald-700 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-gray-800 rounded-md transition-colors font-medium w-full"
                            >
                                {theme === 'light' ? (
                                    <>
                                        <Moon className="h-4 w-4" />
                                        Dark Mode
                                    </>
                                ) : (
                                    <>
                                        <Sun className="h-4 w-4" />
                                        Light Mode
                                    </>
                                )}
                            </button>
                            
                            <Link
                                href="/dashboard"
                                className="flex items-center gap-2 px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-emerald-700 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-gray-800 rounded-md transition-colors font-medium"
                            >
                                <User className="h-4 w-4" />
                                My Path
                            </Link>
                            <Link href="/register">
                                <Button className="mt-2 w-full bg-emerald-600 text-white hover:bg-emerald-700 font-semibold">
                                    Get Started
                                </Button>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
