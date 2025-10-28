import { router } from '@inertiajs/react';

export function UniversityFilters({ filters }: { filters: { type?: string; is_featured?: boolean } }) {
    const handleFilterChange = (key: string, value: any) => {
        router.get('/universities', { ...filters, [key]: value }, { preserveState: true });
    };

    return (
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-800 mb-3">Filters</h3>
            <div className="space-y-2">
                <div className="text-xs font-medium text-gray-500">Type</div>
                <div className="flex flex-wrap gap-2">
                    <button
                        onClick={() => handleFilterChange('type', undefined)}
                        className={`px-3 py-1.5 rounded-lg text-sm ${
                            !filters.type
                                ? 'bg-emerald-600 text-white'
                                : 'bg-gray-100 text-gray-800'
                        }`}
                    >
                        All
                    </button>
                    <button
                        onClick={() => handleFilterChange('type', 'Public')}
                        className={`px-3 py-1.5 rounded-lg text-sm ${
                            filters.type === 'Public'
                                ? 'bg-emerald-600 text-white'
                                : 'bg-gray-100 text-gray-800'
                        }`}
                    >
                        Public
                    </button>
                    <button
                        onClick={() => handleFilterChange('type', 'Private')}
                        className={`px-3 py-1.5 rounded-lg text-sm ${
                            filters.type === 'Private'
                                ? 'bg-emerald-600 text-white'
                                : 'bg-gray-100 text-gray-800'
                        }`}
                    >
                        Private
                    </button>
                </div>

                <div className="mt-4">
                    <label className="inline-flex items-center gap-2 text-sm text-gray-700">
                        <input
                            type="checkbox"
                            checked={!!filters.is_featured}
                            onChange={(e) => handleFilterChange('is_featured', e.target.checked ? true : undefined)}
                            className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                        />
                        Featured schools
                    </label>
                </div>
            </div>
        </div>
    );
}
