import { PropsWithChildren } from 'react'
import { Link, usePage } from '@inertiajs/react'
import { Bell, Menu, Sun, Moon } from 'lucide-react'
import { brand } from '@/theme/brand'

type Breadcrumb = { label: string; href?: string }

type AdminLayoutProps = PropsWithChildren<{
  title?: string
  breadcrumbs?: Breadcrumb[]
  loading?: boolean
  error?: string | null
}>

export default function AdminLayout({ title, breadcrumbs = [], children }: AdminLayoutProps) {
  const page = usePage();
  const authUserInitial = ((page.props as any)?.auth?.user?.name?.[0] as string | undefined) ?? 'U';

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 w-64 bg-white border-r shadow-sm hidden md:flex md:flex-col">
        <div className="h-16 flex items-center px-6 border-b" style={{ color: brand.primary }}>
          <span className="text-lg font-bold">SIS Admin</span>
        </div>
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          <Link href="/admin/super" className="block rounded px-3 py-2 hover:bg-gray-100">Super Admin</Link>
          <Link href="/admin/institution" className="block rounded px-3 py-2 hover:bg-gray-100">Institution</Link>
          <Link href="/admin/instructor" className="block rounded px-3 py-2 hover:bg-gray-100">Instructor</Link>
          <Link href="/admin/student" className="block rounded px-3 py-2 hover:bg-gray-100">Student</Link>
          <Link href="/admin/alumni" className="block rounded px-3 py-2 hover:bg-gray-100">Alumni</Link>
          <Link href="/admin/mentor" className="block rounded px-3 py-2 hover:bg-gray-100">Mentor</Link>
          <Link href="/admin/organization" className="block rounded px-3 py-2 hover:bg-gray-100">Organization</Link>
          <Link href="/admin/merchant" className="block rounded px-3 py-2 hover:bg-gray-100">Merchant</Link>
          <Link href="/admin/researcher" className="block rounded px-3 py-2 hover:bg-gray-100">Researcher</Link>
        </nav>
      </aside>

      {/* Topbar */}
      <header className="md:ml-64 sticky top-0 z-10 bg-white border-b h-16 flex items-center">
        <div className="flex-1 flex items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <button className="md:hidden p-2 rounded hover:bg-gray-100" aria-label="Open menu">
              <Menu className="h-5 w-5" />
            </button>
            {title && <h1 className="text-lg font-semibold">{title}</h1>}
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 rounded hover:bg-gray-100" aria-label="Toggle theme">
              <Sun className="h-5 w-5 hidden dark:block" />
              <Moon className="h-5 w-5 block dark:hidden" />
            </button>
            <button className="p-2 rounded hover:bg-gray-100" aria-label="Notifications">
              <Bell className="h-5 w-5" />
            </button>
            <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium">
              {authUserInitial}
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="md:ml-64 p-4 md:p-6">
        {breadcrumbs.length > 0 && (
          <nav className="text-sm text-gray-500 mb-4">
            {breadcrumbs.map((b, i) => (
              <span key={i}>
                {b.href ? <Link href={b.href} className="hover:underline">{b.label}</Link> : b.label}
                {i < breadcrumbs.length - 1 && <span className="mx-2">/</span>}
              </span>
            ))}
          </nav>
        )}

        <div className="grid gap-6">
          {children}
        </div>
      </main>
    </div>
  )
}
