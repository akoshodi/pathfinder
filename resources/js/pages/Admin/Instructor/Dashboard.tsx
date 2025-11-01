import AdminLayout from '@/layouts/admin-layout'
import { DataTable, Column } from '@/components/metronic/DataTable'
import { LoadingState, ErrorState } from '@/components/metronic/State'
import { Head } from '@inertiajs/react'

type CourseRow = { title: string; students: number; progress: string }

type Props = {
  isLoading?: boolean
  error?: string | null
  courses?: CourseRow[]
}

export default function InstructorDashboard({ isLoading = false, error = null, courses = [] }: Props) {
  const columns: Column<CourseRow>[] = [
    { key: 'title', header: 'Course' },
    { key: 'students', header: 'Students' },
    { key: 'progress', header: 'Avg. Progress' },
  ]

  return (
    <AdminLayout title="Instructor" breadcrumbs={[{ label: 'Admin', href: '/admin/instructor' }, { label: 'Dashboard' }]}>
      <Head title="Instructor" />

      {isLoading && <LoadingState />}
      {error && <ErrorState message={error} />}

      <DataTable columns={columns} data={courses} />
    </AdminLayout>
  )
}
