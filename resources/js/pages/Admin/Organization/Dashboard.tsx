import AdminLayout from '@/layouts/admin-layout'
import { Head } from '@inertiajs/react'

export default function OrganizationDashboard() {
  return (
    <AdminLayout title="Organization" breadcrumbs={[{ label: 'Admin', href: '/admin/organization' }, { label: 'Dashboard' }]}>
      <Head title="Organization" />
      <div className="rounded-lg border bg-white p-4 shadow-sm">Organization dashboard coming soon.</div>
    </AdminLayout>
  )
}
