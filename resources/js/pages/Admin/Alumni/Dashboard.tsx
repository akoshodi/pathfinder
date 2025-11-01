import AdminLayout from '@/layouts/admin-layout'
import { Head } from '@inertiajs/react'

export default function AlumniDashboard() {
  return (
    <AdminLayout title="Alumni" breadcrumbs={[{ label: 'Admin', href: '/admin/alumni' }, { label: 'Dashboard' }]}>
      <Head title="Alumni" />
      <div className="rounded-lg border bg-white p-4 shadow-sm">Alumni dashboard coming soon.</div>
    </AdminLayout>
  )
}
