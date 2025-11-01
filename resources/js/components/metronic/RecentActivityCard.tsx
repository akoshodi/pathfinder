export type Activity = { id: string | number; title: string; time: string; description?: string }

export function RecentActivityCard({ title, items }: { title: string; items: Activity[] }) {
  return (
    <div className="rounded-lg border bg-white p-4 shadow-sm">
      <div className="font-semibold mb-3">{title}</div>
      <ul className="space-y-3">
        {items.map((a) => (
          <li key={a.id} className="flex items-start gap-3">
            <div className="mt-1 h-2 w-2 rounded-full bg-emerald-500" />
            <div>
              <div className="text-sm font-medium text-gray-900">{a.title}</div>
              {a.description && <div className="text-sm text-gray-600">{a.description}</div>}
              <div className="text-xs text-gray-500">{a.time}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
