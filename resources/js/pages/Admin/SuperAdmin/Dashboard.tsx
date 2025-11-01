import AdminLayout from '@/layouts/admin-layout'
import { StatisticsWidget } from '@/components/metronic/StatisticsWidget'
import { PerformanceChart } from '@/components/metronic/PerformanceChart'
import { DataTable, Column } from '@/components/metronic/DataTable'
import { RecentActivityCard } from '@/components/metronic/RecentActivityCard'
import { LoadingState, ErrorState } from '@/components/metronic/State'
import { Head } from '@inertiajs/react'
import { BarChart3, Users, FileText } from 'lucide-react'

type UserRow = { name: string; email: string; role: string }

type Props = {
  isLoading?: boolean
  error?: string | null
  stats?: { users: number; assessments: number; reports: number }
  recentUsers?: UserRow[]
}

export default function SuperAdminDashboard({ isLoading = false, error = null, stats, recentUsers = [] }: Props) {
  const columns: Column<UserRow>[] = [
    { key: 'name', header: 'Name' },
    { key: 'email', header: 'Email' },
    { key: 'role', header: 'Role' },
  ]

  return (
    <AdminLayout title="Super Admin" breadcrumbs={[{ label: 'Admin', href: '/admin/super' }, { label: 'Dashboard' }]}>
      <Head title="Super Admin" />

      {isLoading && <LoadingState />}
      {error && <ErrorState message={error} />}

      <div className="grid gap-4 md:grid-cols-3">
        <StatisticsWidget title="Total Users" value={stats?.users ?? '—'} icon={<Users className="h-5 w-5" />} />
        <StatisticsWidget title="Assessment Attempts" value={stats?.assessments ?? '—'} icon={<BarChart3 className="h-5 w-5" />} />
        <StatisticsWidget title="Reports" value={stats?.reports ?? '—'} icon={<FileText className="h-5 w-5" />} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <PerformanceChart title="Platform Activity" labels={["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]} series={[{ name: 'Visits', data: [10,20,15,30,25,40,35] }]} />
        </div>
        <RecentActivityCard title="Recent Activity" items={[{ id: 1, title: 'New user registered', time: '2h' }, { id: 2, title: 'Report generated', time: '5h' }]} />
      </div>

      <div>
        <DataTable columns={columns} data={recentUsers} />
      </div>
    </AdminLayout>
  )
}
