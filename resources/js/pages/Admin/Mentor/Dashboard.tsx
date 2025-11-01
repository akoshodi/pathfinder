import AdminLayout from '@/layouts/admin-layout'
import { Head } from '@inertiajs/react'

export default function MentorDashboard() {
  return (
    <AdminLayout title="Mentor" breadcrumbs={[{ label: 'Admin', href: '/admin/mentor' }, { label: 'Dashboard' }]}>
      <Head title="Mentor" />
      <div className="rounded-lg border bg-white p-4 shadow-sm">Mentor dashboard coming soon.</div>
    </AdminLayout>
  )
}
