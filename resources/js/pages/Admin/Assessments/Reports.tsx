import { Head, Link, router } from '@inertiajs/react'
import { useMemo, useState } from 'react'

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
  filters?: ReportFilters
  reports: {
    data: ReportItem[]
    current_page: number
    last_page: number
    per_page: number
    total: number
  }
}

export default function ReportsPage({ filters, reports }: ReportsPageProps) {
  const safeFilters: ReportFilters = (filters ?? {}) as ReportFilters
  const safeReports: ReportsPageProps['reports'] = reports ?? {
    data: [],
    current_page: 1,
    last_page: 1,
    per_page: 0,
    total: 0,
  }

  const [type, setType] = useState(safeFilters.type ?? '')
  const [search, setSearch] = useState(safeFilters.search ?? '')
  const [sort, setSort] = useState(safeFilters.sort ?? '')
  const [direction, setDirection] = useState<('asc' | 'desc')>(
    safeFilters.direction === 'asc' || safeFilters.direction === 'desc' ? (safeFilters.direction as 'asc' | 'desc') : 'desc'
  )

  const rows = Array.isArray(safeReports.data) ? safeReports.data : []

  const buildQuery = (extra?: Record<string, string | number>): string => {
    const qs = new URLSearchParams()
    if (type) qs.append('type', type)
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
    if (type) qs.set('type', type)
    if (search) qs.set('search', search)
    if (sort) qs.set('sort', sort)
    if (direction) qs.set('direction', direction)
    router.get(`/admin/assessments/reports${qs.toString() ? `?${qs.toString()}` : ''}`,
      {}, { preserveState: true, preserveScroll: true, replace: true })
  }

  const onReset = () => {
    setType('')
    setSearch('')
    setSort('')
    setDirection('desc')
    router.get('/admin/assessments/reports', {}, { preserveState: true, preserveScroll: true, replace: true })
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

  const exportCsvHref = `/admin/assessments/reports/export${buildQuery()}`

  const pager = useMemo(() => {
    const pages: number[] = []
  const current = safeReports.current_page ?? 1
  const last = safeReports.last_page ?? 1
    const start = Math.max(1, current - 2)
    const end = Math.min(last, current + 2)
    for (let i = start; i <= end; i++) pages.push(i)
    return pages
  }, [safeReports.current_page, safeReports.last_page])

  return (
    <div className="p-6">
      <Head title="Assessment Reports" />
      <div className="mb-6 flex items-end gap-3">
        <div>
          <label className="block text-sm text-gray-600">Type</label>
          <input
            className="rounded border px-2 py-1"
            placeholder="e.g. riasec, skills"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
        </div>
        <div className="grow">
          <label className="block text-sm text-gray-600">Search</label>
          <input
            className="w-full rounded border px-2 py-1"
            placeholder="Search title, user, assessment"
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
              <th className="px-4 py-2 text-left text-sm font-semibold">Title</th>
              <th className="px-4 py-2 text-left text-sm font-semibold">Type</th>
              <th className="px-4 py-2 text-left text-sm font-semibold">Assessment</th>
              <th className="px-4 py-2 text-left text-sm font-semibold">User</th>
              <th className="px-4 py-2 text-left text-sm font-semibold cursor-pointer" onClick={() => toggleSort('generated_at')}>
                Generated {sort === 'generated_at' ? (direction === 'asc' ? '▲' : '▼') : ''}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {rows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50">
                <td className="px-4 py-2">
                  <div className="font-medium">{row.title ?? '-'}</div>
                </td>
                <td className="px-4 py-2 text-sm">{row.report_type ?? '-'}</td>
                <td className="px-4 py-2">
                  <div className="font-medium">{row.assessment?.name ?? '-'}</div>
                  <div className="text-xs text-gray-500">{row.assessment?.slug ?? ''}</div>
                </td>
                <td className="px-4 py-2">
                  <div className="font-medium">{row.user?.name ?? '-'}</div>
                  <div className="text-xs text-gray-500">{row.user?.email ?? ''}</div>
                </td>
                <td className="px-4 py-2 text-sm">{row.generated_at ?? '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-between text-sm">
        <div>
          {(() => {
            const current = safeReports.current_page ?? 1
            const perPage = safeReports.per_page ?? 0
            const total = safeReports.total ?? 0
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
          {(safeReports.current_page ?? 1) > 1 && (
            <Link
              className="rounded border px-2 py-1"
              href={`/admin/assessments/reports${buildQuery({ page: String((safeReports.current_page ?? 1) - 1) })}`}
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
                'rounded border px-2 py-1 ' + (p === (safeReports.current_page ?? 1) ? 'bg-blue-600 text-white' : '')
              }
              href={`/admin/assessments/reports${buildQuery({ page: String(p) })}`}
              preserveScroll
              preserveState
            >
              {p}
            </Link>
          ))}
          {(safeReports.current_page ?? 1) < (safeReports.last_page ?? 1) && (
            <Link
              className="rounded border px-2 py-1"
              href={`/admin/assessments/reports${buildQuery({ page: String((safeReports.current_page ?? 1) + 1) })}`}
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
