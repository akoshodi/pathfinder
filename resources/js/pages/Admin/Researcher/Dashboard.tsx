import AdminLayout from '@/layouts/admin-layout'
import { Head } from '@inertiajs/react'

export default function ResearcherDashboard() {
  return (
    <AdminLayout title="Researcher" breadcrumbs={[{ label: 'Admin', href: '/admin/researcher' }, { label: 'Dashboard' }]}>
      <Head title="Researcher" />
      <div className="rounded-lg border bg-white p-4 shadow-sm">Researcher dashboard coming soon.</div>
    </AdminLayout>
  )
}
