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
        <>
            <Head title={`${company.name} - Company`} />
            <div className="py-12">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    <Link href="/admin/companies" className="text-indigo-600 hover:text-indigo-900">← Back</Link>
                    <div className="mt-4 overflow-hidden rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                        <div className="flex items-center gap-4">
                            {company.logo && <img src={company.logo} alt={company.name} className="h-16 w-16 rounded" />}
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{company.name}</h1>
                                {company.website && (
                                    <a href={company.website} target="_blank" className="text-sm text-blue-600 hover:underline" rel="noreferrer">
                                        {company.website}
                                    </a>
                                )}
                            </div>
                        </div>
                        {company.description && <p className="mt-4 text-gray-700 dark:text-gray-300">{company.description}</p>}
                        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
                            <div>
                                <div className="text-sm text-gray-500">Location</div>
                                <div className="font-medium">{company.city || '—'}, {company.country || '—'}</div>
                            </div>
                            <div>
                                <div className="text-sm text-gray-500">Category</div>
                                <div className="font-medium">{company.category || '—'}</div>
                            </div>
                            <div>
                                <div className="text-sm text-gray-500">Status</div>
                                <div className="font-medium">{company.is_active ? 'Active' : 'Inactive'}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
