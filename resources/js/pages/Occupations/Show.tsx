import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import PublicLayout from '@/layouts/public-layout';

interface Occupation {
    code: string;
    slug: string;
    title: string;
    description: string;
    alternateTitles: string[];
}

interface SkillAbilityKnowledge {
    name: string;
    description?: string;
    value: number;
}

interface WorkActivity {
    name: string;
    value: number;
}

interface Interest {
    name: string;
    value: number;
}

interface Education {
    name: string;
    category: string;
    value: number;
}

interface JobZone {
    job_zone: number;
    name: string;
    experience: string;
    education: string;
    job_training: string;
    examples: string;
    svp_range: string;
}

interface Technology {
    name: string;
    hot: boolean;
    inDemand: boolean;
}

interface RelatedOccupation {
    code: string;
    slug: string;
    title: string;
    description: string;
}

interface Props {
    occupation: Occupation;
    skills: SkillAbilityKnowledge[];
    abilities: SkillAbilityKnowledge[];
    knowledge: SkillAbilityKnowledge[];
    tasks: string[];
    workActivities: WorkActivity[];
    workContext: WorkActivity[];
    workStyles: SkillAbilityKnowledge[];
    interests: Interest[];
    education: Education[];
    jobZone: JobZone | null;
    technologies: Technology[];
    tools: string[];
    relatedOccupations: RelatedOccupation[];
}

export default function OccupationShow({
    occupation,
    skills,
    abilities,
    knowledge,
    tasks,
    workActivities,
    workContext,
    workStyles,
    interests,
    education,
    jobZone,
    technologies,
    tools,
    relatedOccupations,
}: Props) {
    const [activeTab, setActiveTab] = useState<'overview' | 'skills' | 'work' | 'education' | 'tech'>('overview');

    // Helper to render a value bar
    const ValueBar = ({ value, max = 7 }: { value: number; max?: number }) => {
        const percentage = (value / max) * 100;
        return (
            <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                    className="bg-gradient-to-r from-emerald-600 to-teal-500 h-2.5 rounded-full transition-all"
                    style={{ width: `${percentage}%` }}
                />
            </div>
        );
    };

    return (
        <>
            <Head title={occupation.title} />

            {/* Header Section */}
            <section className="bg-gradient-to-r from-emerald-800 to-teal-700 text-white py-12 px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    <div className="flex items-start justify-between gap-6">
                        <div className="flex-1">
                            <div className="text-sm text-white/80 mb-2">O*NET Code: {occupation.code}</div>
                            <h1 className="text-4xl font-bold mb-4">{occupation.title}</h1>
                            <p className="text-lg text-white/90 mb-6">{occupation.description}</p>
                            
                            {occupation.alternateTitles.length > 0 && (
                                <div className="mb-4">
                                    <div className="text-sm text-white/70 mb-2">Also known as:</div>
                                    <div className="flex flex-wrap gap-2">
                                        {occupation.alternateTitles.slice(0, 5).map((title, index) => (
                                            <span
                                                key={index}
                                                className="px-3 py-1 bg-white/20 rounded-full text-sm backdrop-blur-sm"
                                            >
                                                {title}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="flex gap-3">
                            <button className="px-6 py-3 bg-white text-emerald-700 rounded-lg hover:bg-gray-100 transition-colors font-semibold whitespace-nowrap">
                                Save Career
                            </button>
                            <button className="px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-colors font-semibold whitespace-nowrap">
                                Compare
                            </button>
                        </div>
                    </div>

                    {/* Quick Stats */}
                    {jobZone && (
                        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                                <div className="text-sm text-white/70 mb-1">Job Zone</div>
                                <div className="text-2xl font-bold">{jobZone.job_zone}</div>
                                <div className="text-sm text-white/90">{jobZone.name}</div>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                                <div className="text-sm text-white/70 mb-1">Typical Education</div>
                                <div className="text-lg font-bold">{jobZone.education}</div>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                                <div className="text-sm text-white/70 mb-1">Experience</div>
                                <div className="text-lg font-bold">{jobZone.experience}</div>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* Tab Navigation */}
            <div className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex gap-8 overflow-x-auto">
                        {[
                            { id: 'overview', label: 'Overview' },
                            { id: 'skills', label: 'Skills & Abilities' },
                            { id: 'work', label: 'Work Environment' },
                            { id: 'education', label: 'Education & Training' },
                            { id: 'tech', label: 'Technology & Tools' },
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={`py-4 border-b-2 transition-colors whitespace-nowrap font-medium ${
                                    activeTab === tab.id
                                        ? 'border-emerald-600 text-emerald-700 bg-emerald-50'
                                        : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <main className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
                <div className="mx-auto max-w-7xl">
                    {/* Overview Tab */}
                    {activeTab === 'overview' && (
                        <div className="space-y-8">
                            {/* What They Do */}
                            {tasks.length > 0 && (
                                <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-6">What They Do</h2>
                                    <div className="space-y-3">
                                        {tasks.map((task, index) => (
                                            <div key={index} className="flex items-start gap-3">
                                                <svg
                                                    className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                                <span className="text-gray-700">{task}</span>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* Interests (RIASEC) */}
                            {interests.length > 0 && (
                                <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Interest Profile</h2>
                                    <p className="text-gray-600 mb-6">Based on the RIASEC model</p>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {interests.map((interest, index) => (
                                            <div key={index} className="p-4 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg">
                                                <div className="font-semibold text-gray-900 mb-2">{interest.name}</div>
                                                <div className="flex items-center gap-3">
                                                    <ValueBar value={interest.value} />
                                                    <span className="text-sm font-medium text-gray-700">{interest.value.toFixed(1)}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* Top Skills Preview */}
                            {skills.length > 0 && (
                                <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Top Skills Required</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {skills.slice(0, 6).map((skill, index) => (
                                            <div key={index}>
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="font-medium text-gray-900">{skill.name}</span>
                                                    <span className="text-sm text-gray-600">{skill.value.toFixed(1)}/7</span>
                                                </div>
                                                <ValueBar value={skill.value} />
                                                {skill.description && (
                                                    <p className="text-sm text-gray-600 mt-1">{skill.description}</p>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                    <button
                                        onClick={() => setActiveTab('skills')}
                                        className="mt-6 text-emerald-600 hover:text-emerald-700 font-medium"
                                    >
                                        View all skills →
                                    </button>
                                </section>
                            )}
                        </div>
                    )}

                    {/* Skills Tab */}
                    {activeTab === 'skills' && (
                        <div className="space-y-8">
                            {/* Skills */}
                            {skills.length > 0 && (
                                <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Skills</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {skills.map((skill, index) => (
                                            <div key={index}>
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="font-medium text-gray-900">{skill.name}</span>
                                                    <span className="text-sm text-gray-600">{skill.value.toFixed(1)}</span>
                                                </div>
                                                <ValueBar value={skill.value} />
                                                {skill.description && (
                                                    <p className="text-sm text-gray-600 mt-1">{skill.description}</p>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* Abilities */}
                            {abilities.length > 0 && (
                                <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Abilities</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {abilities.map((ability, index) => (
                                            <div key={index}>
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="font-medium text-gray-900">{ability.name}</span>
                                                    <span className="text-sm text-gray-600">{ability.value.toFixed(1)}</span>
                                                </div>
                                                <ValueBar value={ability.value} />
                                                {ability.description && (
                                                    <p className="text-sm text-gray-600 mt-1">{ability.description}</p>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* Knowledge */}
                            {knowledge.length > 0 && (
                                <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Knowledge Areas</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {knowledge.map((k, index) => (
                                            <div key={index}>
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="font-medium text-gray-900">{k.name}</span>
                                                    <span className="text-sm text-gray-600">{k.value.toFixed(1)}</span>
                                                </div>
                                                <ValueBar value={k.value} />
                                                {k.description && (
                                                    <p className="text-sm text-gray-600 mt-1">{k.description}</p>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}
                        </div>
                    )}

                    {/* Work Tab */}
                    {activeTab === 'work' && (
                        <div className="space-y-8">
                            {/* Work Activities */}
                            {workActivities.length > 0 && (
                                <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Work Activities</h2>
                                    <div className="space-y-4">
                                        {workActivities.map((activity, index) => (
                                            <div key={index}>
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="font-medium text-gray-900">{activity.name}</span>
                                                    <span className="text-sm text-gray-600">{activity.value.toFixed(1)}</span>
                                                </div>
                                                <ValueBar value={activity.value} />
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* Work Context */}
                            {workContext.length > 0 && (
                                <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Work Context</h2>
                                    <div className="space-y-4">
                                        {workContext.map((context, index) => (
                                            <div key={index}>
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="font-medium text-gray-900">{context.name}</span>
                                                    <span className="text-sm text-gray-600">{context.value.toFixed(1)}</span>
                                                </div>
                                                <ValueBar value={context.value} max={5} />
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* Work Styles */}
                            {workStyles.length > 0 && (
                                <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Work Styles</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {workStyles.map((style, index) => (
                                            <div key={index}>
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="font-medium text-gray-900">{style.name}</span>
                                                    <span className="text-sm text-gray-600">{style.value.toFixed(1)}</span>
                                                </div>
                                                <ValueBar value={style.value} />
                                                {style.description && (
                                                    <p className="text-sm text-gray-600 mt-1">{style.description}</p>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}
                        </div>
                    )}

                    {/* Education Tab */}
                    {activeTab === 'education' && (
                        <div className="space-y-8">
                            {/* Job Zone Details */}
                            {jobZone && (
                                <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Job Zone {jobZone.job_zone}: {jobZone.name}</h2>
                                    <div className="space-y-6">
                                        <div>
                                            <h3 className="font-semibold text-gray-900 mb-2">Experience</h3>
                                            <p className="text-gray-700">{jobZone.experience}</p>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900 mb-2">Education</h3>
                                            <p className="text-gray-700">{jobZone.education}</p>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900 mb-2">Job Training</h3>
                                            <p className="text-gray-700">{jobZone.job_training}</p>
                                        </div>
                                        {jobZone.examples && (
                                            <div>
                                                <h3 className="font-semibold text-gray-900 mb-2">Example Occupations</h3>
                                                <p className="text-gray-700">{jobZone.examples}</p>
                                            </div>
                                        )}
                                    </div>
                                </section>
                            )}

                            {/* Education Requirements */}
                            {education.length > 0 && (
                                <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Education & Training</h2>
                                    <div className="space-y-4">
                                        {education.map((edu, index) => (
                                            <div key={index} className="p-4 bg-gray-50 rounded-lg">
                                                <div className="font-semibold text-gray-900 mb-1">{edu.name}</div>
                                                <div className="text-sm text-gray-700 mb-2">{edu.category}</div>
                                                <div className="flex items-center gap-3">
                                                    <ValueBar value={edu.value} max={100} />
                                                    <span className="text-sm text-gray-600">{edu.value.toFixed(0)}%</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* Universities Offering Programs */}
                            <section className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl border-2 border-emerald-200 p-8">
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Find Universities & Programs</h3>
                                <p className="text-gray-700 mb-6">
                                    Explore universities that offer programs to prepare you for this career.
                                </p>
                                <Link
                                    href="/universities"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-semibold"
                                >
                                    Browse Universities
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </Link>
                            </section>
                        </div>
                    )}

                    {/* Technology Tab */}
                    {activeTab === 'tech' && (
                        <div className="space-y-8">
                            {/* Technology Skills */}
                            {technologies.length > 0 && (
                                <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Technology & Software</h2>
                                    <div className="flex flex-wrap gap-3">
                                        {technologies.map((tech, index) => (
                                            <span
                                                key={index}
                                                className={`px-4 py-2 rounded-lg font-medium ${
                                                    tech.hot
                                                        ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
                                                        : tech.inDemand
                                                          ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                                                          : 'bg-gray-100 text-gray-800'
                                                }`}
                                            >
                                                {tech.name}
                                                {tech.hot && ' 🔥'}
                                                {tech.inDemand && ' ⭐'}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="mt-6 flex gap-6 text-sm">
                                        <div className="flex items-center gap-2">
                                            <span className="w-4 h-4 rounded bg-gradient-to-r from-orange-500 to-red-500" />
                                            <span className="text-gray-600">Hot Technology</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="w-4 h-4 rounded bg-gradient-to-r from-green-500 to-emerald-500" />
                                            <span className="text-gray-600">In Demand</span>
                                        </div>
                                    </div>
                                </section>
                            )}

                            {/* Tools */}
                            {tools.length > 0 && (
                                <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Tools & Equipment</h2>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                                        {tools.map((tool, index) => (
                                            <div key={index} className="p-3 bg-gray-50 rounded-lg text-gray-800">
                                                {tool}
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}
                        </div>
                    )}

                    {/* Related Occupations (Always visible at bottom) */}
                    {relatedOccupations.length > 0 && (
                        <section className="mt-12 bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Occupations</h2>
                            <p className="text-gray-600 mb-6">You might also be interested in these similar careers</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {relatedOccupations.map((related) => (
                                    <Link
                                        key={related.code}
                                        href={`/occupations/${related.slug}`}
                                        className="p-6 border-2 border-gray-200 rounded-xl hover:border-emerald-400 hover:shadow-lg transition-all group"
                                    >
                                        <h3 className="font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                                            {related.title}
                                        </h3>
                                        <p className="text-sm text-gray-600 line-clamp-2">{related.description}</p>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </main>
        </>
    );
}

OccupationShow.layout = (page: React.ReactNode) => <PublicLayout>{page}</PublicLayout>;
