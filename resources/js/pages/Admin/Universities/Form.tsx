import { Head, Link, useForm } from '@inertiajs/react';

interface University {
    id?: number;
    name: string;
    description: string | null;
    location: string | null;
    type: string;
    website: string | null;
    logo_url: string | null;
    established_year: number | null;
    ranking: number | null;
    is_featured: boolean;
}

interface Props {
    university?: University;
}

export default function Form({ university }: Props) {
    const isEditing = !!university;

    const { data, setData, post, put, processing, errors } = useForm({
        name: university?.name || '',
        description: university?.description || '',
        location: university?.location || '',
        type: university?.type || 'university',
        website: university?.website || '',
        logo_url: university?.logo_url || '',
        established_year: university?.established_year || '',
        ranking: university?.ranking || '',
        is_featured: university?.is_featured || false,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (isEditing) {
            put(`/admin/universities/${university.id}`);
        } else {
            post('/admin/universities');
        }
    };

    return (
        <>
            <Head title={isEditing ? 'Edit University' : 'Create University'} />

            <div className="mx-auto w-full max-w-4xl px-4 md:px-0">
                <div className="mb-6">
                    <Link
                        href="/admin/universities"
                        className="inline-flex items-center text-sm text-foreground hover:underline"
                    >
                        <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Universities
                    </Link>
                </div>

                <div className="overflow-hidden bg-card border border-border rounded-lg shadow-sm">
                    <form onSubmit={handleSubmit} className="p-4 md:p-6 space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-foreground">
                                Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="mt-1 block w-full rounded-md shadow-sm"
                                required
                            />
                            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                        </div>

                        {/* Description */}
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-foreground">
                                Description
                            </label>
                            <textarea
                                id="description"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                rows={4}
                                className="mt-1 block w-full rounded-md shadow-sm"
                            />
                            {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                        </div>

                        {/* Location & Type */}
                        <div className="grid gap-6 md:grid-cols-2">
                            <div>
                                <label htmlFor="location" className="block text-sm font-medium text-foreground">
                                    Location
                                </label>
                                <input
                                    id="location"
                                    type="text"
                                    value={data.location}
                                    onChange={(e) => setData('location', e.target.value)}
                                    placeholder="e.g., New York, NY"
                                    className="mt-1 block w-full rounded-md shadow-sm"
                                />
                                {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location}</p>}
                            </div>

                            <div>
                                <label htmlFor="type" className="block text-sm font-medium text-foreground">
                                    Type <span className="text-red-500">*</span>
                                </label>
                                <select
                                    id="type"
                                    value={data.type}
                                    onChange={(e) => setData('type', e.target.value)}
                                    className="mt-1 block w-full rounded-md shadow-sm"
                                    required
                                >
                                    <option value="university">University</option>
                                    <option value="college">College</option>
                                    <option value="institute">Institute</option>
                                    <option value="school">School</option>
                                </select>
                                {errors.type && <p className="mt-1 text-sm text-red-600">{errors.type}</p>}
                            </div>
                        </div>

                        {/* Website & Logo URL */}
                        <div className="grid gap-6 md:grid-cols-2">
                            <div>
                                <label htmlFor="website" className="block text-sm font-medium text-foreground">
                                    Website
                                </label>
                                <input
                                    type="url"
                                    id="website"
                                    value={data.website}
                                    onChange={(e) => setData('website', e.target.value)}
                                    placeholder="https://example.edu"
                                    className="mt-1 block w-full rounded-md shadow-sm"
                                />
                                {errors.website && <p className="mt-1 text-sm text-red-600">{errors.website}</p>}
                            </div>

                            <div>
                                <label htmlFor="logo_url" className="block text-sm font-medium text-foreground">
                                    Logo URL
                                </label>
                                <input
                                    type="url"
                                    id="logo_url"
                                    value={data.logo_url}
                                    onChange={(e) => setData('logo_url', e.target.value)}
                                    placeholder="https://example.com/logo.png"
                                    className="mt-1 block w-full rounded-md shadow-sm"
                                />
                                {errors.logo_url && <p className="mt-1 text-sm text-red-600">{errors.logo_url}</p>}
                            </div>
                        </div>

                        {/* Established Year & Ranking */}
                        <div className="grid gap-6 md:grid-cols-2">
                            <div>
                                <label htmlFor="established_year" className="block text-sm font-medium text-foreground">
                                    Established Year
                                </label>
                                <input
                                    type="number"
                                    id="established_year"
                                    value={data.established_year}
                                    onChange={(e) => setData('established_year', e.target.value ? Number(e.target.value) : '')}
                                    min="1800"
                                    max={new Date().getFullYear()}
                                    className="mt-1 block w-full rounded-md shadow-sm"
                                />
                                {errors.established_year && <p className="mt-1 text-sm text-red-600">{errors.established_year}</p>}
                            </div>

                            <div>
                                <label htmlFor="ranking" className="block text-sm font-medium text-foreground">
                                    Ranking
                                </label>
                                <input
                                    type="number"
                                    id="ranking"
                                    value={data.ranking}
                                    onChange={(e) => setData('ranking', e.target.value ? Number(e.target.value) : '')}
                                    min="1"
                                    className="mt-1 block w-full rounded-md shadow-sm"
                                />
                                {errors.ranking && <p className="mt-1 text-sm text-red-600">{errors.ranking}</p>}
                            </div>
                        </div>

                        {/* Featured */}
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="is_featured"
                                checked={data.is_featured}
                                onChange={(e) => setData('is_featured', e.target.checked)}
                                className="h-4 w-4 rounded border-border bg-card"
                            />
                            <label htmlFor="is_featured" className="ml-2 block text-sm text-foreground">
                                Featured (Show on homepage)
                            </label>
                        </div>

                        {/* Submit Buttons */}
                        <div className="flex justify-end gap-4">
                            <Link
                                href="/admin/universities"
                                className="rounded-md bg-muted px-4 py-2 text-sm font-medium text-foreground hover:bg-muted/80"
                            >
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
                            >
                                {processing ? 'Saving...' : isEditing ? 'Update University' : 'Create University'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
