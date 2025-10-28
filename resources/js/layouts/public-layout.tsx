import { type ReactNode } from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';

interface PublicLayoutProps {
    children: ReactNode;
}

export default ({ children }: PublicLayoutProps) => (
    <>
        <Navigation />
        <main>{children}</main>
        <Footer />
    </>
);
