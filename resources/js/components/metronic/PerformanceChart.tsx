type Series = { name: string; data: number[] }

export type PerformanceChartProps = {
  title: string
  labels: string[]
  series: Series[]
}

// Placeholder chart container; wire up ChartJS/ApexCharts later
export function PerformanceChart({ title, labels, series }: PerformanceChartProps) {
  return (
    <div className="rounded-lg border bg-white p-4 shadow-sm">
      <div className="mb-2 font-semibold">{title}</div>
      <div className="text-xs text-gray-500">{labels.join(' • ')}</div>
      <div className="mt-4 h-40 w-full rounded bg-gray-50 flex items-center justify-center text-gray-400">
        Chart Placeholder ({series.length} series)
      </div>
    </div>
  )
}
