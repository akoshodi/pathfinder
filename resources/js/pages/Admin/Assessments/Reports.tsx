import { Head, Link, router } from '@inertiajs/react'
import { useMemo, useState } from 'react'
import AdminLayout from '@/layouts/admin-layout'

interface ReportItem {
  id: number
  title: string | null
  report_type: string | null
  assessment: { name: string | null; slug: string | null }
  user: { id: number; name: string; email: string } | null
  generated_at?: string | null
}

type ReportFilters = {
  type?: string | null
  search?: string | null
  sort?: string | null
  direction?: string | null
}

interface ReportsPageProps {
  filters?: Record<string, any>
  reports?: Record<string, any>
}

export default function ReportsPage(props: ReportsPageProps) {
  const filters = props?.filters || {}
  const reports = props?.reports || { data: [], current_page: 1, last_page: 1, per_page: 0, total: 0 }

  const [type, setType] = useState<string>(String(filters?.type || ''))
  const [search, setSearch] = useState<string>(String(filters?.search || ''))
  const [sortBy, setSortBy] = useState<string>(String(filters?.sort || ''))
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>(
    (filters?.direction === 'asc' || filters?.direction === 'desc') ? filters.direction : 'desc'
  )

  const rows = Array.isArray(reports?.data) ? reports.data : []

  const buildQuery = (extra?: Record<string, string | number>): string => {
    const qs = new URLSearchParams()
    if (type) qs.append('type', type)
    if (search) qs.append('search', search)
  if (sortBy) qs.append('sort', sortBy)
  if (sortDir) qs.append('direction', sortDir)
    if (extra) {
      Object.entries(extra).forEach(([k, v]) => {
        if (v !== undefined && v !== null && String(v).length > 0) {
          qs.append(k, String(v))
        }
      })
    }
    const s = qs.toString()
    return s ? `?${s}` : ''
  }

  const onFilter = () => {
    const qs = new URLSearchParams()
    if (type) qs.set('type', type)
    if (search) qs.set('search', search)
  if (sortBy) qs.set('sort', sortBy)
  if (sortDir) qs.set('direction', sortDir)
    router.get(`/admin/assessments/reports${qs.toString() ? `?${qs.toString()}` : ''}`,
      {}, { preserveState: true, preserveScroll: true, replace: true })
  }

  const onReset = () => {
    setType('')
    setSearch('')
  setSortBy('')
  setSortDir('desc')
    router.get('/admin/assessments/reports', {}, { preserveState: true, preserveScroll: true, replace: true })
  }

  const toggleSort = (column: string) => {
    if (sortBy === column) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(column)
      setSortDir('desc')
    }
    setTimeout(onFilter, 0)
  }

  const exportCsvHref = `/admin/assessments/reports/export${buildQuery()}`

  const pager = useMemo(() => {
    const pages: number[] = []
    const current = reports?.current_page ?? 1
    const last = reports?.last_page ?? 1
    const start = Math.max(1, current - 2)
    const end = Math.min(last, current + 2)
    for (let i = start; i <= end; i++) pages.push(i)
    return pages
  }, [reports?.current_page, reports?.last_page])

  return (
    <AdminLayout title="Assessment Reports" breadcrumbs={[{ label: 'Admin' }, { label: 'Assessments' }, { label: 'Reports' }]}>
      <Head title="Assessment Reports" />
      <div className="mb-6 flex items-end gap-3">
        <div>
          <label className="block text-sm text-muted-foreground">Type</label>
          <input
            className="rounded border border-border bg-card px-2 py-1 text-foreground"
            placeholder="e.g. riasec, skills"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
        </div>
        <div className="grow">
          <label className="block text-sm text-muted-foreground">Search</label>
          <input
            className="w-full rounded border border-border bg-card px-2 py-1 text-foreground"
            placeholder="Search title, user, assessment"
            value={search ?? ''}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button className="rounded bg-blue-600 px-3 py-2 text-white" onClick={onFilter}>
          Apply
        </button>
        <button className="rounded bg-muted px-3 py-2 text-foreground hover:bg-muted/80" onClick={onReset}>
          Reset
        </button>
        <a href={exportCsvHref} className="rounded bg-green-600 px-3 py-2 text-white">Export CSV</a>
      </div>

      <div className="overflow-x-auto rounded border border-border">
        <table className="min-w-full divide-y divide-border bg-card" data-testid="reports-table">
          <thead className="bg-muted">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold text-foreground">Title</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-foreground">Type</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-foreground">Assessment</th>
              <th className="px-4 py-2 text-left text-sm font-semibold">User</th>
              <th className="px-4 py-2 text-left text-sm font-semibold cursor-pointer" onClick={() => toggleSort('generated_at')}>
                Generated {sortBy === 'generated_at' ? (sortDir === 'asc' ? '▲' : '▼') : ''}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rows.map((row) => (
              <tr key={row.id} className="hover:bg-muted/50">
                <td className="px-4 py-2">
                  <div className="font-medium text-foreground">{row.title ?? '-'}</div>
                </td>
                <td className="px-4 py-2 text-sm text-foreground">{row.report_type ?? '-'}</td>
                <td className="px-4 py-2">
                  <div className="font-medium text-foreground">{row.assessment?.name ?? '-'}</div>
                  <div className="text-xs text-muted-foreground">{row.assessment?.slug ?? ''}</div>
                </td>
                <td className="px-4 py-2">
                  <div className="font-medium text-foreground">{row.user?.name ?? '-'}</div>
                  <div className="text-xs text-muted-foreground">{row.user?.email ?? ''}</div>
                </td>
                <td className="px-4 py-2 text-sm text-foreground">{row.generated_at ?? '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-between text-sm">
        <div>
          {(() => {
            const current = reports?.current_page ?? 1
            const perPage = reports?.per_page ?? 0
            const total = reports?.total ?? 0
            const start = total > 0 ? (current - 1) * perPage + 1 : 0
            const end = Math.min(current * perPage, total)
            return (
              <span>
                Showing {start} - {end} of {total}
              </span>
            )
          })()}
        </div>
        <div className="flex items-center gap-2">
          {(reports?.current_page ?? 1) > 1 && (
            <Link
              className="rounded border px-2 py-1"
              href={`/admin/assessments/reports${buildQuery({ page: String((reports?.current_page ?? 1) - 1) })}`}
              preserveScroll
              preserveState
            >
              Prev
            </Link>
          )}
          {pager.map((p) => (
            <Link
              key={p}
              className={
                'rounded border px-2 py-1 ' + (p === (reports?.current_page ?? 1) ? 'bg-blue-600 text-white' : '')
              }
              href={`/admin/assessments/reports${buildQuery({ page: String(p) })}`}
              preserveScroll
              preserveState
            >
              {p}
            </Link>
          ))}
          {(reports?.current_page ?? 1) < (reports?.last_page ?? 1) && (
            <Link
              className="rounded border px-2 py-1"
              href={`/admin/assessments/reports${buildQuery({ page: String((reports?.current_page ?? 1) + 1) })}`}
              preserveScroll
              preserveState
            >
              Next
            </Link>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}
