import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import DataTable from '@/components/Admin/DataTable';

interface Competition {
    id: number;
    title: string;
    category: string | null;
    organizer: string | null;
    prize_amount: number | null;
    competition_date: string | null;
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
    data: Competition[];
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
    competitions: PaginationData;
    filters: {
        search?: string;
        category?: string;
        is_active?: string;
    };
}

export default function Index({ competitions, filters }: Props) {
    const [search, setSearch] = useState(filters.search || '');
    const [category, setCategory] = useState(filters.category || '');
    const [isActive, setIsActive] = useState(filters.is_active || '');

    const handleFilter = () => {
        router.get('/admin/competitions', { search, category, is_active: isActive }, { preserveState: true, replace: true });
    };

    const handleReset = () => {
        setSearch('');
        setCategory('');
        setIsActive('');
        router.get('/admin/competitions', {}, { preserveState: true, replace: true });
    };

    const handleDelete = (competition: Competition) => {
        if (confirm('Are you sure you want to delete this competition?')) {
            router.delete(`/admin/competitions/${competition.id}`);
        }
    };

    const columns = [
        { key: 'title', label: 'Title', sortable: true },
        { key: 'category', label: 'Category', render: (c: Competition) => c.category || 'N/A' },
        { key: 'organizer', label: 'Organizer', render: (c: Competition) => c.organizer || 'N/A' },
        {
            key: 'prize_amount',
            label: 'Prize',
            render: (c: Competition) => c.prize_amount ? `$${c.prize_amount.toLocaleString()}` : 'N/A',
        },
        {
            key: 'is_active',
            label: 'Status',
            render: (c: Competition) => (
                <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${c.is_active ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'}`}>
                    {c.is_active ? 'Active' : 'Inactive'}
                </span>
            ),
        },
    ];

    return (
        <>
            <Head title="Competitions - Admin" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
                        <div className="border-b border-gray-200 bg-white px-6 py-4 dark:border-gray-700 dark:bg-gray-800">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Competitions</h2>
                                <Link href="/admin/competitions/create" className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500">
                                    Add Competition
                                </Link>
                            </div>
                            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-4">
                                <input type="text" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white" />
                                <input type="text" placeholder="Category..." value={category} onChange={(e) => setCategory(e.target.value)} className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white" />
                                <select value={isActive} onChange={(e) => setIsActive(e.target.value)} className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white">
                                    <option value="">All Status</option>
                                    <option value="1">Active</option>
                                    <option value="0">Inactive</option>
                                </select>
                                <div className="flex gap-2">
                                    <button onClick={handleFilter} className="flex-1 rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500">Apply</button>
                                    <button onClick={handleReset} className="flex-1 rounded-md bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600">Reset</button>
                                </div>
                            </div>
                        </div>
                        <DataTable data={competitions} columns={columns} onEdit={(c) => router.visit(`/admin/competitions/${c.id}/edit`)} onDelete={handleDelete} onView={(c) => router.visit(`/admin/competitions/${c.id}`)} />
                    </div>
                </div>
            </div>
        </>
    );
}
