import Form from './Form';

interface Location {
    id: number;
    name: string;
}

interface Props {
    locations: Location[];
}

export default function Create({ locations }: Props) {
    return <Form locations={locations} />;
}
