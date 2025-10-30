import Form from './Form';

interface Resource {
    id: number;
    title: string;
    description: string | null;
    type: string;
    url: string | null;
    file_path: string | null;
    thumbnail: string | null;
    is_featured: boolean;
    is_active: boolean;
}

interface Props {
    resource: Resource;
}

export default function Edit({ resource }: Props) {
    return <Form resource={resource} isEdit={true} />;
}
