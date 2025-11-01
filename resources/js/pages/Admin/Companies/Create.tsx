import AdminLayout from '@/layouts/admin-layout';
import Form from './Form';

export default function Create() {
    return (
        <AdminLayout title="Create Company" breadcrumbs={[{ label: 'Admin' }, { label: 'Companies', href: '/admin/companies' }, { label: 'Create' }]}>
            <Form />
        </AdminLayout>
    );
}
