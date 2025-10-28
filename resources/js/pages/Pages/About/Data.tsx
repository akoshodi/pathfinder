import { Head } from '@inertiajs/react';

export default function Data() {
    return (
        <>
            <Head title="About • Our Data" />
            <section className="bg-gradient-to-r from-emerald-700 to-teal-600 px-4 py-12 text-white">
                <div className="mx-auto max-w-6xl">
                    <h1 className="text-3xl font-bold md:text-4xl">Our Data</h1>
                    <p className="mt-2 text-emerald-50">Sources, methodology, and updates</p>
                </div>
            </section>
            <main className="mx-auto max-w-6xl px-4 py-10">
                <div className="rounded-lg border bg-white p-6 shadow-sm">
                    <h2 className="text-lg font-semibold text-gray-900">Methodology</h2>
                    <p className="mt-2 text-gray-700">We combine official datasets (IPEDS, BLS) with curated institutional data and user-submitted reviews, applying quality checks and periodic updates.</p>
                </div>
            </main>
        </>
    );
}
