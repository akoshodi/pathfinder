import Form from './Form';

interface Company {
    id: number;
    name: string;
    description: string | null;
    logo: string | null;
    cover_image: string | null;
    category: string | null;
    location: string | null;
    city: string | null;
    state: string | null;
    country: string | null;
    employees: string | null;
    website: string | null;
    email: string | null;
    phone: string | null;
    is_partner: boolean;
    is_featured: boolean;
    is_active: boolean;
    benefits: string[] | null;
    values: string[] | null;
}

interface Props {
    company: Company;
}

export default function Edit({ company }: Props) {
    return <Form company={company} isEdit={true} />;
}
