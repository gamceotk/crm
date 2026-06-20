'use server'

import { createAdminClient } from '@/lib/supabase/admin'

export type InquiryFormState =
  | { status: 'idle' }
  | { status: 'success' }
  | { status: 'error'; message: string }

export async function submitInquiry(
  _prev: InquiryFormState,
  formData: FormData,
): Promise<InquiryFormState> {
  const supabase = createAdminClient()

  const name = (formData.get('name') as string | null)?.trim() ?? ''
  const email = (formData.get('email') as string | null)?.trim().toLowerCase() ?? ''
  const phone = (formData.get('phone') as string | null)?.trim() ?? ''
  const company = (formData.get('company') as string | null)?.trim() ?? ''
  const role = (formData.get('role') as string | null)?.trim() ?? ''
  const type = (formData.get('type') as string | null) ?? 'general'
  const subject = (formData.get('subject') as string | null)?.trim() ?? ''
  const message = (formData.get('message') as string | null)?.trim() ?? ''
  const okToContact = formData.get('ok_to_contact') === 'on'
  const howWeMet = (formData.get('how_we_met') as string | null)?.trim() ?? ''
  const budgetTier = (formData.get('budget_tier') as string | null) ?? ''
  const decisionTimeline = (formData.get('decision_timeline') as string | null) ?? ''

  if (!name || !email || !message) {
    return { status: 'error', message: 'Name, email, and message are required.' }
  }

  const attributes: Record<string, string> = {}
  if (howWeMet) attributes.how_we_met = howWeMet
  if (budgetTier) attributes.budget_tier = budgetTier
  if (decisionTimeline) attributes.decision_timeline = decisionTimeline

  // Upsert person by email — never create duplicates
  const { data: person, error: personError } = await supabase
    .from('people')
    .upsert(
      {
        email,
        name,
        phone: phone || null,
        company: company || null,
        role: role || null,
        source_site: 'tknguyen.me',
        ok_to_contact: okToContact,
        attributes,
      },
      { onConflict: 'email', ignoreDuplicates: false },
    )
    .select('id')
    .single()

  if (personError || !person) {
    console.error('people upsert error', personError)
    return { status: 'error', message: 'Something went wrong. Please try again.' }
  }

  // Insert inquiry
  const { error: contactError } = await supabase.from('contacts').insert({
    person_id: person.id,
    type,
    subject: subject || null,
    message,
    source: 'contact_form',
    status: 'new_lead',
  })

  if (contactError) {
    console.error('contacts insert error', contactError)
    return { status: 'error', message: 'Something went wrong. Please try again.' }
  }

  return { status: 'success' }
}
