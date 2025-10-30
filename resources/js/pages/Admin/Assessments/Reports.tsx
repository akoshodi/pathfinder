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

interface ReportsPageProps {
  filters: { type?: string | null; search?: string | null; sort?: string | null; direction?: string | null }
  reports: {
    data: ReportItem[]
    current_page: number
    last_page: number
    per_page: number
    total: number
  }
}

export default function ReportsPage({ filters, reports }: ReportsPageProps) {
  const [type, setType] = useState(filters.type ?? '')
  const [search, setSearch] = useState(filters.search ?? '')
  const [sort, setSort] = useState(filters.sort ?? '')
  const [direction, setDirection] = useState<("asc"|"desc")>(
    (filters.direction === 'asc' || filters.direction === 'desc') ? (filters.direction as any) : 'desc'
  )

  const rows = reports.data

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

  const exportCsvHref = `/admin/assessments/reports/export?${new URLSearchParams({
    ...(type ? { type } : {}),
    ...(search ? { search } : {}),
    ...(sort ? { sort } : {}),
    ...(direction ? { direction } : {}),
  }).toString()}`

  const pager = useMemo(() => {
    const pages: number[] = []
    const start = Math.max(1, reports.current_page - 2)
    const end = Math.min(reports.last_page, reports.current_page + 2)
    for (let i = start; i <= end; i++) pages.push(i)
    return pages
  }, [reports])

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
                  <div className="font-medium">{row.assessment.name ?? '-'}</div>
                  <div className="text-xs text-gray-500">{row.assessment.slug ?? ''}</div>
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
          Showing {(reports.current_page - 1) * reports.per_page + 1} -
          {Math.min(reports.current_page * reports.per_page, reports.total)} of {reports.total}
        </div>
        <div className="flex items-center gap-2">
          {reports.current_page > 1 && (
            <Link
              className="rounded border px-2 py-1"
              href={`/admin/assessments/reports?${new URLSearchParams({
                ...(type ? { type } : {}),
                ...(search ? { search } : {}),
                page: String(reports.current_page - 1),
              }).toString()}`}
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
                'rounded border px-2 py-1 ' + (p === reports.current_page ? 'bg-blue-600 text-white' : '')
              }
              href={`/admin/assessments/reports?${new URLSearchParams({
                ...(type ? { type } : {}),
                ...(search ? { search } : {}),
                page: String(p),
              }).toString()}`}
              preserveScroll
              preserveState
            >
              {p}
            </Link>
          ))}
          {reports.current_page < reports.last_page && (
            <Link
              className="rounded border px-2 py-1"
              href={`/admin/assessments/reports?${new URLSearchParams({
                ...(type ? { type } : {}),
                ...(search ? { search } : {}),
                page: String(reports.current_page + 1),
              }).toString()}`}
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
