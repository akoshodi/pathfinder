import AdminLayout from '@/layouts/admin-layout'
import { StatisticsWidget } from '@/components/metronic/StatisticsWidget'
import { DataTable, Column } from '@/components/metronic/DataTable'
import { LoadingState, ErrorState } from '@/components/metronic/State'
import { Head } from '@inertiajs/react'
import { Users, BookOpen } from 'lucide-react'

type EnrollmentRow = { program: string; enrolled: number; completionRate: string }

type Props = {
  isLoading?: boolean
  error?: string | null
  stats?: { students: number; courses: number }
  enrollments?: EnrollmentRow[]
}

export default function InstitutionDashboard({ isLoading = false, error = null, stats, enrollments = [] }: Props) {
  const columns: Column<EnrollmentRow>[] = [
    { key: 'program', header: 'Program' },
    { key: 'enrolled', header: 'Enrolled' },
    { key: 'completionRate', header: 'Completion' },
  ]

  return (
    <AdminLayout title="Institution Admin" breadcrumbs={[{ label: 'Admin', href: '/admin/institution' }, { label: 'Dashboard' }]}>
      <Head title="Institution Admin" />

      {isLoading && <LoadingState />}
      {error && <ErrorState message={error} />}

      <div className="grid gap-4 md:grid-cols-2">
        <StatisticsWidget title="Students" value={stats?.students ?? '—'} icon={<Users className="h-5 w-5" />} />
        <StatisticsWidget title="Courses" value={stats?.courses ?? '—'} icon={<BookOpen className="h-5 w-5" />} />
      </div>

      <DataTable columns={columns} data={enrollments} />
    </AdminLayout>
  )
}
