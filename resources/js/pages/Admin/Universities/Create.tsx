import AdminLayout from '@/layouts/admin-layout';
import Form from './Form';

export default function Create() {
    return (
        <AdminLayout title="Create University" breadcrumbs={[{ label: 'Admin' }, { label: 'Universities', href: '/admin/universities' }, { label: 'Create' }]}>
            <Form />
        </AdminLayout>
    );
}
