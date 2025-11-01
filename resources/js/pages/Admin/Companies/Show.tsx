import AdminLayout from '@/layouts/admin-layout';
import { Head, Link } from '@inertiajs/react';

interface Props {
    company: {
        id: number;
        name: string;
        description?: string | null;
        website?: string | null;
        logo?: string | null;
        city?: string | null;
        country?: string | null;
        category?: string | null;
        is_active: boolean;
        is_featured: boolean;
        is_partner: boolean;
    };
}

export default function Show({ company }: Props) {
    return (
        <AdminLayout title="Company" breadcrumbs={[{ label: 'Admin' }, { label: 'Companies', href: '/admin/companies' }, { label: company.name }]}>
            <Head title={`${company.name} - Company`} />
            <Link href="/admin/companies" className="text-blue-600 hover:text-blue-900">← Back</Link>
            <div className="mt-4 overflow-hidden rounded-lg bg-card border border-border p-6 shadow-sm">
                <div className="flex items-center gap-4">
                    {company.logo && <img src={company.logo} alt={company.name} className="h-16 w-16 rounded" />}
                    <div>
                        <h1 className="text-2xl font-bold text-foreground">{company.name}</h1>
                        {company.website && (
                            <a href={company.website} target="_blank" className="text-sm text-blue-600 hover:underline" rel="noreferrer">
                                {company.website}
                            </a>
                        )}
                    </div>
                </div>
                {company.description && <p className="mt-4 text-foreground">{company.description}</p>}
                <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div>
                        <div className="text-sm text-muted-foreground">Location</div>
                        <div className="font-medium text-foreground">{company.city || '—'}, {company.country || '—'}</div>
                    </div>
                    <div>
                        <div className="text-sm text-muted-foreground">Category</div>
                        <div className="font-medium text-foreground">{company.category || '—'}</div>
                    </div>
                    <div>
                        <div className="text-sm text-muted-foreground">Status</div>
                        <div className="font-medium text-foreground">{company.is_active ? 'Active' : 'Inactive'}</div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
