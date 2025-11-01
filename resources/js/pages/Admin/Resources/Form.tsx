import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin-layout';
import { FormEventHandler } from 'react';

interface Resource {
    id?: number;
    title: string;
    description: string | null;
    type: string;
    url: string | null;
    file_path: string | null;
    thumbnail: string | null;
    is_featured: boolean;
    is_active: boolean;
}

interface Props {
    resource?: Resource;
    isEdit?: boolean;
}

export default function Form({ resource, isEdit = false }: Props) {
    const { data, setData, post, put, processing, errors } = useForm({
        title: resource?.title || '',
        description: resource?.description || '',
        type: resource?.type || 'article',
        url: resource?.url || '',
        file_path: resource?.file_path || '',
        thumbnail: resource?.thumbnail || '',
        is_featured: resource?.is_featured || false,
        is_active: resource?.is_active ?? true,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        if (isEdit && resource) {
            put(`/admin/resources/${resource.id}`);
        } else {
            post('/admin/resources');
        }
    };

    return (
        <AdminLayout title={isEdit ? 'Edit Resource' : 'Create Resource'} breadcrumbs={[{ label: 'Admin' }, { label: 'Resources', href: '/admin/resources' }, { label: isEdit ? 'Edit' : 'Create' }]}>
            <Head title={isEdit ? 'Edit Resource' : 'Create Resource'} />

            <div className="mx-auto max-w-4xl">
                <div className="mb-6">
                    <Link
                        href="/admin/resources"
                        className="inline-flex items-center text-sm text-foreground hover:underline"
                    >
                        <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Resources
                    </Link>
                    <h1 className="mt-4 text-3xl font-bold text-foreground">
                        {isEdit ? 'Edit Resource' : 'Create Resource'}
                    </h1>
                </div>

                <div className="overflow-hidden bg-card border border-border rounded-lg shadow-sm">
                    <form onSubmit={submit} className="p-6">
                        <div className="space-y-6">
                                {/* Title */}
                                <div>
                                    <label htmlFor="title" className="block text-sm font-medium text-foreground">
                                        Title *
                                    </label>
                                    <input
                                        id="title"
                                        type="text"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        className="mt-1 block w-full rounded-md shadow-sm"
                                    />
                                    {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
                                </div>

                                {/* Description */}
                                <div>
                                    <label htmlFor="description" className="block text-sm font-medium text-foreground">
                                        Description
                                    </label>
                                    <textarea
                                        id="description"
                                        rows={4}
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        className="mt-1 block w-full rounded-md shadow-sm"
                                    />
                                    {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                                </div>

                                {/* Type & URL */}
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <div>
                                        <label htmlFor="type" className="block text-sm font-medium text-foreground">
                                            Type *
                                        </label>
                                        <input
                                            id="type"
                                            type="text"
                                            value={data.type}
                                            onChange={(e) => setData('type', e.target.value)}
                                            className="mt-1 block w-full rounded-md shadow-sm"
                                        />
                                        {errors.type && <p className="mt-1 text-sm text-red-600">{errors.type}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="url" className="block text-sm font-medium text-foreground">
                                            URL
                                        </label>
                                        <input
                                            id="url"
                                            type="url"
                                            value={data.url}
                                            onChange={(e) => setData('url', e.target.value)}
                                            className="mt-1 block w-full rounded-md shadow-sm"
                                        />
                                        {errors.url && <p className="mt-1 text-sm text-red-600">{errors.url}</p>}
                                    </div>
                                </div>

                                {/* Checkboxes */}
                                <div className="space-y-4">
                                    <div className="flex items-center">
                                        <input
                                            id="is_featured"
                                            type="checkbox"
                                            checked={data.is_featured}
                                            onChange={(e) => setData('is_featured', e.target.checked)}
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                        />
                                        <label htmlFor="is_featured" className="ml-2 block text-sm text-foreground">
                                            Featured Resource
                                        </label>
                                    </div>

                                    <div className="flex items-center">
                                        <input
                                            id="is_active"
                                            type="checkbox"
                                            checked={data.is_active}
                                            onChange={(e) => setData('is_active', e.target.checked)}
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                        />
                                        <label htmlFor="is_active" className="ml-2 block text-sm text-foreground">
                                            Active
                                        </label>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center justify-end gap-4">
                                    <Link
                                        href="/admin/resources"
                                        className="rounded-md bg-muted px-4 py-2 text-sm font-semibold text-foreground shadow-sm hover:bg-muted/80"
                                    >
                                        Cancel
                                    </Link>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 disabled:opacity-50"
                                    >
                                        {processing ? 'Saving...' : isEdit ? 'Update' : 'Create'}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
        </AdminLayout>
    );
}
