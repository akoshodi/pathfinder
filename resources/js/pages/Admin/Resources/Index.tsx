import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import DataTable from '@/components/Admin/DataTable';
import AdminLayout from '@/layouts/admin-layout';

interface Resource {
    id: number;
    title: string;
    type: string;
    author: { name: string } | null;
    is_featured: boolean;
    is_active: boolean;
    views_count: number;
    downloads_count: number;
    created_at: string;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginationData {
    current_page: number;
    data: Resource[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: PaginationLink[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}

interface Props {
    resources: PaginationData;
    filters: {
        search?: string;
        type?: string;
        is_active?: string;
        sort_by?: string;
        sort_order?: string;
    };
}

export default function Index({ resources, filters = {} }: Props) {
    const [search, setSearch] = useState(filters.search || '');
    const [type, setType] = useState(filters.type || '');
    const [isActive, setIsActive] = useState(filters.is_active || '');

    const handleFilter = () => {
        router.get(
            '/admin/resources',
            { search, type, is_active: isActive },
            { preserveState: true, replace: true }
        );
    };

    const handleReset = () => {
        setSearch('');
        setType('');
        setIsActive('');
        router.get('/admin/resources', {}, { preserveState: true, replace: true });
    };

    const handleDelete = (resource: Resource) => {
        if (confirm('Are you sure you want to delete this resource?')) {
            router.delete(`/admin/resources/${resource.id}`);
        }
    };

    const columns = [
        {
            key: 'title',
            label: 'Title',
            sortable: true,
        },
        {
            key: 'type',
            label: 'Type',
            sortable: true,
        },
        {
            key: 'author',
            label: 'Author',
            render: (resource: Resource) => resource.author?.name || 'N/A',
        },
        {
            key: 'views_count',
            label: 'Views',
            sortable: true,
        },
        {
            key: 'downloads_count',
            label: 'Downloads',
            sortable: true,
        },
        {
            key: 'is_featured',
            label: 'Featured',
            render: (resource: Resource) => (
                <span
                    className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                        resource.is_featured
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400'
                    }`}
                >
                    {resource.is_featured ? 'Yes' : 'No'}
                </span>
            ),
        },
        {
            key: 'is_active',
            label: 'Status',
            render: (resource: Resource) => (
                <span
                    className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                        resource.is_active
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                            : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                    }`}
                >
                    {resource.is_active ? 'Active' : 'Inactive'}
                </span>
            ),
        },
    ];

    return (
        <AdminLayout title="Resources" breadcrumbs={[{ label: 'Admin' }, { label: 'Resources' }]}>
            <Head title="Resources - Admin" />

            <div className="overflow-hidden bg-card border border-border shadow-sm rounded-lg">
                <div className="border-b border-border bg-card px-6 py-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-foreground">Resources</h2>
                        <Link
                            href="/admin/resources/create"
                            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                        >
                            Add Resource
                        </Link>
                    </div>

                    <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-4">
                        <input
                            type="text"
                            placeholder="Search resources..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="rounded-md shadow-sm"
                        />

                        <input
                            type="text"
                            placeholder="Type..."
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            className="rounded-md shadow-sm"
                        />

                        <select
                            value={isActive}
                            onChange={(e) => setIsActive(e.target.value)}
                            className="rounded-md shadow-sm"
                        >
                            <option value="">All Status</option>
                            <option value="1">Active</option>
                            <option value="0">Inactive</option>
                        </select>

                        <div className="flex gap-2">
                            <button
                                onClick={handleFilter}
                                className="flex-1 rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                            >
                                Apply
                            </button>
                            <button
                                onClick={handleReset}
                                className="flex-1 rounded-md bg-muted px-4 py-2 text-sm font-semibold text-foreground shadow-sm hover:bg-muted/80"
                            >
                                Reset
                            </button>
                        </div>
                    </div>
                </div>

                <DataTable
                    data={resources}
                    columns={columns}
                    onEdit={(resource) => router.visit(`/admin/resources/${resource.id}/edit`)}
                    onDelete={handleDelete}
                    onView={(resource) => router.visit(`/admin/resources/${resource.id}`)}
                />
            </div>
        </AdminLayout>
    );
}
