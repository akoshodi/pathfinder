import { Head } from '@inertiajs/react';

export default function Careers() {
    return (
        <>
            <Head title="About • Careers" />
            <section className="bg-gradient-to-r from-emerald-700 to-teal-600 px-4 py-12 text-white">
                <div className="mx-auto max-w-6xl">
                    <h1 className="text-3xl font-bold md:text-4xl">Careers at Pathfinder</h1>
                    <p className="mt-2 text-emerald-50">Help us empower learners everywhere</p>
                </div>
            </section>
            <main className="mx-auto max-w-6xl px-4 py-10">
                <div className="grid gap-4">
                    <div className="rounded-lg border bg-white p-6 shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-900">Why Join Us</h2>
                        <p className="mt-2 text-gray-700">We're building an inclusive platform that makes education decisions clearer and fairer. Join a mission-driven team working with modern tools.</p>
                    </div>
                    <div className="rounded-lg border bg-white p-6 shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-900">Open Roles</h2>
                        <ul className="mt-3 list-disc space-y-1 pl-6 text-sm text-gray-700">
                            <li>Senior Full-Stack Engineer</li>
                            <li>Data Scientist (Education)</li>
                            <li>Product Designer</li>
                            <li>Content Strategist</li>
                        </ul>
                    </div>
                </div>
            </main>
        </>
    );
}
