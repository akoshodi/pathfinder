import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin-layout';

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
        <AdminLayout title="Resource" breadcrumbs={[{ label: 'Admin' }, { label: 'Resources', href: '/admin/resources' }, { label: resource.title }] }>
            <Head title={`${resource.title} - Resource`} />
            <div className="mx-auto max-w-4xl">
                <Link href="/admin/resources" className="text-indigo-600 hover:underline">← Back</Link>
                <div className="mt-4 overflow-hidden rounded-lg bg-card border border-border p-6 shadow">
                    <div className="flex items-center gap-4">
                        {resource.thumbnail && <img src={resource.thumbnail} alt={resource.title} className="h-16 w-16 rounded" />}
                        <div>
                            <h1 className="text-2xl font-bold text-foreground">{resource.title}</h1>
                            <div className="text-sm text-muted-foreground">{resource.type}</div>
                        </div>
                    </div>
                    {resource.description && <p className="mt-4 text-foreground/80">{resource.description}</p>}
                    {resource.url && (
                        <a href={resource.url} target="_blank" rel="noreferrer" className="mt-2 inline-block text-blue-600 hover:underline">
                            Visit resource ↗
                        </a>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
