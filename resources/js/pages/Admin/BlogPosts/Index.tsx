import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import AdminLayout from '@/layouts/admin-layout';
import DataTable from '@/components/Admin/DataTable';

interface BlogPost {
    id: number;
    title: string;
    author: { name: string } | null;
    status: string;
    views_count: number;
    published_at: string | null;
    created_at: string;
}

interface PaginationData {
    current_page: number;
    data: BlogPost[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: { url: string | null; label: string; active: boolean; }[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}

interface Props {
    blogPosts: PaginationData;
    filters: { search?: string; status?: string; };
}

export default function Index({ blogPosts, filters = {} }: Props) {
    const [search, setSearch] = useState(filters.search || '');
    const [status, setStatus] = useState(filters.status || '');

    const handleFilter = () => router.get('/admin/blog-posts', { search, status }, { preserveState: true, replace: true });
    const handleReset = () => { setSearch(''); setStatus(''); router.get('/admin/blog-posts', {}, { preserveState: true, replace: true }); };
    const handleDelete = (post: BlogPost) => { if (confirm('Delete this blog post?')) router.delete(`/admin/blog-posts/${post.id}`); };

    const columns = [
        { key: 'title', label: 'Title', sortable: true },
        { key: 'author', label: 'Author', render: (p: BlogPost) => p.author?.name || 'N/A' },
        {
            key: 'status',
            label: 'Status',
            render: (p: BlogPost) => (
                <span className={`inline-flex rounded-full px-2 text-xs font-semibold ${p.status === 'published' ? 'bg-green-100 text-green-800' : p.status === 'draft' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'}`}>
                    {p.status}
                </span>
            ),
        },
        { key: 'views_count', label: 'Views', sortable: true },
    ];

    return (
        <AdminLayout title="Blog Posts" breadcrumbs={[{ label: 'Admin' }, { label: 'Blog Posts' }]}>
            <Head title="Blog Posts - Admin" />
            <div className="overflow-hidden bg-card border border-border shadow-sm rounded-lg">
                <div className="border-b border-border bg-card px-6 py-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-foreground">Blog Posts</h2>
                        <Link href="/admin/blog-posts/create" className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500">Add Post</Link>
                    </div>
                    <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
                        <input type="text" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} className="rounded-md shadow-sm" />
                        <select value={status} onChange={(e) => setStatus(e.target.value)} className="rounded-md shadow-sm">
                            <option value="">All Status</option>
                            <option value="draft">Draft</option>
                            <option value="published">Published</option>
                            <option value="archived">Archived</option>
                        </select>
                        <div className="flex gap-2">
                            <button onClick={handleFilter} className="flex-1 rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500">Apply</button>
                            <button onClick={handleReset} className="flex-1 rounded-md bg-muted px-4 py-2 text-sm font-semibold text-foreground hover:bg-muted/80">Reset</button>
                        </div>
                    </div>
                </div>
                <DataTable data={blogPosts} columns={columns} onEdit={(p) => router.visit(`/admin/blog-posts/${p.id}/edit`)} onDelete={handleDelete} onView={(p) => router.visit(`/admin/blog-posts/${p.id}`)} />
            </div>
        </AdminLayout>
    );
}
