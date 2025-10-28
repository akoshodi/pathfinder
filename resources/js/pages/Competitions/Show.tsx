import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Trophy, Calendar, DollarSign, MapPin, Users, Globe, CheckCircle, Clock, ExternalLink } from 'lucide-react';

interface Competition {
    id: number;
    title: string;
    slug: string;
    description?: string;
    category: string;
    organizer: string;
    website_url?: string;
    prize_amount?: number;
    prize_description?: string;
    eligibility_requirements: string[];
    registration_start?: string;
    registration_end?: string;
    competition_date?: string;
    location?: string;
    format: 'online' | 'in-person' | 'hybrid';
    image?: string;
    participants_count: number;
    is_featured: boolean;
}

interface Props {
    competition: Competition;
    relatedCompetitions: Competition[];
}

export default function CompetitionsShow({ competition, relatedCompetitions }: Props) {
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0,
        }).format(price);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
        });
    };

    const isRegistrationOpen = () => {
        if (!competition.registration_start || !competition.registration_end) return true;
        const now = new Date();
        const start = new Date(competition.registration_start);
        const end = new Date(competition.registration_end);
        return now >= start && now <= end;
    };

    return (
        <>
            <Head title={`${competition.title} - Competitions`} />
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <Link
                        href="/competitions"
                        className="inline-flex items-center text-emerald-600 hover:text-emerald-700 mb-6"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Competitions
                    </Link>

                    {/* Hero Section */}
                    {competition.image && (
                        <div className="mb-8 rounded-lg overflow-hidden">
                            <img
                                src={competition.image}
                                alt={competition.title}
                                className="w-full h-64 object-cover"
                            />
                        </div>
                    )}

                    <Card className="mb-8">
                        <CardHeader>
                            {competition.is_featured && (
                                <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-sm font-semibold rounded mb-4 w-fit">
                                    <Trophy className="h-4 w-4" />
                                    Featured Competition
                                </span>
                            )}
                            <CardTitle className="text-3xl mb-4">{competition.title}</CardTitle>
                            <div className="flex flex-wrap gap-2 mb-4">
                                <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 rounded-full text-sm capitalize">
                                    {competition.category}
                                </span>
                                <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm capitalize">
                                    {competition.format.replace('-', ' ')}
                                </span>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                    <Users className="h-5 w-5" />
                                    <div>
                                        <p className="text-xs text-gray-500 dark:text-gray-500">Organizer</p>
                                        <p className="font-medium text-gray-900 dark:text-white">{competition.organizer}</p>
                                    </div>
                                </div>
                                {competition.prize_amount && (
                                    <div className="flex items-center gap-2 text-emerald-600">
                                        <DollarSign className="h-5 w-5" />
                                        <div>
                                            <p className="text-xs text-gray-500 dark:text-gray-500">Prize</p>
                                            <p className="font-semibold text-lg">{formatPrice(competition.prize_amount)}</p>
                                        </div>
                                    </div>
                                )}
                                {competition.competition_date && (
                                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                        <Calendar className="h-5 w-5" />
                                        <div>
                                            <p className="text-xs text-gray-500 dark:text-gray-500">Competition Date</p>
                                            <p className="font-medium text-gray-900 dark:text-white">
                                                {formatDate(competition.competition_date)}
                                            </p>
                                        </div>
                                    </div>
                                )}
                                {competition.location && (
                                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                        <MapPin className="h-5 w-5" />
                                        <div>
                                            <p className="text-xs text-gray-500 dark:text-gray-500">Location</p>
                                            <p className="font-medium text-gray-900 dark:text-white">{competition.location}</p>
                                        </div>
                                    </div>
                                )}
                                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                    <Users className="h-5 w-5" />
                                    <div>
                                        <p className="text-xs text-gray-500 dark:text-gray-500">Participants</p>
                                        <p className="font-medium text-gray-900 dark:text-white">{competition.participants_count}</p>
                                    </div>
                                </div>
                            </div>

                            {competition.description && (
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">About</h2>
                                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                                        {competition.description}
                                    </p>
                                </div>
                            )}

                            {competition.prize_description && (
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                                        <Trophy className="h-5 w-5 text-emerald-600" />
                                        Prize Details
                                    </h3>
                                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                        {competition.prize_description}
                                    </p>
                                </div>
                            )}

                            {competition.eligibility_requirements.length > 0 && (
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                                        Eligibility Requirements
                                    </h3>
                                    <ul className="space-y-2">
                                        {competition.eligibility_requirements.map((requirement, index) => (
                                            <li key={index} className="flex items-start gap-2">
                                                <CheckCircle className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                                                <span className="text-gray-700 dark:text-gray-300">{requirement}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {(competition.registration_start || competition.registration_end) && (
                                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                                    <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2 flex items-center gap-2">
                                        <Clock className="h-5 w-5" />
                                        Registration Period
                                    </h3>
                                    <div className="space-y-1 text-sm text-blue-800 dark:text-blue-200">
                                        {competition.registration_start && (
                                            <p>Opens: {formatDate(competition.registration_start)}</p>
                                        )}
                                        {competition.registration_end && (
                                            <p>Closes: {formatDate(competition.registration_end)}</p>
                                        )}
                                    </div>
                                </div>
                            )}

                            <div className="pt-6 border-t border-gray-200 dark:border-gray-700 flex gap-4">
                                {competition.website_url && (
                                    <a
                                        href={competition.website_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium"
                                    >
                                        <Globe className="mr-2 h-5 w-5" />
                                        Visit Website
                                    </a>
                                )}
                                {isRegistrationOpen() && (
                                    <button className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                                        <ExternalLink className="mr-2 h-5 w-5" />
                                        Register Now
                                    </button>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Related Competitions */}
                    {relatedCompetitions.length > 0 && (
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Similar Competitions</h2>
                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {relatedCompetitions.map((related) => (
                                    <Link key={related.id} href={`/competitions/${related.slug}`}>
                                        <Card className="h-full hover:shadow-lg transition-shadow">
                                            <CardHeader>
                                                <CardTitle className="text-base line-clamp-2">{related.title}</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <p className="text-xs text-gray-600 dark:text-gray-400 mb-2 capitalize">
                                                    {related.organizer}
                                                </p>
                                                {related.prize_amount && (
                                                    <p className="text-sm font-semibold text-emerald-600">
                                                        {formatPrice(related.prize_amount)} Prize
                                                    </p>
                                                )}
                                            </CardContent>
                                        </Card>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
