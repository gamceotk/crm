import { createAdminClient } from '@/lib/supabase/admin'

type Lead = {
  id: string
  created_at: string
  type: string
  subject: string | null
  message: string | null
  status: string
  people: {
    name: string
    email: string
    company: string | null
    attributes: Record<string, string>
  } | null
}

const TYPE_LABELS: Record<string, string> = {
  sponsorship: 'Sponsorship',
  advertising: 'Advertising',
  appearance: 'Appearance',
  kol_booking: 'KOL Booking',
  general: 'General',
}

const STATUS_COLORS: Record<string, string> = {
  new_lead: '#FFBE10',
  contacted: '#C9A96E',
  discovery_call: '#60A5FA',
  proposal: '#A78BFA',
  won: '#34D399',
  lost: '#6B7280',
}

export const revalidate = 0

export default async function AdminLeadsPage() {
  const supabase = createAdminClient()

  const { data: leads, error } = await supabase
    .from('contacts')
    .select(`
      id,
      created_at,
      type,
      subject,
      message,
      status,
      people (
        name,
        email,
        company,
        attributes
      )
    `)
    .order('created_at', { ascending: false })
    .limit(100)

  if (error) {
    return (
      <p className="text-sm" style={{ color: '#EF4444' }}>
        Failed to load leads: {error.message}
      </p>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-baseline justify-between mb-8">
        <h1 className="text-2xl font-bold" style={{ color: 'var(--gam-text)' }}>
          Leads
        </h1>
        <span className="text-sm" style={{ color: 'var(--gam-muted)' }}>
          {leads?.length ?? 0} total
        </span>
      </div>

      {!leads || leads.length === 0 ? (
        <div
          className="text-center py-24 border"
          style={{ borderColor: 'var(--gam-border)' }}
        >
          <p className="text-sm" style={{ color: 'var(--gam-muted)' }}>
            No leads yet. Submit the contact form on tknguyen.me to see one here.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {(leads as unknown as Lead[]).map((lead) => (
            <LeadRow key={lead.id} lead={lead} />
          ))}
        </div>
      )}
    </div>
  )
}

function LeadRow({ lead }: { lead: Lead }) {
  const person = lead.people
  const attrs = person?.attributes ?? {}
  const color = STATUS_COLORS[lead.status] ?? 'var(--gam-muted)'
  const date = new Date(lead.created_at).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <div
      className="p-5 border-l-2"
      style={{
        background: 'var(--gam-surface)',
        borderLeftColor: color,
      }}
    >
      <div className="flex items-start justify-between gap-4 flex-wrap">
        {/* Left: person + inquiry */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-1 flex-wrap">
            <span className="font-semibold" style={{ color: 'var(--gam-text)' }}>
              {person?.name ?? '—'}
            </span>
            {person?.company && (
              <span className="text-sm" style={{ color: 'var(--gam-muted)' }}>
                {person.company}
              </span>
            )}
          </div>
          <div className="text-sm mb-2" style={{ color: 'var(--gam-gold-muted)' }}>
            {person?.email}
          </div>
          {lead.subject && (
            <div className="text-sm font-medium mb-1" style={{ color: 'var(--gam-text)' }}>
              {lead.subject}
            </div>
          )}
          {lead.message && (
            <p
              className="text-sm line-clamp-2"
              style={{ color: 'var(--gam-muted)' }}
            >
              {lead.message}
            </p>
          )}

          {/* Custom attributes */}
          {(attrs.how_we_met || attrs.budget_tier || attrs.decision_timeline) && (
            <div className="flex flex-wrap gap-3 mt-3">
              {attrs.how_we_met && (
                <Attr label="Source" value={attrs.how_we_met} />
              )}
              {attrs.budget_tier && (
                <Attr label="Budget" value={attrs.budget_tier} />
              )}
              {attrs.decision_timeline && (
                <Attr label="Timeline" value={attrs.decision_timeline} />
              )}
            </div>
          )}
        </div>

        {/* Right: type, status, date */}
        <div className="flex flex-col items-end gap-2 shrink-0">
          <span
            className="text-xs font-semibold tracking-wider uppercase px-2 py-0.5"
            style={{ background: 'rgba(255,190,16,0.12)', color: 'var(--gam-gold)' }}
          >
            {TYPE_LABELS[lead.type] ?? lead.type}
          </span>
          <span
            className="text-xs font-medium capitalize"
            style={{ color }}
          >
            {lead.status.replace('_', ' ')}
          </span>
          <span className="text-xs" style={{ color: 'var(--gam-muted)' }}>
            {date}
          </span>
        </div>
      </div>
    </div>
  )
}

function Attr({ label, value }: { label: string; value: string }) {
  return (
    <span className="text-xs" style={{ color: 'var(--gam-muted)' }}>
      <span style={{ color: 'var(--gam-gold-muted)' }}>{label}:</span> {value}
    </span>
  )
}
