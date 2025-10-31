import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import DataTable from '@/components/Admin/DataTable';

interface Company {
    id: number;
    name: string;
    category: string | null;
    city: string | null;
    employees: string | null;
    is_partner: boolean;
    is_featured: boolean;
    is_active: boolean;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginationData {
    current_page: number;
    data: Company[];
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
    companies: PaginationData;
    filters: {
        search?: string;
        category?: string;
        is_active?: string;
        sort_by?: string;
        sort_order?: string;
    };
}

export default function Index({ companies, filters = {} }: Props) {
    const [search, setSearch] = useState(filters.search || '');
    const [category, setCategory] = useState(filters.category || '');
    const [isActive, setIsActive] = useState(filters.is_active || '');

    const handleFilter = () => {
        router.get(
            '/admin/companies',
            { search, category, is_active: isActive },
            { preserveState: true, replace: true }
        );
    };

    const handleReset = () => {
        setSearch('');
        setCategory('');
        setIsActive('');
        router.get('/admin/companies', {}, { preserveState: true, replace: true });
    };

    const handleDelete = (company: Company) => {
        if (confirm('Are you sure you want to delete this company?')) {
            router.delete(`/admin/companies/${company.id}`);
        }
    };

    const columns = [
        {
            key: 'name',
            label: 'Name',
            sortable: true,
        },
        {
            key: 'category',
            label: 'Category',
            render: (company: Company) => company.category || 'N/A',
        },
        {
            key: 'city',
            label: 'Location',
            render: (company: Company) => company.city || 'N/A',
        },
        {
            key: 'employees',
            label: 'Employees',
            render: (company: Company) => company.employees || 'N/A',
        },
        {
            key: 'is_partner',
            label: 'Partner',
            render: (company: Company) => (
                <span
                    className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                        company.is_partner
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400'
                    }`}
                >
                    {company.is_partner ? 'Yes' : 'No'}
                </span>
            ),
        },
        {
            key: 'is_featured',
            label: 'Featured',
            render: (company: Company) => (
                <span
                    className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                        company.is_featured
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400'
                    }`}
                >
                    {company.is_featured ? 'Yes' : 'No'}
                </span>
            ),
        },
        {
            key: 'is_active',
            label: 'Status',
            render: (company: Company) => (
                <span
                    className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                        company.is_active
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                            : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                    }`}
                >
                    {company.is_active ? 'Active' : 'Inactive'}
                </span>
            ),
        },
    ];

    return (
        <>
            <Head title="Companies - Admin" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
                        <div className="border-b border-gray-200 bg-white px-6 py-4 dark:border-gray-700 dark:bg-gray-800">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                                    Companies
                                </h2>
                                <Link
                                    href="/admin/companies/create"
                                    className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                                >
                                    Add Company
                                </Link>
                            </div>

                            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-4">
                                <input
                                    type="text"
                                    placeholder="Search companies..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                />

                                <input
                                    type="text"
                                    placeholder="Category..."
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                />

                                <select
                                    value={isActive}
                                    onChange={(e) => setIsActive(e.target.value)}
                                    className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
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
                                        className="flex-1 rounded-md bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                                    >
                                        Reset
                                    </button>
                                </div>
                            </div>
                        </div>

                        <DataTable
                            data={companies}
                            columns={columns}
                            onEdit={(company) => router.visit(`/admin/companies/${company.id}/edit`)}
                            onDelete={handleDelete}
                            onView={(company) => router.visit(`/admin/companies/${company.id}`)}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
