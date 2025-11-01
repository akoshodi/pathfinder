import { Head, Link, router } from '@inertiajs/react'
import { useMemo, useState } from 'react'
import AdminLayout from '@/layouts/admin-layout'

// Types for props coming from Inertia
interface AttemptItem {
  id: number
  user: { id: number; name: string; email: string } | null
  assessment: { name: string | null; slug: string | null }
  started_at?: string | null
  completed_at?: string | null
  progress?: number | null
}

type AttemptFilters = {
  status?: string | null
  search?: string | null
  sort?: string | null
  direction?: string | null
}

interface AttemptsPageProps {
  filters?: Record<string, any>
  attempts?: Record<string, any>
}

export default function AttemptsPage(props: AttemptsPageProps) {
  const filters = props?.filters || {}
  const attempts = props?.attempts || { data: [], current_page: 1, last_page: 1, per_page: 0, total: 0 }

  const [status, setStatus] = useState<string>(String(filters?.status || ''))
  const [search, setSearch] = useState<string>(String(filters?.search || ''))
  const [sortBy, setSortBy] = useState<string>(String(filters?.sort || ''))
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>(
    (filters?.direction === 'asc' || filters?.direction === 'desc') ? filters.direction : 'desc'
  )

  const rows = Array.isArray(attempts?.data) ? attempts.data : []

  const buildQuery = (extra?: Record<string, string | number>): string => {
    const qs = new URLSearchParams()
    if (status) qs.append('status', status)
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
    if (status) qs.set('status', status)
    if (search) qs.set('search', search)
    if (sortBy) qs.set('sort', sortBy)
    if (sortDir) qs.set('direction', sortDir)
    router.get(`/admin/assessments/attempts${qs.toString() ? `?${qs.toString()}` : ''}`,
      {}, { preserveState: true, preserveScroll: true, replace: true })
  }

  const onReset = () => {
    setStatus('')
    setSearch('')
    setSortBy('')
    setSortDir('desc')
    router.get('/admin/assessments/attempts', {}, { preserveState: true, preserveScroll: true, replace: true })
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

  const exportCsvHref = `/admin/assessments/attempts/export${buildQuery()}`

  const pager = useMemo(() => {
    const pages: number[] = []
    const current = attempts?.current_page ?? 1
    const last = attempts?.last_page ?? 1
    const start = Math.max(1, current - 2)
    const end = Math.min(last, current + 2)
    for (let i = start; i <= end; i++) pages.push(i)
    return pages
  }, [attempts?.current_page, attempts?.last_page])

  return (
    <AdminLayout title="Assessment Attempts" breadcrumbs={[{ label: 'Admin' }, { label: 'Assessments' }, { label: 'Attempts' }]}>
      <Head title="Assessment Attempts" />
      <div className="mb-6 flex items-end gap-3">
        <div>
          <label className="block text-sm text-muted-foreground">Status</label>
          <select
            className="rounded border border-border bg-card px-2 py-1 text-foreground"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">All</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div className="grow">
          <label className="block text-sm text-muted-foreground">Search</label>
          <input
            className="w-full rounded border border-border bg-card px-2 py-1 text-foreground"
            placeholder="Search user or assessment"
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
        <table className="min-w-full divide-y divide-border bg-card">
          <thead className="bg-muted">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold text-foreground">User</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-foreground">Assessment</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-foreground">Status</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-foreground cursor-pointer" onClick={() => toggleSort('started_at')}>
                Started {sortBy === 'started_at' ? (sortDir === 'asc' ? '▲' : '▼') : ''}
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-foreground cursor-pointer" onClick={() => toggleSort('completed_at')}>
                Completed {sortBy === 'completed_at' ? (sortDir === 'asc' ? '▲' : '▼') : ''}
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-foreground">Progress</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rows.map((row) => (
              <tr key={row.id} className="hover:bg-muted/50">
                <td className="px-4 py-2">
                  <div className="font-medium text-foreground">{row.user?.name ?? '-'}</div>
                  <div className="text-xs text-muted-foreground">{row.user?.email ?? ''}</div>
                </td>
                <td className="px-4 py-2">
                  <div className="font-medium text-foreground">{row.assessment?.name ?? '-'}</div>
                  <div className="text-xs text-muted-foreground">{row.assessment?.slug ?? ''}</div>
                </td>
                <td className="px-4 py-2">
                  {(() => {
                    const statusText = row.completed_at ? 'completed' : row.started_at ? 'in_progress' : 'pending'
                    const cls = row.completed_at
                      ? 'bg-green-600/20 text-green-600'
                      : row.started_at
                      ? 'bg-yellow-600/20 text-yellow-600'
                      : 'bg-muted text-foreground'
                    return (
                      <span className={`inline-flex items-center rounded px-2 py-0.5 text-xs ${cls}`}>
                        {statusText}
                      </span>
                    )
                  })()}
                </td>
                <td className="px-4 py-2 text-sm text-foreground">{row.started_at ?? '-'}</td>
                <td className="px-4 py-2 text-sm text-foreground">{row.completed_at ?? '-'}</td>
                <td className="px-4 py-2 text-sm text-foreground">{typeof row.progress === 'number' ? `${row.progress}%` : '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-between text-sm">
        <div>
          {(() => {
            const current = attempts?.current_page ?? 1
            const perPage = attempts?.per_page ?? 0
            const total = attempts?.total ?? 0
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
          {(attempts?.current_page ?? 1) > 1 && (
            <Link
              className="rounded border px-2 py-1"
              href={`/admin/assessments/attempts${buildQuery({ page: String((attempts?.current_page ?? 1) - 1) })}`}
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
                'rounded border px-2 py-1 ' + (p === (attempts?.current_page ?? 1) ? 'bg-blue-600 text-white' : '')
              }
              href={`/admin/assessments/attempts${buildQuery({ page: String(p) })}`}
              preserveScroll
              preserveState
            >
              {p}
            </Link>
          ))}
          {(attempts?.current_page ?? 1) < (attempts?.last_page ?? 1) && (
            <Link
              className="rounded border px-2 py-1"
              href={`/admin/assessments/attempts${buildQuery({ page: String((attempts?.current_page ?? 1) + 1) })}`}
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
