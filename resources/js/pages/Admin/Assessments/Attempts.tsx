import { Head, Link, router } from '@inertiajs/react'
import { useMemo, useState } from 'react'

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
  filters?: AttemptFilters
  attempts: {
    data: AttemptItem[]
    current_page: number
    last_page: number
    per_page: number
    total: number
  }
}

export default function AttemptsPage({ filters, attempts }: AttemptsPageProps) {
  const safeFilters: AttemptFilters = (filters ?? {}) as AttemptFilters
  const safeAttempts: AttemptsPageProps['attempts'] = attempts ?? {
    data: [],
    current_page: 1,
    last_page: 1,
    per_page: 0,
    total: 0,
  }

  const [status, setStatus] = useState(safeFilters.status ?? '')
  const [search, setSearch] = useState(safeFilters.search ?? '')
  const [sort, setSort] = useState(safeFilters.sort ?? '')
  const [direction, setDirection] = useState<('asc' | 'desc')>(
    safeFilters.direction === 'asc' || safeFilters.direction === 'desc' ? (safeFilters.direction as 'asc' | 'desc') : 'desc'
  )

  const rows = Array.isArray(safeAttempts.data) ? safeAttempts.data : []

  const buildQuery = (extra?: Record<string, string | number>): string => {
    const qs = new URLSearchParams()
    if (status) qs.append('status', status)
    if (search) qs.append('search', search)
    if (sort) qs.append('sort', sort)
    if (direction) qs.append('direction', direction)
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
    if (sort) qs.set('sort', sort)
    if (direction) qs.set('direction', direction)
    router.get(`/admin/assessments/attempts${qs.toString() ? `?${qs.toString()}` : ''}`,
      {}, { preserveState: true, preserveScroll: true, replace: true })
  }

  const onReset = () => {
    setStatus('')
    setSearch('')
    setSort('')
    setDirection('desc')
    router.get('/admin/assessments/attempts', {}, { preserveState: true, preserveScroll: true, replace: true })
  }

  const toggleSort = (column: string) => {
    if (sort === column) {
      setDirection(direction === 'asc' ? 'desc' : 'asc')
    } else {
      setSort(column)
      setDirection('desc')
    }
    setTimeout(onFilter, 0)
  }

  const exportCsvHref = `/admin/assessments/attempts/export${buildQuery()}`

  const pager = useMemo(() => {
    const pages: number[] = []
    const current = safeAttempts.current_page ?? 1
    const last = safeAttempts.last_page ?? 1
    const start = Math.max(1, current - 2)
    const end = Math.min(last, current + 2)
    for (let i = start; i <= end; i++) pages.push(i)
    return pages
  }, [safeAttempts.current_page, safeAttempts.last_page])

  return (
    <div className="p-6">
      <Head title="Assessment Attempts" />
      <div className="mb-6 flex items-end gap-3">
        <div>
          <label className="block text-sm text-gray-600">Status</label>
          <select
            className="rounded border px-2 py-1"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">All</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div className="grow">
          <label className="block text-sm text-gray-600">Search</label>
          <input
            className="w-full rounded border px-2 py-1"
            placeholder="Search user or assessment"
            value={search ?? ''}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button className="rounded bg-blue-600 px-3 py-2 text-white" onClick={onFilter}>
          Apply
        </button>
        <button className="rounded bg-gray-200 px-3 py-2" onClick={onReset}>
          Reset
        </button>
        <a href={exportCsvHref} className="rounded bg-green-600 px-3 py-2 text-white">Export CSV</a>
      </div>

      <div className="overflow-x-auto rounded border">
        <table className="min-w-full divide-y">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold">User</th>
              <th className="px-4 py-2 text-left text-sm font-semibold">Assessment</th>
              <th className="px-4 py-2 text-left text-sm font-semibold">Status</th>
              <th className="px-4 py-2 text-left text-sm font-semibold cursor-pointer" onClick={() => toggleSort('started_at')}>
                Started {sort === 'started_at' ? (direction === 'asc' ? '▲' : '▼') : ''}
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold cursor-pointer" onClick={() => toggleSort('completed_at')}>
                Completed {sort === 'completed_at' ? (direction === 'asc' ? '▲' : '▼') : ''}
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold">Progress</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {rows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50">
                <td className="px-4 py-2">
                  <div className="font-medium">{row.user?.name ?? '-'}</div>
                  <div className="text-xs text-gray-500">{row.user?.email ?? ''}</div>
                </td>
                <td className="px-4 py-2">
                  <div className="font-medium">{row.assessment?.name ?? '-'}</div>
                  <div className="text-xs text-gray-500">{row.assessment?.slug ?? ''}</div>
                </td>
                <td className="px-4 py-2">
                  {(() => {
                    const statusText = row.completed_at ? 'completed' : row.started_at ? 'in_progress' : 'pending'
                    const cls = row.completed_at
                      ? 'bg-green-100 text-green-700'
                      : row.started_at
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-gray-100 text-gray-700'
                    return (
                      <span className={`inline-flex items-center rounded px-2 py-0.5 text-xs ${cls}`}>
                        {statusText}
                      </span>
                    )
                  })()}
                </td>
                <td className="px-4 py-2 text-sm">{row.started_at ?? '-'}</td>
                <td className="px-4 py-2 text-sm">{row.completed_at ?? '-'}</td>
                <td className="px-4 py-2 text-sm">{typeof row.progress === 'number' ? `${row.progress}%` : '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-between text-sm">
        <div>
          {(() => {
      const current = safeAttempts.current_page ?? 1
      const perPage = safeAttempts.per_page ?? 0
      const total = safeAttempts.total ?? 0
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
          {(safeAttempts.current_page ?? 1) > 1 && (
            <Link
              className="rounded border px-2 py-1"
              href={`/admin/assessments/attempts${buildQuery({ page: String((safeAttempts.current_page ?? 1) - 1) })}`}
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
                'rounded border px-2 py-1 ' + (p === (safeAttempts.current_page ?? 1) ? 'bg-blue-600 text-white' : '')
              }
              href={`/admin/assessments/attempts${buildQuery({ page: String(p) })}`}
              preserveScroll
              preserveState
            >
              {p}
            </Link>
          ))}
          {(safeAttempts.current_page ?? 1) < (safeAttempts.last_page ?? 1) && (
            <Link
              className="rounded border px-2 py-1"
              href={`/admin/assessments/attempts${buildQuery({ page: String((safeAttempts.current_page ?? 1) + 1) })}`}
              preserveScroll
              preserveState
            >
              Next
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
