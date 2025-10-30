import Form from './Form';

interface User {
    id: number;
    name: string;
}

interface BlogPost {
    id?: number;
    title: string;
    slug: string;
    excerpt: string | null;
    content: string;
    featured_image: string | null;
    status: 'draft' | 'published' | 'archived';
    published_at: string | null;
    author_id: number;
    author?: User;
    meta_title: string | null;
    meta_description: string | null;
    tags: string[] | null;
}

interface Props {
    blogPost: BlogPost;
    users: User[];
}

export default function Edit({ blogPost, users }: Props) {
    return <Form blogPost={blogPost} users={users} isEdit={true} />;
}
