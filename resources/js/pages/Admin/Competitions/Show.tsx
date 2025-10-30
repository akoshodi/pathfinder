import { Head, Link } from '@inertiajs/react';

interface Props {
    competition: {
        id: number;
        title: string;
        description?: string | null;
        organizer?: string | null;
        prize_amount?: number | null;
        website_url?: string | null;
        competition_date?: string | null;
        is_active: boolean;
    };
}

export default function Show({ competition }: Props) {
    return (
        <>
            <Head title={`${competition.title} - Competition`} />
            <div className="py-12">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    <Link href="/admin/competitions" className="text-indigo-600 hover:text-indigo-900">← Back</Link>
                    <div className="mt-4 overflow-hidden rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{competition.title}</h1>
                        {competition.organizer && <div className="text-sm text-gray-500">By {competition.organizer}</div>}
                        {competition.description && <p className="mt-4 text-gray-700 dark:text-gray-300">{competition.description}</p>}
                        {competition.website_url && (
                            <a href={competition.website_url} target="_blank" rel="noreferrer" className="mt-2 inline-block text-blue-600 hover:underline">
                                Visit website ↗
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
