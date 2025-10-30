import { type ReactNode } from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import Toast from '@/components/Toast';

interface PublicLayoutProps {
    children: ReactNode;
}

export default ({ children }: PublicLayoutProps) => (
    <>
        <Navigation />
        <Toast />
        <main>{children}</main>
        <Footer />
    </>
);
