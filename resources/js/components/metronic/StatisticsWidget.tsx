import { ReactNode } from 'react'

export type StatisticsWidgetProps = {
  title: string
  value: string | number
  icon?: ReactNode
  trend?: { value: string; direction: 'up' | 'down' | 'flat' }
}

export function StatisticsWidget({ title, value, icon, trend }: StatisticsWidgetProps) {
  return (
    <div className="rounded-lg border bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-gray-500">{title}</div>
          <div className="mt-1 text-2xl font-semibold">{value}</div>
        </div>
        {icon && <div className="text-gray-400">{icon}</div>}
      </div>
      {trend && (
        <div className="mt-2 text-xs text-gray-500">
          {trend.direction === 'up' && <span className="text-emerald-600">▲</span>}
          {trend.direction === 'down' && <span className="text-red-600">▼</span>}
          {trend.direction === 'flat' && <span className="text-gray-400">◆</span>}
          <span className="ml-1">{trend.value}</span>
        </div>
      )}
    </div>
  )
}
