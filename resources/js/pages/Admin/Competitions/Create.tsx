import AdminLayout from '@/layouts/admin-layout';
import Form from './Form';

export default function Create() {
    return (
        <AdminLayout title="Create Competition" breadcrumbs={[{ label: 'Admin' }, { label: 'Competitions', href: '/admin/competitions' }, { label: 'Create' }]}>
            <Form />
        </AdminLayout>
    );
}
