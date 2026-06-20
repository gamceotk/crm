'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    router.push('/admin')
    router.refresh()
  }

  return (
    <main
      className="min-h-screen flex items-center justify-center px-6"
      style={{ background: 'var(--gam-black)' }}
    >
      <div className="w-full max-w-sm">
        <div
          className="text-xs font-semibold tracking-widest uppercase mb-8 text-center"
          style={{ color: 'var(--gam-gold)' }}
        >
          GAM Entertainment · Admin
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              className="block text-xs font-medium mb-1.5"
              style={{ color: 'var(--gam-muted)' }}
            >
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="w-full px-4 py-3 text-sm outline-none transition-colors"
              style={{
                background: 'var(--gam-surface)',
                border: '1px solid var(--gam-border)',
                color: 'var(--gam-text)',
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--gam-gold)')}
              onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--gam-border)')}
            />
          </div>

          <div>
            <label
              className="block text-xs font-medium mb-1.5"
              style={{ color: 'var(--gam-muted)' }}
            >
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="w-full px-4 py-3 text-sm outline-none transition-colors"
              style={{
                background: 'var(--gam-surface)',
                border: '1px solid var(--gam-border)',
                color: 'var(--gam-text)',
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--gam-gold)')}
              onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--gam-border)')}
            />
          </div>

          {error && (
            <p className="text-sm" style={{ color: '#EF4444' }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 text-sm font-bold tracking-widest uppercase transition-opacity disabled:opacity-50"
            style={{ background: 'var(--gam-gold)', color: 'var(--gam-black)' }}
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </div>
    </main>
  )
}
