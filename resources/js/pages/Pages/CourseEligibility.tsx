import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CheckCircle, ChevronRight, ChevronLeft, AlertCircle, Check, X } from 'lucide-react';

const STEPS = [
    { id: 1, title: 'Program Selection', description: 'Choose your desired program' },
    { id: 2, title: 'Academic Background', description: 'Enter your qualifications' },
    { id: 3, title: 'Test Scores', description: 'Provide your exam results' },
    { id: 4, title: 'Results', description: 'View eligibility status' },
];

const ENTRY_MODES = ['UTME', 'Direct Entry', 'Transfer', 'Post-UTME'];
const INSTITUTION_TYPES = ['University', 'Polytechnic', 'College of Education', 'Monotechnic'];
const INSTITUTION_CATEGORIES = ['Federal', 'State', 'Private'];

const SUBJECTS = [
    'Mathematics', 'English Language', 'Physics', 'Chemistry', 'Biology',
    'Economics', 'Commerce', 'Government', 'Literature in English', 'Geography',
    'Agricultural Science', 'Further Mathematics', 'Technical Drawing', 'Computer Science',
    'Civic Education', 'Christian Religious Studies', 'Islamic Studies', 'History'
];

const GRADES = ['A1', 'B2', 'B3', 'C4', 'C5', 'C6', 'D7', 'E8', 'F9'];

export default function CourseEligibility() {
    const [currentStep, setCurrentStep] = useState(1);
    const [showResults, setShowResults] = useState(false);
    const [formData, setFormData] = useState({
        entryMode: '',
        institutionType: '',
        institutionCategory: '',
        institution: '',
        program: '',
        oLevelCredits: [] as Array<{ subject: string; grade: string }>,
        oLevelPasses: [] as Array<{ subject: string; grade: string }>,
        utmeSubjects: [] as string[],
        utmeScore: '',
    });

    const updateFormData = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const addOLevelCredit = () => {
        if (formData.oLevelCredits.length < 9) {
            updateFormData('oLevelCredits', [...formData.oLevelCredits, { subject: '', grade: '' }]);
        }
    };

    const removeOLevelCredit = (index: number) => {
        updateFormData('oLevelCredits', formData.oLevelCredits.filter((_, i) => i !== index));
    };

    const updateOLevelCredit = (index: number, field: 'subject' | 'grade', value: string) => {
        const updated = [...formData.oLevelCredits];
        updated[index][field] = value;
        updateFormData('oLevelCredits', updated);
    };

    const handleNext = () => {
        if (currentStep < STEPS.length) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handlePrev = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleSubmit = () => {
        setShowResults(true);
    };

    const isStepValid = () => {
        switch (currentStep) {
            case 1:
                return formData.entryMode && formData.institutionType && formData.program;
            case 2:
                return formData.oLevelCredits.length >= 5;
            case 3:
                return formData.utmeSubjects.length === 4 && formData.utmeScore;
            default:
                return true;
        }
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className="space-y-6">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                                Entry Mode <span className="text-red-500">*</span>
                            </label>
                            <select
                                value={formData.entryMode}
                                onChange={(e) => updateFormData('entryMode', e.target.value)}
                                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                            >
                                <option value="">Select entry mode</option>
                                {ENTRY_MODES.map(mode => (
                                    <option key={mode} value={mode}>{mode}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                                Institution Type <span className="text-red-500">*</span>
                            </label>
                            <select
                                value={formData.institutionType}
                                onChange={(e) => updateFormData('institutionType', e.target.value)}
                                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                            >
                                <option value="">Select institution type</option>
                                {INSTITUTION_TYPES.map(type => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                                Institution Category
                            </label>
                            <select
                                value={formData.institutionCategory}
                                onChange={(e) => updateFormData('institutionCategory', e.target.value)}
                                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                            >
                                <option value="">Select category</option>
                                {INSTITUTION_CATEGORIES.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                                Program/Course <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={formData.program}
                                onChange={(e) => updateFormData('program', e.target.value)}
                                placeholder="e.g., Computer Science, Medicine, Law"
                                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                            />
                        </div>
                    </div>
                );

            case 2:
                return (
                    <div className="space-y-6">
                        <div>
                            <div className="mb-4 flex items-center justify-between">
                                <label className="text-sm font-medium text-gray-900 dark:text-white">
                                    O'Level Credits (A1-C6) <span className="text-red-500">*</span>
                                </label>
                                <button
                                    onClick={addOLevelCredit}
                                    disabled={formData.oLevelCredits.length >= 9}
                                    className="text-sm text-emerald-600 hover:text-emerald-700 disabled:text-gray-400"
                                >
                                    + Add Subject
                                </button>
                            </div>
                            {formData.oLevelCredits.length === 0 && (
                                <p className="mb-3 text-sm text-gray-500">At least 5 subjects with grades A1-C6 are required</p>
                            )}
                            <div className="space-y-3">
                                {formData.oLevelCredits.map((item, index) => (
                                    <div key={index} className="flex gap-2">
                                        <select
                                            value={item.subject}
                                            onChange={(e) => updateOLevelCredit(index, 'subject', e.target.value)}
                                            className="flex-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-emerald-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                                        >
                                            <option value="">Select subject</option>
                                            {SUBJECTS.map(subj => (
                                                <option key={subj} value={subj}>{subj}</option>
                                            ))}
                                        </select>
                                        <select
                                            value={item.grade}
                                            onChange={(e) => updateOLevelCredit(index, 'grade', e.target.value)}
                                            className="w-24 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-emerald-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                                        >
                                            <option value="">Grade</option>
                                            {GRADES.slice(0, 6).map(grade => (
                                                <option key={grade} value={grade}>{grade}</option>
                                            ))}
                                        </select>
                                        <button
                                            onClick={() => removeOLevelCredit(index)}
                                            className="rounded-lg border border-gray-300 px-3 py-2 text-red-600 hover:bg-red-50 dark:border-gray-600 dark:hover:bg-red-900/10"
                                        >
                                            <X className="h-4 w-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );

            case 3:
                return (
                    <div className="space-y-6">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                                UTME Subject Combination <span className="text-red-500">*</span>
                            </label>
                            <p className="mb-3 text-sm text-gray-500">Select 3 subjects (English Language is mandatory and pre-selected)</p>
                            <div className="mb-3 rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 dark:border-gray-600 dark:bg-gray-800">
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">English Language ✓</span>
                            </div>
                            <div className="grid gap-2 sm:grid-cols-2">
                                {SUBJECTS.filter(s => s !== 'English Language').map(subject => (
                                    <label key={subject} className="flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-3 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800">
                                        <input
                                            type="checkbox"
                                            checked={formData.utmeSubjects.includes(subject)}
                                            onChange={(e) => {
                                                if (e.target.checked && formData.utmeSubjects.length < 3) {
                                                    updateFormData('utmeSubjects', [...formData.utmeSubjects, subject]);
                                                } else if (!e.target.checked) {
                                                    updateFormData('utmeSubjects', formData.utmeSubjects.filter(s => s !== subject));
                                                }
                                            }}
                                            disabled={!formData.utmeSubjects.includes(subject) && formData.utmeSubjects.length >= 3}
                                            className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                                        />
                                        <span className="text-sm text-gray-900 dark:text-white">{subject}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                                UTME Score <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                min="0"
                                max="400"
                                value={formData.utmeScore}
                                onChange={(e) => updateFormData('utmeScore', e.target.value)}
                                placeholder="Enter your UTME score (max 400)"
                                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                            />
                        </div>
                    </div>
                );

            case 4:
                // Mock eligibility check
                const score = parseInt(formData.utmeScore || '0');
                const isEligible = formData.oLevelCredits.length >= 5 && formData.utmeSubjects.length === 3 && score >= 180;
                const passedOLevel = formData.oLevelCredits.length >= 5 && formData.oLevelCredits.every(c => c.subject && c.grade);
                const passedUTME = formData.utmeSubjects.length === 3 && score >= 180;

                return (
                    <div className="space-y-6">
                        <div className={`rounded-lg border-2 p-6 text-center ${isEligible ? 'border-green-500 bg-green-50 dark:bg-green-900/10' : 'border-red-500 bg-red-50 dark:bg-red-900/10'}`}>
                            {isEligible ? (
                                <>
                                    <CheckCircle className="mx-auto mb-4 h-16 w-16 text-green-600" />
                                    <h3 className="mb-2 text-2xl font-bold text-green-900 dark:text-green-100">Congratulations!</h3>
                                    <p className="text-green-800 dark:text-green-200">
                                        You meet the basic requirements for {formData.program}
                                    </p>
                                </>
                            ) : (
                                <>
                                    <AlertCircle className="mx-auto mb-4 h-16 w-16 text-red-600" />
                                    <h3 className="mb-2 text-2xl font-bold text-red-900 dark:text-red-100">Not Eligible</h3>
                                    <p className="text-red-800 dark:text-red-200">
                                        You do not meet the minimum requirements for {formData.program}
                                    </p>
                                </>
                            )}
                        </div>

                        <Card>
                            <CardHeader>
                                <CardTitle>Requirement Breakdown</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-700 dark:text-gray-300">O'Level Requirements (5 credits minimum)</span>
                                    {passedOLevel ? (
                                        <Check className="h-5 w-5 text-green-600" />
                                    ) : (
                                        <X className="h-5 w-5 text-red-600" />
                                    )}
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-700 dark:text-gray-300">UTME Score (180+ minimum)</span>
                                    {passedUTME ? (
                                        <Check className="h-5 w-5 text-green-600" />
                                    ) : (
                                        <X className="h-5 w-5 text-red-600" />
                                    )}
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-700 dark:text-gray-300">Correct Subject Combination</span>
                                    {formData.utmeSubjects.length === 3 ? (
                                        <Check className="h-5 w-5 text-green-600" />
                                    ) : (
                                        <X className="h-5 w-5 text-red-600" />
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/10">
                            <p className="text-sm text-blue-900 dark:text-blue-100">
                                <strong>Note:</strong> This is a preliminary check. Final admission decisions are made by individual institutions and may have additional requirements.
                            </p>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <>
            <Head title="Check Course Eligibility - Pathfinder" />
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                <section className="bg-gradient-to-r from-emerald-700 to-teal-600 px-4 py-12 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-7xl">
                        <div className="mb-2 flex items-center gap-2">
                            <CheckCircle className="h-8 w-8 text-white" />
                            <h1 className="text-3xl font-bold text-white md:text-4xl">Course Eligibility Checker</h1>
                        </div>
                        <p className="text-lg text-emerald-50">Check if you meet the requirements for your desired program</p>
                    </div>
                </section>

                <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
                    {/* Progress Steps */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between">
                            {STEPS.map((step, index) => (
                                <div key={step.id} className="flex flex-1 items-center">
                                    <div className="flex flex-col items-center">
                                        <div
                                            className={`flex h-10 w-10 items-center justify-center rounded-full font-bold transition-colors ${
                                                currentStep >= step.id
                                                    ? 'bg-emerald-600 text-white'
                                                    : 'bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
                                            }`}
                                        >
                                            {currentStep > step.id ? <Check className="h-5 w-5" /> : step.id}
                                        </div>
                                        <div className="mt-2 hidden text-center sm:block">
                                            <div className="text-xs font-medium text-gray-900 dark:text-white">{step.title}</div>
                                            <div className="text-xs text-gray-500 dark:text-gray-400">{step.description}</div>
                                        </div>
                                    </div>
                                    {index < STEPS.length - 1 && (
                                        <div
                                            className={`mx-2 h-1 flex-1 transition-colors ${
                                                currentStep > step.id ? 'bg-emerald-600' : 'bg-gray-200 dark:bg-gray-700'
                                            }`}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Form Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle>{STEPS[currentStep - 1].title}</CardTitle>
                            <CardDescription>{STEPS[currentStep - 1].description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {renderStepContent()}

                            {/* Navigation Buttons */}
                            <div className="mt-8 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-700">
                                <button
                                    onClick={handlePrev}
                                    disabled={currentStep === 1}
                                    className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
                                >
                                    <ChevronLeft className="mr-1 h-4 w-4" />
                                    Previous
                                </button>

                                {currentStep < STEPS.length ? (
                                    <button
                                        onClick={handleNext}
                                        disabled={!isStepValid()}
                                        className="inline-flex items-center rounded-lg bg-emerald-600 px-6 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        Next
                                        <ChevronRight className="ml-1 h-4 w-4" />
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => {
                                            setCurrentStep(1);
                                            setFormData({
                                                entryMode: '',
                                                institutionType: '',
                                                institutionCategory: '',
                                                institution: '',
                                                program: '',
                                                oLevelCredits: [],
                                                oLevelPasses: [],
                                                utmeSubjects: [],
                                                utmeScore: '',
                                            });
                                        }}
                                        className="inline-flex items-center rounded-lg bg-emerald-600 px-6 py-2 text-sm font-medium text-white hover:bg-emerald-700"
                                    >
                                        Check Another Program
                                    </button>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    <div className="mt-6 text-center">
                        <Link href="/" className="text-sm text-emerald-600 hover:underline dark:text-emerald-400">
                            ← Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
