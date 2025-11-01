import AdminLayout from '@/layouts/admin-layout';
import { Head, Link } from '@inertiajs/react';

interface Props {
    blogPost: {
        id: number;
        title: string;
        excerpt?: string | null;
        content: string;
        featured_image?: string | null;
        status: string;
        published_at?: string | null;
        author?: { name: string } | null;
    };
}

export default function Show({ blogPost }: Props) {
    return (
        <AdminLayout title="Blog Post" breadcrumbs={[{ label: 'Admin' }, { label: 'Blog Posts', href: '/admin/blog-posts' }, { label: blogPost.title }]}>
            <Head title={`${blogPost.title} - Blog`} />
            <Link href="/admin/blog-posts" className="text-indigo-600 hover:text-indigo-900">← Back</Link>
            <div className="mt-4 overflow-hidden rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{blogPost.title}</h1>
                {blogPost.author?.name && <div className="mt-1 text-sm text-gray-500">By {blogPost.author.name}</div>}
                {blogPost.featured_image && <img src={blogPost.featured_image} alt="" className="mt-4 rounded" />}
                {blogPost.excerpt && <p className="mt-4 text-gray-700 dark:text-gray-300">{blogPost.excerpt}</p>}
                <div className="prose prose-indigo mt-6 max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ __html: blogPost.content }} />
            </div>
        </AdminLayout>
    );
}
