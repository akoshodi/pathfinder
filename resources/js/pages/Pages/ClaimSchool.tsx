import { Head } from '@inertiajs/react';
import { useEffect, useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Building2, CheckCircle, Mail, Search } from 'lucide-react';

type Suggestion = {
    id: number;
    name: string;
    slug: string;
    city?: string;
    state?: string;
};

export default function ClaimSchool() {
    const [schoolQuery, setSchoolQuery] = useState('');
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const [selectedSchool, setSelectedSchool] = useState<Suggestion | null>(null);
    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        location: '',
        type: 'K12',
        title: '',
        info: '',
        verify: false,
    });

    // Debounce the search input
    const debouncedQuery = useMemo(() => schoolQuery, [schoolQuery]);

    useEffect(() => {
        const controller = new AbortController();
        const run = async () => {
            if (!debouncedQuery || debouncedQuery.length < 2) {
                setSuggestions([]);
                return;
            }
            try {
                const url = `/api/suggest/universities?search=${encodeURIComponent(debouncedQuery)}&limit=8`;
                const res = await fetch(url, { signal: controller.signal });
                if (!res.ok) return;
                const data = (await res.json()) as Suggestion[];
                setSuggestions(data);
            } catch (_) {
                // ignore
            }
        };
        const t = setTimeout(run, 200);
        return () => {
            clearTimeout(t);
            controller.abort();
        };
    }, [debouncedQuery]);

    const onSelectSchool = (s: Suggestion) => {
        setSelectedSchool(s);
        setSchoolQuery(`${s.name}${s.city ? ` - ${s.city}` : ''}${s.state ? `, ${s.state}` : ''}`);
        setSuggestions([]);
    };

    return (
        <>
            <Head title="Claim Your School - Pathfinder" />
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                <section className="bg-gradient-to-r from-emerald-700 to-teal-600 py-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex items-center gap-2 mb-2">
                            <Building2 className="h-8 w-8 text-white" />
                            <h1 className="text-3xl md:text-4xl font-bold text-white">Claim Your School</h1>
                        </div>
                        <p className="text-emerald-50 text-lg">Manage your institution's profile on Pathfinder</p>
                    </div>
                </section>

                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <Card>
                        <CardHeader>
                            <CardTitle>Claim your school</CardTitle>
                            <CardDescription>Get access to manage your school's profile on Pathfinder</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                {/* School Autosuggest */}
                                <div className="space-y-2">
                                    <Label htmlFor="school">School</Label>
                                    <div className="relative">
                                        <Input
                                            id="school"
                                            placeholder="Start typing your school name..."
                                            value={schoolQuery}
                                            onChange={(e) => {
                                                setSchoolQuery(e.target.value);
                                                setSelectedSchool(null);
                                            }}
                                            className="pl-9"
                                        />
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        {suggestions.length > 0 && (
                                            <div className="absolute z-50 mt-1 w-full rounded-md border bg-white dark:bg-gray-900 shadow">
                                                {suggestions.map((s) => (
                                                    <button
                                                        type="button"
                                                        key={s.id}
                                                        onClick={() => onSelectSchool(s)}
                                                        className="w-full text-left px-3 py-2 hover:bg-emerald-50 dark:hover:bg-gray-800"
                                                    >
                                                        <div className="font-medium">{s.name}</div>
                                                        {(s.city || s.state) && (
                                                            <div className="text-xs text-gray-500">{[s.city, s.state].filter(Boolean).join(', ')}</div>
                                                        )}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Contact Info */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Your name</Label>
                                        <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Your work email</Label>
                                        <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Your work phone</Label>
                                        <Input id="phone" placeholder="(XXX) XXX-XXXX" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="location">School location</Label>
                                        <Input id="location" placeholder="Town, state" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="type">School type</Label>
                                        <select id="type" className="w-full border rounded-md h-10 px-3" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                                            <option value="K12">K12</option>
                                            <option value="college">College</option>
                                            <option value="graduate">Graduate school</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="title">Job title at this school</Label>
                                        <Input id="title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
                                    </div>
                                </div>

                                {/* Additional Info */}
                                <div className="space-y-2">
                                    <Label htmlFor="info">Additional information</Label>
                                    <textarea id="info" className="w-full min-h-28 border rounded-md p-3" value={form.info} onChange={(e) => setForm({ ...form, info: e.target.value })} />
                                </div>

                                {/* Verification */}
                                <label className="flex items-start gap-3 text-sm">
                                    <input type="checkbox" checked={form.verify} onChange={(e) => setForm({ ...form, verify: e.target.checked })} />
                                    <span>By checking this box, I verify that I am an administrator for the school I am submitting a claim for.</span>
                                </label>

                                {/* Actions */}
                                <div className="flex items-center justify-end gap-3">
                                    <Button type="button" variant="outline">Cancel</Button>
                                    <Button type="button" disabled={!selectedSchool || !form.name || !form.email || !form.verify}>
                                        Submit
                                    </Button>
                                </div>

                                <div className="text-xs text-muted-foreground">
                                    By proceeding you acknowledge and agree to our{' '}
                                    <a className="text-emerald-700 hover:underline" href="/privacy">Privacy Policy</a> and{' '}
                                    <a className="text-emerald-700 hover:underline" href="/terms">Terms of Use</a>.
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="mt-8 bg-gray-100 dark:bg-gray-800 rounded-lg p-6">
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Questions?</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            Read our <a href="/help" className="text-emerald-600 hover:underline">Help Center</a> or email us at{' '}
                            <a href="mailto:support@pathfinder.com" className="text-emerald-600 hover:underline">support@pathfinder.com</a>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
