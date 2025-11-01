import AdminLayout from '@/layouts/admin-layout';
import Form from './Form';

interface User {
    id: number;
    name: string;
}

interface Props {
    users: User[];
}

export default function Create({ users }: Props) {
    return (
        <AdminLayout title="Create Blog Post" breadcrumbs={[{ label: 'Admin' }, { label: 'Blog Posts', href: '/admin/blog-posts' }, { label: 'Create' }]}>
            <Form users={users} />
        </AdminLayout>
    );
}
