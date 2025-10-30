import { useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';

export default function Toast() {
    const { props } = usePage();
    const [message, setMessage] = useState<string | null>(null);
    const [type, setType] = useState<'success' | 'error' | null>(null);

    useEffect(() => {
        const success = (props as any)?.flash?.success as string | null;
        const error = (props as any)?.flash?.error as string | null;
        if (success) {
            setType('success');
            setMessage(success);
        } else if (error) {
            setType('error');
            setMessage(error);
        }
    }, [(props as any)?.flash?.success, (props as any)?.flash?.error]);

    useEffect(() => {
        if (!message) return;
        const t = setTimeout(() => setMessage(null), 3500);
        return () => clearTimeout(t);
    }, [message]);

    if (!message || !type) return null;

    const color = type === 'success' ? 'bg-green-600' : 'bg-red-600';

    return (
        <div className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
            <div className={`max-w-xl rounded-md ${color} px-4 py-3 text-white shadow-lg`}>{message}</div>
        </div>
    );
}
