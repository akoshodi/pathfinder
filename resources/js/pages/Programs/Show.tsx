import { Head, Link } from '@inertiajs/react';
import { type ReactNode } from 'react';
import PublicLayout from '@/layouts/public-layout';
import { BookOpen, MapPin, GraduationCap } from 'lucide-react';

interface UniversityBrief {
  id: number;
  name: string;
  slug: string;
  city?: string | null;
  state?: string | null;
  type?: string | null;
  ranking?: number | null;
}

interface ProgramProps {
  program: {
    id: number;
    name: string;
    slug: string;
    category?: string | null;
    description?: string | null;
    universities: UniversityBrief[];
  };
}

export default function ProgramShow({ program }: ProgramProps) {
  return (
    <>
      <Head title={`${program.name} Program`} />

      <section className="relative bg-gradient-to-r from-emerald-800 to-teal-700 px-6 py-10 text-white">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center gap-3">
            <BookOpen className="h-8 w-8" />
            <div>
              <h1 className="text-3xl font-bold">{program.name}</h1>
              {program.category && (
                <p className="text-emerald-100">Category: {program.category}</p>
              )}
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <section className="rounded-lg border border-gray-200 bg-white p-6">
              <h2 className="mb-2 text-lg font-semibold">About this program</h2>
              <p className="text-gray-700">{program.description ?? 'Program description coming soon.'}</p>
            </section>

            <section className="rounded-lg border border-gray-200 bg-white p-6">
              <h2 className="mb-2 text-lg font-semibold">Requirements</h2>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                <li>High school diploma or equivalent</li>
                <li>Recommended coursework in relevant subjects</li>
                <li>Personal statement and letters of recommendation</li>
                <li>Standardized test scores (where applicable)</li>
              </ul>
            </section>
          </div>

          <aside className="space-y-6">
            <section className="rounded-lg border border-gray-200 bg-white p-6">
              <h3 className="mb-3 text-sm font-semibold text-gray-800">Universities offering this program</h3>
              <ul className="space-y-2">
                {program.universities.slice(0, 10).map((u) => (
                  <li key={u.id} className="flex items-center justify-between text-sm">
                    <div>
                      <Link href={`/universities/${u.slug}`} className="text-emerald-700 hover:underline font-medium">
                        {u.name}
                      </Link>
                      <div className="text-gray-500 flex items-center gap-1">
                        <MapPin className="h-3 w-3" /> {u.city}, {u.state}
                      </div>
                    </div>
                    <div className="text-xs text-gray-600 flex items-center gap-1">
                      <GraduationCap className="h-3 w-3" />#{u.ranking ?? '—'}
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          </aside>
        </div>
      </main>
    </>
  );
}

ProgramShow.layout = (page: ReactNode) => <PublicLayout>{page}</PublicLayout>;
