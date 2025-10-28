import { Head, Link, router, usePage } from '@inertiajs/react';
import { type ReactNode } from 'react';
import { GraduationCap, MapPin, Users, DollarSign, Award, BookOpen, Building2, Trophy, ChevronRight } from 'lucide-react';
import PublicLayout from '@/layouts/public-layout';
import { type SharedData } from '@/types';

interface Assoc { id: number; name: string; slug: string }
interface Course { id: number; title: string; slug: string }

interface Program { id: number; name: string; slug: string; category: string; degree?: string | null; college?: string | null }
interface ProgramsByCollege { college: string; programs: Program[] }
type ProgramsByCategory = Record<'Engineering' | 'Arts' | 'Sciences' | 'Business', Program[]>

interface UniversityProps {
    university: {
        id: number;
        name: string;
        slug: string;
        description?: string | null;
        logo?: string | null;
        cover_image?: string | null;
        location?: string | null;
        city?: string | null;
        state?: string | null;
        country?: string | null;
        type?: string | null;
        ranking?: number | null;
        acceptance_rate?: string | null;
        students_count?: number | null;
        tuition?: string | null;
        graduation_rate?: number | null;
        retention_rate?: number | null;
        campus_setting?: string | null;
        programs?: string[] | null; // legacy
        programs_by_college?: ProgramsByCollege[] | null; // new structured data
    programs_by_category?: ProgramsByCategory | null;
        majors?: string[] | null;
        facilities?: string[] | null;
        athletics?: string[] | null;
        stats?: Record<string, any> | null;
        cost?: { net_price?: string | number | null; financial_aid?: string | number | null } | null;
        similar_colleges?: Array<{ id: number; name: string; slug: string; city?: string | null; state?: string | null; ranking?: number | null; logo?: string | null }>; 
        report_card?: Array<{ label: string; grade: string }>;
        notable_alumni?: Array<{ name: string; title?: string; image?: string }>;
        website?: string | null;
        phone?: string | null;
        is_partner?: boolean;
        alumni_associations?: Assoc[];
        courses?: Course[];
    };
}

export default function UniversityShow({ university }: UniversityProps) {
    const { auth } = usePage<SharedData>().props;
    const programs = university.programs ?? [];
    const programsByCollege = university.programs_by_college ?? [];
    const programsByCategory = university.programs_by_category ?? null;
    const majors = university.majors ?? [];
    const facilities = university.facilities ?? [];
    const athletics = university.athletics ?? [];
    const stats = university.stats ?? {};
    const cost = university.cost ?? {};
    const similar = university.similar_colleges ?? [];
    const reportCard = university.report_card ?? [];
    const notable = university.notable_alumni ?? [];

    return (
        <>
            <Head title={university.name} />

            {/* Hero */}
            <section className="relative overflow-hidden">
                {university.cover_image ? (
                    <img
                        src={university.cover_image}
                        alt="Cover"
                        className="absolute inset-0 h-full w-full object-cover opacity-20"
                    />
                ) : (
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-800 to-teal-700" />
                )}
                <div className="relative mx-auto max-w-7xl px-4 py-10 text-white sm:px-6 lg:px-8">
                    <div className="flex items-center gap-4">
                        {university.logo && (
                            <img
                                src={university.logo}
                                alt={university.name}
                                className="h-16 w-16 rounded bg-white p-2 shadow"
                            />
                        )}
                        <div>
                            <h1 className="text-3xl font-bold md:text-4xl">{university.name}</h1>
                            <p className="mt-1 text-emerald-100">
                                {university.city}
                                {university.state ? `, ${university.state}` : ''}
                                {university.country ? ` • ${university.country}` : ''}
                            </p>
                            <div className="mt-2 flex flex-wrap items-center gap-2 text-sm">
                                {university.type && (
                                    <span className="rounded-full bg-white/20 px-2 py-1">{university.type}</span>
                                )}
                                {university.is_partner && (
                                    <span className="rounded-full bg-yellow-400/90 px-2 py-1 text-black">Partner</span>
                                )}
                                {university.ranking != null && (
                                    <span className="rounded-full bg-white/20 px-2 py-1">Rank #{university.ranking}</span>
                                )}
                            </div>
                            <div className="mt-4 flex flex-wrap gap-3">
                                <Link
                                    href="/universities"
                                    className="inline-flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-md hover:bg-white/20 text-sm font-medium"
                                >
                                    Back to list
                                </Link>
                                <button
                                    onClick={() => {
                                        if (auth.user) {
                                            router.post('/comparison', {
                                                comparable_type: 'App\\Models\\University',
                                                comparable_id: university.id,
                                            }, {
                                                onSuccess: () => router.get('/compare'),
                                            });
                                        } else {
                                            router.get('/compare', { universities: university.slug });
                                        }
                                    }}
                                    className="inline-flex items-center gap-2 bg-emerald-500 text-white px-4 py-2 rounded-md hover:bg-emerald-600 text-sm font-semibold"
                                >
                                    Compare
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* Left/main column */}
                    <div className="space-y-6 lg:col-span-2">
                        {/* Highlight Cards similar to Niche's summary tiles */}
                        <section className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                            <div className="rounded-lg bg-white border p-4">
                                <div className="text-xs text-gray-500">Acceptance Rate</div>
                                <div className="mt-1 flex items-center gap-2 text-lg font-semibold">
                                    {university.acceptance_rate ?? '—'}
                                </div>
                            </div>
                            <div className="rounded-lg bg-white border p-4">
                                <div className="text-xs text-gray-500">Tuition</div>
                                <div className="mt-1 text-lg font-semibold">{university.tuition ?? '—'}</div>
                            </div>
                            <div className="rounded-lg bg-white border p-4">
                                <div className="text-xs text-gray-500">Students</div>
                                <div className="mt-1 text-lg font-semibold">{university.students_count?.toLocaleString() ?? '—'}</div>
                            </div>
                        </section>

                        {university.description && (
                            <section className="rounded-lg border border-gray-200 bg-white p-6">
                                <h2 className="mb-2 text-lg font-semibold">About</h2>
                                <p className="leading-relaxed text-gray-700">{university.description}</p>
                            </section>
                        )}

                        {/* Admissions */}
                        <section className="rounded-lg border border-gray-200 bg-white p-6">
                            <div className="mb-4 flex items-center gap-2">
                                <Award className="h-5 w-5 text-emerald-600" />
                                <h2 className="text-lg font-semibold">Admissions</h2>
                            </div>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 text-sm">
                                <div className="rounded-lg bg-gray-50 p-3">
                                    <div className="text-gray-500">Acceptance Rate</div>
                                    <div className="font-semibold">{university.acceptance_rate ?? '—'}</div>
                                </div>
                                <div className="rounded-lg bg-gray-50 p-3">
                                    <div className="text-gray-500">Retention Rate</div>
                                    <div className="font-semibold">{university.retention_rate != null ? `${Number(university.retention_rate).toFixed(2)}%` : '—'}</div>
                                </div>
                                <div className="rounded-lg bg-gray-50 p-3">
                                    <div className="text-gray-500">Graduation Rate</div>
                                    <div className="font-semibold">{university.graduation_rate != null ? `${Number(university.graduation_rate).toFixed(2)}%` : '—'}</div>
                                </div>
                            </div>
                        </section>

                        {/* Academics */}
                        <section className="rounded-lg border border-gray-200 bg-white p-6">
                            <div className="mb-4 flex items-center gap-2">
                                <BookOpen className="h-5 w-5 text-emerald-600" />
                                <h2 className="text-lg font-semibold">Academics</h2>
                            </div>
                            <div className="text-sm text-gray-700">Explore programs and majors offered across schools & colleges.</div>
                        </section>

                        <section className="rounded-lg border border-gray-200 bg-white p-6">
                            <h2 className="mb-4 text-lg font-semibold">At a glance</h2>
                            <div className="grid grid-cols-2 gap-4 text-sm sm:grid-cols-3">
                                {university.students_count != null && (
                                    <div className="rounded-lg bg-gray-50 p-3">
                                        <div className="text-gray-500">Students</div>
                                        <div className="font-semibold">{university.students_count.toLocaleString()}</div>
                                    </div>
                                )}
                                {university.acceptance_rate && (
                                    <div className="rounded-lg bg-gray-50 p-3">
                                        <div className="text-gray-500">Acceptance</div>
                                        <div className="font-semibold">{university.acceptance_rate}</div>
                                    </div>
                                )}
                                {university.tuition && (
                                    <div className="rounded-lg bg-gray-50 p-3">
                                        <div className="text-gray-500">Tuition</div>
                                        <div className="font-semibold">{university.tuition}</div>
                                    </div>
                                )}
                                {university.graduation_rate != null && (
                                    <div className="rounded-lg bg-gray-50 p-3">
                                        <div className="text-gray-500">Graduation</div>
                                        <div className="font-semibold">{Number(university.graduation_rate).toFixed(2)}%</div>
                                    </div>
                                )}
                                {university.retention_rate != null && (
                                    <div className="rounded-lg bg-gray-50 p-3">
                                        <div className="text-gray-500">Retention</div>
                                        <div className="font-semibold">{Number(university.retention_rate).toFixed(2)}%</div>
                                    </div>
                                )}
                                {university.campus_setting && (
                                    <div className="rounded-lg bg-gray-50 p-3">
                                        <div className="text-gray-500">Setting</div>
                                        <div className="font-semibold capitalize">{university.campus_setting}</div>
                                    </div>
                                )}
                            </div>
                            {Object.keys(stats).length > 0 && (
                                <div className="mt-4 grid grid-cols-2 gap-4 text-sm sm:grid-cols-3">
                                    {Object.entries(stats).map(([key, val]) => (
                                        <div key={key} className="rounded-lg bg-gray-50 p-3">
                                            <div className="text-gray-500 capitalize">{key.replaceAll('_', ' ')}</div>
                                            <div className="font-semibold">{String(val)}</div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </section>

                        {(programsByCategory || programsByCollege.length > 0 || programs.length > 0 || majors.length > 0) && (
                            <section className="rounded-lg border border-gray-200 bg-white p-6">
                                <h2 className="mb-3 text-lg font-semibold">Programs & Majors</h2>
                                <div className="space-y-6">
                                    {programsByCategory && (
                                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                            {(['Engineering','Arts','Sciences','Business'] as const).map((cat) => (
                                                <div key={cat}>
                                                    <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-800">
                                                        <Building2 className="h-4 w-4 text-emerald-600" />
                                                        {cat}
                                                    </h3>
                                                    {programsByCategory[cat]?.length ? (
                                                        <ul className="divide-y rounded-lg border">
                                                            {programsByCategory[cat].map((p) => (
                                                                <li key={p.id} className="flex items-center justify-between px-3 py-2 text-sm hover:bg-gray-50">
                                                                    <div className="min-w-0 flex-1">
                                                                        <Link href={`/programs/${p.slug}`} className="font-medium text-emerald-700 hover:underline truncate">
                                                                            {p.name}
                                                                        </Link>
                                                                        {p.college && (
                                                                            <span className="ml-2 text-xs text-gray-500">{p.college}</span>
                                                                        )}
                                                                    </div>
                                                                    {p.degree && (
                                                                        <span className="ml-3 shrink-0 rounded bg-emerald-50 px-2 py-0.5 text-xs text-emerald-800">{p.degree}</span>
                                                                    )}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    ) : (
                                                        <div className="text-sm text-gray-500">No programs listed.</div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    {!programsByCategory && programsByCollege.map((group, gi) => (
                                        <div key={`col-${gi}`}>
                                            <h3 className="mb-2 text-sm font-semibold text-gray-800 flex items-center gap-2">
                                                <Building2 className="h-4 w-4 text-emerald-600" />
                                                {group.college}
                                            </h3>
                                            <ul className="divide-y rounded-lg border">
                                                {group.programs.map((p) => (
                                                    <li key={p.id} className="flex items-center justify-between px-3 py-2 text-sm hover:bg-gray-50">
                                                        <div className="min-w-0 flex-1">
                                                            <Link href={`/programs/${p.slug}`} className="font-medium text-emerald-700 hover:underline truncate">
                                                                {p.name}
                                                            </Link>
                                                        </div>
                                                        {p.degree && <span className="ml-3 shrink-0 rounded bg-emerald-50 px-2 py-0.5 text-xs text-emerald-800">{p.degree}</span>}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                    {programs.length > 0 && programsByCollege.length === 0 && (
                                        <div>
                                            <h3 className="mb-2 text-sm font-medium text-gray-600">Programs</h3>
                                            <ul className="divide-y rounded-lg border">
                                                {programs.map((p, i) => (
                                                    <li key={`prog-${i}`} className="px-3 py-2 text-sm hover:bg-gray-50">{p}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                    {majors.length > 0 && (
                                        <div>
                                            <h3 className="mb-2 text-sm font-medium text-gray-600">Majors</h3>
                                            <ul className="divide-y rounded-lg border">
                                                {majors.map((m, i) => (
                                                    <li key={`major-${i}`} className="px-3 py-2 text-sm hover:bg-gray-50">{m}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </section>
                        )}

                        {(facilities.length > 0 || athletics.length > 0) && (
                            <section className="rounded-lg border border-gray-200 bg-white p-6">
                                <h2 className="mb-3 text-lg font-semibold">Campus Life</h2>
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    {facilities.length > 0 && (
                                        <div>
                                            <h3 className="mb-2 text-sm font-medium text-gray-600">Facilities</h3>
                                            <ul className="list-inside list-disc space-y-1 text-sm text-gray-700">
                                                {facilities.map((f, i) => (
                                                    <li key={`fac-${i}`}>{f}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                    {athletics.length > 0 && (
                                        <div>
                                            <h3 className="mb-2 text-sm font-medium text-gray-600">Athletics</h3>
                                            <ul className="list-inside list-disc space-y-1 text-sm text-gray-700">
                                                {athletics.map((a, i) => (
                                                    <li key={`ath-${i}`}>{a}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </section>
                        )}

                        {/* Cost */}
                        <section className="rounded-lg border border-gray-200 bg-white p-6">
                            <h2 className="mb-3 text-lg font-semibold">Cost</h2>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 text-sm">
                                <div className="rounded-lg bg-gray-50 p-3">
                                    <div className="text-gray-500">Tuition</div>
                                    <div className="font-semibold">{university.tuition ?? '—'}</div>
                                </div>
                                <div className="rounded-lg bg-gray-50 p-3">
                                    <div className="text-gray-500">Average Net Price</div>
                                    <div className="font-semibold">{cost.net_price ?? '—'}</div>
                                </div>
                                <div className="rounded-lg bg-gray-50 p-3">
                                    <div className="text-gray-500">Financial Aid</div>
                                    <div className="font-semibold">{cost.financial_aid ?? '—'}</div>
                                </div>
                            </div>
                        </section>

                        {Array.isArray(university.courses) && university.courses.length > 0 && (
                            <section className="rounded-lg border border-gray-200 bg-white p-6">
                                <h2 className="mb-3 text-lg font-semibold">Popular courses</h2>
                                <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                    {university.courses.map((c) => (
                                        <li key={c.id} className="rounded-lg border border-gray-200 p-4 hover:border-emerald-200">
                                            <Link href={`/courses/${c.slug}`} className="font-medium text-emerald-700 hover:underline">
                                                {c.title}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        )}

                        {/* Report Card */}
                        {reportCard.length > 0 && (
                            <section className="rounded-lg border border-gray-200 bg-white p-6">
                                <h2 className="mb-2 text-lg font-semibold">Report Card</h2>
                                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                                    {reportCard.map((item, idx) => (
                                        <div key={idx} className="rounded-lg bg-gray-50 p-4">
                                            <div className="text-gray-600 text-sm">{item.label}</div>
                                            <div className="text-2xl font-bold text-emerald-700">{item.grade}</div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Notable Alumni */}
                        {notable.length > 0 && (
                            <section className="rounded-lg border border-gray-200 bg-white p-6">
                                <h2 className="mb-3 text-lg font-semibold">Notable Alumni</h2>
                                <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                    {notable.map((a, i) => (
                                        <li key={i} className="rounded-lg border border-gray-200 p-4 flex items-center gap-3">
                                            {a.image ? (
                                                <img src={a.image} alt={a.name} className="h-10 w-10 rounded-full object-cover" />
                                            ) : (
                                                <div className="h-10 w-10 rounded-full bg-gray-100" />
                                            )}
                                            <div>
                                                <div className="font-semibold text-gray-900">{a.name}</div>
                                                {a.title && <div className="text-sm text-gray-600">{a.title}</div>}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        )}
                    </div>

                    {/* Sidebar */}
                    <aside className="space-y-6">
                        <section className="rounded-lg border border-gray-200 bg-white p-6">
                            <h3 className="mb-3 text-sm font-semibold text-gray-800">Quick links</h3>
                            <ul className="space-y-2 text-sm">
                                <li>
                                    <a
                                        href={university.website ?? '#'}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-emerald-700 hover:underline"
                                    >
                                        Official website
                                    </a>
                                </li>
                                {university.phone && (
                                    <li className="text-gray-700">Phone: <span className="font-medium">{university.phone}</span></li>
                                )}
                                <li>
                                    <Link href="/universities" className="text-emerald-700 hover:underline">
                                        Back to list
                                    </Link>
                                </li>
                            </ul>
                        </section>

                        {Array.isArray(university.alumni_associations) && university.alumni_associations.length > 0 && (
                            <section className="rounded-lg border border-gray-200 bg-white p-6">
                                <h3 className="mb-3 text-sm font-semibold text-gray-800">Alumni associations</h3>
                                <ul className="space-y-2 text-sm">
                                    {university.alumni_associations.map((a) => (
                                        <li key={a.id}>
                                            <span className="text-gray-800">{a.name}</span>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        )}

                        {similar.length > 0 && (
                            <section className="rounded-lg border border-gray-200 bg-white p-6">
                                <h3 className="mb-3 text-sm font-semibold text-gray-800">Similar Colleges</h3>
                                <ul className="space-y-3 text-sm text-gray-700">
                                    {similar.map((s) => (
                                        <li key={s.id} className="flex items-center gap-3">
                                            {s.logo ? (
                                                <img src={s.logo} alt={s.name} className="h-8 w-8 rounded object-cover" />
                                            ) : (
                                                <div className="h-8 w-8 rounded bg-gray-100 flex items-center justify-center">
                                                    <GraduationCap className="h-4 w-4 text-gray-400" />
                                                </div>
                                            )}
                                            <div className="flex-1">
                                                <Link href={`/universities/${s.slug}`} className="text-emerald-700 hover:underline font-medium">{s.name}</Link>
                                                <div className="text-gray-500">{s.city}, {s.state} • #{s.ranking ?? '—'}</div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        )}
                    </aside>
                </div>
            </main>
        </>
    );
}

// Use the public layout (no admin sidebar) for this public-facing page
UniversityShow.layout = (page: ReactNode) => (
    <PublicLayout>{page}</PublicLayout>
);
