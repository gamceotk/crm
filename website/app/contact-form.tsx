'use client'

import { useActionState } from 'react'
import { submitInquiry, type InquiryFormState } from './actions/submit-inquiry'

const INQUIRY_TYPES = [
  { value: 'sponsorship', label: 'Brand Partnership / Sponsorship' },
  { value: 'advertising', label: 'Advertising Campaign' },
  { value: 'appearance', label: 'Team / Player Appearance' },
  { value: 'kol_booking', label: 'KOL / Creator Booking' },
  { value: 'general', label: 'General Inquiry' },
]

const BUDGET_TIERS = [
  { value: '', label: 'Select budget range' },
  { value: 'Under $10K', label: 'Under $10K' },
  { value: '$10K–$50K', label: '$10K – $50K' },
  { value: '$50K–$200K', label: '$50K – $200K' },
  { value: '$200K+', label: '$200K+' },
]

const DECISION_TIMELINES = [
  { value: '', label: 'Select timeline' },
  { value: 'Immediate', label: 'Immediate' },
  { value: 'This Quarter', label: 'This Quarter' },
  { value: 'Next Quarter', label: 'Next Quarter' },
  { value: 'Next Year', label: 'Next Year' },
]

const initial: InquiryFormState = { status: 'idle' }

export default function ContactForm() {
  const [state, action, pending] = useActionState(submitInquiry, initial)

  if (state.status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] text-center px-4">
        <div
          className="inline-block text-xs font-semibold tracking-widest uppercase mb-6"
          style={{ color: 'var(--gam-gold)' }}
        >
          Received
        </div>
        <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--gam-text)' }}>
          We'll be in touch.
        </h2>
        <p style={{ color: 'var(--gam-muted)' }} className="max-w-md">
          Your inquiry has been logged. Expect to hear from our commercial team shortly.
        </p>
      </div>
    )
  }

  return (
    <form action={action} className="space-y-8">
      {/* Contact details */}
      <div>
        <div
          className="text-xs font-semibold tracking-widest uppercase mb-4"
          style={{ color: 'var(--gam-gold)' }}
        >
          Your details
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Full name *" name="name" required />
          <Field label="Email *" name="email" type="email" required />
          <Field label="Phone" name="phone" type="tel" />
          <Field label="Company" name="company" />
          <Field label="Your role" name="role" className="sm:col-span-2" />
        </div>
      </div>

      {/* Inquiry */}
      <div>
        <div
          className="text-xs font-semibold tracking-widest uppercase mb-4"
          style={{ color: 'var(--gam-gold)' }}
        >
          The inquiry
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--gam-muted)' }}>
              Inquiry type *
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {INQUIRY_TYPES.map((t) => (
                <label
                  key={t.value}
                  className="flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors"
                  style={{
                    background: 'var(--gam-surface)',
                    border: '1px solid var(--gam-border)',
                  }}
                >
                  <input
                    type="radio"
                    name="type"
                    value={t.value}
                    defaultChecked={t.value === 'general'}
                    className="accent-[#FFBE10]"
                  />
                  <span className="text-sm" style={{ color: 'var(--gam-text)' }}>
                    {t.label}
                  </span>
                </label>
              ))}
            </div>
          </div>
          <Field label="Subject" name="subject" />
          <div>
            <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--gam-muted)' }}>
              Message *
            </label>
            <textarea
              name="message"
              required
              rows={5}
              placeholder="Tell us about the opportunity…"
              className="w-full px-4 py-3 text-sm resize-none outline-none transition-colors"
              style={{
                background: 'var(--gam-surface)',
                border: '1px solid var(--gam-border)',
                color: 'var(--gam-text)',
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--gam-gold)')}
              onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--gam-border)')}
            />
          </div>
        </div>
      </div>

      {/* Partnership details */}
      <div>
        <div
          className="text-xs font-semibold tracking-widest uppercase mb-4"
          style={{ color: 'var(--gam-gold)' }}
        >
          Partnership details
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <SelectField label="Approximate budget" name="budget_tier" options={BUDGET_TIERS} />
          <SelectField label="Decision timeline" name="decision_timeline" options={DECISION_TIMELINES} />
          <Field
            label="How did you hear about us?"
            name="how_we_met"
            placeholder="e.g. Referred by a partner, saw us at EWC…"
            className="sm:col-span-2"
          />
        </div>
      </div>

      {/* Consent */}
      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          name="ok_to_contact"
          className="mt-0.5 accent-[#FFBE10]"
        />
        <span className="text-sm" style={{ color: 'var(--gam-muted)' }}>
          I'm happy to be contacted about this and future opportunities from GAM Entertainment.
        </span>
      </label>

      {/* Error */}
      {state.status === 'error' && (
        <p className="text-sm" style={{ color: '#EF4444' }}>
          {state.message}
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={pending}
        className="w-full sm:w-auto px-10 py-4 text-sm font-bold tracking-widest uppercase transition-opacity disabled:opacity-50"
        style={{ background: 'var(--gam-gold)', color: 'var(--gam-black)' }}
      >
        {pending ? 'Sending…' : 'Submit inquiry'}
      </button>
    </form>
  )
}

function Field({
  label,
  name,
  type = 'text',
  required,
  placeholder,
  className = '',
}: {
  label: string
  name: string
  type?: string
  required?: boolean
  placeholder?: string
  className?: string
}) {
  return (
    <div className={className}>
      <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--gam-muted)' }}>
        {label}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
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
  )
}

function SelectField({
  label,
  name,
  options,
}: {
  label: string
  name: string
  options: { value: string; label: string }[]
}) {
  return (
    <div>
      <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--gam-muted)' }}>
        {label}
      </label>
      <select
        name={name}
        className="w-full px-4 py-3 text-sm outline-none transition-colors appearance-none"
        style={{
          background: 'var(--gam-surface)',
          border: '1px solid var(--gam-border)',
          color: 'var(--gam-text)',
        }}
        onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--gam-gold)')}
        onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--gam-border)')}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value} style={{ background: 'var(--gam-surface)' }}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  )
}
