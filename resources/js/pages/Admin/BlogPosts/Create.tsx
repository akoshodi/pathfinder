import Form from './Form';

interface User {
    id: number;
    name: string;
}

interface Props {
    users: User[];
}

export default function Create({ users }: Props) {
    return <Form users={users} />;
}
