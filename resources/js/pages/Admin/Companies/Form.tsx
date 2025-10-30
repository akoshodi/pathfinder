import { useForm, Link, Head } from '@inertiajs/react';
import { FormEventHandler } from 'react';

interface Company {
    id?: number;
    name: string;
    description: string | null;
    logo: string | null;
    cover_image: string | null;
    category: string | null;
    location: string | null;
    city: string | null;
    state: string | null;
    country: string | null;
    employees: string | null;
    website: string | null;
    email: string | null;
    phone: string | null;
    is_partner: boolean;
    is_featured: boolean;
    is_active: boolean;
    benefits: string[] | null;
    values: string[] | null;
}

interface Props {
    company?: Company;
    isEdit?: boolean;
}

export default function Form({ company, isEdit = false }: Props) {
    const { data, setData, post, put, processing, errors } = useForm({
        name: company?.name || '',
        description: company?.description || '',
        logo: company?.logo || '',
        cover_image: company?.cover_image || '',
        category: company?.category || '',
        location: company?.location || '',
        city: company?.city || '',
        state: company?.state || '',
        country: company?.country || '',
        employees: company?.employees || '',
        website: company?.website || '',
        email: company?.email || '',
        phone: company?.phone || '',
        is_partner: company?.is_partner || false,
        is_featured: company?.is_featured || false,
        is_active: company?.is_active ?? true,
        benefits: company?.benefits || [],
        values: company?.values || [],
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        if (isEdit && company) {
            put(`/admin/companies/${company.id}`);
        } else {
            post('/admin/companies');
        }
    };

    return (
        <>
            <Head title={isEdit ? 'Edit Company' : 'Create Company'} />

            <div className="py-12">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-6">
                        <Link
                            href="/admin/companies"
                            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                        >
                            <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Back to Companies
                        </Link>
                        <h1 className="mt-4 text-3xl font-bold text-gray-900 dark:text-gray-100">
                            {isEdit ? 'Edit Company' : 'Create Company'}
                        </h1>
                    </div>

                    <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
                        <div className="border-b border-gray-200 bg-white px-6 py-4 dark:border-gray-700 dark:bg-gray-800">
                            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                                {isEdit ? 'Edit Company' : 'Create Company'}
                            </h2>
                        </div>

                    <form onSubmit={submit} className="p-6">
                        <div className="space-y-6">
                            {/* Name */}
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                >
                                    Name *
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                />
                                {errors.name && (
                                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            {/* Description */}
                            <div>
                                <label
                                    htmlFor="description"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                >
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    rows={4}
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                />
                                {errors.description && (
                                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                                        {errors.description}
                                    </p>
                                )}
                            </div>

                            {/* Logo & Cover Image */}
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div>
                                    <label
                                        htmlFor="logo"
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                    >
                                        Logo URL
                                    </label>
                                    <input
                                        id="logo"
                                        type="url"
                                        value={data.logo}
                                        onChange={(e) => setData('logo', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    />
                                    {errors.logo && (
                                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                                            {errors.logo}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label
                                        htmlFor="cover_image"
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                    >
                                        Cover Image URL
                                    </label>
                                    <input
                                        id="cover_image"
                                        type="url"
                                        value={data.cover_image}
                                        onChange={(e) => setData('cover_image', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    />
                                    {errors.cover_image && (
                                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                                            {errors.cover_image}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Category & Employees */}
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div>
                                    <label
                                        htmlFor="category"
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                    >
                                        Category
                                    </label>
                                    <input
                                        id="category"
                                        type="text"
                                        value={data.category}
                                        onChange={(e) => setData('category', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    />
                                    {errors.category && (
                                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                                            {errors.category}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label
                                        htmlFor="employees"
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                    >
                                        Employees
                                    </label>
                                    <input
                                        id="employees"
                                        type="text"
                                        placeholder="e.g., 50-100"
                                        value={data.employees}
                                        onChange={(e) => setData('employees', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    />
                                    {errors.employees && (
                                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                                            {errors.employees}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Location Fields */}
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div>
                                    <label
                                        htmlFor="city"
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                    >
                                        City
                                    </label>
                                    <input
                                        id="city"
                                        type="text"
                                        value={data.city}
                                        onChange={(e) => setData('city', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    />
                                    {errors.city && (
                                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                                            {errors.city}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label
                                        htmlFor="state"
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                    >
                                        State/Province
                                    </label>
                                    <input
                                        id="state"
                                        type="text"
                                        value={data.state}
                                        onChange={(e) => setData('state', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    />
                                    {errors.state && (
                                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                                            {errors.state}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div>
                                    <label
                                        htmlFor="country"
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                    >
                                        Country
                                    </label>
                                    <input
                                        id="country"
                                        type="text"
                                        value={data.country}
                                        onChange={(e) => setData('country', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    />
                                    {errors.country && (
                                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                                            {errors.country}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label
                                        htmlFor="location"
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                    >
                                        Full Address
                                    </label>
                                    <input
                                        id="location"
                                        type="text"
                                        value={data.location}
                                        onChange={(e) => setData('location', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    />
                                    {errors.location && (
                                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                                            {errors.location}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Contact Information */}
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                                <div>
                                    <label
                                        htmlFor="website"
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                    >
                                        Website
                                    </label>
                                    <input
                                        id="website"
                                        type="url"
                                        value={data.website}
                                        onChange={(e) => setData('website', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    />
                                    {errors.website && (
                                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                                            {errors.website}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                    >
                                        Email
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    />
                                    {errors.email && (
                                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                                            {errors.email}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label
                                        htmlFor="phone"
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                    >
                                        Phone
                                    </label>
                                    <input
                                        id="phone"
                                        type="tel"
                                        value={data.phone}
                                        onChange={(e) => setData('phone', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    />
                                    {errors.phone && (
                                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                                            {errors.phone}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Checkboxes */}
                            <div className="space-y-4">
                                <div className="flex items-center">
                                    <input
                                        id="is_partner"
                                        type="checkbox"
                                        checked={data.is_partner}
                                        onChange={(e) => setData('is_partner', e.target.checked)}
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <label
                                        htmlFor="is_partner"
                                        className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                                    >
                                        Partner Company
                                    </label>
                                </div>

                                <div className="flex items-center">
                                    <input
                                        id="is_featured"
                                        type="checkbox"
                                        checked={data.is_featured}
                                        onChange={(e) => setData('is_featured', e.target.checked)}
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <label
                                        htmlFor="is_featured"
                                        className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                                    >
                                        Featured Company
                                    </label>
                                </div>

                                <div className="flex items-center">
                                    <input
                                        id="is_active"
                                        type="checkbox"
                                        checked={data.is_active}
                                        onChange={(e) => setData('is_active', e.target.checked)}
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <label
                                        htmlFor="is_active"
                                        className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                                    >
                                        Active
                                    </label>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center justify-end gap-4">
                                <Link
                                    href="/admin/companies"
                                    className="rounded-md bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                                >
                                    Cancel
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 disabled:opacity-50"
                                >
                                    {processing ? 'Saving...' : isEdit ? 'Update' : 'Create'}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            </div>
        </>
    );
}
