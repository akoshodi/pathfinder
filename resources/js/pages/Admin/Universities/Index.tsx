import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import AdminLayout from '@/layouts/admin-layout';
import DataTable from '@/components/Admin/DataTable';

interface University {
    id: number;
    name: string;
    description: string | null;
    location: string | null;
    type: string;
    website: string | null;
    established_year: number | null;
    ranking: number | null;
    is_featured: boolean;
    created_at: string;
}

interface PaginatedUniversities {
    data: University[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
    links: Array<{ url: string | null; label: string; active: boolean }>;
}

interface Props {
    universities: PaginatedUniversities;
    filters: {
        search?: string;
        location?: string;
        type?: string;
        sort_by?: string;
        sort_order?: string;
    };
}

export default function Index({ universities, filters }: Props) {
    const [search, setSearch] = useState(filters.search || '');
    const [locationFilter, setLocationFilter] = useState(filters.location || '');
    const [typeFilter, setTypeFilter] = useState(filters.type || '');

    const handleFilter = () => {
        router.get(
            '/admin/universities',
            { search, location: locationFilter, type: typeFilter },
            { preserveState: true, preserveScroll: true }
        );
    };

    const handleReset = () => {
        setSearch('');
        setLocationFilter('');
        setTypeFilter('');
        router.get('/admin/universities');
    };

    const handleDelete = (university: University) => {
        if (confirm(`Are you sure you want to delete ${university.name}?`)) {
            router.delete(`/admin/universities/${university.id}`, {
                preserveScroll: true,
                onSuccess: () => {
                    alert('University deleted successfully');
                },
            });
        }
    };

    const columns = [
        {
            key: 'name',
            label: 'Name',
            sortable: true,
            render: (value: string) => <span className="font-medium">{value}</span>,
        },
        {
            key: 'location',
            label: 'Location',
            sortable: false,
        },
        {
            key: 'type',
            label: 'Type',
            sortable: true,
            render: (value: string) => (
                <span className="inline-flex rounded-full bg-blue-600/20 px-2 py-1 text-xs font-semibold capitalize text-blue-600">
                    {value}
                </span>
            ),
        },
        {
            key: 'established_year',
            label: 'Established',
            sortable: true,
            render: (value: number | null) => value || 'N/A',
        },
        {
            key: 'ranking',
            label: 'Ranking',
            sortable: true,
            render: (value: number | null) => (value ? `#${value}` : 'N/A'),
        },
        {
            key: 'is_featured',
            label: 'Featured',
            sortable: false,
            render: (value: boolean) =>
                value ? (
                    <span className="inline-flex rounded-full bg-green-600/20 px-2 py-1 text-xs font-semibold text-green-600">
                        Yes
                    </span>
                ) : (
                    <span className="inline-flex rounded-full bg-muted px-2 py-1 text-xs font-semibold text-foreground">
                        No
                    </span>
                ),
        },
    ];

    return (
        <AdminLayout title="Universities" breadcrumbs={[{ label: 'Admin' }, { label: 'Universities' }]}>
            <Head title="Universities Management" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-6 flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-foreground">Universities</h1>
                            <p className="mt-2 text-sm text-muted-foreground">
                                Manage universities, colleges, and educational institutions
                            </p>
                        </div>
                        <Link
                            href="/admin/universities/create"
                            className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                        >
                            <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Add University
                        </Link>
                    </div>

                    {/* Filters */}
                    <div className="mb-6 rounded-lg bg-card border border-border p-6 shadow">
                        <div className="grid gap-4 md:grid-cols-4">
                            <div>
                                <label htmlFor="search" className="block text-sm font-medium text-foreground">
                                    Search
                                </label>
                                <input
                                    type="text"
                                    id="search"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search universities..."
                                    className="mt-1 block w-full rounded-md shadow-sm sm:text-sm"
                                />
                            </div>

                            <div>
                                <label htmlFor="location" className="block text-sm font-medium text-foreground">
                                    Location
                                </label>
                                <input
                                    id="location"
                                    type="text"
                                    value={locationFilter}
                                    onChange={(e) => setLocationFilter(e.target.value)}
                                    placeholder="Search location..."
                                    className="mt-1 block w-full rounded-md shadow-sm sm:text-sm"
                                />
                            </div>

                            <div>
                                <label htmlFor="type" className="block text-sm font-medium text-foreground">
                                    Type
                                </label>
                                <select
                                    id="type"
                                    value={typeFilter}
                                    onChange={(e) => setTypeFilter(e.target.value)}
                                    className="mt-1 block w-full rounded-md shadow-sm sm:text-sm"
                                >
                                    <option value="">All Types</option>
                                    <option value="university">University</option>
                                    <option value="college">College</option>
                                    <option value="institute">Institute</option>
                                    <option value="school">School</option>
                                </select>
                            </div>

                            <div className="flex items-end gap-2">
                                <button
                                    onClick={handleFilter}
                                    className="flex-1 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                                >
                                    Apply
                                </button>
                                <button
                                    onClick={handleReset}
                                    className="rounded-md bg-muted px-4 py-2 text-sm font-medium text-foreground hover:bg-muted/80"
                                >
                                    Reset
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Table */}
                    <DataTable
                        data={universities}
                        columns={columns}
                        onEdit={(university) => router.visit(`/admin/universities/${university.id}/edit`)}
                        onDelete={handleDelete}
                        onView={(university) => router.visit(`/admin/universities/${university.id}`)}
                        emptyMessage="No universities found. Create your first university to get started."
                    />
                </div>
            </div>
        </AdminLayout>
    );
}
