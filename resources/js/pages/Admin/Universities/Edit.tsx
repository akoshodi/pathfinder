import AdminLayout from '@/layouts/admin-layout';
import Form from './Form';

interface Location {
    id: number;
    name: string;
}

interface University {
    id: number;
    name: string;
    description: string | null;
    location_id: number;
    type: string;
    website: string | null;
    logo_url: string | null;
    established_year: number | null;
    ranking: number | null;
    is_featured: boolean;
}

interface Props {
    university: University;
    locations: Location[];
}

export default function Edit({ university, locations }: Props) {
    return (
        <AdminLayout title="Edit University" breadcrumbs={[{ label: 'Admin' }, { label: 'Universities', href: '/admin/universities' }, { label: 'Edit' }]}>
            <Form university={university} locations={locations} />
        </AdminLayout>
    );
}
