import AdminLayout from '@/layouts/admin-layout';
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
        <AdminLayout title="Competition" breadcrumbs={[{ label: 'Admin' }, { label: 'Competitions', href: '/admin/competitions' }, { label: competition.title }]}>
            <Head title={`${competition.title} - Competition`} />
            <Link href="/admin/competitions" className="text-foreground hover:underline">← Back</Link>
            <div className="mt-4 overflow-hidden rounded-lg bg-card border border-border p-6 shadow-sm">
                <h1 className="text-2xl font-bold text-foreground">{competition.title}</h1>
                {competition.organizer && <div className="text-sm text-foreground/70">By {competition.organizer}</div>}
                {competition.description && <p className="mt-4 text-foreground/90">{competition.description}</p>}
                {competition.website_url && (
                    <a href={competition.website_url} target="_blank" rel="noreferrer" className="mt-2 inline-block text-indigo-600 hover:underline">
                        Visit website ↗
                    </a>
                )}
            </div>
        </AdminLayout>
    );
}
