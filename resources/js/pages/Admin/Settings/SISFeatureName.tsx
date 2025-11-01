import AdminLayout from '@/layouts/admin-layout'
import { StatisticsWidget } from '@/components/metronic/StatisticsWidget'
import { DataTable, Column } from '@/components/metronic/DataTable'
import { LoadingState, ErrorState } from '@/components/metronic/State'
import { Head } from '@inertiajs/react'

type Row = { field: string; value: string }

type Props = {
  isLoading?: boolean
  error?: string | null
  title?: string
  rows?: Row[]
}

export default function SISFeatureName({ isLoading = false, error = null, title = 'SIS Feature Name', rows = [] }: Props) {
  const columns: Column<Row>[] = [
    { key: 'field', header: 'Field' },
    { key: 'value', header: 'Value' },
  ]

  return (
    <AdminLayout title={title} breadcrumbs={[{ label: 'Admin', href: '/admin/settings' }, { label: title }] }>
      <Head title={title} />

      {isLoading && <LoadingState />}
      {error && <ErrorState message={error} />}

      <div className="grid gap-4 md:grid-cols-3">
        <StatisticsWidget title="Configured" value={rows.length > 0 ? 'Yes' : 'No'} />
        <StatisticsWidget title="Fields" value={rows.length} />
        <StatisticsWidget title="Errors" value={error ? 1 : 0} />
      </div>

      <DataTable columns={columns} data={rows} emptyMessage="No configuration set." />
    </AdminLayout>
  )
}
