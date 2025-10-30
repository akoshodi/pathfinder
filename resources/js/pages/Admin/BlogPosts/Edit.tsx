import { Head, Link } from '@inertiajs/react';

export default function Edit() {
    return (
        <>
            <Head title="Edit Blog Post" />
            <div className="py-12">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    <Link href="/admin/blog-posts" className="text-indigo-600 hover:text-indigo-900">← Back</Link>
                    <h1 className="mt-4 text-2xl font-bold">Edit Blog Post</h1>
                    <p className="mt-4 text-gray-600">Blog post edit form coming soon...</p>
                </div>
            </div>
        </>
    );
}
