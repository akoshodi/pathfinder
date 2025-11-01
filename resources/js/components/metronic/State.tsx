import { PropsWithChildren } from 'react'

export function LoadingState({ children }: PropsWithChildren) {
  return (
    <div className="animate-pulse rounded-lg border bg-white p-6 shadow-sm">
      <div className="h-4 w-32 bg-gray-200 rounded mb-4" />
      <div className="space-y-2">
        <div className="h-3 w-full bg-gray-100 rounded" />
        <div className="h-3 w-5/6 bg-gray-100 rounded" />
        <div className="h-3 w-2/3 bg-gray-100 rounded" />
      </div>
      {children}
    </div>
  )
}

export function ErrorState({ message }: { message: string }) {
  return (
    <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
      <div className="font-semibold mb-1">Something went wrong</div>
      <div className="text-sm">{message}</div>
    </div>
  )
}
