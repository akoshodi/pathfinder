import { Head } from '@inertiajs/react';

export default function Press() {
    return (
        <>
            <Head title="About • Press" />
            <section className="bg-gradient-to-r from-emerald-700 to-teal-600 px-4 py-12 text-white">
                <div className="mx-auto max-w-6xl">
                    <h1 className="text-3xl font-bold md:text-4xl">Press</h1>
                    <p className="mt-2 text-emerald-50">News, brand assets, and inquiries</p>
                </div>
            </section>
            <main className="mx-auto max-w-6xl px-4 py-10">
                <div className="grid gap-4">
                    <div className="rounded-lg border bg-white p-6 shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-900">Press Inquiries</h2>
                        <p className="mt-2 text-gray-700">Email press@pathfinder.example for quotes, interviews, and data requests.</p>
                    </div>
                    <div className="rounded-lg border bg-white p-6 shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-900">Brand Assets</h2>
                        <p className="mt-2 text-gray-700">Download our logos and brand guidelines.</p>
                    </div>
                </div>
            </main>
        </>
    );
}
