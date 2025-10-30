import PublicLayout from '@/layouts/public-layout';
import { Head, Link } from '@inertiajs/react';
import {
    BookOpen,
    Briefcase,
    Download,
    ExternalLink,
    GraduationCap,
    Share2,
    Info,
} from 'lucide-react';
import {
    Tooltip,
    TooltipTrigger,
    TooltipContent,
} from '@/components/ui/tooltip';

interface Attempt {
    id: number;
    completed_at: string;
}

interface Assessment {
    name: string;
    category: string;
}

interface Report {
    id: number;
    summary: string;
    top_traits: string[];
    insights: Array<{
        title: string;
        description: string;
        work_environments: string[];
    }>;
    recommendations: string[];
    visualization_data: {
        type: string;
        labels: string[];
        datasets: Array<{
            label: string;
            data: number[];
        }>;
        distribution?: { [key: string]: number };
    };
}

interface RiasecData {
    holland_code: string;
    primary_code: string;
    secondary_code: string;
    tertiary_code: string;
    scores: {
        R: number;
        I: number;
        A: number;
        S: number;
        E: number;
        C: number;
    };
    top_codes: string[];
}

interface CareerRecommendation {
    id: number;
    occupation_code: string;
    occupation_title: string;
    match_score: number;
    match_reasons: string[];
    skill_gaps: string[];
    education_requirements: Array<{ level: string; importance: number }>;
    learning_paths: Array<{ type: string; title: string; description: string }>;
    rank: number;
}

interface Props {
    attempt: Attempt;
    assessment: Assessment;
    report: Report;
    riasec?: RiasecData;
    careerRecommendations: CareerRecommendation[];
    personalityPreferences?: string[];
    personalityTraitDescriptions?: Record<
        string,
        {
            name: string;
            description: string;
            high_characteristics: string[];
            low_characteristics: string[];
        }
    >;
    skillsMeta?: {
        domainDescriptions: Record<
            string,
            { name: string; description: string; skills: string[] }
        >;
        labels: Record<string, string>;
    };
}

export default function AssessmentsResults({
    attempt,
    assessment,
    report,
    riasec,
    careerRecommendations,
    personalityPreferences = [],
    personalityTraitDescriptions = {},
    skillsMeta,
}: Props) {
    const viz = report?.visualization_data;

    const getSkillLabel = (level: number) => {
        // Convert level (1-5) to percentage, then map to label thresholds
        const percent = Math.max(0, Math.min(100, (level / 5) * 100));
        if (percent >= 90) return 'Expert';
        if (percent >= 75) return 'Advanced';
        if (percent >= 60) return 'Proficient';
        if (percent >= 40) return 'Intermediate';
        return 'Novice';
    };
    const getCodeColor = (code: string) => {
        const colors: { [key: string]: string } = {
            R: 'bg-red-500',
            I: 'bg-blue-500',
            A: 'bg-purple-500',
            S: 'bg-green-500',
            E: 'bg-yellow-500',
            C: 'bg-gray-500',
        };
        return colors[code] || 'bg-indigo-500';
    };

    const getCodeName = (code: string) => {
        const names: { [key: string]: string } = {
            R: 'Realistic',
            I: 'Investigative',
            A: 'Artistic',
            S: 'Social',
            E: 'Enterprising',
            C: 'Conventional',
        };
        return names[code] || code;
    };

    const getMatchScoreColor = (score: number) => {
        if (score >= 85) return 'text-green-600 bg-green-50 border-green-200';
        if (score >= 70) return 'text-blue-600 bg-blue-50 border-blue-200';
        if (score >= 60) return 'text-amber-600 bg-amber-50 border-amber-200';
        return 'text-gray-600 bg-gray-50 border-gray-200';
    };

    return (
        <PublicLayout>
            <Head title={`${assessment.name} Results`} />

            {/* Hero Section */}
            <section className="bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-12 text-white sm:px-6 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    <div className="flex items-start justify-between">
                        <div>
                            <h1 className="mb-2 text-4xl font-bold">
                                Assessment Complete! 🎉
                            </h1>
                            <p className="mb-1 text-lg text-indigo-100">
                                {assessment.name}
                            </p>
                            <p className="text-sm text-indigo-200">
                                Completed on{' '}
                                {new Date(
                                    attempt.completed_at,
                                ).toLocaleDateString()}
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <button className="flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 transition-colors hover:bg-white/20">
                                <Share2 className="h-4 w-4" />
                                Share
                            </button>
                            <Link
                                href={`/assessments/${attempt.id}/export`}
                                className="flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 transition-colors hover:bg-white/20"
                            >
                                <Download className="h-4 w-4" />
                                Export JSON
                            </Link>
                            <Link
                                href={`/assessments/${attempt.id}/export/pdf`}
                                className="flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 transition-colors hover:bg-white/20"
                            >
                                <Download className="h-4 w-4" />
                                Download PDF
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <main className="bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-7xl space-y-8">
                    {/* Summary Section */}
                    <div className="rounded-lg bg-white p-8 shadow-lg">
                        <h2 className="mb-4 text-2xl font-bold text-gray-900">
                            Your Profile Summary
                        </h2>
                        <p className="text-lg leading-relaxed text-gray-700">
                            {report.summary}
                        </p>
                    </div>

                    {/* RIASEC Holland Code Display */}
                    {riasec && (
                        <div className="rounded-lg bg-white p-8 shadow-lg">
                            <h2 className="mb-6 text-2xl font-bold text-gray-900">
                                Your Holland Code
                            </h2>

                            <div className="mb-8 flex items-center justify-center gap-4">
                                {riasec.holland_code
                                    .split('')
                                    .map((code, index) => (
                                        <div key={code} className="text-center">
                                            <div
                                                className={`h-20 w-20 ${getCodeColor(
                                                    code,
                                                )} mb-2 flex items-center justify-center rounded-lg shadow-lg`}
                                            >
                                                <span className="text-3xl font-bold text-white">
                                                    {code}
                                                </span>
                                            </div>
                                            <p className="text-sm font-semibold text-gray-700">
                                                {getCodeName(code)}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                {index === 0
                                                    ? 'Primary'
                                                    : index === 1
                                                      ? 'Secondary'
                                                      : 'Tertiary'}
                                            </p>
                                        </div>
                                    ))}
                            </div>

                            {/* RIASEC Scores */}
                            <div className="space-y-4">
                                {Object.entries(riasec.scores)
                                    .sort(([, a], [, b]) => b - a)
                                    .map(([code, score]) => (
                                        <div key={code}>
                                            <div className="mb-2 flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <div
                                                        className={`h-3 w-3 ${getCodeColor(code)} rounded-full`}
                                                    ></div>
                                                    <span className="font-semibold text-gray-900">
                                                        {getCodeName(code)}
                                                    </span>
                                                </div>
                                                <span className="text-sm font-bold text-gray-700">
                                                    {score}/40
                                                </span>
                                            </div>
                                            <div className="h-3 w-full rounded-full bg-gray-200">
                                                <div
                                                    className={`${getCodeColor(code)} h-3 rounded-full transition-all`}
                                                    style={{
                                                        width: `${(score / 40) * 100}%`,
                                                    }}
                                                ></div>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    )}

                    {/* Skills Visualization */}
                    {assessment.category === 'skills' && viz?.type === 'bar' && (
                        <div className="rounded-lg bg-white p-8 shadow-lg">
                            <h2 className="mb-6 text-2xl font-bold text-gray-900">
                                Skill Profile
                            </h2>

                            <div className="space-y-4">
                                {viz.labels.map((label, idx) => {
                                    const value = viz.datasets?.[0]?.data?.[idx] ?? 0; // 1-5 level
                                    const percent = Math.max(0, Math.min(100, (value / 5) * 100));
                                    const labelText = skillsMeta?.labels?.[label] ?? getSkillLabel(value);
                                    const desc = skillsMeta?.domainDescriptions?.[label]?.description ?? '';
                                    return (
                                        <div key={label}>
                                            <div className="mb-2 flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-semibold text-gray-900">{label}</span>
                                                    <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-xs font-medium text-indigo-700">
                                                        {labelText}
                                                    </span>
                                                    {desc && (
                                                        <Tooltip>
                                                            <TooltipTrigger asChild>
                                                                <button
                                                                    type="button"
                                                                    aria-label={`${label} info`}
                                                                    className="text-gray-400 hover:text-gray-600"
                                                                >
                                                                    <Info className="h-4 w-4" />
                                                                </button>
                                                            </TooltipTrigger>
                                                            <TooltipContent side="top">
                                                                <div className="max-w-xs text-left">
                                                                    <p className="mb-2 text-white/90">{desc}</p>
                                                                    {skillsMeta?.domainDescriptions?.[label]?.skills?.length ? (
                                                                        <ul className="list-disc space-y-1 pl-4 text-xs text-white/80">
                                                                            {skillsMeta.domainDescriptions[label].skills.slice(0, 5).map((s) => (
                                                                                <li key={s}>{s}</li>
                                                                            ))}
                                                                        </ul>
                                                                    ) : null}
                                                                </div>
                                                            </TooltipContent>
                                                        </Tooltip>
                                                    )}
                                                </div>
                                                <span className="text-sm font-bold text-gray-700">Level {value}/5</span>
                                            </div>
                                            <div className="h-3 w-full rounded-full bg-gray-200">
                                                <div
                                                    className="h-3 rounded-full bg-indigo-500 transition-all"
                                                    style={{ width: `${percent}%` }}
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Personality Visualization */}
                    {assessment.category === 'personality' && viz?.type === 'bar' && (
                        <div className="rounded-lg bg-white p-8 shadow-lg">
                            <h2 className="mb-6 text-2xl font-bold text-gray-900">
                                Personality Traits (Big Five)
                            </h2>

                            <div className="space-y-4">
                                {viz.labels.map((label, idx) => {
                                    const value = viz.datasets?.[0]?.data?.[idx] ?? 0; // 0-100 percentage
                                    const percent = Math.max(0, Math.min(100, value));
                                    const desc = personalityTraitDescriptions?.[label]?.description ?? '';
                                    return (
                                        <div key={label}>
                                            <div className="mb-2 flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-semibold text-gray-900">{label}</span>
                                                    {desc && (
                                                        <Tooltip>
                                                            <TooltipTrigger asChild>
                                                                <button
                                                                    type="button"
                                                                    aria-label={`${label} info`}
                                                                    className="text-gray-400 hover:text-gray-600"
                                                                >
                                                                    <Info className="h-4 w-4" />
                                                                </button>
                                                            </TooltipTrigger>
                                                            <TooltipContent side="top">
                                                                <div className="max-w-xs text-left">
                                                                    <p className="mb-2 text-white/90">{desc}</p>
                                                                    {personalityTraitDescriptions?.[label]?.high_characteristics?.length ? (
                                                                        <div className="mb-2">
                                                                            <p className="mb-1 text-xs font-semibold text-white/90">High tends to:</p>
                                                                            <ul className="list-disc space-y-1 pl-4 text-xs text-white/80">
                                                                                {personalityTraitDescriptions[label].high_characteristics.slice(0, 4).map((c) => (
                                                                                    <li key={`hi-${c}`}>{c}</li>
                                                                                ))}
                                                                            </ul>
                                                                        </div>
                                                                    ) : null}
                                                                    {personalityTraitDescriptions?.[label]?.low_characteristics?.length ? (
                                                                        <div>
                                                                            <p className="mb-1 text-xs font-semibold text-white/90">Low tends to:</p>
                                                                            <ul className="list-disc space-y-1 pl-4 text-xs text-white/80">
                                                                                {personalityTraitDescriptions[label].low_characteristics.slice(0, 4).map((c) => (
                                                                                    <li key={`lo-${c}`}>{c}</li>
                                                                                ))}
                                                                            </ul>
                                                                        </div>
                                                                    ) : null}
                                                                </div>
                                                            </TooltipContent>
                                                        </Tooltip>
                                                    )}
                                                </div>
                                                <span className="text-sm font-bold text-gray-700">
                                                    {percent}%
                                                </span>
                                            </div>
                                            <div className="h-3 w-full rounded-full bg-gray-200">
                                                <div
                                                    className="h-3 rounded-full bg-purple-500 transition-all"
                                                    style={{ width: `${percent}%` }}
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {personalityPreferences.length > 0 && (
                                <div className="mt-8">
                                    <h3 className="mb-3 text-lg font-semibold text-gray-900">
                                        Work Style Preferences
                                    </h3>
                                    <ul className="grid list-disc gap-2 pl-5 sm:grid-cols-2">
                                        {personalityPreferences.map((p, i) => (
                                            <li key={`${p}-${i}`} className="text-gray-700">
                                                {p}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Top Traits */}
                    {report.top_traits.length > 0 && (
                        <div className="rounded-lg bg-white p-8 shadow-lg">
                            <h2 className="mb-4 text-2xl font-bold text-gray-900">
                                Your Key Strengths
                            </h2>
                            <div className="flex flex-wrap gap-2">
                                {report.top_traits.map((trait, index) => (
                                    <span
                                        key={index}
                                        className="rounded-full bg-indigo-100 px-4 py-2 font-medium text-indigo-700"
                                    >
                                        {trait}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Insights */}
                    {report.insights.length > 0 && (
                        <div className="rounded-lg bg-white p-8 shadow-lg">
                            <h2 className="mb-6 text-2xl font-bold text-gray-900">
                                Detailed Insights
                            </h2>
                            <div className="space-y-6">
                                {report.insights.map((insight, index) => (
                                    <div
                                        key={index}
                                        className="border-l-4 border-indigo-500 pl-4"
                                    >
                                        <h3 className="mb-2 text-lg font-bold text-gray-900">
                                            {insight.title}
                                        </h3>
                                        <p className="mb-3 text-gray-700">
                                            {insight.description}
                                        </p>
                                        {insight.work_environments &&
                                            insight.work_environments.length >
                                                0 && (
                                                <div>
                                                    <p className="mb-2 text-sm font-semibold text-gray-600">
                                                        Ideal Work Environments:
                                                    </p>
                                                    <div className="flex flex-wrap gap-2">
                                                        {insight.work_environments.map(
                                                            (env, envIndex) => (
                                                                <span
                                                                    key={
                                                                        envIndex
                                                                    }
                                                                    className="rounded-md bg-gray-100 px-3 py-1 text-sm text-gray-700"
                                                                >
                                                                    {env}
                                                                </span>
                                                            ),
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Career Recommendations */}
                    <div className="rounded-lg bg-white p-8 shadow-lg">
                        <div className="mb-6 flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-gray-900">
                                Recommended Careers
                            </h2>
                            <span className="text-sm text-gray-600">
                                {careerRecommendations.length} matches found
                            </span>
                        </div>

                        <div className="space-y-6">
                            {careerRecommendations
                                .slice(0, 10)
                                .map((recommendation, index) => (
                                    <div
                                        key={recommendation.id}
                                        className="rounded-lg border border-gray-200 p-6 transition-shadow hover:shadow-md"
                                    >
                                        <div className="mb-4 flex items-start justify-between">
                                            <div className="flex flex-1 items-start gap-3">
                                                <div className="mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100 font-bold text-indigo-600">
                                                    {index + 1}
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="mb-1 text-xl font-bold text-gray-900">
                                                        {
                                                            recommendation.occupation_title
                                                        }
                                                    </h3>
                                                    <p className="text-sm text-gray-600">
                                                        {
                                                            recommendation.occupation_code
                                                        }
                                                    </p>
                                                </div>
                                            </div>
                                            <div
                                                className={`rounded-lg border px-4 py-2 font-bold ${getMatchScoreColor(
                                                    recommendation.match_score,
                                                )}`}
                                            >
                                                {recommendation.match_score}%
                                                Match
                                            </div>
                                        </div>

                                        {/* Match Reasons */}
                                        {recommendation.match_reasons.length >
                                            0 && (
                                            <div className="mb-4">
                                                <p className="mb-2 text-sm font-semibold text-gray-700">
                                                    Why this is a good fit:
                                                </p>
                                                <ul className="space-y-1">
                                                    {recommendation.match_reasons.map(
                                                        (
                                                            reason,
                                                            reasonIndex,
                                                        ) => (
                                                            <li
                                                                key={
                                                                    reasonIndex
                                                                }
                                                                className="flex items-start gap-2 text-sm text-gray-600"
                                                            >
                                                                <span className="mt-0.5 text-green-500">
                                                                    ✓
                                                                </span>
                                                                {reason}
                                                            </li>
                                                        ),
                                                    )}
                                                </ul>
                                            </div>
                                        )}

                                        {/* Skills to Develop */}
                                        {recommendation.skill_gaps.length >
                                            0 && (
                                            <div className="mb-4">
                                                <p className="mb-2 text-sm font-semibold text-gray-700">
                                                    Skills to develop:
                                                </p>
                                                <div className="flex flex-wrap gap-2">
                                                    {recommendation.skill_gaps
                                                        .slice(0, 5)
                                                        .map(
                                                            (
                                                                skill,
                                                                skillIndex,
                                                            ) => (
                                                                <span
                                                                    key={
                                                                        skillIndex
                                                                    }
                                                                    className="rounded-md border border-amber-200 bg-amber-50 px-3 py-1 text-sm text-amber-700"
                                                                >
                                                                    {skill}
                                                                </span>
                                                            ),
                                                        )}
                                                </div>
                                            </div>
                                        )}

                                        {/* Education Requirements */}
                                        {recommendation.education_requirements
                                            .length > 0 && (
                                            <div className="mb-4">
                                                <p className="mb-2 text-sm font-semibold text-gray-700">
                                                    <GraduationCap className="mr-1 inline h-4 w-4" />
                                                    Education requirements:
                                                </p>
                                                <div className="flex flex-wrap gap-2">
                                                    {recommendation.education_requirements
                                                        .slice(0, 3)
                                                        .map(
                                                            (edu, eduIndex) => (
                                                                <span
                                                                    key={
                                                                        eduIndex
                                                                    }
                                                                    className="rounded-md bg-blue-50 px-3 py-1 text-sm text-blue-700"
                                                                >
                                                                    {edu.level}
                                                                </span>
                                                            ),
                                                        )}
                                                </div>
                                            </div>
                                        )}

                                        {/* Learning Paths */}
                                        {recommendation.learning_paths.length >
                                            0 && (
                                            <div>
                                                <p className="mb-2 text-sm font-semibold text-gray-700">
                                                    <BookOpen className="mr-1 inline h-4 w-4" />
                                                    Recommended learning paths:
                                                </p>
                                                <div className="space-y-2">
                                                    {recommendation.learning_paths
                                                        .slice(0, 2)
                                                        .map(
                                                            (
                                                                path,
                                                                pathIndex,
                                                            ) => (
                                                                <div
                                                                    key={
                                                                        pathIndex
                                                                    }
                                                                    className="rounded-md bg-gray-50 p-3 text-sm text-gray-600"
                                                                >
                                                                    <p className="font-medium text-gray-900">
                                                                        {
                                                                            path.title
                                                                        }
                                                                    </p>
                                                                    <p className="mt-1 text-xs">
                                                                        {
                                                                            path.description
                                                                        }
                                                                    </p>
                                                                </div>
                                                            ),
                                                        )}
                                                </div>
                                            </div>
                                        )}

                                        <div className="mt-4 border-t border-gray-200 pt-4">
                                            <Link
                                                href={`/occupations/${recommendation.occupation_code}`}
                                                className="flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-700"
                                            >
                                                View Full Occupation Details
                                                <ExternalLink className="h-4 w-4" />
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>

                    {/* Recommendations */}
                    {report.recommendations.length > 0 && (
                        <div className="rounded-lg bg-gradient-to-r from-indigo-50 to-purple-50 p-8">
                            <h2 className="mb-4 text-2xl font-bold text-gray-900">
                                Next Steps
                            </h2>
                            <ul className="space-y-3">
                                {report.recommendations.map(
                                    (recommendation, index) => (
                                        <li
                                            key={index}
                                            className="flex items-start gap-3"
                                        >
                                            <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white">
                                                {index + 1}
                                            </div>
                                            <p className="text-gray-700">
                                                {recommendation}
                                            </p>
                                        </li>
                                    ),
                                )}
                            </ul>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link
                            href="/assessments"
                            className="rounded-lg border border-gray-300 bg-white px-6 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-50"
                        >
                            Take Another Assessment
                        </Link>
                        <Link
                            href="/occupations"
                            className="flex items-center gap-2 rounded-lg bg-indigo-600 px-6 py-3 font-medium text-white transition-colors hover:bg-indigo-700"
                        >
                            <Briefcase className="h-5 w-5" />
                            Explore All Careers
                        </Link>
                    </div>
                </div>
            </main>
        </PublicLayout>
    );
}
