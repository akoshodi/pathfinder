import AdminLayout from '@/layouts/admin-layout';
import Form from './Form';

interface Competition {
    id?: number;
    title: string;
    description: string | null;
    category: string | null;
    organizer: string | null;
    website_url: string | null;
    prize_amount: number | null;
    prize_description: string | null;
    eligibility_requirements: string[] | null;
    registration_start: string | null;
    registration_end: string | null;
    competition_date: string | null;
    location: string | null;
    format: string | null;
    image: string | null;
    is_featured: boolean;
    is_active: boolean;
}

interface Props {
    competition: Competition;
}

export default function Edit({ competition }: Props) {
    return (
        <AdminLayout title="Edit Competition" breadcrumbs={[{ label: 'Admin' }, { label: 'Competitions', href: '/admin/competitions' }, { label: 'Edit' }]}>
            <Form competition={competition} isEdit={true} />
        </AdminLayout>
    );
}
