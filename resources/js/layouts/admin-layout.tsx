import { PropsWithChildren, useEffect, useMemo, useState } from 'react'
import { Link, router, usePage } from '@inertiajs/react'
import { Bell, Menu, Sun, Moon, Gauge, Layers, Building2, BriefcaseBusiness, Newspaper, Users, Settings, BarChart3, GraduationCap, School, Trophy, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'
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
  const roles: string[] = ((page.props as any)?.auth?.roles || (page.props as any)?.auth?.user?.roles || []) as string[];
  const permissions: string[] = ((page.props as any)?.auth?.permissions || []) as string[];
  const authUserName: string = ((page.props as any)?.auth?.user?.name as string) ?? 'User';

  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  // Initialize theme from localStorage to avoid rendering light elements in dark mode
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const stored = localStorage.getItem('appearance') as 'light' | 'dark' | null;
      if (stored === 'dark' || stored === 'light') {
        return stored;
      }
    } catch {}
    return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
  });
  const [notifOpen, setNotifOpen] = useState<boolean>(false);
  const [profileOpen, setProfileOpen] = useState<boolean>(false);

  useEffect(() => {
    const stored = localStorage.getItem('adminSidebarCollapsed');
    if (stored !== null) {
      setCollapsed(stored === 'true');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('adminSidebarCollapsed', String(collapsed));
  }, [collapsed]);

  useEffect(() => {
    const isDark = theme === 'dark';
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('appearance', isDark ? 'dark' : 'light');
  }, [theme]);

  type MenuItem = { label: string; href: string; icon?: any; roles?: string[]; permission?: string };
  const menuItems = useMemo<MenuItem[]>(() => ([
    // Dashboards by role
    { label: 'Super Admin', href: '/admin/super', icon: Gauge, roles: ['super-admin'] },
    { label: 'Admin Analytics', href: '/admin/analytics', icon: BarChart3, roles: ['super-admin','admin'] },
    { label: 'Institution', href: '/admin/institution', icon: School, roles: ['institution'] },
    { label: 'Instructor', href: '/admin/instructor', icon: GraduationCap, roles: ['instructor'] },
    { label: 'Student', href: '/admin/student', icon: GraduationCap, roles: ['student'] },
    { label: 'Alumni', href: '/admin/alumni', icon: GraduationCap, roles: ['alumni'] },
    { label: 'Mentor', href: '/admin/mentor', icon: GraduationCap, roles: ['mentor'] },
    { label: 'Organization', href: '/admin/organization', icon: Building2, roles: ['organization'] },
    { label: 'Merchant', href: '/admin/merchant', icon: BriefcaseBusiness, roles: ['merchant'] },
    { label: 'Researcher', href: '/admin/researcher', icon: Layers, roles: ['researcher'] },

    // Admin management
    { label: 'Assessments: Attempts', href: '/admin/assessments/attempts', icon: Gauge, roles: ['super-admin','admin'] },
    { label: 'Assessments: Reports', href: '/admin/assessments/reports', icon: Gauge, roles: ['super-admin','admin'] },
    { label: 'Universities', href: '/admin/universities', icon: School, roles: ['super-admin','admin'] },
    { label: 'Companies', href: '/admin/companies', icon: Building2, roles: ['super-admin','admin'] },
    { label: 'Competitions', href: '/admin/competitions', icon: Trophy, roles: ['super-admin','admin'] },
    { label: 'Resources', href: '/admin/resources', icon: Layers, roles: ['super-admin','admin'] },
    { label: 'Blog Posts', href: '/admin/blog-posts', icon: Newspaper, roles: ['super-admin','admin'] },
    { label: 'Users', href: '/admin/users', icon: Users, roles: ['super-admin','admin'] },
    { label: 'Settings', href: '/admin/settings', icon: Settings, roles: ['super-admin','admin'] },
    { label: 'SIS Feature', href: '/admin/settings/sis-feature', icon: Settings, roles: ['super-admin','admin'] },
  ]), []);

  const userHasRole = (required?: string[]) => {
    if (!required || required.length === 0) { return true }
    if (!roles || roles.length === 0) { return false }
    // roles in props may be array of strings or array-like, normalize to lowercase
    const have = roles.map(r => String(r).toLowerCase());
    return required.some(r => have.includes(String(r).toLowerCase()));
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Mobile menu backdrop */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-20 bg-black/50 md:hidden" onClick={() => setMobileMenuOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 ${collapsed ? 'w-16' : 'w-64'} bg-card border-r border-border shadow-sm hidden md:flex md:flex-col transition-[width] duration-200`}>
        <div className="h-16 flex items-center px-6 border-b border-border" style={{ color: brand.primary }}>
          <button onClick={() => setCollapsed((c) => !c)} className="mr-3 rounded p-1 hover:bg-muted" aria-label="Toggle sidebar">
            {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
          </button>
          <span className={`text-lg font-bold ${collapsed ? 'hidden' : 'block'}`}>Pathfinder Admin</span>
        </div>
        <nav className="flex-1 overflow-y-auto p-2 space-y-1">
          {menuItems.filter(mi => userHasRole(mi.roles)).map((mi, idx) => {
            const Icon = mi.icon ?? Layers;
            return (
              <Link key={idx} href={mi.href} className={`flex items-center gap-3 rounded px-3 py-2 hover:bg-muted text-sm ${collapsed ? 'justify-center' : ''}`}>
                <Icon className="h-5 w-5 text-muted-foreground" />
                {!collapsed && <span className="text-foreground">{mi.label}</span>}
              </Link>
            )
          })}
        </nav>
      </aside>

      {/* Mobile sidebar */}
      <aside className={`fixed inset-y-0 left-0 w-64 bg-card border-r border-border shadow-lg z-30 md:hidden transition-transform duration-200 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-16 flex items-center px-6 border-b border-border" style={{ color: brand.primary }}>
          <span className="text-lg font-bold">Pathfinder</span>
        </div>
        <nav className="flex-1 overflow-y-auto p-2 space-y-1">
          {menuItems.filter(mi => userHasRole(mi.roles)).map((mi, idx) => {
            const Icon = mi.icon ?? Layers;
            return (
              <Link key={idx} href={mi.href} className="flex items-center gap-3 rounded px-3 py-2 hover:bg-muted text-sm" onClick={() => setMobileMenuOpen(false)}>
                <Icon className="h-5 w-5 text-muted-foreground" />
                <span className="text-foreground">{mi.label}</span>
              </Link>
            )
          })}
        </nav>
      </aside>

      {/* Topbar */}
      <header className={`${collapsed ? 'md:ml-16' : 'md:ml-64'} sticky top-0 z-10 bg-card border-b border-border h-16 flex items-center transition-[margin] duration-200`}>
        <div className="flex-1 flex items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <button className="md:hidden p-2 rounded hover:bg-muted" aria-label="Open menu" onClick={() => setMobileMenuOpen((o) => !o)}>
              <Menu className="h-5 w-5" />
            </button>
            {title && <h1 className="text-lg font-semibold">{title}</h1>}
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 rounded hover:bg-muted" aria-label="Toggle theme" onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}>
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            <div className="relative">
              <button className="p-2 rounded hover:bg-muted" aria-label="Notifications" onClick={() => setNotifOpen((o) => !o)}>
                <Bell className="h-5 w-5" />
              </button>
              {notifOpen && (
                <div className="absolute right-0 mt-2 w-64 rounded-md border border-border bg-card p-2 shadow-lg">
                  <div className="px-2 py-1 text-sm font-medium text-foreground">Notifications</div>
                  <div className="p-2 text-sm text-muted-foreground">No new notifications</div>
                </div>
              )}
            </div>

            <div className="relative">
              <button className="flex items-center gap-2 rounded px-2 py-1 hover:bg-muted" onClick={() => setProfileOpen((o) => !o)}>
                <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-sm font-medium">
                  {authUserInitial}
                </div>
                <span className="hidden md:block text-sm">{authUserName}</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md border border-border bg-card p-2 shadow-lg">
                  <Link href="/settings/profile" className="block rounded px-3 py-2 text-sm hover:bg-muted">Profile</Link>
                  <Link href="/admin/settings" className="block rounded px-3 py-2 text-sm hover:bg-muted">Settings</Link>
                  <button onClick={() => router.post('/logout')} className="block w-full rounded px-3 py-2 text-left text-sm hover:bg-muted">Logout</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className={`${collapsed ? 'md:ml-16' : 'md:ml-64'} p-4 md:p-6 transition-[margin] duration-200 admin-layout`}>
        <div className="mx-auto w-full max-w-7xl">
          {breadcrumbs.length > 0 && (
            <nav className="text-sm text-muted-foreground mb-4">
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
        </div>
      </main>
    </div>
  )
}
