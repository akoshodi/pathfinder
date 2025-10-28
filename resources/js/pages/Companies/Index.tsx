import { Head, Link, router } from '@inertiajs/react';
import { type ReactNode, useState } from 'react';
import PublicLayout from '@/layouts/public-layout';

interface Company {
    id: number;
    name: string;
    slug: string;
    description: string;
    logo: string | null;
    category: string;
    location: string;
    city: string;
    state: string;
    employees: string;
    internships_count: number;
    jobs_count: number;
    is_partner: boolean;
    is_featured: boolean;
}

interface Props {
    companies: {
        data: Company[];
        links: any[];
        meta: any;
    };
    filters: {
        search?: string;
        category?: string;
        is_partner?: boolean;
    };
}

export default function CompaniesIndex({ companies, filters }: Props) {
    const [search, setSearch] = useState(filters.search || '');
    const [selectedCategory, setSelectedCategory] = useState(filters.category || 'all');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/companies', { search, category: selectedCategory !== 'all' ? selectedCategory : undefined }, { preserveState: true });
    };

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
        router.get('/companies', { search, category: category !== 'all' ? category : undefined }, { preserveState: true });
    };

    const categories = ['all', 'Technology', 'Finance', 'Consulting', 'Healthcare', 'Engineering'];

    return (
        <>
            <Head title="Companies" />

            {/* Hero Section */}
            <section className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-4xl font-bold mb-4">Partner Companies</h1>
                    <p className="text-lg text-emerald-100">
                        Explore leading organizations offering internships, jobs, and career opportunities
                    </p>
                </div>
            </section>

            {/* Search and Filter Section */}
            <section className="bg-white border-b border-gray-200 py-6 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <form onSubmit={handleSearch} className="mb-6">
                        <div className="relative">
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search companies by name..."
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            />
                            <svg
                                className="absolute left-3 top-3 h-5 w-5 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </div>
                    </form>

                    <div className="flex flex-wrap gap-2">
                        <span className="text-sm font-semibold text-gray-700 self-center">Filter by Category:</span>
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => handleCategoryChange(category)}
                                className={`px-4 py-2 rounded-lg transition-colors ${
                                    selectedCategory === category
                                        ? 'bg-emerald-600 text-white'
                                        : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                                }`}
                            >
                                {category.charAt(0).toUpperCase() + category.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Companies Grid */}
            <main className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {companies.data.map((company) => (
                            <Link
                                key={company.id}
                                href={`/companies/${company.slug}`}
                                className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden"
                            >
                                <div className="p-6">
                                    <div className="flex items-start gap-4 mb-4">
                                        {company.logo ? (
                                            <img
                                                src={company.logo}
                                                alt={company.name}
                                                className="w-16 h-16 object-cover rounded"
                                            />
                                        ) : (
                                            <div className="w-16 h-16 bg-emerald-100 rounded flex items-center justify-center text-2xl">
                                                {company.name.charAt(0)}
                                            </div>
                                        )}
                                        <div className="flex-1">
                                            <h3 className="font-bold text-lg text-gray-900">{company.name}</h3>
                                            <p className="text-sm text-gray-600">{company.category}</p>
                                        </div>
                                    </div>

                                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">{company.description}</p>

                                    <div className="space-y-2 text-sm">
                                        <div className="flex items-center text-gray-600">
                                            <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                <path
                                                    fillRule="evenodd"
                                                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            {company.city}, {company.state}
                                        </div>
                                        <div className="flex items-center text-gray-600">
                                            <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                                            </svg>
                                            {company.employees} employees
                                        </div>
                                    </div>

                                    <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between text-sm">
                                        <span className="text-gray-600">{company.internships_count} internships</span>
                                        <span className="text-gray-600">{company.jobs_count} jobs</span>
                                    </div>

                                    {company.is_partner && (
                                        <div className="mt-3">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                                                ✓ Partner Company
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Pagination */}
                    {companies.links && (
                        <div className="mt-8 flex justify-center gap-2">
                            {companies.links.map((link: any, index: number) => (
                                <Link
                                    key={index}
                                    href={link.url || '#'}
                                    className={`px-4 py-2 rounded ${
                                        link.active
                                            ? 'bg-emerald-600 text-white'
                                            : 'bg-white text-gray-700 hover:bg-gray-100'
                                    }`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </>
    );
}

// Use the public layout (no admin sidebar) for this public-facing page
CompaniesIndex.layout = (page: ReactNode) => <PublicLayout>{page}</PublicLayout>;
