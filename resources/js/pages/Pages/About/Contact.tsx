import { Head } from '@inertiajs/react';

export default function Contact() {
    return (
        <>
            <Head title="About • Contact" />
            <section className="bg-gradient-to-r from-emerald-700 to-teal-600 px-4 py-12 text-white">
                <div className="mx-auto max-w-6xl">
                    <h1 className="text-3xl font-bold md:text-4xl">Contact Us</h1>
                    <p className="mt-2 text-emerald-50">We'd love to hear from you</p>
                </div>
            </section>
            <main className="mx-auto max-w-6xl px-4 py-10">
                <div className="rounded-lg border bg-white p-6 shadow-sm">
                    <form className="grid gap-4 sm:grid-cols-2">
                        <div className="sm:col-span-1">
                            <label className="mb-1 block text-sm font-medium">Name</label>
                            <input className="w-full rounded border px-3 py-2" placeholder="Your name" />
                        </div>
                        <div className="sm:col-span-1">
                            <label className="mb-1 block text-sm font-medium">Email</label>
                            <input type="email" className="w-full rounded border px-3 py-2" placeholder="you@example.com" />
                        </div>
                        <div className="sm:col-span-2">
                            <label className="mb-1 block text-sm font-medium">Message</label>
                            <textarea className="w-full rounded border px-3 py-2" rows={5} placeholder="How can we help?" />
                        </div>
                        <div className="sm:col-span-2">
                            <button type="button" className="rounded bg-emerald-600 px-4 py-2 text-white">Send</button>
                        </div>
                    </form>
                </div>
            </main>
        </>
    );
}
