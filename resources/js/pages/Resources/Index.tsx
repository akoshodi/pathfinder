import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Award, Briefcase, FileText, Search, Download, Eye } from 'lucide-react';

interface Resource {
    id: number;
    title: string;
    slug: string;
    type: 'scholarship' | 'internship' | 'job' | 'guide' | 'template';
    description?: string;
    url?: string;
    downloads_count: number;
    views_count: number;
    is_featured: boolean;
    created_at: string;
}

interface Props {
    resources: {
        data: Resource[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    filters: {
        type?: string;
        category?: string;
        search?: string;
    };
}

export default function ResourcesIndex({ resources, filters }: Props) {
    const [searchQuery, setSearchQuery] = useState(filters.search || '');
    const [activeTab, setActiveTab] = useState(filters.type || 'all');

    const tabs = [
        { id: 'all', label: 'All Resources', icon: FileText },
        { id: 'scholarship', label: 'Scholarships', icon: Award },
        { id: 'internship', label: 'Internships', icon: Briefcase },
        { id: 'job', label: 'Jobs', icon: Briefcase },
    ];

    const handleTabChange = (type: string) => {
        setActiveTab(type);
        router.get('/resources', {
            type: type === 'all' ? undefined : type,
            search: searchQuery || undefined,
        }, { preserveState: true });
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/resources', {
            type: activeTab === 'all' ? undefined : activeTab,
            search: searchQuery || undefined,
        }, { preserveState: true });
    };

    return (
        <>
            <Head title="Resources - Pathfinder" />
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                <section className="bg-gradient-to-r from-emerald-700 to-teal-600 py-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Resources & Opportunities</h1>
                        <p className="text-emerald-50 text-lg">Discover scholarships, internships, and job opportunities</p>
                    </div>
                </section>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    {/* Tabs */}
                    <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-200 dark:border-gray-700">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => handleTabChange(tab.id)}
                                    className={`flex items-center gap-2 px-4 py-3 font-medium transition-all border-b-2 ${
                                        activeTab === tab.id
                                            ? 'border-emerald-600 text-emerald-600'
                                            : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                                    }`}
                                >
                                    <Icon className="h-4 w-4" />
                                    {tab.label}
                                </button>
                            );
                        })}
                    </div>

                    {/* Search */}
                    <form onSubmit={handleSearch} className="mb-8">
                        <div className="relative max-w-xl">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search resources..."
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                            />
                        </div>
                    </form>

                    {/* Resources Grid */}
                    {resources.data.length > 0 ? (
                        <>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                                {resources.data.map((resource) => (
                                    <Link key={resource.id} href={`/resources/${resource.slug}`}>
                                        <Card className="h-full hover:shadow-lg transition-shadow">
                                            <CardHeader>
                                                {resource.is_featured && (
                                                    <span className="inline-block px-2 py-1 bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 text-xs font-semibold rounded mb-2">
                                                        Featured
                                                    </span>
                                                )}
                                                <CardTitle className="line-clamp-2">{resource.title}</CardTitle>
                                                <CardDescription className="capitalize">{resource.type}</CardDescription>
                                            </CardHeader>
                                            <CardContent>
                                                {resource.description && (
                                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                                                        {resource.description}
                                                    </p>
                                                )}
                                                <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                                                    <span className="flex items-center gap-1">
                                                        <Eye className="h-3 w-3" />
                                                        {resource.views_count}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Download className="h-3 w-3" />
                                                        {resource.downloads_count}
                                                    </span>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                ))}
                            </div>

                            {/* Pagination */}
                            {resources.last_page > 1 && (
                                <div className="flex justify-center gap-2">
                                    {Array.from({ length: resources.last_page }, (_, i) => i + 1).map((page) => (
                                        <Link
                                            key={page}
                                            href={`/resources?page=${page}&type=${activeTab === 'all' ? '' : activeTab}&search=${searchQuery}`}
                                            className={`px-4 py-2 rounded-lg ${
                                                page === resources.current_page
                                                    ? 'bg-emerald-600 text-white'
                                                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                            }`}
                                        >
                                            {page}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </>
                    ) : (
                        <Card>
                            <CardContent className="py-12 text-center">
                                <p className="text-gray-600 dark:text-gray-400">No resources found. Try adjusting your filters.</p>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </>
    );
}
