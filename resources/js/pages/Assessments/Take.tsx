import PublicLayout from '@/layouts/public-layout';
import { Head, router } from '@inertiajs/react';
import { Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Question {
    id: number;
    question_text: string;
    question_type: string;
    category: string;
    options: Array<{ value: number; label: string }>;
    order: number;
}

interface Attempt {
    id: number;
    status: string;
    progress: number;
    started_at: string;
}

interface Assessment {
    name: string;
    slug: string;
    description: string;
    instructions: string;
    question_count: number;
}

interface Response {
    [questionId: number]: {
        question_id: number;
        response_value: number;
    };
}

interface Props {
    attempt: Attempt;
    assessment: Assessment;
    questions: Question[];
    responses: Response;
}

export default function AssessmentsTake({
    attempt,
    assessment,
    questions,
    responses,
}: Props) {
    const hasQuestions = Array.isArray(questions) && questions.length > 0;
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<{ [key: number]: number }>({});
    const [loading, setLoading] = useState(false);
    const [questionStartTime, setQuestionStartTime] = useState(Date.now());

    const currentQuestion = hasQuestions ? questions[currentQuestionIndex] : undefined;
    const progress = hasQuestions
        ? ((Object.keys(answers).length / questions.length) * 100).toFixed(0)
        : '0';

    // Load existing responses
    useEffect(() => {
        const existingAnswers: { [key: number]: number } = {};
        Object.values(responses ?? {}).forEach((response) => {
            existingAnswers[response.question_id] = response.response_value;
        });
        setAnswers(existingAnswers);

        // Find first unanswered question
        if (hasQuestions) {
            for (let i = 0; i < questions.length; i++) {
                if (!existingAnswers[questions[i].id]) {
                    setCurrentQuestionIndex(i);
                    break;
                }
            }
        }
    }, []);

    const handleAnswer = async (value: number) => {
        const timeSpent = Math.floor((Date.now() - questionStartTime) / 1000);

        if (!currentQuestion) {
            return;
        }

        setAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }));

        // Save answer to backend
        try {
            await router.post(
                `/assessments/${attempt.id}/answer`,
                {
                    question_id: currentQuestion.id,
                    response_value: value,
                    time_spent: timeSpent,
                },
                {
                    preserveScroll: true,
                    preserveState: true,
                    only: [],
                },
            );
        } catch (error) {
            console.error('Failed to save answer:', error);
        }

        setQuestionStartTime(Date.now());
    };

    const handleNext = () => {
        if (hasQuestions && currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex((prev) => prev + 1);
            setQuestionStartTime(Date.now());
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex((prev) => prev - 1);
            setQuestionStartTime(Date.now());
        }
    };

    const handleComplete = async () => {
    const unanswered = hasQuestions ? questions.filter((q) => !answers[q.id]) : [];

        if (unanswered.length > 0) {
            if (
                !confirm(
                    `You have ${unanswered.length} unanswered question(s). Are you sure you want to complete the assessment?`,
                )
            ) {
                return;
            }
        }

        setLoading(true);
        router.post(`/assessments/${attempt.id}/complete`);
    };

    const getAnsweredCount = () => {
        return Object.keys(answers).length;
    };

    const isCurrentQuestionAnswered = () => {
        return currentQuestion ? !!answers[currentQuestion.id] : false;
    };

    return (
        <PublicLayout>
            <Head title={`${assessment.name} - Assessment`} />

            <div className="min-h-screen bg-gray-50">
                {!hasQuestions && (
                    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
                        <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-6">
                            <h2 className="mb-2 text-lg font-semibold text-yellow-900">No questions available</h2>
                            <p className="text-yellow-800">This assessment does not have any questions yet. Please try again later.</p>
                        </div>
                    </div>
                )}
                {/* Progress Bar */}
                <div className="sticky top-0 z-10 border-b border-gray-200 bg-white">
                    <div className="mx-auto max-w-4xl px-4 py-4 sm:px-6 lg:px-8">
                        <div className="mb-2 flex items-center justify-between">
                            <h1 className="text-lg font-semibold text-gray-900">
                                {assessment.name}
                            </h1>
                            <span className="text-sm text-gray-600">
                                {getAnsweredCount()} / {hasQuestions ? questions.length : 0}{' '}
                                answered
                            </span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-gray-200">
                            <div
                                className="h-2 rounded-full bg-indigo-600 transition-all duration-300"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                    </div>
                </div>

                <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
                    {/* Instructions (show on first question) */}
                    {hasQuestions && currentQuestionIndex === 0 && (
                        <div className="mb-8 rounded-lg border border-blue-200 bg-blue-50 p-6">
                            <h2 className="mb-2 text-lg font-semibold text-blue-900">
                                Instructions
                            </h2>
                            <p className="text-blue-800">
                                {assessment.instructions}
                            </p>
                        </div>
                    )}

                    {/* Question Card */}
                    {hasQuestions && currentQuestion && (
                    <div className="mb-6 rounded-lg bg-white p-8 shadow-lg">
                        <div className="mb-6">
                            <div className="mb-4 flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-500">
                                    Question {currentQuestionIndex + 1} of{' '}
                                    {questions.length}
                                </span>
                                {currentQuestion.category && (
                                    <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-700">
                                        {currentQuestion.category}
                                    </span>
                                )}
                            </div>
                            <h2 className="text-2xl leading-relaxed font-semibold text-gray-900">
                                {currentQuestion.question_text}
                            </h2>
                        </div>

                        {/* Answer Options */}
                        <div className="space-y-3">
                            {currentQuestion.options.map((option) => {
                                const isSelected =
                                    answers[currentQuestion.id] ===
                                    option.value;
                                return (
                                    <button
                                        key={option.value}
                                        onClick={() =>
                                            handleAnswer(option.value)
                                        }
                                        className={`w-full rounded-lg border-2 px-6 py-4 text-left transition-all ${
                                            isSelected
                                                ? 'border-indigo-600 bg-indigo-50 ring-2 ring-indigo-600'
                                                : 'border-gray-200 hover:border-indigo-300 hover:bg-gray-50'
                                        }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <span
                                                className={`text-base ${
                                                    isSelected
                                                        ? 'font-semibold text-indigo-900'
                                                        : 'text-gray-700'
                                                }`}
                                            >
                                                {option.label}
                                            </span>
                                            {isSelected && (
                                                <Check className="h-5 w-5 text-indigo-600" />
                                            )}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                    )}

                    {/* Navigation */}
                    <div className="flex items-center justify-between">
                        <button
                            onClick={handlePrevious}
                            disabled={currentQuestionIndex === 0}
                            className={`flex items-center gap-2 rounded-lg px-6 py-3 font-medium transition-colors ${
                                currentQuestionIndex === 0
                                    ? 'cursor-not-allowed bg-gray-100 text-gray-400'
                                    : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                            }`}
                        >
                            <ChevronLeft className="h-5 w-5" />
                            Previous
                        </button>

                        {hasQuestions && currentQuestionIndex === questions.length - 1 ? (
                            <button
                                onClick={handleComplete}
                                disabled={loading}
                                className="flex items-center gap-2 rounded-lg bg-green-600 px-8 py-3 font-medium text-white transition-colors hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {loading ? (
                                    <>
                                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                                        Completing...
                                    </>
                                ) : (
                                    <>
                                        <Check className="h-5 w-5" />
                                        Complete Assessment
                                    </>
                                )}
                            </button>
                        ) : (
                            <button
                                onClick={handleNext}
                                disabled={!hasQuestions || !isCurrentQuestionAnswered()}
                                className={`flex items-center gap-2 rounded-lg px-6 py-3 font-medium transition-colors ${
                                    hasQuestions && isCurrentQuestionAnswered()
                                        ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                                        : 'cursor-not-allowed bg-gray-100 text-gray-400'
                                }`}
                            >
                                Next
                                <ChevronRight className="h-5 w-5" />
                            </button>
                        )}
                    </div>

                    {/* Question Grid Navigation */}
                    {hasQuestions && (
                    <div className="mt-8 rounded-lg bg-white p-6 shadow">
                        <h3 className="mb-4 text-sm font-semibold text-gray-900">
                            Question Overview
                        </h3>
                        <div className="grid grid-cols-10 gap-2">
                            {questions.map((question, index) => {
                                const isAnswered = !!answers[question.id];
                                const isCurrent =
                                    index === currentQuestionIndex;

                                return (
                                    <button
                                        key={question.id}
                                        onClick={() => {
                                            setCurrentQuestionIndex(index);
                                            setQuestionStartTime(Date.now());
                                        }}
                                        className={`aspect-square rounded-lg text-sm font-medium transition-all ${
                                            isCurrent
                                                ? 'bg-indigo-600 text-white ring-2 ring-indigo-600 ring-offset-2'
                                                : isAnswered
                                                  ? 'bg-green-100 text-green-700 hover:bg-green-200'
                                                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                        title={`Question ${index + 1}${isAnswered ? ' (Answered)' : ''}`}
                                    >
                                        {index + 1}
                                    </button>
                                );
                            })}
                        </div>
                        <div className="mt-4 flex items-center gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                                <div className="h-4 w-4 rounded bg-indigo-600"></div>
                                <span>Current</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-4 w-4 rounded bg-green-100"></div>
                                <span>Answered</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-4 w-4 rounded bg-gray-100"></div>
                                <span>Unanswered</span>
                            </div>
                        </div>
                    </div>
                    )}
                </main>
            </div>
        </PublicLayout>
    );
}
