import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

interface Competition {
    id?: number;
    title: string;
    description: string | null;
    category: string | null;
    organizer: string | null;
    website_url: string | null;
    prize_amount: number | null;
    prize_description: string | null;
    eligibility_requirements: string[] | null; // comma-separated in UI
    registration_start: string | null; // ISO
    registration_end: string | null;
    competition_date: string | null;
    location: string | null;
    format: string | null;
    image: string | null;
    is_featured: boolean;
    is_active: boolean;
}

interface Props { competition?: Competition; isEdit?: boolean }

export default function Form({ competition, isEdit = false }: Props) {
    const { data, setData, post, put, processing, errors } = useForm({
        title: competition?.title || '',
        description: competition?.description || '',
        category: competition?.category || '',
        organizer: competition?.organizer || '',
        website_url: competition?.website_url || '',
        prize_amount: competition?.prize_amount ?? '' as unknown as number,
        prize_description: competition?.prize_description || '',
        eligibility: (competition?.eligibility_requirements || []).join(', '),
        registration_start: competition?.registration_start || '',
        registration_end: competition?.registration_end || '',
        competition_date: competition?.competition_date || '',
        location: competition?.location || '',
        format: competition?.format || '',
        image: competition?.image || '',
        is_featured: competition?.is_featured || false,
        is_active: competition?.is_active ?? true,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        const payload = {
            title: data.title,
            description: data.description,
            category: data.category,
            organizer: data.organizer,
            website_url: data.website_url,
            prize_amount: data.prize_amount === ('' as any) ? null : Number(data.prize_amount),
            prize_description: data.prize_description,
            eligibility_requirements: (data as any).eligibility
                ? (data as any).eligibility.split(',').map((s: string) => s.trim()).filter(Boolean)
                : [],
            registration_start: data.registration_start || null,
            registration_end: data.registration_end || null,
            competition_date: data.competition_date || null,
            location: data.location,
            format: data.format,
            image: data.image,
            is_featured: data.is_featured,
            is_active: data.is_active,
        };
        
        // Override form data with transformed payload
        Object.assign(data, payload);
        (data as any).eligibility_requirements = payload.eligibility_requirements;
        
        if (isEdit && competition) {
            put(`/admin/competitions/${competition.id}`);
        } else {
            post('/admin/competitions');
        }
    };

    return (
        <>
            <Head title={isEdit ? 'Edit Competition' : 'Create Competition'} />
            <div className="mx-auto max-w-4xl">
                <div className="mb-6">
                    <Link href="/admin/competitions" className="inline-flex items-center text-sm text-foreground hover:underline">
                        <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                        Back to Competitions
                    </Link>
                </div>

                <div className={`overflow-hidden bg-card border border-border rounded-lg shadow-sm ${processing ? 'opacity-60' : ''}`}>
                    <form onSubmit={submit} className="p-6">
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-foreground">Title *</label>
                                    <input value={data.title} onChange={(e)=>setData('title', e.target.value)} className="mt-1 block w-full rounded-md shadow-sm" />
                                    {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-foreground">Description</label>
                                    <textarea value={data.description} onChange={(e)=>setData('description', e.target.value)} rows={4} className="mt-1 block w-full rounded-md shadow-sm" />
                                    {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-foreground">Category</label>
                                    <input value={data.category} onChange={(e)=>setData('category', e.target.value)} className="mt-1 block w-full rounded-md shadow-sm" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-foreground">Organizer</label>
                                    <input value={data.organizer} onChange={(e)=>setData('organizer', e.target.value)} className="mt-1 block w-full rounded-md shadow-sm" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-foreground">Website URL</label>
                                    <input type="url" value={data.website_url} onChange={(e)=>setData('website_url', e.target.value)} className="mt-1 block w-full rounded-md shadow-sm" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-foreground">Prize Amount</label>
                                    <input type="number" step="0.01" value={data.prize_amount as any} onChange={(e)=>setData('prize_amount', e.target.value as any)} className="mt-1 block w-full rounded-md shadow-sm" />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-foreground">Prize Description</label>
                                    <textarea value={data.prize_description} onChange={(e)=>setData('prize_description', e.target.value)} rows={3} className="mt-1 block w-full rounded-md shadow-sm" />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-foreground">Eligibility (comma-separated)</label>
                                    <input value={(data as any).eligibility} onChange={(e)=>setData('eligibility' as any, e.target.value)} className="mt-1 block w-full rounded-md shadow-sm" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-foreground">Registration Start</label>
                                    <input type="datetime-local" value={data.registration_start || ''} onChange={(e)=>setData('registration_start', e.target.value)} className="mt-1 block w-full rounded-md shadow-sm" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-foreground">Registration End</label>
                                    <input type="datetime-local" value={data.registration_end || ''} onChange={(e)=>setData('registration_end', e.target.value)} className="mt-1 block w-full rounded-md shadow-sm" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-foreground">Competition Date</label>
                                    <input type="datetime-local" value={data.competition_date || ''} onChange={(e)=>setData('competition_date', e.target.value)} className="mt-1 block w-full rounded-md shadow-sm" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-foreground">Location</label>
                                    <input value={data.location} onChange={(e)=>setData('location', e.target.value)} className="mt-1 block w-full rounded-md shadow-sm" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-foreground">Format</label>
                                    <input value={data.format} onChange={(e)=>setData('format', e.target.value)} className="mt-1 block w-full rounded-md shadow-sm" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-foreground">Image URL</label>
                                    <input value={data.image} onChange={(e)=>setData('image', e.target.value)} className="mt-1 block w-full rounded-md shadow-sm" />
                                </div>
                                <div className="md:col-span-2 flex gap-6">
                                    <label className="flex items-center gap-2 text-sm text-foreground">
                                        <input className="h-4 w-4 rounded border-border text-indigo-600 focus:ring-indigo-500" type="checkbox" checked={data.is_featured} onChange={(e)=>setData('is_featured', e.target.checked)} /> Featured
                                    </label>
                                    <label className="flex items-center gap-2 text-sm text-foreground">
                                        <input className="h-4 w-4 rounded border-border text-indigo-600 focus:ring-indigo-500" type="checkbox" checked={data.is_active} onChange={(e)=>setData('is_active', e.target.checked)} /> Active
                                    </label>
                                </div>
                            </div>
                            <div className="mt-8 flex items-center justify-end gap-4">
                                <Link href="/admin/competitions" className="rounded-md bg-muted px-4 py-2 text-sm font-semibold text-foreground shadow-sm hover:bg-muted/80">Cancel</Link>
                                <button type="submit" disabled={processing} className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 disabled:opacity-50">
                                    {processing ? 'Saving...' : isEdit ? 'Update' : 'Create'}
                                </button>
                            </div>
                    </form>
                </div>
            </div>
        </>
    );
}
