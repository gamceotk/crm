import ContactForm from './contact-form'

export default function Home() {
  return (
    <main className="flex-1 flex flex-col">
      {/* Hero */}
      <section
        className="px-6 pt-20 pb-14 border-b"
        style={{ borderColor: 'var(--gam-border)' }}
      >
        <div className="max-w-3xl mx-auto">
          <div
            className="inline-block text-xs font-semibold tracking-widest uppercase mb-8"
            style={{ color: 'var(--gam-gold)' }}
          >
            GAM Entertainment
          </div>
          <h1
            className="text-4xl sm:text-5xl font-bold leading-tight mb-6"
            style={{ color: 'var(--gam-text)' }}
          >
            Let's build something<br />
            <span style={{ color: 'var(--gam-gold)' }}>together.</span>
          </h1>
          <p className="text-lg max-w-xl" style={{ color: 'var(--gam-muted)' }}>
            Brand partnerships, advertising campaigns, team appearances, and KOL bookings.
            Tell us what you have in mind.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="flex-1 px-6 py-14">
        <div className="max-w-3xl mx-auto">
          <ContactForm />
        </div>
      </section>

      {/* Footer */}
      <footer
        className="px-6 py-8 border-t"
        style={{ borderColor: 'var(--gam-border)' }}
      >
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <span className="text-xs" style={{ color: 'var(--gam-muted)' }}>
            © 2026 GAM Entertainment
          </span>
          <span
            className="text-xs font-semibold tracking-widest uppercase"
            style={{ color: 'var(--gam-gold)' }}
          >
            It's GAM TIME!
          </span>
        </div>
      </footer>
    </main>
  )
}
