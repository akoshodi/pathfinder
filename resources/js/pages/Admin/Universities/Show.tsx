import { Head, Link } from '@inertiajs/react'
import AdminLayout from '@/layouts/admin-layout'

export default function AdminUniversitiesShow() {
  return (
    <AdminLayout title="University" breadcrumbs={[{ label: 'Admin' }, { label: 'Universities' }, { label: 'Show' }]}> 
      <Head title="Admin • Universities • Show" />

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-foreground">University</h1>
          <Link href="/admin/universities" className="rounded border border-border bg-card px-3 py-1.5 text-sm text-foreground hover:bg-muted">
            Back to list
          </Link>
        </div>

        <div className="rounded border border-border bg-card p-6 text-foreground">
          <p>Not implemented yet.</p>
        </div>
      </div>
    </AdminLayout>
  )
}
