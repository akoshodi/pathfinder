import { router } from '@inertiajs/react';
import { useState } from 'react';

interface RiasecInterest {
    code: string;
    name: string;
    description: string;
}

interface JobZone {
    job_zone: number;
    name: string;
    education: string;
}

interface CareerCluster {
    id: string;
    name: string;
    icon: string;
}

interface Props {
    filters: {
        interest?: string;
        job_zone?: string | number;
        cluster?: string;
    };
    riasecInterests: RiasecInterest[];
    jobZones: JobZone[];
    careerClusters: CareerCluster[];
}

export function OccupationFilters({ filters, riasecInterests, jobZones, careerClusters }: Props) {
    const [openSections, setOpenSections] = useState({
        interests: true,
        education: true,
        clusters: false,
    });

    const toggleSection = (section: keyof typeof openSections) => {
        setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
    };

    const handleFilterChange = (key: string, value: any) => {
        router.get('/occupations', { ...filters, [key]: value }, { preserveState: true });
    };

    const clearFilters = () => {
        router.get('/occupations');
    };

    return (
        <div className="space-y-4">
            {/* Active Filters */}
            {(filters.interest || filters.job_zone) && (
                <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                    <div className="mb-3 text-xs font-semibold text-gray-800">Active Filters</div>
                    <div className="flex flex-wrap items-center gap-2">
                        {filters.interest && (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium">
                                {filters.interest}
                                <button 
                                    onClick={() => handleFilterChange('interest', undefined)} 
                                    className="hover:text-emerald-900 ml-0.5"
                                    aria-label="Remove interest filter"
                                >
                                    ×
                                </button>
                            </span>
                        )}
                        {filters.job_zone && (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium">
                                Zone {filters.job_zone}
                                <button 
                                    onClick={() => handleFilterChange('job_zone', undefined)} 
                                    className="hover:text-emerald-900 ml-0.5"
                                    aria-label="Remove job zone filter"
                                >
                                    ×
                                </button>
                            </span>
                        )}
                        <button 
                            onClick={clearFilters} 
                            className="text-xs text-gray-600 hover:text-gray-900 underline"
                        >
                            Clear all
                        </button>
                    </div>
                </div>
            )}

            {/* Interest Type Filter */}
            <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
                <button
                    onClick={() => toggleSection('interests')}
                    className="flex w-full items-center justify-between p-4 text-left"
                >
                    <div>
                        <h3 className="text-sm font-semibold text-gray-800">Interest Type</h3>
                        <p className="text-xs text-gray-500 mt-0.5">Based on RIASEC personality model</p>
                    </div>
                    <svg
                        className={`h-5 w-5 text-gray-400 transition-transform ${openSections.interests ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
                {openSections.interests && (
                    <div className="border-t border-gray-100 p-4 pt-3">
                        <div className="space-y-2">
                            {riasecInterests.map((interest) => (
                                <button
                                    key={interest.code}
                                    onClick={() => handleFilterChange('interest', interest.name)}
                                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                                        filters.interest === interest.name
                                            ? 'bg-emerald-50 text-emerald-700 font-medium'
                                            : 'text-gray-700 hover:bg-gray-50'
                                    }`}
                                >
                                    <div className="flex items-center gap-2">
                                        <span className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                                            filters.interest === interest.name
                                                ? 'bg-emerald-600 text-white'
                                                : 'bg-gray-200 text-gray-600'
                                        }`}>
                                            {interest.code}
                                        </span>
                                        <div className="flex-1 min-w-0">
                                            <div className="font-medium">{interest.name}</div>
                                            <div className="text-xs text-gray-500 truncate">{interest.description}</div>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Education Level Filter */}
            <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
                <button
                    onClick={() => toggleSection('education')}
                    className="flex w-full items-center justify-between p-4 text-left"
                >
                    <div>
                        <h3 className="text-sm font-semibold text-gray-800">Education Level</h3>
                        <p className="text-xs text-gray-500 mt-0.5">Filter by required education & training</p>
                    </div>
                    <svg
                        className={`h-5 w-5 text-gray-400 transition-transform ${openSections.education ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
                {openSections.education && (
                    <div className="border-t border-gray-100 p-4 pt-3">
                        <div className="space-y-2">
                            {jobZones.map((zone) => (
                                <button
                                    key={zone.job_zone}
                                    onClick={() => handleFilterChange('job_zone', zone.job_zone)}
                                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                                        filters.job_zone == zone.job_zone
                                            ? 'bg-emerald-50 text-emerald-700 font-medium'
                                            : 'text-gray-700 hover:bg-gray-50'
                                    }`}
                                >
                                    <div className="font-medium">Zone {zone.job_zone}: {zone.name}</div>
                                    <div className="text-xs text-gray-500">{zone.education}</div>
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Career Clusters Filter */}
            <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
                <button
                    onClick={() => toggleSection('clusters')}
                    className="flex w-full items-center justify-between p-4 text-left"
                >
                    <div>
                        <h3 className="text-sm font-semibold text-gray-800">Career Clusters</h3>
                        <p className="text-xs text-gray-500 mt-0.5">Browse by industry category</p>
                    </div>
                    <svg
                        className={`h-5 w-5 text-gray-400 transition-transform ${openSections.clusters ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
                {openSections.clusters && (
                    <div className="border-t border-gray-100 p-4 pt-3">
                        <div className="grid grid-cols-2 gap-2">
                            {careerClusters.map((cluster) => (
                                <button
                                    key={cluster.id}
                                    onClick={() => handleFilterChange('cluster', cluster.id)}
                                    className={`p-2 rounded-lg border text-center transition-colors ${
                                        filters.cluster === cluster.id
                                            ? 'border-emerald-600 bg-emerald-50'
                                            : 'border-gray-200 hover:border-emerald-300 hover:bg-gray-50'
                                    }`}
                                >
                                    <div className="text-xl mb-1">{cluster.icon}</div>
                                    <div className="text-xs font-medium text-gray-900 line-clamp-2">{cluster.name}</div>
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
