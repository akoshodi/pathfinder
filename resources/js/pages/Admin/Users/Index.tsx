import AdminLayout from '@/layouts/admin-layout';
import { Head } from '@inertiajs/react';

export default function Index() {
    return (
        <AdminLayout title="Users" breadcrumbs={[{ label: 'Admin' }, { label: 'Users' }]}>
            <Head title="Users - Admin" />
            <div className="overflow-hidden bg-card border border-border rounded-lg shadow-sm">
                <div className="p-6 text-foreground">
                    <h2 className="text-xl font-semibold">User Management</h2>
                    <p className="mt-2">This page is under construction.</p>
                </div>
            </div>
        </AdminLayout>
    );
}
