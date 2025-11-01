import { useEffect, useState } from 'react'
export type Column<T> = {
  key: keyof T | string
  header: string
  render?: (row: T) => React.ReactNode
}

export type DataTableProps<T> = {
  columns: Column<T>[]
  data: T[]
  emptyMessage?: string
  responsiveMode?: 'table' | 'cards' | 'auto'
}

export function DataTable<T>({ columns, data, emptyMessage = 'No records found.', responsiveMode = 'auto' }: DataTableProps<T>) {
  const [isMobile, setIsMobile] = useState<boolean>(typeof window !== 'undefined' && window.innerWidth < 768)

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const useCardView = responsiveMode === 'cards' || (responsiveMode === 'auto' && isMobile)

  if (useCardView) {
    return (
      <div className="space-y-4" data-testid="datatable-cards">
        {data.length === 0 && (
          <div className="rounded-lg border bg-white p-4 text-sm text-gray-500 shadow-sm">{emptyMessage}</div>
        )}
        {data.map((row, i) => (
          <div key={i} className="rounded-lg border bg-white p-4 shadow-sm">
            <div className="space-y-3">
              {columns.map((col) => (
                <div key={String(col.key)} className="flex items-start justify-between gap-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">{col.header}</span>
                  <span className="text-sm text-gray-700 text-right">
                    {col.render ? col.render(row) : ((row as any)[col.key as string] as React.ReactNode)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  }
  return (
    <div className="rounded-lg border bg-white shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200" data-testid="datatable-table">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((col) => (
                <th key={String(col.key)} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {data.length === 0 && (
              <tr>
                <td className="px-4 py-6 text-sm text-gray-500" colSpan={columns.length}>
                  {emptyMessage}
                </td>
              </tr>
            )}
            {data.map((row, i) => (
              <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                {columns.map((col) => (
                  <td key={String(col.key)} className="px-4 py-3 text-sm text-gray-700">
                    {col.render ? col.render(row) : ((row as any)[col.key as string] as React.ReactNode)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
