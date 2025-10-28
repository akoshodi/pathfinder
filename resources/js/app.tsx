import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { type ReactNode, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { initializeTheme } from './hooks/use-appearance';
import AppLayout from './layouts/app-layout';
import PublicLayout from './layouts/public-layout';
import { ThemeProvider } from './contexts/ThemeContext';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

interface PageComponent {
    default: React.ComponentType<any> & {
        layout?: ((page: ReactNode) => ReactNode) | null;
    };
}

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    resolve: async (name) => {
        const pages = import.meta.glob<PageComponent>('./pages/**/*.tsx', {
            eager: false,
        });
        const pagePath = `./pages/${name}.tsx`;

        if (!pages[pagePath]) {
            console.error(`Page not found: ${pagePath}`);
            console.log('Available pages:', Object.keys(pages));
            throw new Error(`Page not found: ${name}`);
        }

        try {
            const pageModule = await pages[pagePath]();

            if (!pageModule || !pageModule.default) {
                console.error(`Invalid page module for: ${name}`, pageModule);
                throw new Error(
                    `Page module ${name} must have a default export`,
                );
            }

            const page = pageModule.default;

            // Assign layout if not already set and page.layout is not explicitly null
            if (page.layout === undefined) {
        const publicPrefixes = [
                    'Public/',
                    'Universities/',
                    'Pages/',
                    'Blog/',
                    'Careers/',
                    'Courses/',
                        'Resources/',
                        'Marketplace/',
                        'Competitions/',
                        'Locations/',
                        'Alumni/',
                        'Companies/',
            'Links/',
                ];
                if (name.startsWith('auth/') || name.startsWith('Auth/')) {
                    // Auth pages provide their own AuthLayout, so don't wrap
                    page.layout = (pageEl: ReactNode) => <>{pageEl}</>;
                } else {
                    page.layout = publicPrefixes.some((p) => name.startsWith(p))
                        ? (pageEl: ReactNode) => <PublicLayout>{pageEl}</PublicLayout>
                        : (pageEl: ReactNode) => <AppLayout>{pageEl}</AppLayout>;
                }
            }

            return page;
        } catch (error) {
            console.error(`Error loading page ${name}:`, error);
            throw error;
        }
    },
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <StrictMode>
                <ThemeProvider>
                    <App {...props} />
                </ThemeProvider>
            </StrictMode>,
        );
    },
    progress: {
        color: '#4B5563',
    },
});

// This will set light / dark mode on load...
initializeTheme();
