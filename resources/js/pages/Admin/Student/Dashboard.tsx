import AdminLayout from '@/layouts/admin-layout'
import { StatisticsWidget } from '@/components/metronic/StatisticsWidget'
import { LoadingState, ErrorState } from '@/components/metronic/State'
import { Head, Link } from '@inertiajs/react'
import { Trophy, Target } from 'lucide-react'

type Props = {
  isLoading?: boolean
  error?: string | null
  stats?: { goals: number; badges: number }
}

export default function StudentDashboard({ isLoading = false, error = null, stats }: Props) {
  return (
    <AdminLayout title="Student" breadcrumbs={[{ label: 'Admin', href: '/admin/student' }, { label: 'Dashboard' }]}>
      <Head title="Student" />

      {isLoading && <LoadingState />}
      {error && <ErrorState message={error} />}

      <div className="grid gap-4 md:grid-cols-2">
        <StatisticsWidget title="Goals" value={stats?.goals ?? '—'} icon={<Target className="h-5 w-5" />} />
        <StatisticsWidget title="Badges" value={stats?.badges ?? '—'} icon={<Trophy className="h-5 w-5" />} />
      </div>

      <div className="rounded-lg border bg-white p-4 shadow-sm">
        <div className="font-semibold mb-2">Next steps</div>
        <div className="text-sm text-gray-700">Complete your assessments to get personalized career recommendations.</div>
        <div className="mt-3">
          <Link href="/assessments" className="text-teal-600 hover:text-teal-700 font-semibold">Go to Assessments →</Link>
        </div>
      </div>
    </AdminLayout>
  )
}
