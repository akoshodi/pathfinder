import { Head, Link } from '@inertiajs/react';

export default function Team() {
    return (
        <>
            <Head title="About • Team" />
            <section className="bg-gradient-to-r from-emerald-700 to-teal-600 px-4 py-12 text-white">
                <div className="mx-auto max-w-6xl">
                    <h1 className="text-3xl font-bold md:text-4xl">Our Team</h1>
                    <p className="mt-2 text-emerald-50">Meet the people building Pathfinder</p>
                </div>
            </section>
            <main className="mx-auto max-w-6xl px-4 py-10">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="rounded-lg border bg-white p-6 shadow-sm">
                            <div className="mb-3 h-24 w-24 rounded-full bg-gray-100" />
                            <div className="text-lg font-semibold text-gray-900">Teammate {i + 1}</div>
                            <div className="text-sm text-gray-600">Role Title</div>
                            <p className="mt-2 text-sm text-gray-700">Short bio goes here describing responsibility and background.</p>
                        </div>
                    ))}
                </div>
                <div className="mt-10 text-center">
                    <Link href="/about/careers" className="text-emerald-700 hover:underline">See open roles →</Link>
                </div>
            </main>
        </>
    );
}
