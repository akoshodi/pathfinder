import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

interface User {
    id: number;
    name: string;
}

interface BlogPost {
    id?: number;
    title: string;
    slug: string;
    excerpt: string | null;
    content: string;
    featured_image: string | null;
    status: 'draft' | 'published' | 'archived';
    published_at: string | null;
    author_id: number;
    author?: User;
    meta_title: string | null;
    meta_description: string | null;
    tags: string[] | null;
}

interface Props {
    blogPost?: BlogPost;
    users: User[];
    isEdit?: boolean;
}

export default function Form({ blogPost, users, isEdit = false }: Props) {
    const { data, setData, post, put, processing, errors } = useForm({
        title: blogPost?.title || '',
        slug: blogPost?.slug || '',
        excerpt: blogPost?.excerpt || '',
        content: blogPost?.content || '',
        featured_image: blogPost?.featured_image || '',
        status: blogPost?.status || 'draft',
        published_at: blogPost?.published_at || '',
        author_id: blogPost?.author_id || (users[0]?.id ?? ''),
        meta_title: blogPost?.meta_title || '',
        meta_description: blogPost?.meta_description || '',
        tags: (blogPost?.tags || []).join(', '),
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        const payload = {
            title: data.title,
            slug: data.slug,
            excerpt: data.excerpt,
            content: data.content,
            featured_image: data.featured_image,
            status: data.status,
            published_at: data.published_at || null,
            author_id: Number(data.author_id),
            meta_title: data.meta_title,
            meta_description: data.meta_description,
            tags: (data as any).tags
                ? (data as any).tags.split(',').map((s: string) => s.trim()).filter(Boolean)
                : [],
        };

        // Override form data with transformed payload
        Object.assign(data, payload);
        (data as any).tags = payload.tags;

        if (isEdit && blogPost) {
            put(`/admin/blog-posts/${blogPost.id}`);
        } else {
            post('/admin/blog-posts');
        }
    };

    return (
        <>
            <Head title={isEdit ? 'Edit Blog Post' : 'Create Blog Post'} />
            <div className="py-12">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-6">
                        <Link href="/admin/blog-posts" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">
                            <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                            Back to Blog Posts
                        </Link>
                        <h1 className="mt-4 text-3xl font-bold text-gray-900 dark:text-gray-100">{isEdit ? 'Edit Blog Post' : 'Create Blog Post'}</h1>
                    </div>

                    <div className={`overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg ${processing ? 'opacity-60' : ''}`}>
                        <form onSubmit={submit} className="p-6">
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title *</label>
                                    <input value={data.title} onChange={(e)=>setData('title', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white" />
                                    {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Slug *</label>
                                    <input value={data.slug} onChange={(e)=>setData('slug', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white" />
                                    {errors.slug && <p className="mt-1 text-sm text-red-600">{errors.slug}</p>}
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Excerpt</label>
                                    <textarea value={data.excerpt} onChange={(e)=>setData('excerpt', e.target.value)} rows={3} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white" />
                                    {errors.excerpt && <p className="mt-1 text-sm text-red-600">{errors.excerpt}</p>}
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Content *</label>
                                    <textarea value={data.content} onChange={(e)=>setData('content', e.target.value)} rows={12} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white" />
                                    {errors.content && <p className="mt-1 text-sm text-red-600">{errors.content}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Featured Image URL</label>
                                    <input value={data.featured_image} onChange={(e)=>setData('featured_image', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Status *</label>
                                    <select value={data.status} onChange={(e)=>setData('status', e.target.value as any)} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white">
                                        <option value="draft">Draft</option>
                                        <option value="published">Published</option>
                                        <option value="archived">Archived</option>
                                    </select>
                                    {errors.status && <p className="mt-1 text-sm text-red-600">{errors.status}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Published At</label>
                                    <input type="datetime-local" value={data.published_at || ''} onChange={(e)=>setData('published_at', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Author *</label>
                                    <select value={data.author_id} onChange={(e)=>setData('author_id', Number(e.target.value) as any)} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white">
                                        {users.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
                                    </select>
                                    {errors.author_id && <p className="mt-1 text-sm text-red-600">{errors.author_id}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Meta Title</label>
                                    <input value={data.meta_title} onChange={(e)=>setData('meta_title', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Meta Description</label>
                                    <input value={data.meta_description} onChange={(e)=>setData('meta_description', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white" />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Tags (comma-separated)</label>
                                    <input value={(data as any).tags} onChange={(e)=>setData('tags' as any, e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white" />
                                </div>
                            </div>
                            <div className="mt-8 flex items-center justify-end gap-4">
                                <Link href="/admin/blog-posts" className="rounded-md bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600">Cancel</Link>
                                <button type="submit" disabled={processing} className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 disabled:opacity-50">
                                    {processing ? 'Saving...' : isEdit ? 'Update' : 'Create'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
