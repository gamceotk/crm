import { createBrowserClient } from '@supabase/ssr'

// Browser-side Supabase client. Uses the public anon key + row-level security.
// Never use the service-role key here — it must stay server-only.
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )
}
