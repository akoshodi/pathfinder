import AdminLayout from '@/layouts/admin-layout'
import { Head } from '@inertiajs/react'

export default function MerchantDashboard() {
  return (
    <AdminLayout title="Merchant" breadcrumbs={[{ label: 'Admin', href: '/admin/merchant' }, { label: 'Dashboard' }]}>
      <Head title="Merchant" />
      <div className="rounded-lg border bg-white p-4 shadow-sm">Merchant dashboard coming soon.</div>
    </AdminLayout>
  )
}
