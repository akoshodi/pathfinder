import PublicLayout from '@/layouts/public-layout';
import { usePage } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { lazy, Suspense } from 'react';

interface PublicPageProps {
    component: string;
    props: Record<string, any>;
}

function PublicPage() {
    const { props: pageProps } = usePage<PublicPageProps>();
    const { component, props } = pageProps;

    const Component = lazy(() =>
        resolvePageComponent(
            `./${component}.tsx`,
            import.meta.glob('./**/*.tsx'),
        ),
    );

    return (
        <PublicLayout>
            <Suspense fallback={<div>Loading...</div>}>
                <Component {...props} />
            </Suspense>
        </PublicLayout>
    );
}

// Set layout to null to prevent double layout wrapping
PublicPage.layout = null;

export default PublicPage;
