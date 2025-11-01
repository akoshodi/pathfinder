import AdminLayout from '@/layouts/admin-layout';
import { Head } from '@inertiajs/react';

export default function Index() {
    return (
        <AdminLayout title="Settings" breadcrumbs={[{ label: 'Admin' }, { label: 'Settings' }]}>
            <Head title="Settings - Admin" />
            <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
                <div className="p-6 text-gray-900 dark:text-gray-100">
                    <h2 className="text-xl font-semibold">Admin Settings</h2>
                    <p className="mt-2">This page is under construction.</p>
                </div>
            </div>
        </AdminLayout>
    );
}
