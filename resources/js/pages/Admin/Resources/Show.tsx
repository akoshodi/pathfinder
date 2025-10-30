import { Head, Link } from '@inertiajs/react';

interface Props {
    resource: {
        id: number;
        title: string;
        description?: string | null;
        type: string;
        url?: string | null;
        thumbnail?: string | null;
        is_active: boolean;
        is_featured: boolean;
        author?: { name: string } | null;
    };
}

export default function Show({ resource }: Props) {
    return (
        <>
            <Head title={`${resource.title} - Resource`} />
            <div className="py-12">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    <Link href="/admin/resources" className="text-indigo-600 hover:text-indigo-900">← Back</Link>
                    <div className="mt-4 overflow-hidden rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                        <div className="flex items-center gap-4">
                            {resource.thumbnail && <img src={resource.thumbnail} alt={resource.title} className="h-16 w-16 rounded" />}
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{resource.title}</h1>
                                <div className="text-sm text-gray-500">{resource.type}</div>
                            </div>
                        </div>
                        {resource.description && <p className="mt-4 text-gray-700 dark:text-gray-300">{resource.description}</p>}
                        {resource.url && (
                            <a href={resource.url} target="_blank" rel="noreferrer" className="mt-2 inline-block text-blue-600 hover:underline">
                                Visit resource ↗
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
