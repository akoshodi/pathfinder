import { Head, Link } from '@inertiajs/react';

export default function Partnerships() {
    return (
        <>
            <Head title="About • Partnerships" />
            <section className="bg-gradient-to-r from-emerald-700 to-teal-600 px-4 py-12 text-white">
                <div className="mx-auto max-w-6xl">
                    <h1 className="text-3xl font-bold md:text-4xl">Partnerships</h1>
                    <p className="mt-2 text-emerald-50">Work with us to reach learners</p>
                </div>
            </section>
            <main className="mx-auto max-w-6xl px-4 py-10">
                <div className="rounded-lg border bg-white p-6 shadow-sm">
                    <h2 className="text-lg font-semibold text-gray-900">University & Employer Programs</h2>
                    <p className="mt-2 text-gray-700">Partner with Pathfinder to promote programs, internships, and scholarships to a qualified audience.</p>
                    <div className="mt-4">
                        <Link href="/about/contact" className="text-emerald-700 hover:underline">Get in touch →</Link>
                    </div>
                </div>
            </main>
        </>
    );
}
