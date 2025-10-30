import { Head } from '@inertiajs/react';

interface User {
    id: number;
    name: string;
    email: string;
}

interface AssessmentStatus {
    completed: boolean;
    name: string;
    slug: string;
    completed_at?: string;
}

interface RequiredAssessments {
    riasec: AssessmentStatus;
    skills: AssessmentStatus;
    personality: AssessmentStatus;
}

interface CareerMatch {
    code: string;
    title: string;
    description: string;
    interest_fit: number;
    skills_fit: number;
    personality_fit: number;
    composite_score: number;
}

interface SkillGap {
    skill: string;
    current_level: number;
    required_level: number;
    gap: number;
    priority: 'High' | 'Medium' | 'Low';
}

interface LearningPhase {
    phase: string;
    duration: string;
    resources: string[];
}

interface LearningPath {
    career: string;
    phases: LearningPhase[];
}

interface Analysis {
    profile: {
        interests: { code: string; score: number }[];
        skills: { domain: string; score: number; level: string }[];
        personality: { trait: string; score: number }[];
    };
    career_matches: CareerMatch[];
    skill_gaps: Record<string, SkillGap[]>;
    learning_paths: LearningPath[];
    overall_readiness: {
        level: string;
        score: number;
        description: string;
    };
}

interface Props {
    auth?: { user?: User | null };
    hasRequiredAssessments: boolean;
    requiredAssessments?: RequiredAssessments;
    analysis?: Analysis;
    error?: string;
}

export default function CareerFit({ auth, hasRequiredAssessments, requiredAssessments, analysis, error }: Props) {
    const getScoreColor = (score: number) => {
        if (score >= 80) return 'text-green-600 dark:text-green-400';
        if (score >= 60) return 'text-blue-600 dark:text-blue-400';
        if (score >= 40) return 'text-yellow-600 dark:text-yellow-400';
        return 'text-red-600 dark:text-red-400';
    };

    const getReadinessColor = (level: string) => {
        const colors: Record<string, string> = {
            'High': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
            'Moderate': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
            'Developing': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
            'Early': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
        };
        return colors[level] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    };

    const getPriorityColor = (priority: string) => {
        const colors: Record<string, string> = {
            'High': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
            'Medium': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
            'Low': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
        };
        return colors[priority] || 'bg-gray-100 text-gray-800';
    };

    return (
        <>
            <Head title="Career Fit Analysis" />

            <div className="min-h-screen bg-gray-50 py-12 dark:bg-gray-900">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Career Fit Analysis</h1>
                        <p className="mt-2 text-gray-600 dark:text-gray-400">
                            Comprehensive career guidance based on your interests, skills, and personality
                        </p>
                    </div>
                    {error && (
                        <div className="mb-6 rounded-md bg-red-50 p-4 dark:bg-red-900/20">
                            <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
                        </div>
                    )}

                    {!hasRequiredAssessments && requiredAssessments && (
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                            <div className="p-6 text-gray-900 dark:text-gray-100">
                                <h3 className="mb-4 text-lg font-medium">Complete Required Assessments</h3>
                                <p className="mb-6 text-sm text-gray-600 dark:text-gray-400">
                                    To view your comprehensive career fit analysis, you need to complete all three assessments:
                                </p>
                                <div className="space-y-4">
                                    {Object.entries(requiredAssessments).map(([slug, status]) => (
                                        <div key={slug} className="flex items-center justify-between rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                                            <div>
                                                <h4 className="font-medium">{status.name}</h4>
                                                {status.completed && status.completed_at && (
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                                        Completed: {new Date(status.completed_at).toLocaleDateString()}
                                                    </p>
                                                )}
                                            </div>
                                            {status.completed ? (
                                                <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800 dark:bg-green-900 dark:text-green-200">
                                                    ✓ Completed
                                                </span>
                                            ) : (
                                                <a
                                                    href={`/assessments/${status.slug}/take`}
                                                    className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                                                >
                                                    Take Assessment
                                                </a>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {hasRequiredAssessments && analysis && (
                        <div className="space-y-6">
                            {/* Header with PDF Download */}
                            <div className="flex items-center justify-between overflow-hidden bg-white p-6 shadow-sm sm:rounded-lg dark:bg-gray-800">
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Your Comprehensive Career Analysis</h3>
                                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                        Based on your interests, skills, and personality traits
                                    </p>
                                </div>
                                <a
                                    href="/career-fit/export/pdf"
                                    className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                                >
                                    <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    Download PDF Report
                                </a>
                            </div>

                            {/* Overall Readiness */}
                            <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                                <div className="p-6">
                                    <h3 className="mb-4 text-lg font-medium text-gray-900 dark:text-gray-100">Overall Career Readiness</h3>
                                    <div className="flex items-center gap-4">
                                        <span className={`rounded-full px-4 py-2 text-lg font-semibold ${getReadinessColor(analysis.overall_readiness.level)}`}>
                                            {analysis.overall_readiness.level}
                                        </span>
                                        <div className="flex-1">
                                            <div className="h-4 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                                                <div
                                                    className="h-full bg-blue-600 transition-all"
                                                    style={{ width: `${analysis.overall_readiness.score}%` }}
                                                />
                                            </div>
                                        </div>
                                        <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                            {analysis.overall_readiness.score}%
                                        </span>
                                    </div>
                                    <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                                        {analysis.overall_readiness.description}
                                    </p>
                                </div>
                            </div>

                            {/* Top Career Matches */}
                            <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                                <div className="p-6">
                                    <h3 className="mb-4 text-lg font-medium text-gray-900 dark:text-gray-100">Top Career Matches</h3>
                                    <div className="space-y-4">
                                        {analysis.career_matches.slice(0, 10).map((career, index) => (
                                            <div key={career.code} className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                                                <div className="mb-2 flex items-start justify-between">
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2">
                                                            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                                                {index + 1}
                                                            </span>
                                                            <h4 className="font-medium text-gray-900 dark:text-gray-100">{career.title}</h4>
                                                        </div>
                                                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{career.description}</p>
                                                    </div>
                                                    <span className={`ml-4 text-2xl font-bold ${getScoreColor(career.composite_score)}`}>
                                                        {career.composite_score}%
                                                    </span>
                                                </div>
                                                <div className="mt-4 grid grid-cols-3 gap-4">
                                                    <div>
                                                        <p className="text-xs text-gray-500 dark:text-gray-400">Interests</p>
                                                        <p className={`text-sm font-semibold ${getScoreColor(career.interest_fit)}`}>
                                                            {career.interest_fit}%
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-gray-500 dark:text-gray-400">Skills</p>
                                                        <p className={`text-sm font-semibold ${getScoreColor(career.skills_fit)}`}>
                                                            {career.skills_fit}%
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-gray-500 dark:text-gray-400">Personality</p>
                                                        <p className={`text-sm font-semibold ${getScoreColor(career.personality_fit)}`}>
                                                            {career.personality_fit}%
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Skill Gaps Analysis */}
                            {Object.keys(analysis.skill_gaps).length > 0 && (
                                <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                                    <div className="p-6">
                                        <h3 className="mb-4 text-lg font-medium text-gray-900 dark:text-gray-100">Skills Development Areas</h3>
                                        <div className="space-y-6">
                                            {Object.entries(analysis.skill_gaps).map(([career, gaps]) => (
                                                <div key={career}>
                                                    <h4 className="mb-3 font-medium text-gray-900 dark:text-gray-100">{career}</h4>
                                                    <div className="space-y-2">
                                                        {gaps.map((gap) => (
                                                            <div key={gap.skill} className="flex items-center justify-between rounded-lg border border-gray-200 p-3 dark:border-gray-700">
                                                                <div className="flex-1">
                                                                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{gap.skill}</p>
                                                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                                                        Current: {gap.current_level}% → Required: {gap.required_level}%
                                                                    </p>
                                                                </div>
                                                                <span className={`ml-4 rounded-full px-2 py-1 text-xs font-medium ${getPriorityColor(gap.priority)}`}>
                                                                    {gap.priority}
                                                                </span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Learning Paths */}
                            {analysis.learning_paths.length > 0 && (
                                <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                                    <div className="p-6">
                                        <h3 className="mb-4 text-lg font-medium text-gray-900 dark:text-gray-100">Recommended Learning Paths</h3>
                                        <div className="space-y-6">
                                            {analysis.learning_paths.map((path) => (
                                                <div key={path.career} className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                                                    <h4 className="mb-4 font-medium text-gray-900 dark:text-gray-100">{path.career}</h4>
                                                    <div className="space-y-4">
                                                        {path.phases.map((phase, index) => (
                                                            <div key={index} className="pl-4">
                                                                <div className="mb-2 flex items-center gap-2">
                                                                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                                                        {index + 1}
                                                                    </span>
                                                                    <h5 className="font-medium text-gray-900 dark:text-gray-100">{phase.phase}</h5>
                                                                    <span className="text-sm text-gray-500 dark:text-gray-400">({phase.duration})</span>
                                                                </div>
                                                                <ul className="ml-8 list-disc space-y-1">
                                                                    {phase.resources.map((resource, rIndex) => (
                                                                        <li key={rIndex} className="text-sm text-gray-600 dark:text-gray-400">
                                                                            {resource}
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Your Profile Summary */}
                            <div className="grid gap-6 md:grid-cols-3">
                                {/* Interests */}
                                <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                                    <div className="p-6">
                                        <h3 className="mb-4 text-lg font-medium text-gray-900 dark:text-gray-100">Interest Profile</h3>
                                        <div className="space-y-3">
                                            {analysis.profile.interests.map((interest) => (
                                                <div key={interest.code}>
                                                    <div className="mb-1 flex items-center justify-between">
                                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{interest.code}</span>
                                                        <span className="text-sm text-gray-600 dark:text-gray-400">{interest.score}%</span>
                                                    </div>
                                                    <div className="h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                                                        <div
                                                            className="h-full bg-blue-600 transition-all"
                                                            style={{ width: `${interest.score}%` }}
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Skills */}
                                <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                                    <div className="p-6">
                                        <h3 className="mb-4 text-lg font-medium text-gray-900 dark:text-gray-100">Skills Profile</h3>
                                        <div className="space-y-3">
                                            {analysis.profile.skills.map((skill) => (
                                                <div key={skill.domain}>
                                                    <div className="mb-1 flex items-center justify-between">
                                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{skill.domain}</span>
                                                        <span className="text-xs text-gray-500 dark:text-gray-400">{skill.level}</span>
                                                    </div>
                                                    <div className="h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                                                        <div
                                                            className="h-full bg-green-600 transition-all"
                                                            style={{ width: `${skill.score}%` }}
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Personality */}
                                <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                                    <div className="p-6">
                                        <h3 className="mb-4 text-lg font-medium text-gray-900 dark:text-gray-100">Personality Traits</h3>
                                        <div className="space-y-3">
                                            {analysis.profile.personality.map((trait) => (
                                                <div key={trait.trait}>
                                                    <div className="mb-1 flex items-center justify-between">
                                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{trait.trait}</span>
                                                        <span className="text-sm text-gray-600 dark:text-gray-400">{trait.score}/5</span>
                                                    </div>
                                                    <div className="h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                                                        <div
                                                            className="h-full bg-purple-600 transition-all"
                                                            style={{ width: `${(trait.score / 5) * 100}%` }}
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
