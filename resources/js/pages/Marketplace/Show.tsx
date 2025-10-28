import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, MapPin, DollarSign, Tag, User, Mail, MessageSquare, Eye } from 'lucide-react';

interface MarketplaceItem {
    id: number;
    title: string;
    slug: string;
    description?: string;
    category: string;
    price: number;
    condition: 'new' | 'like_new' | 'good' | 'fair' | 'poor';
    images: string[];
    location: string;
    contact_method: string;
    views_count: number;
    created_at: string;
    seller: {
        id: number;
        name: string;
    };
}

interface Props {
    item: MarketplaceItem;
    relatedItems: MarketplaceItem[];
}

export default function MarketplaceShow({ item, relatedItems }: Props) {
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(price);
    };

    const conditionLabels: Record<typeof item.condition, string> = {
        new: 'New',
        like_new: 'Like New',
        good: 'Good',
        fair: 'Fair',
        poor: 'Poor',
    };

    return (
        <>
            <Head title={`${item.title} - Marketplace`} />
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <Link
                        href="/marketplace"
                        className="inline-flex items-center text-emerald-600 hover:text-emerald-700 mb-6"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Marketplace
                    </Link>

                    <div className="grid lg:grid-cols-2 gap-8 mb-12">
                        {/* Image Gallery */}
                        <div>
                            {item.images.length > 0 ? (
                                <div className="space-y-4">
                                    <div className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
                                        <img
                                            src={item.images[0]}
                                            alt={item.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    {item.images.length > 1 && (
                                        <div className="grid grid-cols-4 gap-2">
                                            {item.images.slice(1, 5).map((image, index) => (
                                                <div key={index} className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
                                                    <img
                                                        src={image}
                                                        alt={`${item.title} ${index + 2}`}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                                    <Tag className="h-24 w-24 text-gray-400" />
                                </div>
                            )}
                        </div>

                        {/* Item Details */}
                        <div className="space-y-6">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{item.title}</h1>
                                <div className="flex items-center gap-4 mb-4">
                                    <span className="text-3xl font-bold text-emerald-600">{formatPrice(item.price)}</span>
                                    <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium">
                                        {conditionLabels[item.condition]}
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                    <Tag className="h-5 w-5" />
                                    <span className="capitalize">{item.category}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                    <MapPin className="h-5 w-5" />
                                    <span>{item.location}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                    <Eye className="h-5 w-5" />
                                    <span>{item.views_count} views</span>
                                </div>
                            </div>

                            {item.description && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Description</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed">
                                            {item.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            )}

                            <Card>
                                <CardHeader>
                                    <CardTitle>Seller Information</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="flex items-center gap-2">
                                        <User className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                                        <span className="text-gray-700 dark:text-gray-300">{item.seller.name}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MessageSquare className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                                        <span className="text-gray-700 dark:text-gray-300 capitalize">
                                            {item.contact_method.replace('_', ' ')}
                                        </span>
                                    </div>
                                    <button className="w-full mt-4 px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium flex items-center justify-center gap-2">
                                        <Mail className="h-5 w-5" />
                                        Contact Seller
                                    </button>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Related Items */}
                    {relatedItems.length > 0 && (
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Similar Items</h2>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {relatedItems.map((related) => (
                                    <Link key={related.id} href={`/marketplace/${related.slug}`}>
                                        <Card className="h-full hover:shadow-lg transition-shadow overflow-hidden">
                                            <div className="aspect-square bg-gray-200 dark:bg-gray-700 relative">
                                                {related.images.length > 0 ? (
                                                    <img
                                                        src={related.images[0]}
                                                        alt={related.title}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center">
                                                        <Tag className="h-12 w-12 text-gray-400" />
                                                    </div>
                                                )}
                                            </div>
                                            <CardHeader className="pb-3">
                                                <CardTitle className="text-sm line-clamp-2">{related.title}</CardTitle>
                                                <p className="text-lg font-bold text-emerald-600">{formatPrice(related.price)}</p>
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
