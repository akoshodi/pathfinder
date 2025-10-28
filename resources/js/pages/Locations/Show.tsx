import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { MapPin, GraduationCap, Building2, ArrowLeft, Star } from 'lucide-react';

interface University {
    id: number;
    name: string;
    slug: string;
    location: string;
    ranking?: number;
}

interface Company {
    id: number;
    name: string;
    slug: string;
    industry: string;
}

interface Location {
    id: number;
    name: string;
    slug: string;
    city: string;
    state?: string;
    country: string;
    description?: string;
    universities_count: number;
    companies_count: number;
    highlights: string[];
    is_featured: boolean;
}

interface Props {
    location: Location;
    universities: University[];
    companies: Company[];
}

export default function LocationsShow({ location, universities, companies }: Props) {
    return (
        <>
            <Head title={`${location.name} - Pathfinder`} />
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <Link
                        href="/locations"
                        className="inline-flex items-center text-emerald-600 hover:text-emerald-700 mb-6"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Locations
                    </Link>

                    <Card className="mb-8">
                        <CardHeader>
                            {location.is_featured && (
                                <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 text-sm font-semibold rounded mb-4 w-fit">
                                    <Star className="h-4 w-4" />
                                    Featured Location
                                </span>
                            )}
                            <CardTitle className="text-3xl mb-2 flex items-start gap-3">
                                <MapPin className="h-8 w-8 text-emerald-600 flex-shrink-0 mt-1" />
                                <span>{location.name}</span>
                            </CardTitle>
                            <CardDescription className="text-lg">
                                {location.city}
                                {location.state && `, ${location.state}`}
                                {', '}
                                {location.country}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex gap-6">
                                <div className="flex items-center gap-2">
                                    <GraduationCap className="h-5 w-5 text-emerald-600" />
                                    <span className="text-lg font-semibold">{location.universities_count}</span>
                                    <span className="text-gray-600 dark:text-gray-400">Universities</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Building2 className="h-5 w-5 text-emerald-600" />
                                    <span className="text-lg font-semibold">{location.companies_count}</span>
                                    <span className="text-gray-600 dark:text-gray-400">Companies</span>
                                </div>
                            </div>

                            {location.description && (
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">About</h2>
                                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                        {location.description}
                                    </p>
                                </div>
                            )}

                            {location.highlights.length > 0 && (
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Highlights</h3>
                                    <ul className="space-y-2">
                                        {location.highlights.map((highlight, index) => (
                                            <li key={index} className="flex items-start gap-2">
                                                <span className="text-emerald-600 mt-1">•</span>
                                                <span className="text-gray-700 dark:text-gray-300">{highlight}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Universities in this location */}
                    {universities.length > 0 && (
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                                <GraduationCap className="h-6 w-6 text-emerald-600" />
                                Universities in {location.city}
                            </h2>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {universities.map((university) => (
                                    <Link key={university.id} href={`/universities/${university.slug}`}>
                                        <Card className="h-full hover:shadow-lg transition-shadow">
                                            <CardHeader>
                                                <CardTitle className="text-base line-clamp-2">{university.name}</CardTitle>
                                                <CardDescription>
                                                    {university.ranking && `Ranking: #${university.ranking}`}
                                                </CardDescription>
                                            </CardHeader>
                                            <CardContent>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                    {university.location}
                                                </p>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Companies in this location */}
                    {companies.length > 0 && (
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                                <Building2 className="h-6 w-6 text-emerald-600" />
                                Companies in {location.city}
                            </h2>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {companies.map((company) => (
                                    <Link key={company.id} href={`/companies/${company.slug}`}>
                                        <Card className="h-full hover:shadow-lg transition-shadow">
                                            <CardHeader>
                                                <CardTitle className="text-base line-clamp-2">{company.name}</CardTitle>
                                                <CardDescription className="capitalize">{company.industry}</CardDescription>
                                            </CardHeader>
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
