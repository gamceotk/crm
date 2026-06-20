import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/admin/login')
  }

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: 'var(--gam-black)' }}
    >
      {/* Top nav */}
      <header
        className="px-6 py-4 flex items-center justify-between border-b"
        style={{ borderColor: 'var(--gam-border)' }}
      >
        <div className="flex items-center gap-3">
          <span
            className="text-xs font-semibold tracking-widest uppercase"
            style={{ color: 'var(--gam-gold)' }}
          >
            GAM CRM
          </span>
          <span style={{ color: 'var(--gam-border)' }}>·</span>
          <span className="text-xs" style={{ color: 'var(--gam-muted)' }}>
            Admin
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs" style={{ color: 'var(--gam-muted)' }}>
            {user.email}
          </span>
          <SignOutButton />
        </div>
      </header>

      <main className="flex-1 px-6 py-8">{children}</main>
    </div>
  )
}

function SignOutButton() {
  return (
    <form action="/api/auth/signout" method="POST">
      <button
        type="submit"
        className="text-xs font-medium transition-colors"
        style={{ color: 'var(--gam-muted)' }}
        onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--gam-gold)')}
        onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--gam-muted)')}
      >
        Sign out
      </button>
    </form>
  )
}
