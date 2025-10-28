import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Eye, ExternalLink, Calendar, User, Tag, ArrowLeft } from 'lucide-react';

interface Resource {
    id: number;
    title: string;
    slug: string;
    type: 'scholarship' | 'internship' | 'job' | 'guide' | 'template';
    description?: string;
    url?: string;
    file_path?: string;
    tags: string[];
    categories: string[];
    downloads_count: number;
    views_count: number;
    is_featured: boolean;
    created_at: string;
    author?: {
        id: number;
        name: string;
    };
}

interface Props {
    resource: Resource;
    relatedResources: Resource[];
}

export default function ResourcesShow({ resource, relatedResources }: Props) {
    return (
        <>
            <Head title={`${resource.title} - Pathfinder`} />
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <Link
                        href="/resources"
                        className="inline-flex items-center text-emerald-600 hover:text-emerald-700 mb-6"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Resources
                    </Link>

                    <Card>
                        <CardHeader>
                            {resource.is_featured && (
                                <span className="inline-block px-3 py-1 bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 text-sm font-semibold rounded mb-4 w-fit">
                                    Featured Resource
                                </span>
                            )}
                            <CardTitle className="text-3xl mb-2">{resource.title}</CardTitle>
                            <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                                <span className="flex items-center gap-1 capitalize">
                                    <Tag className="h-4 w-4" />
                                    {resource.type}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Eye className="h-4 w-4" />
                                    {resource.views_count} views
                                </span>
                                <span className="flex items-center gap-1">
                                    <Download className="h-4 w-4" />
                                    {resource.downloads_count} downloads
                                </span>
                                <span className="flex items-center gap-1">
                                    <Calendar className="h-4 w-4" />
                                    {new Date(resource.created_at).toLocaleDateString()}
                                </span>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {resource.description && (
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">About</h2>
                                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                                        {resource.description}
                                    </p>
                                </div>
                            )}

                            {resource.author && (
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Author</h3>
                                    <div className="flex items-center gap-2">
                                        <User className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                                        <span className="text-gray-700 dark:text-gray-300">{resource.author.name}</span>
                                    </div>
                                </div>
                            )}

                            {resource.tags.length > 0 && (
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Tags</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {resource.tags.map((tag, index) => (
                                            <span
                                                key={index}
                                                className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {resource.categories.length > 0 && (
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Categories</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {resource.categories.map((category, index) => (
                                            <span
                                                key={index}
                                                className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 rounded-full text-sm"
                                            >
                                                {category}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                                {resource.url && (
                                    <a
                                        href={resource.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium"
                                    >
                                        <ExternalLink className="mr-2 h-5 w-5" />
                                        Visit Resource
                                    </a>
                                )}
                                {resource.file_path && (
                                    <a
                                        href={resource.file_path}
                                        download
                                        className="inline-flex items-center justify-center px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium ml-3"
                                    >
                                        <Download className="mr-2 h-5 w-5" />
                                        Download
                                    </a>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Related Resources */}
                    {relatedResources.length > 0 && (
                        <div className="mt-12">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Related Resources</h2>
                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {relatedResources.map((related) => (
                                    <Link key={related.id} href={`/resources/${related.slug}`}>
                                        <Card className="h-full hover:shadow-lg transition-shadow">
                                            <CardHeader>
                                                <CardTitle className="text-base line-clamp-2">{related.title}</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <p className="text-xs text-gray-600 dark:text-gray-400 capitalize">
                                                    {related.type}
                                                </p>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
